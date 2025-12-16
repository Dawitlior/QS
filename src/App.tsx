import { useState, useEffect } from 'react';
import { ChevronRight, TrendingUp, Shield, Activity, Network, Lock } from 'lucide-react';
import PerformanceMetrics from './components/PerformanceMetrics';
import MetaEngineFlow from './components/MetaEngineFlow';
import TimelineNav from './components/TimelineNav';
import PerformanceChart from './components/PerformanceChart';
import TimeCoherencyVisual from './components/TimeCoherencyVisual';
import QuantitativeScoring from './components/QuantitativeScoring';
import SignalConflictVisual from './components/SignalConflictVisual';
import TournamentBracket from './components/TournamentBracket';
import EvidenceLayer from './components/EvidenceLayer';

function App() {
  const [activeSection, setActiveSection] = useState('opening');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <TimelineNav activeSection={activeSection} />

      <section id="opening" className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
        {/* Signal Storm Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 1200 800"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Grid that fades in during Phase 2 */}
            <defs>
              <pattern id="constraintGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="60" stroke="rgba(100, 200, 200, 0.15)" strokeWidth="1" />
                <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(100, 200, 200, 0.15)" strokeWidth="1" />
              </pattern>
            </defs>

            <rect
              width="1200"
              height="800"
              fill="url(#constraintGrid)"
              opacity="0"
              style={{ animation: 'gridConstraint 15s ease-in-out infinite' }}
            />

            {/* Signal Lines - Chaos to Order */}
            {/* Top signals */}
            <path
              d="M 0 150 Q 300 120, 600 140 T 1200 130"
              fill="none"
              stroke="rgba(255, 200, 200, 0.4)"
              strokeWidth="1.5"
              style={{ animation: 'signalChaos1 15s ease-in-out infinite' }}
            />
            <path
              d="M 0 180 Q 250 200, 500 170 T 1200 185"
              fill="none"
              stroke="rgba(240, 240, 240, 0.3)"
              strokeWidth="1"
              style={{ animation: 'signalChaos2 15s ease-in-out infinite' }}
            />
            <path
              d="M 0 210 Q 350 190, 700 215 T 1200 200"
              fill="none"
              stroke="rgba(255, 180, 180, 0.35)"
              strokeWidth="1.2"
              style={{ animation: 'signalChaos3 15s ease-in-out infinite' }}
            />

            {/* Middle signals */}
            <path
              d="M 0 350 Q 300 380, 600 340 T 1200 360"
              fill="none"
              stroke="rgba(240, 240, 240, 0.4)"
              strokeWidth="1.5"
              style={{ animation: 'signalChaos4 15s ease-in-out infinite' }}
            />
            <path
              d="M 0 400 Q 250 420, 500 390 T 1200 400"
              fill="none"
              stroke="rgba(200, 240, 240, 0.3)"
              strokeWidth="1"
              style={{ animation: 'signalChaos5 15s ease-in-out infinite' }}
            />
            <path
              d="M 0 450 Q 350 430, 700 460 T 1200 440"
              fill="none"
              stroke="rgba(255, 200, 200, 0.35)"
              strokeWidth="1.2"
              style={{ animation: 'signalChaos6 15s ease-in-out infinite' }}
            />

            {/* Bottom signals */}
            <path
              d="M 0 600 Q 300 630, 600 590 T 1200 610"
              fill="none"
              stroke="rgba(240, 240, 240, 0.3)"
              strokeWidth="1"
              style={{ animation: 'signalChaos7 15s ease-in-out infinite' }}
            />
            <path
              d="M 0 650 Q 250 640, 500 665 T 1200 650"
              fill="none"
              stroke="rgba(180, 230, 230, 0.35)"
              strokeWidth="1.2"
              style={{ animation: 'signalChaos8 15s ease-in-out infinite' }}
            />

            {/* Pulse signals - horizontal */}
            <line
              x1="0"
              y1="280"
              x2="1200"
              y2="280"
              stroke="rgba(200, 240, 240, 0.2)"
              strokeWidth="1"
              style={{ animation: 'signalPulse1 15s ease-in-out infinite' }}
            />
            <line
              x1="0"
              y1="520"
              x2="1200"
              y2="520"
              stroke="rgba(180, 220, 220, 0.25)"
              strokeWidth="1"
              style={{ animation: 'signalPulse2 15s ease-in-out infinite' }}
            />

            {/* Vertical drift signals */}
            <line
              x1="300"
              y1="0"
              x2="300"
              y2="800"
              stroke="rgba(240, 240, 240, 0.15)"
              strokeWidth="1"
              strokeDasharray="4 4"
              style={{ animation: 'verticalDrift1 15s ease-in-out infinite' }}
            />
            <line
              x1="700"
              y1="0"
              x2="700"
              y2="800"
              stroke="rgba(200, 240, 240, 0.15)"
              strokeWidth="1"
              strokeDasharray="4 4"
              style={{ animation: 'verticalDrift2 15s ease-in-out infinite' }}
            />
            <line
              x1="900"
              y1="0"
              x2="900"
              y2="800"
              stroke="rgba(220, 240, 240, 0.15)"
              strokeWidth="1"
              strokeDasharray="4 4"
              style={{ animation: 'verticalDrift3 15s ease-in-out infinite' }}
            />
          </svg>
        </div>

        {/* Text Overlay */}
        <div className="relative z-10 text-center space-y-8 px-6">
          <p
            className="text-xs tracking-[0.3em] uppercase text-gray-500 font-light"
            style={{ animation: 'textFadeIn 1s ease-out 2s both' }}
          >
            Markets are random
          </p>

          <p
            className="text-4xl md:text-5xl font-light text-gray-300 tracking-tight"
            style={{ animation: 'textFadeIn 1s ease-out 2.8s both' }}
          >
            And that's why
          </p>

          <p
            className="text-6xl md:text-8xl font-light text-white tracking-tight"
            style={{ animation: 'textFadeIn 1.2s ease-out 5.5s both' }}
          >
            Without structure
          </p>

          <p
            className="text-xs tracking-wider text-gray-600 font-light mt-12"
            style={{ animation: 'textFadeIn 1s ease-out 10s both' }}
          >
            Entropy increases. Structure decides.
          </p>
        </div>
      </section>

      {/* Design Dossier Transition - Hero-bound only */}
      <div className="w-full border-t border-gray-900 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-6xl mx-auto">
          <a
            href="https://dossierquant.netlify.app/"
            className="group block w-full py-6 md:py-8 px-4 md:px-12 bg-gradient-to-r from-cyan-950/30 via-emerald-950/30 to-cyan-950/30 border-b border-cyan-900/30 hover:border-cyan-700/50 hover:from-cyan-950/50 hover:via-emerald-950/50 hover:to-cyan-950/50 transition-all duration-500"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase text-cyan-600 font-mono mb-1 md:mb-2">RESEARCH & DESIGN</p>
                <p className="text-lg md:text-2xl text-white font-light tracking-tight group-hover:text-cyan-400 transition-colors duration-300 truncate">
                  View System Design Dossier
                </p>
                <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2 font-light hidden sm:block">A detailed examination of system architecture, methodology, and implementation logic</p>
              </div>
              <ChevronRight className="w-5 h-5 md:w-8 md:h-8 text-cyan-600 group-hover:text-cyan-400 group-hover:translate-x-2 transition-all duration-300 flex-shrink-0" />
            </div>
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto lg:ml-[15rem] px-4 md:px-6 py-12 md:py-20">

        <section id="problem" className="min-h-screen flex flex-col justify-center mb-20 md:mb-32">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-red-950 bg-opacity-30 border border-red-900 rounded text-red-400 text-xs md:text-sm font-mono tracking-wider">
              SYSTEMATIC FAILURE
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-white">
              The Core Problem
            </h1>
            <div className="h-0.5 md:h-1 w-16 md:w-24 bg-gradient-to-r from-red-600 to-transparent"></div>

            <div className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-400 max-w-4xl space-y-4 md:space-y-6 mt-8 md:mt-12">
              <p>
                Over 90% of participants lose money in financial markets—not because of volatility,
                not because of information asymmetry, not because of capital constraints.
              </p>
              <p className="text-white">
                They lose because they operate without any quantitative framework,
                without mathematical structure, without systems, and without coherent decision logic.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-16">
              {[
                'Discretionary decision-making',
                'Narrative-driven behavior',
                'Inconsistent time horizons',
                'Signal chasing without structure',
                'Emotional exposure management',
                'Temporal incoherence'
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group p-4 md:p-6 bg-gray-900 bg-opacity-30 border border-gray-800 hover:border-red-900 transition-all duration-300 hover:translate-x-2"
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 w-2 h-2 bg-red-600 flex-shrink-0 group-hover:bg-red-500"></div>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">{item}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-16 p-4 md:p-8 bg-gradient-to-r from-gray-900 to-black border-l-2 md:border-l-4 border-red-600">
              <p className="text-base md:text-lg lg:text-xl text-white font-light tracking-wide">
                Markets do not punish lack of information—they punish lack of structure.
              </p>
            </div>
          </div>
        </section>

        <EvidenceLayer />

               <section id="rationale" className="min-h-screen flex flex-col justify-center mb-20 md:mb-32">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-gray-800 bg-opacity-50 border border-gray-700 rounded text-gray-400 text-xs md:text-sm font-mono tracking-wider">
              CONCEPTUAL FOUNDATION
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-white">
              Why a System Is Necessary
            </h1>
            <div className="h-0.5 md:h-1 w-16 md:w-24 bg-gradient-to-r from-gray-600 to-transparent"></div>

            <div className="mt-8 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="space-y-6 md:space-y-8 text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl">
                <p
                  className="text-gray-500 italic"
                  style={{ animation: 'textFadeIn 1s ease-out 0.3s both' }}
                >
                  The second law of thermodynamics states that the entropy of an isolated system
                  tends to increase over time.
                </p>

                <p
                  className="text-white"
                  style={{ animation: 'textFadeIn 1s ease-out 0.6s both' }}
                >
                  Human decision-making behaves the same way.
                </p>

                <p style={{ animation: 'textFadeIn 1s ease-out 0.9s both' }}>
                  In information theory, entropy represents unpredictability and randomness.
                  Passive consumption of information — especially unfiltered market data,
                  feeds, narratives, and opinions —
                  increases cognitive entropy.
                </p>

                <div
                  className="space-y-3 text-gray-400 pl-6 border-l-2 border-gray-800"
                  style={{ animation: 'textFadeIn 1s ease-out 1.2s both' }}
                >
                  <p>Signals accumulate.</p>
                  <p>Timeframes conflict.</p>
                  <p>Conviction decays.</p>
                </div>

                <p
                  className="text-white"
                  style={{ animation: 'textFadeIn 1s ease-out 1.5s both' }}
                >
                  Without structure, the decision process becomes noisier,
                  not clearer.
                </p>

                <p
                  className="text-xl md:text-2xl text-white pt-4 md:pt-6"
                  style={{ animation: 'textFadeIn 1s ease-out 1.8s both' }}
                >
                  A system exists to introduce negentropy.
                </p>

                <p style={{ animation: 'textFadeIn 1s ease-out 2.1s both' }}>
                  Negentropy is the deliberate reduction of disorder through structure.
                  It constrains randomness.
                  It enforces sequence.
                  It limits action to conditions that justify it.
                </p>

                <p style={{ animation: 'textFadeIn 1s ease-out 2.4s both' }}>
                  This framework does not attempt to predict the market.
                  It exists to prevent decision entropy.
                </p>

                <p style={{ animation: 'textFadeIn 1s ease-out 2.7s both' }}>
                  By formalizing rules, alignment, thresholds, and permission,
                  the system replaces reactive judgment
                  with structured execution.
                </p>

                <p
                  className="text-white"
                  style={{ animation: 'textFadeIn 1s ease-out 3.0s both' }}
                >
                  The goal is not certainty.<br />
                  The goal is coherence.
                </p>

                <div
                  className="pt-6 md:pt-8 border-t border-gray-800"
                  style={{ animation: 'textFadeIn 1s ease-out 3.3s both' }}
                >
                  <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                    When entropy is unavoidable,<br />
                    structure is not optional.
                  </p>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-96 h-96">
                  <svg
                    viewBox="0 0 400 400"
                    className="w-full h-full"
                    style={{ animation: 'textFadeIn 2s ease-out 1s both' }}
                  >
                    <defs>
                      <linearGradient id="entropyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
                      </linearGradient>
                    </defs>

                    <g className="opacity-40">
                      <circle
                        cx="200"
                        cy="80"
                        r="15"
                        fill="none"
                        stroke="url(#entropyGradient)"
                        strokeWidth="1"
                        style={{ animation: 'chaosFloat1 8s ease-in-out infinite' }}
                      />
                      <circle
                        cx="240"
                        cy="95"
                        r="20"
                        fill="none"
                        stroke="url(#entropyGradient)"
                        strokeWidth="1"
                        style={{ animation: 'chaosFloat2 7s ease-in-out infinite' }}
                      />
                      <circle
                        cx="170"
                        cy="100"
                        r="12"
                        fill="none"
                        stroke="url(#entropyGradient)"
                        strokeWidth="1"
                        style={{ animation: 'chaosFloat3 9s ease-in-out infinite' }}
                      />
                      <circle
                        cx="210"
                        cy="115"
                        r="18"
                        fill="none"
                        stroke="url(#entropyGradient)"
                        strokeWidth="1"
                        style={{ animation: 'chaosFloat4 6s ease-in-out infinite' }}
                      />
                      <circle
                        cx="185"
                        cy="90"
                        r="14"
                        fill="none"
                        stroke="url(#entropyGradient)"
                        strokeWidth="1"
                        style={{ animation: 'chaosFloat5 8.5s ease-in-out infinite' }}
                      />
                    </g>

                    <line
                      x1="200"
                      y1="150"
                      x2="200"
                      y2="250"
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="1"
                      markerEnd="url(#arrowhead)"
                    />

                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="10"
                        refX="5"
                        refY="5"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 10 5, 0 10"
                          fill="rgba(255, 255, 255, 0.2)"
                        />
                      </marker>
                    </defs>

                    <g className="opacity-60">
                      <circle
                        cx="200"
                        cy="320"
                        r="60"
                        fill="none"
                        stroke="url(#entropyGradient)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="200"
                        cy="320"
                        r="45"
                        fill="none"
                        stroke="url(#entropyGradient)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="200"
                        cy="320"
                        r="30"
                        fill="none"
                        stroke="url(#entropyGradient)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="200"
                        cy="320"
                        r="15"
                        fill="none"
                        stroke="url(#entropyGradient)"
                        strokeWidth="1"
                      />
                    </g>

                    <text
                      x="280"
                      y="85"
                      fill="rgba(255, 255, 255, 0.3)"
                      fontSize="11"
                      fontFamily="monospace"
                    >
                      HIGH ENTROPY
                    </text>
                    <text
                      x="280"
                      y="325"
                      fill="rgba(255, 255, 255, 0.4)"
                      fontSize="11"
                      fontFamily="monospace"
                    >
                      LOW ENTROPY
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="time-coherency" className="min-h-screen flex flex-col justify-center mb-20 md:mb-32">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-blue-950 bg-opacity-30 border border-blue-900 rounded text-blue-400 text-xs md:text-sm font-mono tracking-wider">
              FOUNDATIONAL PRINCIPLE
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-white">
              Time Coherency
            </h1>
            <div className="h-0.5 md:h-1 w-16 md:w-24 bg-gradient-to-r from-blue-600 to-transparent"></div>

            <div className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 max-w-4xl space-y-4 md:space-y-6 mt-8 md:mt-12">
              <p className="text-xl md:text-2xl text-white">
                Time Coherency is not a filter. It is a first-order constraint.
              </p>
              <p>
                Every system operates within a strict intended time period.
                Signals are only valid within their temporal context.
                Independent systems must align in time, not only in direction.
              </p>
              <p>
                Signals that are not temporally coherent are ignored—regardless of their apparent strength.
              </p>
            </div>

            <TimeCoherencyVisual />

            <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="p-4 md:p-8 bg-gray-900 bg-opacity-50 border border-blue-900">
                <h3 className="text-lg md:text-xl text-white mb-4 font-mono">Temporal Alignment</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start space-x-3">
                    <ChevronRight className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <span>Short-term signals cannot justify long-term positions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <ChevronRight className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <span>Macro logic must not drive micro execution</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <ChevronRight className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <span>Time incoherence creates false confidence</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 md:p-8 bg-gray-900 bg-opacity-50 border border-blue-900">
                <h3 className="text-lg md:text-xl text-white mb-4 font-mono">Operational Constraint</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start space-x-3">
                    <ChevronRight className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <span>No action is allowed unless signals are temporally aligned</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <ChevronRight className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <span>Systems with different time horizons cannot override each other</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <ChevronRight className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <span>Temporal context defines signal validity</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 md:mt-12 p-4 md:p-8 bg-gradient-to-r from-blue-950 to-black border-l-2 md:border-l-4 border-blue-600 bg-opacity-30">
              <p className="text-base md:text-lg lg:text-xl text-white font-light tracking-wide">
                Most losses come from mixing short-term signals with long-term positions.
                Time incoherence creates overexposure and structural vulnerability.
              </p>
            </div>
          </div>
        </section>

        <section id="thesis" className="min-h-screen flex flex-col justify-center mb-20 md:mb-32">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-emerald-950 bg-opacity-30 border border-emerald-900 rounded text-emerald-400 text-xs md:text-sm font-mono tracking-wider">
              CORE THESIS
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-white">
              Capital Allocation Across Regimes
            </h1>
            <div className="h-0.5 md:h-1 w-16 md:w-24 bg-gradient-to-r from-emerald-600 to-transparent"></div>

            <div className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 max-w-4xl space-y-4 md:space-y-6 mt-8 md:mt-12">
              <p className="text-xl md:text-2xl text-white">
                The edge in markets does not come from predicting price,
                but from managing capital allocation across regimes.
              </p>
              <p>
                The system does not forecast.
                The system does not predict tops or bottoms.
                The system manages exposure, allocation, and rotation.
              </p>
            </div>

            <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { title: 'No Prediction', desc: 'Price forecasting is not attempted' },
                { title: 'Regime Awareness', desc: 'Capital moves based on market state' },
                { title: 'Allocation Logic', desc: 'Exposure adjusted by aggregated consensus' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group p-4 md:p-8 bg-gray-900 bg-opacity-30 border border-gray-800 hover:border-emerald-700 transition-all duration-300 hover:scale-105"
                >
                  <h3 className="text-base md:text-lg text-white mb-3 font-mono">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-12 p-4 md:p-8 bg-gradient-to-r from-emerald-950 to-black border-l-2 md:border-l-4 border-emerald-600 bg-opacity-30">
              <p className="text-lg md:text-xl lg:text-2xl text-white font-light tracking-wide">
                Capital should move—not opinions.
              </p>
            </div>
          </div>
        </section>

        <section id="meta-engine" className="min-h-screen flex flex-col justify-center mb-20 md:mb-32">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-purple-950 bg-opacity-30 border border-purple-900 rounded text-purple-400 text-xs md:text-sm font-mono tracking-wider">
              SYSTEM OVERVIEW
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-white">
              Meta Decision Engine
            </h1>
            <div className="h-0.5 md:h-1 w-16 md:w-24 bg-gradient-to-r from-purple-600 to-transparent"></div>

            <div className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 max-w-4xl space-y-4 md:space-y-6 mt-8 md:mt-12">
              <p>
                The Meta Decision Engine is a structured aggregation layer that synthesizes
                multiple independent systems, each answering a different market question.
              </p>
              <p className="text-white">
                No system is allowed to dominate. Decisions emerge only from aggregation.
                No single signal can trigger exposure.
              </p>
            </div>

            <MetaEngineFlow />

            <div className="mt-8 md:mt-16 p-4 md:p-8 bg-gradient-to-r from-purple-950 to-black border-l-2 md:border-l-4 border-purple-600 bg-opacity-30">
              <p className="text-base md:text-lg lg:text-xl text-white font-light tracking-wide">
                The system does not decide—consensus decides.
              </p>
            </div>
          </div>
        </section>

        <section id="quantitative" className="min-h-screen flex flex-col justify-center mb-32">
          <div className="space-y-8">
            <QuantitativeScoring />
          </div>
        </section>

        <section id="performance" className="min-h-screen flex flex-col justify-center mb-20 md:mb-32">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-cyan-950 bg-opacity-30 border border-cyan-900 rounded text-cyan-400 text-xs md:text-sm font-mono tracking-wider">
              EMPIRICAL RESULTS
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-white">
              Performance Data
            </h1>
            <div className="h-0.5 md:h-1 w-16 md:w-24 bg-gradient-to-r from-cyan-600 to-transparent"></div>

            <div className="mt-8 md:mt-12">
              <div className="p-4 md:p-6 bg-gray-900 bg-opacity-50 border border-cyan-900 mb-6 md:mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 space-y-1 md:space-y-0">
                  <h3 className="text-base md:text-lg text-white font-mono">Period</h3>
                  <p className="text-sm md:text-base text-cyan-400 font-mono">31 May 2025 – 12 December 2025</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-1 md:space-y-0">
                  <h3 className="text-base md:text-lg text-white font-mono">Benchmark</h3>
                  <p className="text-sm md:text-base text-cyan-400 font-mono">Bitcoin (BTC)</p>
                </div>
              </div>

              <PerformanceMetrics />

              <div className="mt-12">
                <PerformanceChart />
              </div>

              <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="p-4 md:p-8 bg-gray-900 bg-opacity-50 border border-cyan-900">
                  <h3 className="text-lg md:text-xl text-white mb-4 md:mb-6 font-mono">Standalone System Proof</h3>
                  <p className="text-gray-400 mb-4">MTPI Performance vs Bitcoin</p>
                  <p className="text-sm text-gray-500 mb-4 font-mono">Period: From 24 August 2024</p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-black bg-opacity-50">
                      <span className="text-gray-400">Bitcoin (HODL)</span>
                      <span className="text-xl text-orange-400 font-mono">≈ 40%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black bg-opacity-50 border border-cyan-700">
                      <span className="text-white">MTPI System</span>
                      <span className="text-2xl text-cyan-400 font-mono">≈ 62%</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-6 leading-relaxed">
                    Individual systems are independently functional and not dependent on aggregation to generate edge.
                  </p>
                </div>

                <div className="p-4 md:p-8 bg-gray-900 bg-opacity-50 border border-cyan-900">
                  <h3 className="text-lg md:text-xl text-white mb-4 md:mb-6 font-mono">Interpretation</h3>
                  <ul className="space-y-4 text-gray-400">
                    <li className="flex items-start space-x-3">
                      <ChevronRight className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
                      <span>Risk-adjusted outperformance</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <ChevronRight className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
                      <span>Regime-aware capital allocation</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <ChevronRight className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
                      <span>Capital preservation during adverse conditions</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <ChevronRight className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
                      <span>Not continuously invested (60 days in cash)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="systems" className="mb-20 md:mb-32">
          <div className="space-y-12 md:space-y-16">
            <div>
              <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-orange-950 bg-opacity-30 border border-orange-900 rounded text-orange-400 text-xs md:text-sm font-mono tracking-wider mb-6 md:mb-8">
                SYSTEM CATEGORIES
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-white mb-4">
                System Architecture
              </h1>
              <div className="h-0.5 md:h-1 w-16 md:w-24 bg-gradient-to-r from-orange-600 to-transparent"></div>
            </div>

            <div className="space-y-12 md:space-y-16">
              <div>
                <div className="flex items-center space-x-3 md:space-x-4 mb-6 md:mb-8">
                  <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />
                  <h2 className="text-2xl md:text-3xl text-white font-light">Return-Generating Standalone Systems</h2>
                </div>
                <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8 max-w-3xl">
                  These systems are designed to generate returns independently.
                  Each evaluates specific market behavior within its intended time period.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {[
                    { name: 'LTPI', period: 'Long-term', desc: 'Evaluates macro trend persistence and structural market conditions over extended time horizons' },
                    { name: 'MTPI', period: 'Medium-term', desc: 'Analyzes intermediate trend strength and momentum sustainability across multi-week periods' },
                    { name: 'TPI', period: 'Tactical', desc: 'Assesses short to medium-term positioning opportunities based on price structure' },
                    { name: 'STPI Bitcoin', period: 'Short-term', desc: 'Monitors Bitcoin-specific short-term momentum and volatility patterns' },
                    { name: 'STPI Ethereum', period: 'Short-term', desc: 'Tracks Ethereum-specific short-term price behavior and market microstructure' },
                    { name: 'STPI Solana', period: 'Short-term', desc: 'Evaluates Solana short-term momentum characteristics and relative performance' },
                    { name: 'STPI SUI', period: 'Short-term', desc: 'Assesses SUI short-term price dynamics and market participation levels' }
                  ].map((system, idx) => (
                    <div
                      key={idx}
                      className="group p-6 bg-gray-900 bg-opacity-30 border border-gray-800 hover:border-orange-700 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl text-white font-mono">{system.name}</h3>
                        <span className="text-xs text-orange-400 font-mono px-2 py-1 bg-orange-950 bg-opacity-30 rounded">
                          {system.period}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{system.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-3 md:space-x-4 mb-6 md:mb-8">
                  <Activity className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
                  <h2 className="text-2xl md:text-3xl text-white font-light">Market State & Regime Systems</h2>
                </div>
                <p className="text-sm md:text-base text-gray-400 mb-2 max-w-3xl">
                  These systems provide context, not returns. They evaluate market participation,
                  trend persistence, and structural conditions.
                </p>
                <p className="text-white mb-6 md:mb-8 max-w-3xl font-mono text-xs md:text-sm">
                  These systems do not allocate capital.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {[
                    { name: 'USDT TPI', desc: 'Monitors stablecoin dominance and risk-off capital flows as proxy for market fear' },
                    { name: 'Others TPI', desc: 'Evaluates altcoin participation breadth and market-wide momentum diffusion' },
                    { name: 'Trend Regime SPI', desc: 'Determines prevailing trend regime and structural market state for risk acceptance' }
                  ].map((system, idx) => (
                    <div
                      key={idx}
                      className="group p-6 bg-gray-900 bg-opacity-30 border border-gray-800 hover:border-blue-700 transition-all duration-300"
                    >
                      <h3 className="text-lg text-white font-mono mb-3">{system.name}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{system.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-3 md:space-x-4 mb-6 md:mb-8">
                  <Network className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" />
                  <h2 className="text-2xl md:text-3xl text-white font-light">Relative Strength Systems</h2>
                </div>
                <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8 max-w-3xl">
                  Relative strength defines capital preference. Allocation depends on regime approval.
                  No allocation occurs in unfavorable conditions.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['ETH/BTC', 'SOL/BTC', 'SOL/ETH', 'SUI/BTC', 'SUI/ETH', 'SUI/SOL'].map((pair, idx) => (
                    <div
                      key={idx}
                      className="group p-4 bg-gray-900 bg-opacity-30 border border-gray-800 hover:border-emerald-700 transition-all duration-300 text-center"
                    >
                      <p className="text-white font-mono">{pair}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        <section id="tournament" className="mb-32">
          <TournamentBracket active={true} />
        </section>

        <section id="aggregation" className="min-h-screen flex flex-col justify-center mb-20 md:mb-32">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-indigo-950 bg-opacity-30 border border-indigo-900 rounded text-indigo-400 text-xs md:text-sm font-mono tracking-wider">
              DECISION LOGIC
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-white">
              Aggregation Logic
            </h1>
            <div className="h-0.5 md:h-1 w-16 md:w-24 bg-gradient-to-r from-indigo-600 to-transparent"></div>

            <div className="mt-8 md:mt-16 space-y-6 md:space-y-8">
              <h2 className="text-2xl md:text-3xl text-white font-light">Why Aggregation Is Necessary</h2>

              <div className="text-base md:text-lg leading-relaxed text-gray-400 max-w-4xl space-y-4 md:space-y-6">
                <p>
                  Standalone systems can be correct. They can be profitable.
                  And they can still fail structurally.
                </p>
                <p>
                  The core problem is not signal quality—it is timing error and false conviction.
                  A single system may generate a strong signal, but without confirmation from other
                  independent perspectives, that signal carries unacceptable structural risk.
                </p>
                <p className="text-white">
                  Aggregation is not a feature. It is the only way to make multiple good systems behave safely together.
                </p>
              </div>

              <SignalConflictVisual />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-12">
                <div className="p-4 md:p-6 bg-gray-900 bg-opacity-50 border border-indigo-900">
                  <h3 className="text-base md:text-lg text-white mb-4 font-mono">The Problem</h3>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Independent systems emit conflicting signals frequently</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Acting on isolated signals creates timing errors</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>False conviction leads to premature exposure</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Disagreement between systems is structurally dangerous</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 md:p-6 bg-gray-900 bg-opacity-50 border border-indigo-900">
                  <h3 className="text-base md:text-lg text-white mb-4 font-mono">The Solution</h3>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Aggregation reduces error probability through consensus</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Allocation requires agreement across systems</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Fewer decisions are made, but each is statistically stronger</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Discipline is enforced through structural constraints</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 md:mt-8 p-4 md:p-8 bg-gradient-to-r from-indigo-950 to-black border-l-2 md:border-l-4 border-indigo-600 bg-opacity-30">
                <p className="text-base md:text-lg lg:text-xl text-white font-light tracking-wide">
                  Without aggregation, standalone systems produce noise.
                  With aggregation, they produce decisions.
                </p>
              </div>
            </div>

            <div className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 max-w-4xl space-y-4 md:space-y-6 mt-8 md:mt-16">
              <p>
                Each system outputs a state and a score between -1 and +1.
                Scores are weighted based on system significance and temporal relevance.
                Aggregated scores form a final conviction measure.
              </p>
              <p className="text-white">
                Allocation occurs only above defined thresholds.
                The system does not decide—consensus decides.
              </p>
            </div>

            <div className="mt-8 md:mt-16 p-4 md:p-8 bg-gray-900 bg-opacity-50 border border-indigo-900">
              <h3 className="text-lg md:text-xl text-white mb-6 font-mono">Output Structure</h3>
              <div className="space-y-6">
                {[
                  { step: 'System State', desc: 'Each system reports current state (active, neutral, inactive)' },
                  { step: 'Quantitative Score', desc: 'Score ranging from -1 (maximum negative) to +1 (maximum positive)' },
                  { step: 'Weighting', desc: 'Scores weighted by system type, time horizon, and regime context' },
                  { step: 'Aggregation', desc: 'Weighted scores combined into unified conviction metric' },
                  { step: 'Threshold Evaluation', desc: 'Allocation triggered only when conviction exceeds minimum threshold' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-indigo-600 bg-opacity-20 border border-indigo-700 flex items-center justify-center text-indigo-400 font-mono flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-mono mb-1">{item.step}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="constraints" className="min-h-screen flex flex-col justify-center mb-20 md:mb-32">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-red-950 bg-opacity-30 border border-red-900 rounded text-red-400 text-xs md:text-sm font-mono tracking-wider">
              STRUCTURAL CONSTRAINTS
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-white">
              What The System Does Not Do
            </h1>
            <div className="h-0.5 md:h-1 w-16 md:w-24 bg-gradient-to-r from-red-600 to-transparent"></div>

            <div className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 max-w-4xl space-y-4 md:space-y-6 mt-8 md:mt-12">
              <p>
                Constraints are not limitations. They are structural advantages.
                By defining what the system will not do, operational discipline is enforced.
              </p>
            </div>

            <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  icon: Lock,
                  constraint: 'No Discretionary Trading',
                  reason: 'All decisions follow quantitative rules. No subjective interpretation allowed.'
                },
                {
                  icon: Lock,
                  constraint: 'No Signal Selling',
                  reason: 'System outputs are not monetized as trading signals. This is a research framework.'
                },
                {
                  icon: Lock,
                  constraint: 'No Leverage Assumption',
                  reason: 'Performance metrics assume no leverage. Capital preservation is prioritized.'
                },
                {
                  icon: Lock,
                  constraint: 'No Continuous Exposure',
                  reason: 'System holds cash during unfavorable regimes. Participation is conditional.'
                },
                {
                  icon: Lock,
                  constraint: 'No Narrative-Based Decisions',
                  reason: 'Market narratives are ignored. Only quantitative state matters.'
                },
                {
                  icon: Lock,
                  constraint: 'No Single-System Dominance',
                  reason: 'No individual system can trigger allocation without consensus.'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group p-6 bg-gray-900 bg-opacity-30 border border-gray-800 hover:border-red-700 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <item.icon className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg text-white font-mono mb-2">{item.constraint}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-12 p-4 md:p-8 bg-gradient-to-r from-red-950 to-black border-l-2 md:border-l-4 border-red-600 bg-opacity-30">
              <p className="text-base md:text-lg lg:text-xl text-white font-light tracking-wide">
                Constraints enforce discipline. Discipline preserves capital. Capital preservation enables compounding.
              </p>
            </div>
          </div>
        </section>

        <section id="disclaimer" className="min-h-screen flex flex-col justify-center mb-20 md:mb-32">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-gray-800 bg-opacity-50 border border-gray-700 rounded text-gray-400 text-xs md:text-sm font-mono tracking-wider">
              SYSTEM NOTICE
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-white">
              Disclaimer & System Status
            </h1>
            <div className="h-0.5 md:h-1 w-16 md:w-24 bg-gradient-to-r from-gray-600 to-transparent"></div>

            <div className="mt-8 md:mt-12 relative overflow-hidden">
              {/* Horizontal shimmer animation */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(156, 163, 175, 0.1), transparent)',
                  animation: 'shimmer 15s linear infinite'
                }}
              />

              <div className="relative p-4 md:p-8 bg-gray-900 bg-opacity-40 border border-gray-700 space-y-4 md:space-y-6">
                <div className="mb-6 md:mb-8">
                  <p className="text-xs md:text-sm text-gray-500 font-mono mb-2">All data presented reflects the system state as of:</p>
                  <p
                    className="text-xl md:text-2xl text-white font-mono"
                    style={{ animation: 'datePulse 3s ease-in-out infinite' }}
                  >
                    30.12.2025
                  </p>
                </div>

                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  This framework is under continuous development.
                  Formulas, scoring logic, thresholds, and execution rules may contain inaccuracies,
                  simplifications,
                  or be subject to future revisions.
                </p>

                <p className="text-gray-300 leading-relaxed">
                  The system may evolve beyond what is documented here.
                  Not all internal changes, optimizations, or experimental components are guaranteed to be reflected in this presentation.
                </p>

                <p className="text-gray-300 leading-relaxed">
                  This material is provided for structural and educational transparency only.
                  It does not constitute financial advice,
                  a trading recommendation,
                  or a guarantee of performance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-gray-800 py-8 md:py-12 bg-black">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <p className="text-gray-600 text-xs md:text-sm font-mono">
            Systematic Investment Framework — Research & Educational Purpose Only
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
