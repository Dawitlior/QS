import { useEffect, useState } from 'react';

interface TimelineNavProps {
  activeSection: string;
}

const sections = [
  { id: 'opening', label: 'Opening', number: '00' },
  { id: 'problem', label: 'Problem', number: '01' },
  { id: 'rationale', label: 'Rationale', number: '02' },
  { id: 'time-coherency', label: 'Time Coherency', number: '03' },
  { id: 'thesis', label: 'Thesis', number: '04' },
  { id: 'meta-engine', label: 'Meta Engine', number: '05' },
  { id: 'quantitative', label: 'Quantitative', number: '06' },
  { id: 'performance', label: 'Performance', number: '07' },
  { id: 'systems', label: 'Systems', number: '08' },
  { id: 'aggregation', label: 'Aggregation', number: '09' },
  { id: 'constraints', label: 'Constraints', number: '10' },
  { id: 'disclaimer', label: 'Disclaimer', number: '11' }
];

export default function TimelineNav({ activeSection }: TimelineNavProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeIndex = sections.findIndex(s => s.id === activeSection);

  return (
    <div className="fixed left-8 top-0 bottom-0 z-50 hidden lg:flex items-center">
      <div className="relative h-[80vh] flex flex-col justify-between">
        <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-gray-800">
          <div
            className="w-full bg-gradient-to-b from-cyan-500 to-purple-600 transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress}%` }}
          ></div>
        </div>

        {sections.map((section, idx) => {
          const isActive = section.id === activeSection;
          const isPassed = idx < activeIndex;

          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="relative group z-10"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      isActive
                        ? 'border-cyan-500 bg-cyan-500 bg-opacity-20 shadow-lg shadow-cyan-500/50'
                        : isPassed
                        ? 'border-cyan-600 bg-cyan-600'
                        : 'border-gray-700 bg-black'
                    }`}
                  >
                    {isPassed ? (
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    ) : (
                      <span
                        className={`text-xs font-mono ${
                          isActive ? 'text-cyan-400' : 'text-gray-600'
                        }`}
                      >
                        {section.number}
                      </span>
                    )}
                  </div>

                  {isActive && (
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-500 animate-ping opacity-75"></div>
                  )}
                </div>

                <div
                  className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : ''
                  }`}
                >
                  <div className="bg-black bg-opacity-90 border border-gray-800 px-3 py-2 rounded whitespace-nowrap">
                    <p
                      className={`text-xs font-mono ${
                        isActive ? 'text-cyan-400' : 'text-gray-400'
                      }`}
                    >
                      {section.label}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="absolute -top-20 left-0">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
          <span className="text-white font-mono text-sm tracking-wider">FRAMEWORK</span>
        </div>
      </div>
    </div>
  );
}
