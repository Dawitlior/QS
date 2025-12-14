import { useEffect, useState, useRef } from 'react';

type Signal = 1 | 0 | -1;

interface SystemState {
  name: string;
  signal: Signal;
}

export default function MetaEngineFlow() {
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
      setPhase((prev) => (prev + 1) % 20);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const systems: SystemState[] = [
    { name: 'LTPI', signal: phase % 3 === 0 ? 1 : phase % 3 === 1 ? 0 : -1 },
    { name: 'MTPI', signal: phase % 7 === 0 ? -1 : 1 },
    { name: 'TPI', signal: 1 },
    { name: 'STPI BTC', signal: phase % 4 === 0 ? 1 : phase % 4 === 1 ? -1 : 0 },
    { name: 'STPI ETH', signal: phase % 8 === 0 ? 0 : 1 },
    { name: 'STPI SOL', signal: phase % 5 === 0 ? -1 : 1 },
    { name: 'STPI SUI', signal: phase % 9 === 0 ? -1 : 0 },
    { name: 'Trend Regime', signal: phase % 11 === 0 ? -1 : 1 },
    { name: 'USDT TPI', signal: phase % 6 === 0 ? -1 : 0 },
    { name: 'Others TPI', signal: phase % 10 === 0 ? -1 : 1 }
  ];

  const aggregatedScore = systems.reduce((sum, sys) => sum + sys.signal, 0);
  const normalizedConviction = aggregatedScore / systems.length;

  // STAGE A: Allocation Permission (Binary)
  const allocationPermitted = aggregatedScore > 0;

  // STAGE B: Position Sizing (Meta-Score Bands)
  const getPositionSize = (score: number): number => {
    if (score < 3) return 0;
    if (score >= 3 && score <= 5) return 0.25;
    return 0.5; // score >= 6
  };

  const positionSize = allocationPermitted ? getPositionSize(aggregatedScore) : 0;

  // RS Activation: Only when permitted AND size > 0
  const rsActive = allocationPermitted && positionSize > 0;

  // System State
  const getSystemState = (): 'CASH' | 'PERMITTED' | 'ALLOCATED' => {
    if (!allocationPermitted) return 'CASH';
    if (positionSize === 0) return 'PERMITTED';
    return 'ALLOCATED';
  };

  const systemState = getSystemState();

  // Dynamic asset selection - only when RS is active
  const getSelectedAsset = (): 'BTC' | 'ETH' | 'SOL' | 'SUI' => {
    const rotation = phase % 4;
    if (rotation === 0) return 'BTC';
    if (rotation === 1) return 'ETH';
    if (rotation === 2) return 'SOL';
    return 'SUI';
  };

  const selectedAsset = getSelectedAsset();

  return (
    <div ref={containerRef} className="mt-16 p-4 md:p-8 bg-black border border-gray-900">
      <h3 className="text-xl text-white mb-8 md:mb-12 font-mono">Decision Flow Engine</h3>

      <div className="hidden lg:grid lg:grid-cols-[20%_35%_45%] gap-6 min-h-[600px]">
        <div className="flex flex-col space-y-2.5">
          <h4 className="text-[9px] font-mono text-gray-600 mb-1 tracking-wider">SIGNAL FIELD</h4>
          {systems.map((sys, idx) => (
            <SystemNode key={idx} name={sys.name} signal={sys.signal} />
          ))}
        </div>

        <div className="flex flex-col items-center justify-center space-y-6 border-l border-r border-gray-900 px-6">
          <h4 className="text-[9px] font-mono text-gray-600 tracking-wider">META DECISION ENGINE</h4>
          <MetaScoreBlock
            score={aggregatedScore}
            positionSize={positionSize}
            systemState={systemState}
            active={isVisible}
          />
          <div className={`w-px h-8 bg-gradient-to-b ${
            systemState === 'ALLOCATED' ? 'from-gray-800 via-emerald-600 to-gray-800' :
            systemState === 'PERMITTED' ? 'from-gray-800 via-yellow-600 to-gray-800' :
            'from-gray-800 via-red-600 to-gray-800'
          }`}></div>
          {systemState === 'ALLOCATED' ? (
            <AllocationOutput active={true} asset={selectedAsset} />
          ) : systemState === 'PERMITTED' ? (
            <PermittedState active={true} />
          ) : (
            <CashState active={true} />
          )}
        </div>

        <div className="flex flex-col h-full">
          <h4 className="text-[9px] font-mono text-gray-600 mb-4 tracking-wider">RELATIVE STRENGTH</h4>
          <div className="flex-1 flex items-center justify-center">
            <RatioSelector active={rsActive} selectedAsset={selectedAsset} phase={phase} />
          </div>
        </div>
      </div>

      <div className="hidden md:grid lg:hidden gap-6">
        <div className="grid grid-cols-[40%_60%] gap-6">
          <div className="flex flex-col space-y-2">
            <h4 className="text-[9px] font-mono text-gray-600 mb-1 tracking-wider">SIGNAL FIELD</h4>
            {systems.map((sys, idx) => (
              <SystemNode key={idx} name={sys.name} signal={sys.signal} />
            ))}
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 border-l border-gray-900 pl-6">
            <h4 className="text-[9px] font-mono text-gray-600 tracking-wider">META ENGINE</h4>
            <MetaScoreBlock
              score={aggregatedScore}
              positionSize={positionSize}
              systemState={systemState}
              active={isVisible}
            />
            <div className={`w-px h-6 bg-gradient-to-b ${
              systemState === 'ALLOCATED' ? 'from-gray-800 via-emerald-600 to-gray-800' :
              systemState === 'PERMITTED' ? 'from-gray-800 via-yellow-600 to-gray-800' :
              'from-gray-800 via-red-600 to-gray-800'
            }`}></div>
            {systemState === 'ALLOCATED' ? (
              <AllocationOutput active={true} asset={selectedAsset} />
            ) : systemState === 'PERMITTED' ? (
              <PermittedState active={true} />
            ) : (
              <CashState active={true} />
            )}
          </div>
        </div>
        <div className="w-full border-t border-gray-900 pt-6">
          <h4 className="text-[9px] font-mono text-gray-600 mb-4 tracking-wider">RELATIVE STRENGTH</h4>
          <div className="flex justify-center">
            <RatioSelector active={rsActive} selectedAsset={selectedAsset} phase={phase} />
          </div>
        </div>
      </div>

      <div className="md:hidden flex flex-col space-y-6">
        <div className="space-y-3">
          <h4 className="text-xs font-mono text-gray-500 mb-4">SIGNAL FIELD</h4>
          <div className="grid grid-cols-2 gap-2">
            {systems.map((sys, idx) => (
              <SystemNode key={idx} name={sys.name} signal={sys.signal} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center py-2">
          <div className={`w-px h-12 bg-gradient-to-b ${
            systemState === 'ALLOCATED' ? 'from-gray-800 via-emerald-600 to-gray-800' :
            systemState === 'PERMITTED' ? 'from-gray-800 via-yellow-600 to-gray-800' :
            'from-gray-800 via-red-600 to-gray-800'
          }`}></div>
        </div>

        <div className="flex justify-center">
          <MetaScoreBlock
            score={aggregatedScore}
            positionSize={positionSize}
            systemState={systemState}
            active={isVisible}
          />
        </div>

        {rsActive && (
          <>
            <div className="flex items-center justify-center py-2">
              <div className="w-px h-12 bg-gradient-to-b from-gray-800 via-emerald-600 to-gray-800"></div>
            </div>

            <div className="w-full">
              <h4 className="text-[9px] font-mono text-gray-600 mb-4 tracking-wider">RELATIVE STRENGTH</h4>
              <RatioSelector active={rsActive} selectedAsset={selectedAsset} phase={phase} />
            </div>
          </>
        )}

        <div className="flex items-center justify-center py-2">
          <div className={`w-px h-12 bg-gradient-to-b ${
            systemState === 'ALLOCATED' ? 'from-gray-800 via-emerald-600 to-gray-800' :
            systemState === 'PERMITTED' ? 'from-gray-800 via-yellow-600 to-gray-800' :
            'from-gray-800 via-red-600 to-gray-800'
          }`}></div>
        </div>

        <div className="flex justify-center">
          {systemState === 'ALLOCATED' ? (
            <AllocationOutput active={true} asset={selectedAsset} />
          ) : systemState === 'PERMITTED' ? (
            <PermittedState active={true} />
          ) : (
            <CashState active={true} />
          )}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-xs">
        <div className="p-4 bg-gray-950 border border-gray-900">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-gray-500 font-mono">POSITIVE (+1)</span>
          </div>
          <p className="text-gray-600 text-[11px]">System emits bullish signal, adds to conviction</p>
        </div>
        <div className="p-4 bg-gray-950 border border-gray-900">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-500 font-mono">NEGATIVE (−1)</span>
          </div>
          <p className="text-gray-600 text-[11px]">System emits bearish signal, reduces conviction</p>
        </div>
        <div className="p-4 bg-gray-950 border border-gray-900">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <span className="text-gray-500 font-mono">NEUTRAL (0)</span>
          </div>
          <p className="text-gray-600 text-[11px]">System remains inactive, no contribution</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-950 border border-gray-900">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-gray-600">Meta-Score:</span>
            <span className={`ml-2 ${aggregatedScore > 0 ? 'text-emerald-400' : aggregatedScore < 0 ? 'text-red-400' : 'text-gray-600'}`}>
              {aggregatedScore > 0 ? '+' : ''}{aggregatedScore}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Position Size:</span>
            <span className={`ml-2 ${
              positionSize > 0 ? 'text-emerald-400' : 'text-gray-600'
            }`}>
              {positionSize === 0 ? '0%' : `${(positionSize * 100).toFixed(0)}%`}
            </span>
          </div>
          <div>
            <span className="text-gray-600">RS Network:</span>
            <span className={`ml-2 ${rsActive ? 'text-emerald-400' : 'text-gray-700'}`}>
              {rsActive ? 'ACTIVE' : 'DORMANT'}
            </span>
          </div>
          <div>
            <span className="text-gray-600">State:</span>
            <span className={`ml-2 ${
              systemState === 'ALLOCATED' ? 'text-emerald-400' :
              systemState === 'PERMITTED' ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {systemState}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemNode({ name, signal }: { name: string; signal: Signal }) {
  const color = signal === 1 ? 'emerald' : signal === -1 ? 'red' : 'gray';
  const isActive = signal !== 0;

  return (
    <div
      className={`w-full h-12 border-2 bg-gray-950 transition-all duration-300 ${
        signal === 1 ? 'border-emerald-700' : signal === -1 ? 'border-red-700' : 'border-gray-800'
      }`}
    >
      <div className="h-full flex items-center justify-between px-2.5">
        <p className={`font-mono text-[9px] transition-colors ${
          isActive ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {name}
        </p>
        <div className="flex flex-col items-center">
          {signal === 1 && <div className={`text-${color}-500 text-xs font-bold`}>+1</div>}
          {signal === -1 && <div className={`text-${color}-500 text-xs font-bold`}>−1</div>}
          {signal === 0 && <div className="text-gray-700 text-xs">0</div>}
        </div>
      </div>
    </div>
  );
}

function MetaScoreBlock({ score, positionSize, systemState, active }: {
  score: number;
  positionSize: number;
  systemState: 'CASH' | 'PERMITTED' | 'ALLOCATED';
  active: boolean;
}) {
  const getBorderColor = () => {
    if (!active) return '#1f2937';
    if (systemState === 'CASH') return '#ef4444';
    if (systemState === 'PERMITTED') return '#eab308';
    return '#10b981';
  };

  const getGlowColor = () => {
    if (systemState === 'CASH') return 'rgba(239, 68, 68, 0.3)';
    if (systemState === 'PERMITTED') return 'rgba(234, 179, 8, 0.3)';
    return 'rgba(16, 185, 129, 0.3)';
  };

  return (
    <div
      className="w-40 h-40 border-2 bg-gray-950 transition-all duration-500 relative overflow-hidden"
      style={{
        borderColor: getBorderColor(),
        boxShadow: active && systemState !== 'CASH' ? `0 0 30px ${getGlowColor()}` : 'none'
      }}
    >
      {active && systemState === 'ALLOCATED' && (
        <div
          className="absolute inset-0 bg-emerald-600 transition-all duration-500"
          style={{ opacity: 0.1 }}
        ></div>
      )}
      {active && systemState === 'PERMITTED' && (
        <div
          className="absolute inset-0 bg-yellow-600 transition-all duration-500"
          style={{ opacity: 0.1 }}
        ></div>
      )}
      {active && systemState === 'CASH' && (
        <div
          className="absolute inset-0 bg-red-600 transition-all duration-500"
          style={{ opacity: 0.15 }}
        ></div>
      )}
      <div className="h-full flex flex-col items-center justify-center relative z-10">
        <p className={`font-mono text-[10px] font-bold transition-colors ${
          systemState === 'CASH' ? 'text-red-400' :
          systemState === 'PERMITTED' ? 'text-yellow-400' :
          'text-emerald-400'
        }`}>
          META-SCORE
        </p>
        <p className="text-gray-700 text-[9px] font-mono mt-0.5">ENGINE</p>

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center space-x-1.5 text-[10px] font-mono">
            <span className="text-gray-600">M =</span>
            <span className={score > 0 ? 'text-emerald-400' : score < 0 ? 'text-red-400' : 'text-gray-600'}>
              {score > 0 ? '+' : ''}{score}
            </span>
          </div>
          <div className="flex items-center space-x-1.5 text-[10px] font-mono">
            <span className="text-gray-600">w =</span>
            <span className={positionSize > 0 ? 'text-emerald-400' : 'text-gray-600'}>
              {positionSize === 0 ? '0%' : `${(positionSize * 100).toFixed(0)}%`}
            </span>
          </div>
        </div>

        <div className="mt-3 text-[8px] font-mono text-center">
          {systemState === 'CASH' && <span className="text-red-500">CASH MODE</span>}
          {systemState === 'PERMITTED' && <span className="text-yellow-500">LOW CONVICTION</span>}
          {systemState === 'ALLOCATED' && <span className="text-emerald-500">ALLOCATED</span>}
        </div>
      </div>
    </div>
  );
}

function PermittedState({ active }: { active: boolean }) {
  return (
    <div
      className={`w-36 h-28 border-2 bg-gray-950 transition-all duration-300 ${
        active ? 'border-yellow-600' : 'border-gray-900 opacity-30'
      }`}
    >
      <div className="h-full flex flex-col items-center justify-center px-2">
        <p className={`font-mono text-[10px] font-bold transition-colors ${active ? 'text-yellow-400' : 'text-gray-800'}`}>
          POSITION
        </p>
        <p className={`font-mono text-sm mt-1 transition-colors text-center leading-tight ${active ? 'text-yellow-500' : 'text-gray-900'}`}>
          NO POSITION
        </p>
        <p className={`font-mono text-[8px] mt-1 transition-colors text-center ${active ? 'text-yellow-600' : 'text-gray-900'}`}>
          (LOW CONVICTION)
        </p>
      </div>
    </div>
  );
}

function RatioSelector({ active, selectedAsset, phase }: { active: boolean; selectedAsset: string; phase: number }) {
  const nodes = [
    { id: 'BTC', x: 250, y: 250, isBenchmark: true },
    { id: 'ETH', x: 120, y: 120, isBenchmark: false },
    { id: 'SOL', x: 380, y: 120, isBenchmark: false },
    { id: 'SUI', x: 250, y: 380, isBenchmark: false }
  ];

  const ratioLinks = [
    { from: 'ETH', to: 'BTC', label: 'ETH/BTC' },
    { from: 'SOL', to: 'BTC', label: 'SOL/BTC' },
    { from: 'SOL', to: 'ETH', label: 'SOL/ETH' },
    { from: 'SUI', to: 'BTC', label: 'SUI/BTC' },
    { from: 'SUI', to: 'ETH', label: 'SUI/ETH' },
    { from: 'SUI', to: 'SOL', label: 'SUI/SOL' }
  ];

  const getNodeCoords = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  const isDominant = (nodeId: string) => active && nodeId === selectedAsset;

  const getLinkIntensity = (link: typeof ratioLinks[0], idx: number) => {
    if (!active) return 0;
    const phaseShift = (phase + idx * 3) % 10;
    const baseIntensity = 0.5;
    const pulseIntensity = Math.sin(phaseShift * Math.PI / 5) * 0.4 + 0.6;
    const isDominantLink = link.from === selectedAsset || link.to === selectedAsset;
    return isDominantLink ? pulseIntensity : baseIntensity * pulseIntensity;
  };

  return (
    <div
      className={`w-full h-full min-h-[480px] border-2 bg-gray-950 transition-all duration-500 relative ${
        active ? 'border-emerald-600 shadow-xl shadow-emerald-900/40' : 'border-gray-800 opacity-30'
      }`}
    >
      <div className="absolute top-3 left-3 right-3 z-20">
        <p className={`font-mono text-[10px] font-bold transition-colors ${active ? 'text-emerald-400' : 'text-gray-700'}`}>
          PAIRWISE DOMINANCE NETWORK
        </p>
      </div>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet" style={{ zIndex: 10 }}>
        <defs>
          <filter id="rsGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="dominantGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0">
              <animate attributeName="offset" values="0;1;0" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#10b981" stopOpacity="1">
              <animate attributeName="offset" values="0.5;1.5;0.5" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#10b981" stopOpacity="0">
              <animate attributeName="offset" values="1;2;1" dur="2s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>

        {active && ratioLinks.map((link, idx) => {
          const from = getNodeCoords(link.from);
          const to = getNodeCoords(link.to);
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;
          const intensity = getLinkIntensity(link, idx);
          const isDominantLink = link.from === selectedAsset || link.to === selectedAsset;
          const strokeWidth = isDominantLink ? 2 + intensity * 3 : 1 + intensity * 2;
          const phaseOffset = (idx * 0.5) % 1;

          return (
            <g key={idx}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#10b981"
                strokeWidth={strokeWidth}
                opacity={intensity * 0.5}
                filter={isDominantLink ? "url(#strongGlow)" : "url(#rsGlow)"}
                className="transition-all duration-300"
              />
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#10b981"
                strokeWidth={strokeWidth * 0.5}
                opacity={intensity}
                strokeDasharray={isDominantLink ? "8,4" : "6,3"}
                strokeDashoffset={phaseOffset * 100}
                className="transition-all duration-300"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values={`${phaseOffset * 100};${phaseOffset * 100 - 100}`}
                  dur={isDominantLink ? "1.5s" : "2.5s"}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values={`${intensity};${intensity * 1.3};${intensity}`}
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>
            </g>
          );
        })}

        {!active && ratioLinks.map((link, idx) => {
          const from = getNodeCoords(link.from);
          const to = getNodeCoords(link.to);
          return (
            <line
              key={idx}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#374151"
              strokeWidth="1"
              opacity="0.15"
            />
          );
        })}

        {nodes.map((node, idx) => {
          const dominant = isDominant(node.id);
          const baseRadius = node.isBenchmark ? 18 : 14;
          const radius = dominant ? baseRadius * 1.4 : baseRadius;
          const pulseScale = dominant ? 1 + Math.sin(phase * 0.5) * 0.15 : 1;

          return (
            <g key={idx}>
              {dominant && (
                <>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius * 1.5}
                    fill="#10b981"
                    opacity="0.15"
                    filter="url(#dominantGlow)"
                  >
                    <animate attributeName="r" values={`${radius * 1.3};${radius * 1.8};${radius * 1.3}`} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius * 1.2}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    opacity="0.4"
                  >
                    <animate attributeName="r" values={`${radius};${radius * 1.5};${radius}`} dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </>
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={radius * pulseScale}
                fill={active ? (dominant ? '#10b981' : node.isBenchmark ? '#4b5563' : '#059669') : '#1f2937'}
                stroke={active ? (dominant ? '#34d399' : node.isBenchmark ? '#9ca3af' : '#10b981') : '#374151'}
                strokeWidth={dominant ? 4 : node.isBenchmark ? 3 : 2}
                opacity={active ? 1 : 0.3}
                filter={active ? (dominant ? "url(#dominantGlow)" : "url(#strongGlow)") : undefined}
                className="transition-all duration-300"
              />
              <text
                x={node.x}
                y={node.y + (dominant ? 38 : node.isBenchmark ? 32 : 28)}
                textAnchor="middle"
                className={`text-[11px] font-mono font-bold transition-all duration-300 ${
                  active ? (dominant ? 'fill-emerald-300' : node.isBenchmark ? 'fill-gray-400' : 'fill-emerald-400') : 'fill-gray-800'
                }`}
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>

      {!active && (
        <div className="absolute bottom-4 left-0 right-0 text-center z-20">
          <div className="text-[9px] text-gray-700 font-mono font-bold">DORMANT</div>
        </div>
      )}

      {active && (
        <div className="absolute bottom-4 left-0 right-0 text-center z-20">
          <div className="text-[9px] text-emerald-400 font-mono font-bold">ACTIVE</div>
        </div>
      )}
    </div>
  );
}

function AllocationOutput({ active, asset }: { active: boolean; asset: string }) {
  return (
    <div
      className={`w-32 h-24 border-2 bg-gray-950 transition-all duration-300 ${
        active ? 'border-emerald-500 shadow-lg shadow-emerald-900/40' : 'border-gray-800'
      }`}
    >
      <div className="h-full flex flex-col items-center justify-center">
        <p className={`font-mono text-[10px] font-bold transition-colors ${active ? 'text-emerald-400' : 'text-gray-700'}`}>
          POSITION
        </p>
        <p className={`font-mono text-lg mt-1 transition-colors ${active ? 'text-emerald-300' : 'text-gray-800'}`}>
          {asset}
        </p>
        {active && (
          <div className="mt-2 flex space-x-1">
            <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          </div>
        )}
      </div>
    </div>
  );
}

function CashState({ active }: { active: boolean }) {
  return (
    <div
      className={`w-32 h-24 border-2 bg-gray-950 transition-all duration-300 ${
        active ? 'border-gray-600' : 'border-gray-900 opacity-30'
      }`}
    >
      <div className="h-full flex flex-col items-center justify-center">
        <p className={`font-mono text-[10px] font-bold transition-colors ${active ? 'text-gray-400' : 'text-gray-800'}`}>
          POSITION
        </p>
        <p className={`font-mono text-lg mt-1 transition-colors ${active ? 'text-gray-500' : 'text-gray-900'}`}>
          CASH
        </p>
      </div>
    </div>
  );
}
