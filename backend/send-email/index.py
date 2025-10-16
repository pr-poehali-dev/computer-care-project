import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
from pydantic import BaseModel, EmailStr, Field, ValidationError

class ContactFormData(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=1000)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send contact form emails to site owner
    Args: event - dict with httpMethod, body; context - object with request_id
    Returns: HTTP response dict with success/error status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    try:
        form_data = ContactFormData(**body_data)
    except ValidationError as e:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid form data', 'details': e.errors()}),
            'isBase64Encoded': False
        }
    
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    recipient_email = os.environ.get('RECIPIENT_EMAIL')
    
    if not all([smtp_host, smtp_user, smtp_password, recipient_email]):
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Email service not configured'}),
            'isBase64Encoded': False
        }
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта от {form_data.name}'
    msg['From'] = smtp_user
    msg['To'] = recipient_email
    
    html_content = f'''
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #45B7D1 0%, #FFA07A 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h2 style="color: white; margin: 0;">Новая заявка с сайта!</h2>
        </div>
        <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 10px 10px;">
          <h3 style="color: #2C3E50; margin-top: 0;">Контактная информация:</h3>
          <p><strong>Имя:</strong> {form_data.name}</p>
          <p><strong>Email:</strong> {form_data.email}</p>
          
          <h3 style="color: #2C3E50;">Сообщение:</h3>
          <div style="background: white; padding: 15px; border-left: 4px solid #45B7D1; border-radius: 5px;">
            <p style="margin: 0; white-space: pre-wrap;">{form_data.message}</p>
          </div>
        </div>
      </body>
    </html>
    '''
    
    msg.attach(MIMEText(html_content, 'html'))
    
    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Email sent successfully'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Failed to send email', 'details': str(e)}),
            'isBase64Encoded': False
        }
