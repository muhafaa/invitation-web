import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import PhotoCarousel from '../components/PhotoCarousel';
import IslamicQuote from '../components/IslamicQuote';
import CoupleProfiles from '../components/CoupleProfiles';
import CeremonyDetails from '../components/CeremonyDetails';
import GuestForm from '../components/GuestForm';
import Navigation from '../components/Navigation';
import { Heart, Calendar, MapPin, Camera, Users, MessageCircle } from 'lucide-react';

const MainPage = ({ weddingData }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = {
    home: { icon: Heart, title: 'Beranda', component: HomeSection },
    quote: { icon: MessageCircle, title: 'Ayat Suci', component: () => <IslamicQuote quote={weddingData.islamicQuote} /> },
    gallery: { icon: Camera, title: 'Galeri', component: () => <PhotoCarousel photos={weddingData.gallery} /> },
    couple: { icon: Users, title: 'Mempelai', component: () => <CoupleProfiles couple={weddingData.couple} /> },
    ceremony: { icon: Calendar, title: 'Acara', component: () => <CeremonyDetails ceremony={weddingData.ceremony} /> },
    rsvp: { icon: MapPin, title: 'Konfirmasi', component: GuestForm }
  };

  const CurrentSection = sections[activeSection].component;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-navy-100 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md shadow-sm border-b border-navy-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-2xl font-serif text-navy-800">
              {weddingData.couple.bride.name} & {weddingData.couple.groom.name}
            </h1>
            <p className="text-sm text-navy-500 mt-1">{weddingData.ceremony.akad.date}</p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navigation 
        sections={sections} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="transition-all duration-500 transform">
            <CurrentSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-5 h-5 text-red-400 mx-2" />
            <p className="text-navy-200">Terima kasih atas doa dan restu Anda</p>
            <Heart className="w-5 h-5 text-red-400 mx-2" />
          </div>
          <p className="text-navy-400 text-sm">
            © 2024 Wedding Invitation | Made with Love
          </p>
        </div>
      </footer>
    </div>
  );
};

// Home Section Component
function HomeSection() {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Hero Section */}
      <Card className="relative overflow-hidden bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm border-navy-200">
        <div className="p-8 md:p-12 text-center">
          <div className="space-y-6">
            <div className="animate-slideUp">
              <h2 className="text-4xl md:text-6xl font-serif text-navy-800 leading-tight">
                Sarah & Michael
              </h2>
              <div className="w-24 h-1 bg-navy-400 mx-auto mt-4"></div>
            </div>
            
            <p className="text-lg md:text-xl text-navy-600 max-w-2xl mx-auto leading-relaxed">
              Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk hadir 
              dalam momen bahagia pernikahan kami
            </p>
            
            <div className="flex items-center justify-center space-x-4 pt-4">
              <div className="w-12 h-px bg-navy-300"></div>
              <Heart className="w-6 h-6 text-red-400" />
              <div className="w-12 h-px bg-navy-300"></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Save the Date */}
      <Card className="bg-navy-800 text-white border-navy-700">
        <div className="p-8 text-center">
          <Calendar className="w-12 h-12 text-navy-300 mx-auto mb-4" />
          <h3 className="text-2xl font-serif mb-2">Save the Date</h3>
          <p className="text-3xl font-bold text-navy-100 mb-2">15 Juni 2024</p>
          <p className="text-navy-300">Sabtu</p>
        </div>
      </Card>

      {/* Welcome Message */}
      <Card className="bg-white/70 backdrop-blur-sm border-navy-200">
        <div className="p-8">
          <h3 className="text-2xl font-serif text-navy-800 text-center mb-6">
            Assalamualaikum Warahmatullahi Wabarakatuh
          </h3>
          <div className="space-y-4 text-navy-600 leading-relaxed">
            <p>
              Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. 
              Ya Allah, perkenankanlah kami merangkai kasih sayang yang Kau ciptakan di antara putra-putri kami:
            </p>
            <div className="text-center py-6">
              <div className="inline-block space-y-2">
                <p className="text-2xl font-serif text-navy-800">Sarah Amelia Putri</p>
                <p className="text-navy-500">&</p>
                <p className="text-2xl font-serif text-navy-800">Michael Pratama Santoso</p>
              </div>
            </div>
            <p className="text-center">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i 
              berkenan hadir dan memberikan do'a restu kepada kami.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default MainPage;