import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Book, Heart } from 'lucide-react';

const IslamicQuote = ({ quote }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`space-y-8 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Book className="w-8 h-8 text-navy-600" />
          <h2 className="text-3xl md:text-4xl font-serif text-navy-800">
            Firman Allah SWT
          </h2>
          <Book className="w-8 h-8 text-navy-600" />
        </div>
        <div className="w-24 h-1 bg-navy-400 mx-auto"></div>
      </div>

      {/* Quote Card */}
      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-white via-blue-50/50 to-navy-50/30 backdrop-blur-sm border-navy-200 shadow-xl">
        <div className="p-8 md:p-12">
          {/* Decorative Border */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-navy-200/20 to-transparent"></div>
            <div className="relative space-y-8">
              
              {/* Arabic Text */}
              <div className="text-center space-y-6">
                <div className="text-2xl md:text-4xl leading-relaxed font-arabic text-navy-800 px-4">
                  <p className="leading-loose" style={{ fontFamily: 'Amiri, serif', direction: 'rtl' }}>
                    {quote.arabic}
                  </p>
                </div>
                
                {/* Decorative Separator */}
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-px bg-navy-300"></div>
                  <Heart className="w-5 h-5 text-red-400" />
                  <div className="w-16 h-px bg-navy-300"></div>
                </div>
              </div>

              {/* Indonesian Translation */}
              <div className="space-y-4">
                <p className="text-lg md:text-xl text-navy-700 leading-relaxed text-center italic px-4">
                  "{quote.indonesian}"
                </p>
                
                {/* Reference */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-navy-100 px-4 py-2 rounded-full">
                    <Book className="w-4 h-4 text-navy-600" />
                    <span className="text-navy-700 font-semibold">
                      {quote.reference}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Additional Message */}
      <Card className="bg-navy-800 text-white border-navy-700">
        <div className="p-6 md:p-8 text-center">
          <h3 className="text-xl md:text-2xl font-serif mb-4">
            Dengan Ridho Allah SWT
          </h3>
          <p className="text-navy-200 leading-relaxed max-w-2xl mx-auto">
            Semoga pernikahan kami menjadi ladang ibadah, saling melengkapi dalam kebaikan, 
            dan mendapat berkah serta ridho dari Allah Subhanahu wa Ta'ala
          </p>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <div className="w-12 h-px bg-navy-400"></div>
            <Heart className="w-5 h-5 text-red-400" />
            <div className="w-12 h-px bg-navy-400"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IslamicQuote;