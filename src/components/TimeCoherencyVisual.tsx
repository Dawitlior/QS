import { useEffect, useState, useRef } from 'react';
import { X, Check } from 'lucide-react';

export default function TimeCoherencyVisual() {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            startAnimation();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startAnimation = () => {
    let currentPhase = 0;
    const interval = setInterval(() => {
      currentPhase = (currentPhase + 1) % 3;
      setPhase(currentPhase);
    }, 3000);

    return () => clearInterval(interval);
  };

  return (
    <div ref={containerRef} className="mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-red-950 bg-opacity-20 border border-red-900">
          <h3 className="text-lg text-red-400 mb-6 font-mono flex items-center space-x-2">
            <X className="w-5 h-5" />
            <span>Temporal Incoherence</span>
          </h3>

          <div className="space-y-4">
            <SignalRow
              label="Short-term Signal"
              period="1-3 days"
              active={phase === 0}
              color="orange"
              failed={true}
            />
            <div className="flex justify-center">
              <div className="w-px h-8 bg-red-600"></div>
            </div>
            <SignalRow
              label="Long-term Position"
              period="60+ days"
              active={phase === 0}
              color="blue"
              failed={true}
            />

            <div className="mt-6 p-4 bg-black bg-opacity-50 border border-red-800">
              <div className="flex items-center space-x-3">
                <X className="w-5 h-5 text-red-500" />
                <p className="text-red-400 text-sm font-mono">Signal Rejected</p>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                Time horizons do not align. No allocation permitted.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-emerald-950 bg-opacity-20 border border-emerald-900">
          <h3 className="text-lg text-emerald-400 mb-6 font-mono flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span>Temporal Coherence</span>
          </h3>

          <div className="space-y-4">
            <SignalRow
              label="Medium-term Signal"
              period="14-30 days"
              active={phase === 1 || phase === 2}
              color="purple"
              failed={false}
            />
            <div className="flex justify-center">
              <div className="w-px h-8 bg-emerald-600 relative overflow-hidden">
                {(phase === 1 || phase === 2) && (
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400 to-transparent animate-pulse"
                    style={{ animation: 'flowDown 1.5s linear infinite' }}
                  ></div>
                )}
              </div>
            </div>
            <SignalRow
              label="Medium-term Position"
              period="14-30 days"
              active={phase === 2}
              color="purple"
              failed={false}
            />

            <div className="mt-6 p-4 bg-black bg-opacity-50 border border-emerald-800">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-emerald-500" />
                <p className="text-emerald-400 text-sm font-mono">Signal Approved</p>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                Time horizons align. Allocation gate opens.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-900 bg-opacity-50 border border-gray-800">
          <p className="text-xs text-gray-500 font-mono mb-2">SHORT-TERM</p>
          <p className="text-white text-sm">1-7 days</p>
        </div>
        <div className="p-4 bg-gray-900 bg-opacity-50 border border-gray-800">
          <p className="text-xs text-gray-500 font-mono mb-2">MEDIUM-TERM</p>
          <p className="text-white text-sm">14-45 days</p>
        </div>
        <div className="p-4 bg-gray-900 bg-opacity-50 border border-gray-800">
          <p className="text-xs text-gray-500 font-mono mb-2">LONG-TERM</p>
          <p className="text-white text-sm">60+ days</p>
        </div>
      </div>

      <style>{`
        @keyframes flowDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}

function SignalRow({
  label,
  period,
  active,
  color,
  failed
}: {
  label: string;
  period: string;
  active: boolean;
  color: string;
  failed: boolean;
}) {
  const colorMap = {
    orange: {
      border: 'border-orange-700',
      bg: 'bg-orange-950',
      text: 'text-orange-400',
      pulse: 'bg-orange-500'
    },
    blue: {
      border: 'border-blue-700',
      bg: 'bg-blue-950',
      text: 'text-blue-400',
      pulse: 'bg-blue-500'
    },
    purple: {
      border: 'border-purple-700',
      bg: 'bg-purple-950',
      text: 'text-purple-400',
      pulse: 'bg-purple-500'
    }
  };

  const colors = colorMap[color as keyof typeof colorMap];

  return (
    <div
      className={`p-4 border ${colors.border} ${colors.bg} bg-opacity-30 transition-all duration-500 relative overflow-hidden ${
        active && !failed ? 'shadow-lg' : failed ? 'opacity-50' : 'opacity-40'
      }`}
    >
      {active && !failed && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-pulse"></div>
      )}
      {failed && (
        <div className="absolute inset-0 bg-red-900 bg-opacity-20"></div>
      )}

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className={`${colors.text} font-mono text-sm font-bold`}>{label}</p>
          <p className="text-gray-600 text-xs font-mono mt-1">{period}</p>
        </div>

        {active && !failed && (
          <div className={`w-3 h-3 ${colors.pulse} rounded-full animate-pulse`}></div>
        )}
        {failed && (
          <X className="w-5 h-5 text-red-600" />
        )}
      </div>
    </div>
  );
}
