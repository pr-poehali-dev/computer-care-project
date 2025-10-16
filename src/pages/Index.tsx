import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'portfolio', 'testimonials', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const services = [
    {
      icon: 'Monitor',
      title: 'Переустановка программ',
      description: 'Профессиональная установка и настройка любого ПО для вашего компьютера'
    },
    {
      icon: 'HardDrive',
      title: 'Установка Windows',
      description: 'Чистая установка Windows, драйверов и всех необходимых программ'
    },
    {
      icon: 'Wrench',
      title: 'Ремонт компьютеров',
      description: 'Диагностика и устранение любых неполадок вашего ПК'
    },
    {
      icon: 'Globe',
      title: 'Создание сайтов',
      description: 'Разработка современных сайтов и поддержка социальных сетей'
    }
  ];

  const portfolioItems = [
    {
      title: 'Корпоративный сайт',
      category: 'Веб-разработка',
      description: 'Создание сайта для IT-компании'
    },
    {
      title: 'Настройка ПК',
      category: 'Ремонт',
      description: 'Комплексная настройка рабочей станции'
    },
    {
      title: 'SMM управление',
      category: 'Соцсети',
      description: 'Ведение аккаунтов в социальных сетях'
    },
    {
      title: 'Сборка ПК',
      category: 'Ремонт',
      description: 'Сборка игрового компьютера под ключ'
    }
  ];

  const testimonials = [
    {
      name: 'Александр К.',
      role: 'Владелец бизнеса',
      text: 'Отличная работа! Быстро установил Windows и все нужные программы. Все работает идеально.',
      rating: 5
    },
    {
      name: 'Мария С.',
      role: 'Фрилансер',
      text: 'Создал сайт для моего бизнеса за неделю. Современный дизайн и удобное управление!',
      rating: 5
    },
    {
      name: 'Дмитрий В.',
      role: 'Менеджер',
      text: 'Починил мой компьютер в тот же день. Профессионал своего дела, рекомендую!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                IT
              </div>
              <span className="font-bold text-xl">IT Мастер</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'services', 'portfolio', 'testimonials', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {section === 'home' ? 'Главная' : 
                   section === 'about' ? 'Обо мне' :
                   section === 'services' ? 'Услуги' :
                   section === 'portfolio' ? 'Портфолио' :
                   section === 'testimonials' ? 'Отзывы' : 'Контакты'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2 animate-fade-in">
              {['home', 'about', 'services', 'portfolio', 'testimonials', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  {section === 'home' ? 'Главная' : 
                   section === 'about' ? 'Обо мне' :
                   section === 'services' ? 'Услуги' :
                   section === 'portfolio' ? 'Портфолио' :
                   section === 'testimonials' ? 'Отзывы' : 'Контакты'}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Профессиональные IT-услуги
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Ваш надежный
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> IT-специалист</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Ремонт компьютеров, установка Windows, создание сайтов и продвижение в соцсетях
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                >
                  Связаться со мной
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollToSection('services')}
                >
                  Мои услуги
                </Button>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
              <img
                src="https://cdn.poehali.dev/files/750f1f1e-9f13-45af-aa9d-4a83d87660c2.png"
                alt="IT специалист"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Обо мне</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Профессиональный IT-специалист</h3>
              <p className="text-muted-foreground leading-relaxed">
                Более 5 лет опыта в сфере IT-услуг. Помогаю частным лицам и компаниям решать любые технические задачи — от простой переустановки программ до создания полноценных веб-сайтов.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Моя цель — сделать технологии доступными и понятными для каждого. Работаю быстро, качественно и с гарантией результата.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Windows', 'Ремонт ПК', 'Web-разработка', 'SMM', 'Установка ПО'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 rounded-full bg-white border border-border text-sm font-medium hover:border-primary transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'Users', value: '200+', label: 'Клиентов' },
                { icon: 'CheckCircle', value: '500+', label: 'Проектов' },
                { icon: 'Award', value: '5', label: 'Лет опыта' },
                { icon: 'Star', value: '4.9', label: 'Рейтинг' }
              ].map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary text-white mb-3">
                      <Icon name={stat.icon} size={24} />
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Мои услуги</h2>
            <p className="text-muted-foreground text-lg">Полный спектр IT-услуг для вашего бизнеса и личных нужд</p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    <Icon name={service.icon} size={28} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Портфолио</h2>
            <p className="text-muted-foreground text-lg">Примеры моих работ</p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {portfolioItems.map((item, index) => (
              <Card 
                key={index}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white text-xs font-semibold">
                    {item.category}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-muted-foreground text-lg">Что говорят о моей работе</p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-base">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Связаться со мной</h2>
            <p className="text-muted-foreground text-lg">Готов ответить на все ваши вопросы</p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="Phone" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Телефон</div>
                    <div className="font-medium">+7 (999) 123-45-67</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="Mail" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">it.master@example.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="MapPin" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Адрес</div>
                    <div className="font-medium">Москва, Россия</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>Напишите мне</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);

                  try {
                    const response = await fetch('https://functions.poehali.dev/d7dde0d3-a42d-442c-8306-6726922c25a4', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(formData),
                    });

                    const data = await response.json();

                    if (response.ok) {
                      toast({
                        title: "Сообщение отправлено!",
                        description: "Я свяжусь с вами в ближайшее время.",
                      });
                      setFormData({ name: '', email: '', message: '' });
                    } else {
                      toast({
                        title: "Ошибка отправки",
                        description: data.error || "Попробуйте позже или свяжитесь по телефону",
                        variant: "destructive",
                      });
                    }
                  } catch (error) {
                    toast({
                      title: "Ошибка сети",
                      description: "Проверьте подключение к интернету",
                      variant: "destructive",
                    });
                  } finally {
                    setIsSubmitting(false);
                  }
                }}>
                  <div className="space-y-4">
                    <div>
                      <Input 
                        placeholder="Ваше имя" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input 
                        type="email" 
                        placeholder="Email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Textarea 
                        placeholder="Ваше сообщение" 
                        rows={4} 
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        minLength={10}
                      />
                    </div>
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                      <Icon name="Send" size={18} className="ml-2" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-accent text-accent-foreground py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm">© 2024 IT Мастер. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;