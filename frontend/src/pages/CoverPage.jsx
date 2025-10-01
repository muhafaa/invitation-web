import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Heart, Mail } from 'lucide-react';

const CoverPage = ({ weddingData }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isOpening, setIsOpening] = useState(false);
  
  const guestName = searchParams.get('kpd') || 'Tamu Undangan';
  
  const handleOpenInvitation = () => {
    setIsOpening(true);
    setTimeout(() => {
      navigate('/invitation');
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-navy-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-navy-300 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-navy-200 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-navy-300 rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 border border-navy-200 rounded-full"></div>
      </div>

      {/* Envelope Container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div 
          className={`relative transition-all duration-1000 transform ${
            isOpening ? 'scale-110 rotate-2 opacity-0' : 'scale-100 rotate-0 opacity-100'
          }`}
        >
          {/* Envelope Back */}
          <div className="relative w-80 h-96 md:w-96 md:h-[28rem] bg-gradient-to-br from-navy-700 to-navy-900 rounded-lg shadow-2xl">
            
            {/* Envelope Flap */}
            <div 
              className={`absolute -top-16 left-0 w-full h-32 bg-gradient-to-br from-navy-600 to-navy-800 transform-gpu transition-transform duration-1000 origin-bottom ${
                isOpening ? '-rotate-12 scale-105' : 'rotate-0 scale-100'
              }`}
              style={{
                clipPath: 'polygon(0 100%, 50% 0, 100% 100%)'
              }}
            >
              {/* Envelope Seal */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gold-400 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-navy-800" />
              </div>
            </div>
            
            {/* Invitation Card */}
            <div 
              className={`absolute inset-4 bg-gradient-to-br from-white via-blue-50 to-navy-50 rounded-lg shadow-xl transform transition-all duration-1000 ${
                isOpening ? 'translate-y-8 scale-105 rotate-1' : 'translate-y-0 scale-100 rotate-0'
              }`}
            >
              <div className="p-6 md:p-8 h-full flex flex-col justify-center items-center text-center relative">
                
                {/* Decorative Border */}
                <div className="absolute inset-2 border-2 border-navy-200 rounded-lg opacity-50"></div>
                <div className="absolute inset-4 border border-navy-100 rounded-lg opacity-30"></div>
                
                {/* Content */}
                <div className="relative z-10 space-y-6">
                  <Mail className="w-8 h-8 text-navy-600 mx-auto opacity-80" />
                  
                  <div className="space-y-2">
                    <p className="text-sm text-navy-500 font-medium tracking-wider uppercase">Undangan Pernikahan</p>
                    <div className="w-16 h-px bg-navy-300 mx-auto"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-2xl md:text-3xl font-serif text-navy-800 leading-tight">
                      {weddingData.couple.bride.name}
                      <span className="block text-lg text-navy-600 font-light my-2">&</span>
                      {weddingData.couple.groom.name}
                    </div>
                    
                    <div className="space-y-2 text-navy-600">
                      <p className="text-sm font-medium">Kepada Yth.</p>
                      <p className="text-lg font-semibold text-navy-800">{guestName}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={handleOpenInvitation}
                      disabled={isOpening}
                      className="bg-navy-600 hover:bg-navy-700 text-white px-8 py-3 rounded-full font-medium tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      {isOpening ? 'Membuka...' : 'Buka Undangan'}
                    </Button>
                  </div>
                  
                  <p className="text-xs text-navy-400 mt-4">Mohon maaf apabila ada kesalahan nama dan gelar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverPage;