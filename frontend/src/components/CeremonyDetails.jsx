import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';

const CeremonyDetails = ({ ceremony }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const openGoogleMaps = (coordinates, address) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  const EventCard = ({ event, title, icon: Icon }) => (
    <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-navy-200 hover:shadow-xl transition-all duration-300">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-navy-100 rounded-full">
            <Icon className="w-6 h-6 text-navy-600" />
          </div>
          <h3 className="text-2xl font-serif text-navy-800">{title}</h3>
        </div>

        <div className="space-y-4">
          {/* Date & Time */}
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-navy-500 mt-1" />
            <div>
              <p className="font-semibold text-navy-800">{event.date}</p>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4 text-navy-500" />
                <p className="text-navy-600">{event.time}</p>
              </div>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-navy-500 mt-1" />
            <div className="flex-1">
              <p className="font-semibold text-navy-800 mb-1">{event.venue}</p>
              <p className="text-navy-600 text-sm leading-relaxed">{event.address}</p>
            </div>
          </div>

          {/* Google Maps Button */}
          <Button
            onClick={() => openGoogleMaps(event.coordinates, event.address)}
            className="w-full bg-navy-600 hover:bg-navy-700 text-white mt-4 flex items-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            Lihat di Google Maps
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className={`space-y-8 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Calendar className="w-8 h-8 text-navy-600" />
          <h2 className="text-3xl md:text-4xl font-serif text-navy-800">
            Detail Acara
          </h2>
          <Calendar className="w-8 h-8 text-navy-600" />
        </div>
        <div className="w-24 h-1 bg-navy-400 mx-auto"></div>
        <p className="text-navy-600 max-w-2xl mx-auto">
          Informasi lengkap mengenai waktu dan tempat berlangsungnya acara pernikahan kami
        </p>
      </div>

      {/* Ceremony Events */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Akad Nikah */}
        <div className="animate-slideInLeft">
          <EventCard 
            event={ceremony.akad} 
            title="Akad Nikah" 
            icon={Calendar}
          />
        </div>

        {/* Resepsi */}
        <div className="animate-slideInRight">
          <EventCard 
            event={ceremony.reception} 
            title="Resepsi" 
            icon={Clock}
          />
        </div>
      </div>

      {/* Additional Information */}
      <Card className="max-w-4xl mx-auto bg-gradient-to-r from-navy-50 to-blue-50 border-navy-200">
        <div className="p-6 md:p-8">
          <h3 className="text-xl font-serif text-navy-800 text-center mb-6">
            Informasi Penting
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-navy-400 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-navy-800">Dress Code</p>
                  <p className="text-navy-600 text-sm">Formal / Semi Formal</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-navy-400 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-navy-800">Protokol Kesehatan</p>
                  <p className="text-navy-600 text-sm">Tetap jaga kesehatan dan ikuti protokol yang berlaku</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-navy-400 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-navy-800">Parkir</p>
                  <p className="text-navy-600 text-sm">Area parkir tersedia di lokasi acara</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-navy-400 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-navy-800">Konfirmasi Kehadiran</p>
                  <p className="text-navy-600 text-sm">Mohon konfirmasi kehadiran melalui form yang tersedia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Map Embed Preview */}
      <Card className="max-w-4xl mx-auto overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-serif text-navy-800 text-center mb-4">
            Lokasi Acara
          </h3>
          <div className="aspect-video bg-navy-100 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <MapPin className="w-12 h-12 text-navy-400 mx-auto" />
              <p className="text-navy-600">Peta lokasi akan dimuat saat mengklik tombol Google Maps</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CeremonyDetails;