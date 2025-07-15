
import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin, Clock, Users, Shield, Award, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Wiadomość została wysłana",
      description: "Skontaktujemy się z Państwem w ciągu 24 godzin.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Autokary</h1>
                <p className="text-sm text-gray-600">Przewozy autokarowe</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                O nas
              </button>
              <button 
                onClick={() => scrollToSection('offer')}
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                Oferta
              </button>
              <button 
                onClick={() => scrollToSection('fleet')}
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                Flota
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                Kontakt
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-700 hover:text-red-600 transition-colors text-left"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-700 hover:text-red-600 transition-colors text-left"
                >
                  O nas
                </button>
                <button 
                  onClick={() => scrollToSection('offer')}
                  className="text-gray-700 hover:text-red-600 transition-colors text-left"
                >
                  Oferta
                </button>
                <button 
                  onClick={() => scrollToSection('fleet')}
                  className="text-gray-700 hover:text-red-600 transition-colors text-left"
                >
                  Flota
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-700 hover:text-red-600 transition-colors text-left"
                >
                  Kontakt
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')`
        }}
      >
        <div className="container mx-auto px-4 py-20 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              Poznaj z nami piękno <span className="text-red-400">Polski!</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
              Bezpieczne i komfortowe przewozy autokarowe
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => scrollToSection('contact')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Zadzwoń teraz
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => scrollToSection('contact')}
              >
                Poproś o ofertę
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16 text-center">
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
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Bezpieczeństwo</h3>
                      <p className="text-sm text-gray-600">Profesjonalni kierowcy</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
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
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                  alt="Autokar na drodze" 
                  className="rounded-lg shadow-xl w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section id="offer" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16 text-center">
              Nasza oferta
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="hover:shadow-xl transition-shadow duration-300 bg-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Wycieczki szkolne</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Organizujemy niezapomniane szkolne wycieczki krajowe i zagraniczne
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-shadow duration-300 bg-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Car className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Wynajem autokarów</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Komfortowe pojazdy dostępne na wynajem dla różnych potrzeb
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-shadow duration-300 bg-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Przewozy krajowe</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Komfort i punktualność w każdej trasie po całej Polsce
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-shadow duration-300 bg-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Wyjazdy firmowe</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Profesjonalna obsługa wyjazdów integracyjnych i biznesowych
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16 text-center">
              Nasza flota
            </h2>
            <div className="text-center mb-16">
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Nowoczesne, klimatyzowane autokary. Bezpieczne i komfortowe pojazdy 
                dostosowane do różnych potrzeb przewozowych.
              </p>
            </div>
            
            {/* Fleet Images */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Autokar premium" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="font-semibold">Autokary Premium</h4>
                </div>
              </div>
              
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1583474345862-6f4a6a1e1e8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Wnętrze autokaru" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="font-semibold">Komfortowe wnętrze</h4>
                </div>
              </div>
              
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Autokar w podróży" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="font-semibold">Różne pojemności</h4>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Car className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Klimatyzacja</h3>
                <p className="text-gray-600 leading-relaxed">Komfortowa temperatura w każdych warunkach</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Bezpieczeństwo</h3>
                <p className="text-gray-600 leading-relaxed">Regularne przeglądy i serwis pojazdów</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Różne pojemności</h3>
                <p className="text-gray-600 leading-relaxed">Od małych grup do dużych wyjazdów</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16 text-center">
              Kontakt
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Skontaktuj się z nami</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Imię i nazwisko
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wiadomość
                    </label>
                    <Textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    Wyślij wiadomość
                  </Button>
                </form>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Dane kontaktowe</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700">+48 123 456 789</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700">kontakt@autokary.pl</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700">Polska</span>
                  </div>
                </div>
                
                {/* Map placeholder */}
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Mapa Google</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Autokary</span>
              </div>
              <p className="text-gray-400">
                Bezpieczne i komfortowe przewozy autokarowe
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
              <div className="space-y-2 text-gray-400">
                <p>+48 123 456 789</p>
                <p>kontakt@autokary.pl</p>
                <p>Polska</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Informacje</h4>
              <div className="space-y-2">
                <button className="text-gray-400 hover:text-white transition-colors block">
                  Polityka prywatności
                </button>
                <button className="text-gray-400 hover:text-white transition-colors block">
                  Regulamin
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Autokary. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
