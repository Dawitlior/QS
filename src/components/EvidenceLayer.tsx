import { useEffect, useState, useRef } from 'react';

function EvidenceLayer() {
  const [visible, setVisible] = useState(false);
  const [retailCount, setRetailCount] = useState(0);
  const [underperformCount, setUnderperformCount] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const retailInterval = setInterval(() => {
      setRetailCount((prev) => {
        if (prev >= 90) {
          clearInterval(retailInterval);
          return 90;
        }
        return prev + 1;
      });
    }, 30);

    const underperformInterval = setInterval(() => {
      setUnderperformCount((prev) => {
        if (prev >= 80) {
          clearInterval(underperformInterval);
          return 80;
        }
        return prev + 1;
      });
    }, 35);

    return () => {
      clearInterval(retailInterval);
      clearInterval(underperformInterval);
    };
  }, [visible]);

  return (
    <section id="evidence" className="min-h-screen flex flex-col justify-center mb-32" ref={sectionRef}>
      <div className="space-y-8">
        <div className="inline-block px-4 py-2 bg-gray-800 bg-opacity-30 border border-gray-700 rounded text-gray-400 text-sm font-mono tracking-wider">
          STRUCTURAL ANALYSIS
        </div>
        <h1 className="text-5xl font-light tracking-tight leading-tight text-white max-w-5xl">
          Financial Markets Are Not Random.<br />
          They Are Competitive Information Systems.
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-gray-600 to-transparent"></div>

        <div className="text-sm text-gray-500 tracking-wide mt-8">
          Capital flows toward those who know earlier — not those who guess better.
        </div>

        <div className="mt-20 space-y-16">
          <div className="space-y-8 max-w-4xl">
            <p className="text-2xl font-light text-white leading-relaxed">
              Markets are not driven by opinions.<br />
              They are driven by information asymmetry.
            </p>

            <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
              <p>
                Financial markets are systems for processing information.<br />
                Every price move represents: who knew, when they knew, and how much capital acted on it.
              </p>

              <p className="text-white">
                Information is not distributed evenly.
              </p>

              <p>
                A small group — institutions, funds, market makers, and specialized actors — has access to:
              </p>

              <div className="pl-8 space-y-2 text-gray-300">
                <div className="flex items-start space-x-3">
                  <div className="w-1 h-1 bg-gray-600 rounded-full mt-3 flex-shrink-0"></div>
                  <span>earlier data</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1 h-1 bg-gray-600 rounded-full mt-3 flex-shrink-0"></div>
                  <span>faster execution</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1 h-1 bg-gray-600 rounded-full mt-3 flex-shrink-0"></div>
                  <span>deeper context</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1 h-1 bg-gray-600 rounded-full mt-3 flex-shrink-0"></div>
                  <span>superior infrastructure</span>
                </div>
              </div>

              <p className="pt-4">
                The majority operates after the fact.
              </p>

              <p>
                By the time information becomes visible, narrativized, discussed, charted —
                it has already been priced in.
              </p>

              <p className="text-white pt-4">
                For a non-institutional participant, the probability of consistently knowing something
                before the market is negligible.
              </p>

              <p>
                This is not a flaw in intelligence.<br />
                It is a structural imbalance.
              </p>
            </div>
          </div>

          <div className="mt-24 relative w-full h-96 bg-black bg-opacity-40 border border-gray-800 overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-2 divide-x divide-gray-800">
              <div className="relative p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-xs font-mono text-gray-600 tracking-wider">INSTITUTIONAL LAYER</div>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div>Institutions</div>
                    <div>Liquidity Providers</div>
                    <div>Infrastructure</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="h-px bg-gradient-to-r from-blue-600 via-blue-500 to-transparent"
                      style={{
                        width: `${60 + Math.random() * 40}%`,
                        opacity: 0.3 + Math.random() * 0.4,
                        animation: visible ? `flowLeft ${1.5 + Math.random()}s ease-in-out infinite ${Math.random() * 2}s` : 'none'
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="relative p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-xs font-mono text-gray-600 tracking-wider">PUBLIC LAYER</div>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div>Retail</div>
                    <div>Narrative</div>
                    <div>Visible Data</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="h-px bg-gradient-to-r from-transparent via-gray-600 to-gray-700"
                      style={{
                        width: `${40 + Math.random() * 30}%`,
                        opacity: 0.2 + Math.random() * 0.2,
                        animation: visible ? `flowRight ${2 + Math.random()}s ease-in-out infinite ${Math.random() * 2 + 1}s` : 'none'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="text-center space-y-2">
                <svg width="60" height="40" className="mx-auto opacity-40">
                  <path
                    d="M 5 20 L 55 20"
                    stroke="rgba(200, 200, 200, 0.3)"
                    strokeWidth="1"
                    markerEnd="url(#delayArrow)"
                  />
                  <defs>
                    <marker
                      id="delayArrow"
                      markerWidth="8"
                      markerHeight="8"
                      refX="6"
                      refY="4"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 8 4, 0 8"
                        fill="rgba(200, 200, 200, 0.3)"
                      />
                    </marker>
                  </defs>
                </svg>
                <div className="text-xs font-mono text-gray-600 tracking-wider">TIME LAG</div>
                <div className="text-[10px] text-gray-700 max-w-[120px]">
                  Information reaches right after price has moved
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 space-y-12">
            <div className="text-center">
              <p className="text-2xl font-light text-white tracking-tight">
                The outcome is statistically predictable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative p-8 bg-gray-900 bg-opacity-30 border border-gray-800 hover:border-gray-700 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-red-950 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                    <div className="flex-1">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-5xl font-light text-red-400 font-mono">
                          ~{retailCount}
                        </span>
                        <span className="text-3xl font-light text-red-400 font-mono">%</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-4 leading-relaxed">
                        lose money over time
                      </p>
                      <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                        Across equities, derivatives, crypto
                      </p>
                    </div>
                  </div>

                  <div className="relative h-2 bg-black bg-opacity-50 rounded overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-900 to-red-700 transition-all duration-1000"
                      style={{ width: visible ? '90%' : '0%' }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="group relative p-8 bg-gray-900 bg-opacity-30 border border-gray-800 hover:border-gray-700 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-950 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-5xl font-light text-orange-400 font-mono">
                          {underperformCount}+
                        </span>
                        <span className="text-3xl font-light text-orange-400 font-mono">%</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-4 leading-relaxed">
                        underperform benchmarks within 2–3 years
                      </p>
                      <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                        Even during bullish regimes
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-gray-600">Benchmark</span>
                      <div className="h-px flex-1 mx-3 bg-gray-700"></div>
                      <span className="text-gray-500">Steady</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-gray-600">Retail</span>
                      <div className="h-px flex-1 mx-3 bg-gradient-to-r from-orange-900 to-transparent"></div>
                      <span className="text-orange-600">Fades</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative p-8 bg-gray-900 bg-opacity-30 border border-gray-800 hover:border-gray-700 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-2xl font-light text-gray-300 mb-4 leading-tight">
                        Costs + timing errors
                      </p>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        compound negatively
                      </p>
                      <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                        Small inefficiencies become structural
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 mt-6">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <div
                        key={i}
                        className="h-1 bg-gradient-to-r from-red-900 to-transparent rounded"
                        style={{
                          width: `${100 - i * 15}%`,
                          opacity: 0.3 + i * 0.1
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-32 mb-16">
            <div className="text-center space-y-8">
              <p className="text-3xl font-light text-white tracking-tight leading-relaxed max-w-4xl mx-auto">
                In an asymmetric information system,<br />
                reaction is not a strategy.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes flowLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateX(150%);
            opacity: 0;
          }
        }

        @keyframes flowRight {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateX(120%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}

export default EvidenceLayer;
