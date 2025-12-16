import { useEffect, useState, useRef } from 'react';

interface TournamentBracketProps {
  active: boolean;
}

type Asset = 'ETH' | 'XDC' | 'XLM' | 'LINK' | 'IOTA' | 'DOGE' | 'XRP' | 'BTC';

interface Match {
  asset1: Asset;
  asset2: Asset;
  winner: Asset;
  loser: Asset;
}

export default function TournamentBracket({ active }: TournamentBracketProps) {
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
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !active) return;

    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % 30);
    }, 950);

    return () => clearInterval(interval);
  }, [isVisible, active]);

  const getDominancePattern = (matchIndex: number, phase: number): 0 | 1 => {
    const patterns = [
      [0, 1, 0, 1, 1, 0, 1, 0],
      [1, 0, 1, 0, 0, 1, 0, 1],
      [0, 1, 1, 0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 1, 1, 0],
      [1, 1, 0, 0, 1, 0, 1, 0],
      [0, 0, 1, 1, 0, 1, 0, 1]
    ];
    const patternIndex = Math.floor(phase / 3) % patterns.length;
    return patterns[patternIndex][matchIndex] as 0 | 1;
  };

  const round1Matches: [Asset, Asset][] = [
    ['ETH', 'XDC'],
    ['XLM', 'LINK'],
    ['IOTA', 'DOGE'],
    ['XRP', 'BTC']
  ];

  const round1Results: Match[] = round1Matches.map(([asset1, asset2], idx) => {
    const winnerIndex = getDominancePattern(idx, phase);
    return {
      asset1,
      asset2,
      winner: winnerIndex === 0 ? asset1 : asset2,
      loser: winnerIndex === 0 ? asset2 : asset1
    };
  });

  const round2Matches: [Asset, Asset][] = [
    [round1Results[0].winner, round1Results[1].winner],
    [round1Results[2].winner, round1Results[3].winner]
  ];

  const round2Results: Match[] = round2Matches.map(([asset1, asset2], idx) => {
    const winnerIndex = getDominancePattern(idx + 4, phase);
    return {
      asset1,
      asset2,
      winner: winnerIndex === 0 ? asset1 : asset2,
      loser: winnerIndex === 0 ? asset2 : asset1
    };
  });

  const finalMatch: Match = {
    asset1: round2Results[0].winner,
    asset2: round2Results[1].winner,
    winner: getDominancePattern(6, phase) === 0 ? round2Results[0].winner : round2Results[1].winner,
    loser: getDominancePattern(6, phase) === 0 ? round2Results[1].winner : round2Results[0].winner
  };

  const champion = finalMatch.winner;

  const pulseIntensity = Math.sin(phase * 0.3) * 0.3 + 0.7;

  return (
    <div ref={containerRef} className="mt-16 p-4 md:p-8 bg-black border border-gray-900 w-full overflow-hidden">
      <div className="mb-8">
        <h3 className="text-lg sm:text-xl text-white mb-6 font-mono">RSPS ALTS — Tournament Allocation</h3>

        <div className="mb-6 p-6 bg-gray-950 border border-gray-800">
          <h4 className="text-xs text-gray-500 font-mono mb-3 tracking-wider">WHY A RELATIVE STRENGTH TOURNAMENT EXISTS</h4>
          <div className="space-y-2 text-sm text-gray-400 leading-relaxed">
            <p>This layer is activated only after market conditions permit allocation.</p>
            <p>Capital is not spread — it is concentrated into the strongest asset.</p>
            <p>
              The tournament selects one dominant asset for a fixed{' '}
              <span className="text-orange-400 font-bold" style={{ textShadow: '0 0 8px rgba(251, 146, 60, 0.4)' }}>15%</span>
              {' '}capital allocation.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-[9px] font-mono text-gray-600">
          <span className="text-emerald-400">LOW</span>
          <span>→</span>
          <span className="text-emerald-300">CONSERVATIVE</span>
          <span>→</span>
          <span className="text-yellow-400">EFFECTIVE</span>
          <span>→</span>
          <span className="text-orange-400">AGGRESSIVE</span>
        </div>
      </div>

      {!active && (
        <div className="min-h-[600px] flex items-center justify-center border-2 border-gray-900 bg-gray-950">
          <div className="text-center">
            <p className="text-gray-700 font-mono text-sm">TOURNAMENT DORMANT</p>
            <p className="text-gray-800 font-mono text-[10px] mt-2">CASH / NO POSITION</p>
          </div>
        </div>
      )}

      {active && (
        <div className="relative min-h-[400px] sm:min-h-[600px] border-2 border-emerald-900 bg-gray-950 overflow-x-auto" style={{
          boxShadow: isVisible ? '0 0 40px rgba(16, 185, 129, 0.2)' : 'none'
        }}>
          <svg className="w-full h-full min-h-[400px] sm:min-h-[600px]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet" style={{ minWidth: '800px' }}>
            <defs>
              <filter id="bracketGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="winnerGlow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="championGlow">
                <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* ROUND 1 */}
            {round1Matches.map((match, idx) => {
              const yBase = 75 + idx * 135;
              const result = round1Results[idx];
              const isWinner1 = result.winner === result.asset1;

              return (
                <g key={`r1-${idx}`}>
                  {/* Asset 1 */}
                  <circle
                    cx={80}
                    cy={yBase}
                    r={isWinner1 ? 16 : 12}
                    fill={isWinner1 ? '#10b981' : '#374151'}
                    stroke={isWinner1 ? '#34d399' : '#4b5563'}
                    strokeWidth={isWinner1 ? 3 : 2}
                    opacity={isWinner1 ? 1 : 0.4}
                    filter={isWinner1 ? "url(#bracketGlow)" : undefined}
                  />
                  <text
                    x={80}
                    y={yBase + 30}
                    textAnchor="middle"
                    className="text-[11px] font-mono font-bold"
                    fill={isWinner1 ? '#10b981' : '#6b7280'}
                  >
                    {match[0]}
                  </text>

                  {/* Asset 2 */}
                  <circle
                    cx={80}
                    cy={yBase + 50}
                    r={!isWinner1 ? 16 : 12}
                    fill={!isWinner1 ? '#10b981' : '#374151'}
                    stroke={!isWinner1 ? '#34d399' : '#4b5563'}
                    strokeWidth={!isWinner1 ? 3 : 2}
                    opacity={!isWinner1 ? 1 : 0.4}
                    filter={!isWinner1 ? "url(#bracketGlow)" : undefined}
                  />
                  <text
                    x={80}
                    y={yBase + 80}
                    textAnchor="middle"
                    className="text-[11px] font-mono font-bold"
                    fill={!isWinner1 ? '#10b981' : '#6b7280'}
                  >
                    {match[1]}
                  </text>

                  {/* Connection to bracket */}
                  <line
                    x1={isWinner1 ? 95 : 95}
                    y1={isWinner1 ? yBase : yBase + 50}
                    x2={200}
                    y2={yBase + 25}
                    stroke="#10b981"
                    strokeWidth={3}
                    opacity={0.6}
                    filter="url(#bracketGlow)"
                  >
                    <animate
                      attributeName="stroke-width"
                      values="3;5;3"
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </line>

                  {/* Loser fade line */}
                  <line
                    x1={!isWinner1 ? 95 : 95}
                    y1={!isWinner1 ? yBase : yBase + 50}
                    x2={150}
                    y2={!isWinner1 ? yBase : yBase + 50}
                    stroke="#ef4444"
                    strokeWidth={1}
                    opacity={0.3}
                    strokeDasharray="4,2"
                  />

                  {/* Match bracket */}
                  <rect
                    x={200}
                    y={yBase + 10}
                    width={80}
                    height={30}
                    fill="#1f2937"
                    stroke="#10b981"
                    strokeWidth={2}
                    opacity={0.8}
                    filter="url(#bracketGlow)"
                  />
                  <text
                    x={240}
                    y={yBase + 30}
                    textAnchor="middle"
                    className="text-[10px] font-mono font-bold"
                    fill="#10b981"
                  >
                    {result.winner}
                  </text>
                </g>
              );
            })}

            {/* ROUND 2 */}
            {round2Matches.map((match, idx) => {
              const yBase = 150 + idx * 270;
              const result = round2Results[idx];
              const isWinner1 = result.winner === result.asset1;

              return (
                <g key={`r2-${idx}`}>
                  {/* From R1 bracket 1 */}
                  <line
                    x1={280}
                    y1={idx === 0 ? 100 : 370}
                    x2={450}
                    y2={yBase}
                    stroke="#10b981"
                    strokeWidth={4}
                    opacity={0.7}
                    filter="url(#bracketGlow)"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.5;0.9;0.5"
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </line>

                  {/* From R1 bracket 2 */}
                  <line
                    x1={280}
                    y1={idx === 0 ? 235 : 505}
                    x2={450}
                    y2={yBase}
                    stroke="#10b981"
                    strokeWidth={4}
                    opacity={0.7}
                    filter="url(#bracketGlow)"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.5;0.9;0.5"
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </line>

                  {/* Semi-final bracket */}
                  <rect
                    x={450}
                    y={yBase - 25}
                    width={100}
                    height={50}
                    fill="#1f2937"
                    stroke="#10b981"
                    strokeWidth={3}
                    opacity={0.9}
                    filter="url(#winnerGlow)"
                  />
                  <text
                    x={500}
                    y={yBase + 5}
                    textAnchor="middle"
                    className="text-[12px] font-mono font-bold"
                    fill="#10b981"
                  >
                    {result.winner}
                  </text>
                </g>
              );
            })}

            {/* FINAL ROUND */}
            <line
              x1={550}
              y1={150}
              x2={750}
              y2={280}
              stroke="#10b981"
              strokeWidth={6}
              opacity={0.8}
              filter="url(#winnerGlow)"
            >
              <animate
                attributeName="stroke-width"
                values="6;9;6"
                dur="0.9s"
                repeatCount="indefinite"
              />
            </line>

            <line
              x1={550}
              y1={420}
              x2={750}
              y2={320}
              stroke="#10b981"
              strokeWidth={6}
              opacity={0.8}
              filter="url(#winnerGlow)"
            >
              <animate
                attributeName="stroke-width"
                values="6;9;6"
                dur="0.9s"
                repeatCount="indefinite"
              />
            </line>

            {/* Final bracket */}
            <rect
              x={750}
              y={270}
              width={120}
              height={60}
              fill="#1f2937"
              stroke="#f59e0b"
              strokeWidth={4}
              opacity={0.95}
              filter="url(#winnerGlow)"
            />
            <text
              x={810}
              y={305}
              textAnchor="middle"
              className="text-[14px] font-mono font-bold"
              fill="#f59e0b"
            >
              {champion}
            </text>

            {/* CHAMPION */}
            <line
              x1={870}
              y1={300}
              x2={1000}
              y2={300}
              stroke="#f59e0b"
              strokeWidth={8}
              opacity={pulseIntensity}
              filter="url(#championGlow)"
            >
              <animate
                attributeName="stroke-width"
                values="8;12;8"
                dur="0.7s"
                repeatCount="indefinite"
              />
            </line>

            <circle
              cx={1050}
              cy={300}
              r={40}
              fill="#ea580c"
              stroke="#f59e0b"
              strokeWidth={5}
              opacity={pulseIntensity}
              filter="url(#championGlow)"
            >
              <animate
                attributeName="r"
                values="40;45;40"
                dur="0.9s"
                repeatCount="indefinite"
              />
            </circle>

            <circle
              cx={1050}
              cy={300}
              r={55}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={2}
              opacity={0.4}
            >
              <animate
                attributeName="r"
                values="50;70;50"
                dur="1.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;0.1;0.6"
                dur="1.2s"
                repeatCount="indefinite"
              />
            </circle>

            <text
              x={1050}
              y={310}
              textAnchor="middle"
              className="text-[18px] font-mono font-bold"
              fill="#fff"
            >
              {champion}
            </text>

            <text
              x={1050}
              y={350}
              textAnchor="middle"
              className="text-[9px] font-mono"
              fill="#9ca3af"
            >
              Final Allocation:
            </text>
            <text
              x={1050}
              y={365}
              textAnchor="middle"
              className="text-[11px] font-mono font-bold"
              fill="#f59e0b"
              filter="url(#bracketGlow)"
            >
              15% of Portfolio
            </text>

            {/* Round labels */}
            <text x={140} y={40} className="text-[10px] font-mono" fill="#6b7280">ROUND 1</text>
            <text x={450} y={40} className="text-[10px] font-mono" fill="#6b7280">ROUND 2</text>
            <text x={780} y={40} className="text-[10px] font-mono" fill="#6b7280">FINAL</text>
            <text x={1020} y={40} className="text-[10px] font-mono" fill="#f59e0b">CHAMPION</text>
          </svg>
        </div>
      )}
    </div>
  );
}
