
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, Mail, MapPin, Clock, Users, Shield, Award, Car, Facebook, Instagram, Twitter, Star, CheckCircle, Calendar, Route, ArrowRight, ChevronDown, ChevronUp, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [counters, setCounters] = useState({
    years: 0,
    clients: 0,
    trips: 0,
    kilometers: 0
  });
  const [isCounterVisible, setIsCounterVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    about: false,
    services: false,
    testimonials: false,
    contact: false
  });
  const [scrollY, setScrollY] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Anna Kowalska",
      role: "Dyrektor szkoły",
      content: "Współpraca z firmą Autokary Lublin była wyjątkowa. Profesjonalny kierowca, punktualność i bezpieczeństwo uczniów na najwyższym poziomie. Zdecydowanie polecamy!",
      icon: Users
    },
    {
      id: 2,
      name: "Piotr Nowak",
      role: "Menedżer HR",
      content: "Organizowaliśmy wyjazd firmowy do Krakowa. Autokar był komfortowy, a obsługa bardzo pomocna. Wszyscy pracownicy byli zachwyceni podróżą.",
      icon: Award
    },
    {
      id: 3,
      name: "Maria Wiśniewska",
      role: "Organizator wycieczek",
      content: "Już trzeci rok z rzędu korzystam z usług tej firmy. Niezawodność, profesjonalizm i konkurencyjne ceny. Nie wyobrażam sobie współpracy z kimś innym.",
      icon: Shield
    },
    {
      id: 4,
      name: "Tomasz Kowalczyk",
      role: "Kierownik działu logistyki",
      content: "Przewozy dla naszej firmy są zawsze na czas. Kierowcy kulturalni i pomocni. Świetna komunikacja i elastyczność terminów.",
      icon: Clock
    },
    {
      id: 5,
      name: "Katarzyna Lewandowska",
      role: "Przewodnik turystyczny",
      content: "Pracuję z wieloma firmami przewozowymi, ale ta wyróżnia się profesjonalizmem. Autokary zawsze czyste i w doskonałym stanie technicznym.",
      icon: Car
    },
    {
      id: 6,
      name: "Marek Zieliński",
      role: "Organizator eventów",
      content: "Organizujemy eventy dla dużych firm i zawsze korzystamy z ich usług. Bezpieczeństwo, punktualność i komfort na najwyższym poziomie.",
      icon: Users
    }
  ];

  // FAQ data
  const faqData = [
    {
      question: "Jak mogę zarezerwować autokar?",
      answer: "Rezerwacji można dokonać telefonicznie pod numerem +48 123 456 789 lub mailowo na kontakt@autokary.pl. Wystarczy podać datę, trasę i liczbę pasażerów."
    },
    {
      question: "Jakie są warunki płatności?",
      answer: "Przyjmujemy płatności gotówkowe, kartą oraz przelewem bankowym. Możliwa jest wpłata zaliczki z dopłatą przed wyjazdem."
    },
    {
      question: "Czy autokar jest ubezpieczony?",
      answer: "Wszystkie nasze pojazdy posiadają pełne ubezpieczenie AC i OC. Dodatkowo oferujemy ubezpieczenie pasażerów."
    },
    {
      question: "Czy kierowca jest w cenie?",
      answer: "Tak, profesjonalny kierowca jest zawsze w cenie wynajmu. Nasi kierowcy mają wieloletnie doświadczenie i certyfikaty."
    },
    {
      question: "Jaki jest zasięg działania firmy?",
      answer: "Obsługujemy całą Polskę oraz kraje europejskie. Specjalizujemy się w przewozach z Lublina do wszystkich destynacji."
    }
  ];

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxSpeed = 0.5;
      
      // Show/hide back to top button
      setShowBackToTop(scrolled > 300);
      
      requestAnimationFrame(() => {
        setScrollY(scrolled);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setIsVisible(prev => ({
            ...prev,
            [sectionId]: true
          }));
        }
      });
    }, observerOptions);

    const sections = ['hero', 'about', 'services', 'testimonials', 'contact'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Animacja licznika
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isCounterVisible) {
          setIsCounterVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isCounterVisible]);

  const animateCounters = () => {
    const duration = 2000;
    const targets = {
      years: 15,
      clients: 500,
      trips: 1200,
      kilometers: 50000
    };

    Object.keys(targets).forEach((key) => {
      const target = targets[key as keyof typeof targets];
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, 16);
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 140; // Wysokość stałego headera (główna nawigacja + sub-bar)
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: .5;
            }
          }
          
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          
          .animate-slide-in-left {
            animation: slideInLeft 0.8s ease-out forwards;
          }
          
          .animate-slide-in-right {
            animation: slideInRight 0.8s ease-out forwards;
          }
          
          .animate-scale-in {
            animation: scaleIn 0.6s ease-out forwards;
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animation-delay-300 {
            animation-delay: 300ms;
          }
          
          .animation-delay-600 {
            animation-delay: 600ms;
          }
          
          .animation-delay-900 {
            animation-delay: 900ms;
          }
          
          .animation-delay-1200 {
            animation-delay: 1200ms;
          }
          
          .animate-pulse {
            animation: pulse 2s infinite;
          }
          
          .animate-bounce {
            animation: bounce 2s infinite;
          }
        `
      }} />

      {/* SEO Meta Tags */}
      <div style={{ display: 'none' }}>
        <h1>Wynajem autokarów Lublin - Autokary Lublin - Najlepsze przewozy autokarowe</h1>
        <meta name="description" content="⭐ Wynajem autokarów w Lublinie ⭐ Profesjonalne przewozy krajowe i zagraniczne ⭐ Bezpieczne i komfortowe podróże dla grup ⭐ 15+ lat doświadczenia ⭐ Zadzwoń: +48 123 456 789" />
        <meta name="keywords" content="wynajem autokarów Lublin, wynajem busów Lublin, przewozy autokarowe Lublin, transport osobowy Lublin, wycieczki autokarowe Lublin, autokar Lublin, bus Lublin, przewozy grupowe Lublin, transport turystyczny Lublin, wycieczki szkolne Lublin, wyjazdy firmowe Lublin, transport pasażerski Lublin, autobusy Lublin, przewozy międzymiastowe Lublin, transport krajowy Lublin, wycieczki krajoznawcze Lublin" />
        <meta name="author" content="Autokary Lublin" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="geo.region" content="PL-LU" />
        <meta name="geo.placename" content="Lublin" />
        <meta name="geo.position" content="51.2465;22.5684" />
        <meta name="ICBM" content="51.2465, 22.5684" />
        <meta name="language" content="pl" />
        <meta name="revisit-after" content="1 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="classification" content="business" />
        <meta name="category" content="transport, przewozy, autokar, bus" />
        <meta name="coverage" content="Poland" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="subject" content="wynajem autokarów, przewozy autokarowe, transport pasażerski" />
        <meta name="copyright" content="Autokary Lublin" />
        <meta name="owner" content="Autokary Lublin" />
        <meta name="url" content="https://kamilmaslanka.pl/autobusy" />
        <meta name="identifier-URL" content="https://kamilmaslanka.pl/autobusy" />
        <meta name="directory" content="submission" />
        <meta name="pagename" content="Wynajem autokarów Lublin" />
        <meta name="Category" content="Transport, Przewozy, Autokar, Bus" />
        <meta name="contact" content="kontakt@autokary.pl" />
        <meta name="phone" content="+48123456789" />
        <meta name="city" content="Lublin" />
        <meta name="country" content="Polska" />
        <meta name="state" content="lubelskie" />
        <meta name="zipcode" content="20-000" />
        <meta property="og:title" content="Wynajem autokarów Lublin - Profesjonalne przewozy autokarowe" />
        <meta property="og:description" content="⭐ Najlepsze przewozy autokarowe z Lublina ⭐ 15+ lat doświadczenia ⭐ Bezpieczeństwo i komfort na najwyższym poziomie ⭐ Przewozy krajowe i zagraniczne" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kamilmaslanka.pl/autobusy" />
        <meta property="og:site_name" content="Autokary Lublin" />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:image" content="https://kamilmaslanka.pl/autobusy/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="Autokar Lublin - Profesjonalne przewozy autokarowe" />
        <meta property="business:contact_data:street_address" content="Lublin" />
        <meta property="business:contact_data:locality" content="Lublin" />
        <meta property="business:contact_data:region" content="lubelskie" />
        <meta property="business:contact_data:postal_code" content="20-000" />
        <meta property="business:contact_data:country_name" content="Polska" />
        <meta property="business:contact_data:email" content="kontakt@autokary.pl" />
        <meta property="business:contact_data:phone_number" content="+48123456789" />
        <meta property="business:contact_data:website" content="https://kamilmaslanka.pl/autobusy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wynajem autokarów Lublin - Profesjonalne przewozy autokarowe" />
        <meta name="twitter:description" content="⭐ Najlepsze przewozy autokarowe z Lublina ⭐ 15+ lat doświadczenia ⭐ Bezpieczeństwo i komfort na najwyższym poziomie" />
        <meta name="twitter:image" content="https://kamilmaslanka.pl/autobusy/og-image.jpg" />
        <meta name="twitter:site" content="@AutokaryLublin" />
        <link rel="canonical" href="https://kamilmaslanka.pl/autobusy" />
        <link rel="alternate" hrefLang="pl" href="https://kamilmaslanka.pl/autobusy" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="https://kamilmaslanka.pl/autobusy/sitemap.xml" />
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://kamilmaslanka.pl/autobusy",
            "name": "Autokary Lublin",
            "alternateName": "Wynajem autokarów Lublin",
            "description": "Profesjonalne przewozy autokarowe z Lublina. Wynajem autokarów, busów i autobusów. Przewozy krajowe i zagraniczne. 15+ lat doświadczenia.",
            "url": "https://kamilmaslanka.pl/autobusy",
            "telephone": "+48123456789",
            "email": "kontakt@autokary.pl",
            "foundingDate": "2008",
            "numberOfEmployees": "10-20",
            "slogan": "Bezpieczne i komfortowe przewozy autokarowe",
            "paymentAccepted": "cash, card, bank transfer",
            "currenciesAccepted": "PLN, EUR",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Lublin",
              "addressLocality": "Lublin",
              "addressRegion": "lubelskie",
              "postalCode": "20-000",
              "addressCountry": "PL"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "51.2465",
              "longitude": "22.5684"
            },
            "areaServed": [
              {
                "@type": "Country",
                "name": "Polska"
              },
              {
                "@type": "AdministrativeArea",
                "name": "Europa"
              }
            ],
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "51.2465",
                "longitude": "22.5684"
              },
              "geoRadius": "1000000"
            },
            "priceRange": "$$",
            "image": [
              "https://kamilmaslanka.pl/autobusy/autokar-1.jpg",
              "https://kamilmaslanka.pl/autobusy/autokar-2.jpg",
              "https://kamilmaslanka.pl/autobusy/autokar-3.jpg"
            ],
            "logo": {
              "@type": "ImageObject",
              "url": "https://kamilmaslanka.pl/autobusy/logo.png",
              "width": "200",
              "height": "200"
            },
            "openingHours": "Mo-Su 00:00-23:59",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Usługi transportowe",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Wynajem autokarów",
                    "description": "Profesjonalny wynajem autokarów z kierowcą"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Wycieczki szkolne",
                    "description": "Bezpieczne przewozy dla grup szkolnych"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Wyjazdy firmowe",
                    "description": "Transport dla firm i organizacji"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Przewozy krajowe",
                    "description": "Regularne przewozy po całej Polsce"
                  }
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": [
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Anna Kowalska"
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": "Współpraca z firmą Autokary Lublin była wyjątkowa. Profesjonalny kierowca, punktualność i bezpieczeństwo uczniów na najwyższym poziomie."
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Piotr Nowak"
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": "Organizowaliśmy wyjazd firmowy do Krakowa. Autokar był komfortowy, a obsługa bardzo pomocna."
              }
            ],
            "sameAs": [
              "https://www.facebook.com/AutokaryLublin",
              "https://www.instagram.com/autokarylublin",
              "https://twitter.com/AutokaryLublin"
            ]
          })
        }}
      />
      
      {/* Additional JSON-LD for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Jak mogę zarezerwować autokar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Rezerwacji można dokonać telefonicznie pod numerem +48 123 456 789 lub mailowo na kontakt@autokary.pl. Wystarczy podać datę, trasę i liczbę pasażerów."
                }
              },
              {
                "@type": "Question",
                "name": "Jakie są warunki płatności?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Przyjmujemy płatności gotówkowe, kartą oraz przelewem bankowym. Możliwa jest wpłata zaliczki z dopłatą przed wyjazdem."
                }
              },
              {
                "@type": "Question",
                "name": "Czy autokar jest ubezpieczony?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Wszystkie nasze pojazdy posiadają pełne ubezpieczenie AC i OC. Dodatkowo oferujemy ubezpieczenie pasażerów."
                }
              },
              {
                "@type": "Question",
                "name": "Czy kierowca jest w cenie?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Tak, profesjonalny kierowca jest zawsze w cenie wynajmu. Nasi kierowcy mają wieloletnie doświadczenie i certyfikaty."
                }
              },
              {
                "@type": "Question",
                "name": "Jaki jest zasięg działania firmy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Obsługujemy całą Polskę oraz kraje europejskie. Specjalizujemy się w przewozach z Lublina do wszystkich destynacji."
                }
              }
            ]
          })
        }}
      />

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50">
        {/* Główna linia nawigacyjna */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo i nazwa firmy po lewej */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Autokary Lublin</h1>
                <p className="text-sm text-gray-600">Przewozy autokarowe</p>
              </div>
            </div>

            {/* Menu nawigacyjne po prawej - desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                O nas
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                Usługi
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                Opinie
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                Kontakt
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu mobilne"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 py-4 bg-white/95 backdrop-blur-sm rounded-lg mx-4 shadow-lg">
              <div className="flex flex-col space-y-4 px-4">
                <button 
                  onClick={() => {
                    scrollToSection('hero');
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-red-600 transition-colors text-left font-medium"
                >
                  Home
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('about');
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-red-600 transition-colors text-left font-medium"
                >
                  O nas
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('services');
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-red-600 transition-colors text-left font-medium"
                >
                  Usługi
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('testimonials');
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-red-600 transition-colors text-left font-medium"
                >
                  Opinie
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('contact');
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-red-600 transition-colors text-left font-medium"
                >
                  Kontakt
                </button>
              </div>
            </nav>
          )}
        </div>
        
        {/* Druga linia - Sub-bar z social media i kontaktami */}
        <div className="bg-red-600 text-white py-2 text-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Social Media po lewej */}
              <div className="flex items-center space-x-4">
                <span className="font-medium hidden md:block">Śledź nas:</span>
                <div className="flex items-center space-x-3">
                  <a href="#" className="hover:text-red-200 transition-colors" aria-label="Facebook">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="hover:text-red-200 transition-colors" aria-label="Instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="hover:text-red-200 transition-colors" aria-label="Twitter">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              {/* Kontakt po prawej */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">+48 123 456 789</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="hidden md:inline">kontakt@autokary.pl</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 lg:pt-36"
      >
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')`,
            transform: `translateY(${scrollY * 0.5}px)`,
            willChange: 'transform'
          }}
        />
        
        {/* Content */}
        <div 
          className={`container mx-auto px-4 py-20 text-center text-white relative z-10 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg animate-fade-in-up">
              Wynajem autokarów <span className="text-red-400">Lublin</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md animate-fade-in-up animation-delay-300">
              Profesjonalne przewozy autokarowe z Lublina - bezpieczeństwo, komfort i najwyższa jakość obsługi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => scrollToSection('contact')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Zadzwoń teraz
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-800 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => scrollToSection('contact')}
              >
                Bezpłatna wycena
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full opacity-75">
            <div className="w-1 h-3 bg-white rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 bg-white scroll-mt-36 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16 text-center animate-slideInLeft">
              O nas
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Nasza firma działa od lat w branży przewozów autokarowych, 
                  zapewniając bezpieczne i wygodne wyjazdy dla szkół, firm i grup zorganizowanych.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Nasze doświadczenie, komfort pojездów oraz elastyczność oferty 
                  sprawiają, że jesteśmy pierwszym wyborem dla organizatorów wyjazdów.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3 animate-fadeInUp animation-delay-400">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Bezpieczeństwo</h3>
                      <p className="text-sm text-gray-600">Profesjonalni kierowcy</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 animate-fadeInUp animation-delay-600">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Doświadczenie</h3>
                      <p className="text-sm text-gray-600">Lata w branży</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative animate-slideInRight animation-delay-300">
                <img 
                  src="https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                  alt="Autokar na drodze w Lublinie" 
                  className="rounded-lg shadow-xl w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
            
            {/* Statystyki */}
            <div ref={counterRef} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center animate-scaleIn animation-delay-800">
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                  {counters.years}+
                </div>
                <p className="text-gray-600">lat doświadczenia</p>
              </div>
              <div className="text-center animate-scaleIn animation-delay-1000">
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                  {counters.clients}+
                </div>
                <p className="text-gray-600">zadowolonych klientów</p>
              </div>
              <div className="text-center animate-scaleIn animation-delay-1200">
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                  {counters.trips}+
                </div>
                <p className="text-gray-600">zrealizowanych wyjazdów</p>
              </div>
              <div className="text-center animate-scaleIn animation-delay-1400">
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                  {counters.kilometers.toLocaleString()}+
                </div>
                <p className="text-gray-600">kilometrów przejechanych</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-20 bg-gray-50 scroll-mt-36 transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Nasze usługi
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Kompleksowe usługi transportowe dostosowane do Twoich potrzeb
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Users,
                  title: "Wycieczki szkolne",
                  description: "Bezpieczne i edukacyjne wycieczki krajowe i zagraniczne dla grup szkolnych",
                  color: "bg-blue-100 text-blue-600"
                },
                {
                  icon: Car,
                  title: "Wynajem autokarów",
                  description: "Nowoczesne i komfortowe pojazdy na wynajem z profesjonalnym kierowcą",
                  color: "bg-green-100 text-green-600"
                },
                {
                  icon: Route,
                  title: "Przewozy krajowe",
                  description: "Regularne przewozy po całej Polsce z gwarancją punktualności",
                  color: "bg-purple-100 text-purple-600"
                },
                {
                  icon: Calendar,
                  title: "Wyjazdy firmowe",
                  description: "Organizacja wyjazdów integracyjnych i biznesowych dla firm",
                  color: "bg-orange-100 text-orange-600"
                }
              ].map((service, index) => (
                <Card key={index} className={`hover:shadow-2xl transition-all duration-500 bg-white border-0 shadow-lg group transform hover:scale-105 ${isVisible.services ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: `${index * 150}ms` }}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 group-hover:shadow-lg"
                      onClick={() => scrollToSection('contact')}
                    >
                      Dowiedz się więcej
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Certyfikaty i nagrody
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Nasza jakość potwierdzona certyfikatami i uznaniem w branży
            </p>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: "ISO 9001", desc: "Certyfikat jakości" },
                { icon: Award, title: "Złoty Medal", desc: "Targi Turystyki 2024" },
                { icon: CheckCircle, title: "Certyfikat BHP", desc: "Bezpieczeństwo pracy" },
                { icon: Star, title: "5 gwiazdek", desc: "Ocena klientów" }
              ].map((cert, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <cert.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{cert.title}</h3>
                  <p className="text-gray-600">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={`py-20 bg-white scroll-mt-36 transition-all duration-1000 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-slideInLeft">
                Opinie klientów
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fadeInUp animation-delay-200">
                Przekonaj się, co mówią o nas zadowoleni klienci
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Carousel z opiniami */}
              <div className="lg:col-span-3">
                <div className="relative bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[300px]">
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      {React.createElement(testimonials[currentTestimonial].icon, {
                        className: "w-8 h-8 text-red-600"
                      })}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <blockquote className="text-lg text-gray-600 leading-relaxed mb-6 italic">
                      "{testimonials[currentTestimonial].content}"
                    </blockquote>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 text-xl">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                    </div>
                    
                    <div className="flex justify-center text-yellow-400 mb-6">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                  
                  {/* Dots indicator */}
                  <div className="flex justify-center space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                          index === currentTestimonial
                            ? 'bg-red-600'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Przejdź do opinii ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Navigation arrows */}
                  <button
                    onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center text-gray-600 hover:text-red-600"
                    aria-label="Poprzednia opinia"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center text-gray-600 hover:text-red-600"
                    aria-label="Następna opinia"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Statystyki satysfakcji */}
            <div className="mt-16 bg-red-50 p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-red-600 mb-2">98%</div>
                  <p className="text-gray-600">Zadowolonych klientów</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
                  <p className="text-gray-600">Obsługa klienta</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
                  <p className="text-gray-600">Bezpieczeństwo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Często zadawane pytania
              </h2>
              <p className="text-xl text-gray-600">
                Odpowiedzi na najczęściej zadawane pytania dotyczące wynajmu autokarów
              </p>
            </div>
            
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-red-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 bg-gradient-to-br from-gray-50 to-gray-100 scroll-mt-36 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-slideInLeft">
                Skontaktuj się z nami
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fadeInUp animation-delay-200">
                Jesteśmy gotowi pomóc Ci zaplanować idealny wyjazd. Skontaktuj się z nami już dziś!
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Dane kontaktowe */}
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-slideInLeft animation-delay-400">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">Dane kontaktowe</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Telefon</p>
                      <a href="tel:+48123456789" className="text-red-600 hover:text-red-700 transition-colors">
                        +48 123 456 789
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Email</p>
                      <a href="mailto:kontakt@autokary.pl" className="text-red-600 hover:text-red-700 transition-colors">
                        kontakt@autokary.pl
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Lokalizacja</p>
                      <p className="text-gray-600">Lublin, Polska</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mapa */}
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-slideInRight animation-delay-600">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">Znajdź nas</h3>
                </div>
                
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79969.41140428655!2d22.481264514662687!3d51.21826314345772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472257141e154061%3A0x5528ee7af6e8e95f!2sLublin!5e0!3m2!1spl!2spl!4v1752602999726!5m2!1spl!2spl" 
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa Lublina"
                  ></iframe>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-gray-600 mb-4">
                    Nasza siedziba znajduje się w centrum Lublina, z łatwym dostępem do głównych tras komunikacyjnych.
                  </p>
                  <Button 
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => window.open('https://maps.google.com/maps?q=Lublin,+Poland', '_blank')}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Otwórz w Google Maps
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="bg-red-600 text-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Gotowy na wyjazd?</h3>
                <p className="text-xl mb-6 opacity-90">
                  Zadzwoń już teraz i umów się na bezpłatną wycenę!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.location.href = 'tel:+48123456789'}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Zadzwoń teraz
                  </Button>
                  <Button 
                    size="lg"
                    className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.location.href = 'mailto:kontakt@autokary.pl'}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Wyślij email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 transform hover:scale-110"
          aria-label="Powrót na górę"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Autokary Lublin</span>
              </div>
              <p className="text-gray-400">
                Bezpieczne i komfortowe przewozy autokarowe z Lublina
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Czym się zajmujemy</h4>
              <div className="space-y-2 text-gray-400">
                <p>• Wynajem autokarów Lublin</p>
                <p>• Wynajem busów Lublin</p>
                <p>• Wynajem autobusów Lublin</p>
                <p>• Wynajem samochódów osobowych Lublin</p>
                <p>• Autokary Lublin</p>
                <p>• Busy Lublin</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">O firmie</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Autokary Lublin to rodzinna firma zajmująca się przewozem osób zarówno na terenie kraju jak i całej Europy. Swoją ofertę kierujemy do osób prywatnych, firm, a także grup zorganizowanych.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
              <div className="space-y-2 text-gray-400">
                <p>+48 123 456 789</p>
                <p>kontakt@autokary.pl</p>
                <p>Lublin, Polska</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Kamil Maślanka. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;