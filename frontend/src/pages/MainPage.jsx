import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import PhotoCarousel from '../components/PhotoCarousel';
import IslamicQuote from '../components/IslamicQuote';
import CoupleProfiles from '../components/CoupleProfiles';
import CeremonyDetails from '../components/CeremonyDetails';
import GuestForm from '../components/GuestForm';
import { Heart, Calendar, ArrowUp } from 'lucide-react';

const MainPage = ({ weddingData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const sectionRefs = {
    home: useRef(null),
    quote: useRef(null),
    gallery: useRef(null),
    couple: useRef(null),
    ceremony: useRef(null),
    rsvp: useRef(null)
  };

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / documentHeight) * 100;
      
      setShowScrollTop(scrollTop > 500);
      setScrollProgress(Math.min(scrollPercentage, 100));
      
      // Check which sections are visible
      const newVisibleSections = new Set();
      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
            newVisibleSections.add(key);
          }
        }
      });
      setVisibleSections(newVisibleSections);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ScrollSection = ({ id, children, className = "" }) => {
    const isVisible = visibleSections.has(id);
    return (
      <section 
        ref={sectionRefs[id]}
        className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } ${className}`}
      >
        {children}
      </section>
    );
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-navy-100 transition-all duration-1000 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm border-b border-navy-100 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="text-center">
            <h1 className="text-xl font-serif text-navy-800">
              {weddingData.couple.bride.name} & {weddingData.couple.groom.name}
            </h1>
            <p className="text-xs text-navy-500">{weddingData.ceremony.akad.date}</p>
          </div>
        </div>
      </header>

      {/* Main Scrolling Content */}
      <main className="pt-20">
        
        {/* Hero Section */}
        <ScrollSection id="home" className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <HomeSection />
          </div>
        </ScrollSection>

        {/* Islamic Quote Section */}
        <ScrollSection id="quote" className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-4xl mx-auto w-full">
            <IslamicQuote quote={weddingData.islamicQuote} />
          </div>
        </ScrollSection>

        {/* Photo Gallery Section */}
        <ScrollSection id="gallery" className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-6xl mx-auto w-full">
            <PhotoCarousel photos={weddingData.gallery} />
          </div>
        </ScrollSection>

        {/* Couple Profiles Section */}
        <ScrollSection id="couple" className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-6xl mx-auto w-full">
            <CoupleProfiles couple={weddingData.couple} />
          </div>
        </ScrollSection>

        {/* Ceremony Details Section */}
        <ScrollSection id="ceremony" className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-6xl mx-auto w-full">
            <CeremonyDetails ceremony={weddingData.ceremony} />
          </div>
        </ScrollSection>

        {/* RSVP Section */}
        <ScrollSection id="rsvp" className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-6xl mx-auto w-full">
            <GuestForm />
          </div>
        </ScrollSection>

      </main>

      {/* Footer */}
      <footer className="bg-navy-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-6 h-6 text-red-400 mx-3" />
            <p className="text-navy-200 text-lg">Terima kasih atas doa dan restu Anda</p>
            <Heart className="w-6 h-6 text-red-400 mx-3" />
          </div>
          <div className="max-w-2xl mx-auto text-navy-300 leading-relaxed mb-6">
            <p>
              Kehadiran dan doa restu dari keluarga dan sahabat merupakan anugerah terindah 
              bagi kami. Semoga Allah SWT senantiasa memberkahi langkah kami.
            </p>
          </div>
          <div className="border-t border-navy-600 pt-6 mt-6">
            <p className="text-navy-400 text-sm">
              © 2024 Wedding Invitation | Made with Love
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-navy-600 hover:bg-navy-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          size="icon"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

};

// Home Section Component
function HomeSection() {
  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Section */}
      <Card className="relative overflow-hidden bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm border-navy-200 shadow-xl">
        <div className="p-8 md:p-16 text-center">
          <div className="space-y-8">
            <div className="animate-slideUp">
              <h2 className="text-5xl md:text-7xl font-serif text-navy-800 leading-tight mb-6">
                Sarah & Michael
              </h2>
              <div className="w-32 h-1 bg-navy-400 mx-auto"></div>
            </div>
            
            <p className="text-xl md:text-2xl text-navy-600 max-w-3xl mx-auto leading-relaxed font-light">
              Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk hadir 
              dalam momen bahagia pernikahan kami
            </p>
            
            <div className="flex items-center justify-center space-x-6 pt-6">
              <div className="w-16 h-px bg-navy-300"></div>
              <Heart className="w-8 h-8 text-red-400 animate-pulse" />
              <div className="w-16 h-px bg-navy-300"></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Save the Date */}
      <Card className="bg-gradient-to-br from-navy-800 to-navy-900 text-white border-navy-700 shadow-xl">
        <div className="p-10 md:p-12 text-center">
          <Calendar className="w-16 h-16 text-navy-300 mx-auto mb-6" />
          <h3 className="text-3xl md:text-4xl font-serif mb-4">Save the Date</h3>
          <p className="text-4xl md:text-5xl font-bold text-navy-100 mb-3">15 Juni 2024</p>
          <p className="text-xl text-navy-300">Sabtu</p>
        </div>
      </Card>

      {/* Welcome Message */}
      <Card className="bg-white/80 backdrop-blur-sm border-navy-200 shadow-xl">
        <div className="p-8 md:p-12">
          <h3 className="text-3xl md:text-4xl font-serif text-navy-800 text-center mb-8">
            Assalamualaikum Warahmatullahi Wabarakatuh
          </h3>
          <div className="space-y-6 text-navy-600 leading-relaxed text-lg">
            <p className="text-center">
              Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. 
              Ya Allah, perkenankanlah kami merangkai kasih sayang yang Kau ciptakan di antara putra-putri kami:
            </p>
            <div className="text-center py-8">
              <div className="inline-block space-y-3">
                <p className="text-3xl md:text-4xl font-serif text-navy-800">Sarah Amelia Putri</p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-px bg-navy-300"></div>
                  <p className="text-2xl text-navy-500">&</p>
                  <div className="w-12 h-px bg-navy-300"></div>
                </div>
                <p className="text-3xl md:text-4xl font-serif text-navy-800">Michael Pratama Santoso</p>
              </div>
            </div>
            <p className="text-center text-lg">
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