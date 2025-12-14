import { useEffect, useState, useRef } from 'react';

export default function SignalConflictVisual() {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % 12);
    }, 800);

    return () => clearInterval(interval);
  }, [isVisible]);

  const system1Signal = phase % 3 === 0 ? 1 : phase % 3 === 1 ? -1 : 0;
  const system2Signal = phase % 4 === 0 ? 1 : phase % 4 === 2 ? -1 : 0;
  const system3Signal = phase % 5 === 0 ? 1 : phase % 5 === 3 ? -1 : 0;
  const system4Signal = Math.floor(phase / 3) % 2 === 0 ? 1 : -1;

  const allPositive = system1Signal === 1 && system2Signal === 1 && system3Signal === 1 && system4Signal === 1;
  const conflicted = (system1Signal > 0 && system2Signal < 0) ||
                     (system1Signal < 0 && system2Signal > 0) ||
                     (system3Signal > 0 && system4Signal < 0) ||
                     (system3Signal < 0 && system4Signal > 0);

  return (
    <div ref={containerRef} className="mt-12 p-8 bg-gray-950 border border-gray-900">
      <div className="relative" style={{ height: '400px' }}>
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <defs>
            <filter id="glowSignal">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <line x1="150" y1="80" x2="400" y2="200" stroke="#1f2937" strokeWidth="1" />
          <line x1="150" y1="160" x2="400" y2="200" stroke="#1f2937" strokeWidth="1" />
          <line x1="150" y1="240" x2="400" y2="200" stroke="#1f2937" strokeWidth="1" />
          <line x1="150" y1="320" x2="400" y2="200" stroke="#1f2937" strokeWidth="1" />

          {system1Signal !== 0 && (
            <line
              x1="150"
              y1="80"
              x2="400"
              y2="200"
              stroke={system1Signal > 0 ? '#10b981' : '#ef4444'}
              strokeWidth="2"
              opacity="0.6"
              filter="url(#glowSignal)"
            />
          )}

          {system2Signal !== 0 && (
            <line
              x1="150"
              y1="160"
              x2="400"
              y2="200"
              stroke={system2Signal > 0 ? '#10b981' : '#ef4444'}
              strokeWidth="2"
              opacity="0.6"
              filter="url(#glowSignal)"
            />
          )}

          {system3Signal !== 0 && (
            <line
              x1="150"
              y1="240"
              x2="400"
              y2="200"
              stroke={system3Signal > 0 ? '#10b981' : '#ef4444'}
              strokeWidth="2"
              opacity="0.6"
              filter="url(#glowSignal)"
            />
          )}

          {system4Signal !== 0 && (
            <line
              x1="150"
              y1="320"
              x2="400"
              y2="200"
              stroke={system4Signal > 0 ? '#10b981' : '#ef4444'}
              strokeWidth="2"
              opacity="0.6"
              filter="url(#glowSignal)"
            />
          )}

          <line x1="500" y1="200" x2="700" y2="200" stroke="#1f2937" strokeWidth="2" />

          {allPositive && (
            <line
              x1="500"
              y1="200"
              x2="700"
              y2="200"
              stroke="#10b981"
              strokeWidth="4"
              filter="url(#glowSignal)"
            />
          )}

          {conflicted && !allPositive && (
            <>
              <line x1="550" y1="180" x2="650" y2="220" stroke="#ef4444" strokeWidth="1" opacity="0.4" />
              <line x1="550" y1="220" x2="650" y2="180" stroke="#ef4444" strokeWidth="1" opacity="0.4" />
            </>
          )}
        </svg>

        <div className="relative z-10">
          <div className="absolute" style={{ left: '20px', top: '50px' }}>
            <SignalNode label="System A" signal={system1Signal} />
          </div>

          <div className="absolute" style={{ left: '20px', top: '130px' }}>
            <SignalNode label="System B" signal={system2Signal} />
          </div>

          <div className="absolute" style={{ left: '20px', top: '210px' }}>
            <SignalNode label="System C" signal={system3Signal} />
          </div>

          <div className="absolute" style={{ left: '20px', top: '290px' }}>
            <SignalNode label="System D" signal={system4Signal} />
          </div>

          <div className="absolute" style={{ left: '400px', top: '160px' }}>
            <AggregationZone
              conflicted={conflicted && !allPositive}
              aligned={allPositive}
            />
          </div>

          <div className="absolute" style={{ left: '700px', top: '170px' }}>
            <OutputNode active={allPositive} />
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div className="p-4 bg-black bg-opacity-50 border border-gray-800">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-gray-500 text-xs font-mono">ALIGNED SIGNALS</span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed">
            When systems agree, signals reinforce and flow proceeds
          </p>
        </div>

        <div className="p-4 bg-black bg-opacity-50 border border-gray-800">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-500 text-xs font-mono">CONFLICTED SIGNALS</span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed">
            When systems disagree, signals cancel and no action occurs
          </p>
        </div>

        <div className="p-4 bg-black bg-opacity-50 border border-gray-800">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <span className="text-gray-500 text-xs font-mono">NO SIGNAL</span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed">
            Systems may remain neutral when conditions are unclear
          </p>
        </div>
      </div>
    </div>
  );
}

