import React from 'react';
import { Button } from './ui/button';

const Navigation = ({ sections, activeSection, setActiveSection }) => {
  return (
    <nav className="sticky top-20 z-30 bg-white/90 backdrop-blur-md shadow-sm border-b border-navy-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-3">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            {Object.entries(sections).map(([key, section]) => {
              const IconComponent = section.icon;
              const isActive = activeSection === key;
              
              return (
                <Button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300
                    ${isActive 
                      ? 'bg-navy-600 text-white shadow-md scale-105' 
                      : 'text-navy-600 hover:bg-navy-50 hover:text-navy-700'
                    }
                  `}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-xs md:text-sm font-medium">{section.title}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;