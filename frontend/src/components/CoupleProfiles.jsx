import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Heart, User, Users } from 'lucide-react';

const CoupleProfiles = ({ couple }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const ProfileCard = ({ person, isGroom = false }) => (
    <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-navy-200 hover:shadow-xl transition-all duration-300">
      <div className="relative">
        {/* Photo */}
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={person.photo}
            alt={person.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x600/1e293b/ffffff?text=${person.name.charAt(0)}`;
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
        
        {/* Profile Content */}
        <div className="p-6 space-y-4">
          {/* Name */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <User className="w-5 h-5 text-navy-600" />
              <h3 className="text-2xl font-serif text-navy-800">
                {person.name}
              </h3>
            </div>
            <p className="text-navy-600 font-medium">{person.fullName}</p>
            <div className="w-16 h-px bg-navy-300 mx-auto"></div>
          </div>

          {/* Parents */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-navy-600 text-center">
              {isGroom ? 'Putra dari:' : 'Putri dari:'}
            </p>
            <div className="text-center space-y-1">
              <p className="text-navy-700 font-medium">{person.father}</p>
              <p className="text-navy-600">&</p>
              <p className="text-navy-700 font-medium">{person.mother}</p>
            </div>
          </div>

          {/* Bio */}
          <div className="pt-4 border-t border-navy-100">
            <p className="text-sm text-navy-600 text-center leading-relaxed">
              {person.bio}
            </p>
          </div>
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
          <Users className="w-8 h-8 text-navy-600" />
          <h2 className="text-3xl md:text-4xl font-serif text-navy-800">
            Mempelai
          </h2>
          <Users className="w-8 h-8 text-navy-600" />
        </div>
        <div className="w-24 h-1 bg-navy-400 mx-auto"></div>
        <p className="text-navy-600 max-w-2xl mx-auto">
          Kedua mempelai yang akan dipersatukan dalam ikatan suci pernikahan
        </p>
      </div>

      {/* Couple Profiles */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Bride */}
        <div className="animate-slideInLeft">
          <ProfileCard person={couple.bride} />
        </div>

        {/* Heart Connector - Desktop Only */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-white rounded-full p-4 shadow-lg border-4 border-navy-100">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
          </div>
        </div>

        {/* Heart Connector - Mobile Only */}
        <div className="md:hidden flex justify-center -my-4 z-10 relative">
          <div className="bg-white rounded-full p-3 shadow-lg border-4 border-navy-100">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
          </div>
        </div>

        {/* Groom */}
        <div className="animate-slideInRight">
          <ProfileCard person={couple.groom} isGroom={true} />
        </div>
      </div>

      {/* Love Story Section */}
      <Card className="max-w-3xl mx-auto bg-gradient-to-br from-navy-800 to-navy-900 text-white border-navy-700">
        <div className="p-8 md:p-12 text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-red-400" />
            <h3 className="text-2xl md:text-3xl font-serif">
              Kisah Cinta Kami
            </h3>
            <Heart className="w-6 h-6 text-red-400" />
          </div>
          
          <div className="space-y-4 text-navy-100 leading-relaxed">
            <p>
              Pertemuan kami dimulai dari persahabatan yang indah. Seiring waktu, 
              Allah SWT menumbuhkan rasa cinta yang tulus di hati kami.
            </p>
            <p>
              Dengan ridho kedua orang tua dan restu keluarga, kami memutuskan untuk 
              melanjutkan hubungan kami ke jenjang yang lebih suci dalam ikatan pernikahan.
            </p>
            <p className="font-medium text-white">
              "Dan segala sesuatu Kami ciptakan berpasang-pasangan supaya kamu mengingat kebesaran Allah."
            </p>
            <p className="text-sm text-navy-300 italic">
              - QS. Adz-Dzaariyat: 49
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CoupleProfiles;