function SignalNode({ label, signal }: { label: string; signal: number }) {
  return (
    <div
      className={`w-24 h-12 border-2 bg-gray-950 transition-all duration-300 ${
        signal > 0 ? 'border-emerald-700' : signal < 0 ? 'border-red-700' : 'border-gray-800'
      }`}
    >
      <div className="h-full flex flex-col items-center justify-center">
        <p className={`font-mono text-[10px] transition-colors ${
          signal !== 0 ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {label}
        </p>
        {signal > 0 && <div className="mt-1 text-emerald-500 text-xs">+</div>}
        {signal < 0 && <div className="mt-1 text-red-500 text-xs">−</div>}
        {signal === 0 && <div className="mt-1 text-gray-800 text-xs">—</div>}
      </div>
    </div>
  );
}

function AggregationZone({ conflicted, aligned }: { conflicted: boolean; aligned: boolean }) {
  return (
    <div
      className={`w-36 h-20 border-2 bg-gray-950 transition-all duration-500 ${
        aligned ? 'border-emerald-600' : conflicted ? 'border-red-800' : 'border-gray-800'
      }`}
    >
      <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
        {aligned && (
          <div className="absolute inset-0 bg-emerald-600 opacity-10"></div>
        )}
        {conflicted && (
          <div className="absolute inset-0 bg-red-900 opacity-10"></div>
        )}
        <p className={`font-mono text-[10px] transition-colors ${
          aligned ? 'text-emerald-400' : conflicted ? 'text-red-400' : 'text-gray-700'
        }`}>
          AGGREGATION
        </p>
        {aligned && (
          <div className="mt-2 text-emerald-500 text-xs font-mono">CONSENSUS</div>
        )}
        {conflicted && (
          <div className="mt-2 text-red-500 text-xs font-mono">CONFLICT</div>
        )}
        {!aligned && !conflicted && (
          <div className="mt-2 text-gray-700 text-xs font-mono">STANDBY</div>
        )}
      </div>
    </div>
  );
}

function OutputNode({ active }: { active: boolean }) {
  return (
    <div
      className={`w-28 h-16 border-2 bg-gray-950 transition-all duration-300 ${
        active ? 'border-emerald-500 shadow-lg shadow-emerald-900/40' : 'border-gray-900 opacity-30'
      }`}
    >
      <div className="h-full flex flex-col items-center justify-center">
        <p className={`font-mono text-[10px] transition-colors ${active ? 'text-emerald-400' : 'text-gray-800'}`}>
          OUTPUT
        </p>
        {active ? (
          <div className="mt-1 text-emerald-500 text-xs font-mono">ACTIVE</div>
        ) : (
          <div className="mt-1 text-gray-800 text-xs">—</div>
        )}
      </div>
    </div>
  );
}
