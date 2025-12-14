export default function QuantitativeScoring() {
  return (
    <div className="p-10 bg-black border border-gray-900">
      <h3 className="text-2xl text-white mb-12 font-mono font-light tracking-wide">
        Quantitative Scoring & Allocation Logic
      </h3>

      <div className="space-y-16">
        <div>
          <h4 className="text-lg text-gray-300 mb-8 font-mono tracking-wider border-b border-gray-800 pb-3">
            1. Relative Strength Ratios
          </h4>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-950 border border-gray-800">
              <div className="font-mono text-2xl text-center py-8 text-white">
                <div className="mb-2">R<sub className="text-lg">A/B</sub>(t) = </div>
                <div className="border-t border-gray-700 pt-2 mt-2 inline-block px-8">
                  <div className="text-center">P<sub className="text-lg">A</sub>(t)</div>
                </div>
                <div className="my-4 text-gray-700">───────</div>
                <div className="border-b border-gray-700 pb-2 mb-2 inline-block px-8">
                  <div className="text-center">P<sub className="text-lg">B</sub>(t)</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-4 text-gray-400">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-700 mt-2 flex-shrink-0"></div>
                <p className="text-sm leading-relaxed">
                  Ratios above 1 indicate outperformance of asset A relative to asset B
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-700 mt-2 flex-shrink-0"></div>
                <p className="text-sm leading-relaxed">
                  Relative strength is evaluated pairwise across all assets
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-700 mt-2 flex-shrink-0"></div>
                <p className="text-sm leading-relaxed">
                  RSPS ranks assets based on these ratios to identify capital dominance
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { pair: 'ETH/BTC', value: '1.12', status: 'outperform' },
              { pair: 'SOL/BTC', value: '0.94', status: 'underperform' },
              { pair: 'SUI/SOL', value: '1.28', status: 'outperform' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-gray-950 border border-gray-800">
                <p className="text-xs text-gray-600 font-mono mb-2">{item.pair}</p>
                <p className={`text-2xl font-mono ${item.status === 'outperform' ? 'text-emerald-400' : 'text-gray-600'}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg text-gray-300 mb-8 font-mono tracking-wider border-b border-gray-800 pb-3">
            2. Risk-Adjusted Performance Metrics
          </h4>

          <div className="bg-gray-950 border border-gray-800">
            <div className="grid grid-cols-4 border-b border-gray-800 bg-black">
              <div className="p-4 border-r border-gray-800">
                <p className="text-xs text-gray-600 font-mono">METRIC</p>
              </div>
              <div className="p-4 border-r border-gray-800">
                <p className="text-xs text-gray-600 font-mono">FORMULA</p>
              </div>
              <div className="p-4 border-r border-gray-800">
                <p className="text-xs text-gray-600 font-mono">PURPOSE</p>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-600 font-mono">VALUE</p>
              </div>
            </div>

            <div className="grid grid-cols-4 border-b border-gray-800">
              <div className="p-4 border-r border-gray-800">
                <p className="text-sm text-white font-mono">Sharpe Ratio</p>
              </div>
              <div className="p-4 border-r border-gray-800 font-mono text-sm text-gray-400">
                <div className="flex flex-col items-center">
                  <span>R<sub>p</sub> - R<sub>f</sub></span>
                  <span className="text-gray-700">──────</span>
                  <span>σ<sub>p</sub></span>
                </div>
              </div>
              <div className="p-4 border-r border-gray-800">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Return per unit of total volatility
                </p>
              </div>
              <div className="p-4">
                <p className="text-lg text-cyan-400 font-mono">1.95</p>
              </div>
            </div>

            <div className="grid grid-cols-4 border-b border-gray-800">
              <div className="p-4 border-r border-gray-800">
                <p className="text-sm text-white font-mono">Sortino Ratio</p>
              </div>
              <div className="p-4 border-r border-gray-800 font-mono text-sm text-gray-400">
                <div className="flex flex-col items-center">
                  <span>R<sub>p</sub> - R<sub>f</sub></span>
                  <span className="text-gray-700">──────</span>
                  <span>σ<sub>d</sub></span>
                </div>
              </div>
              <div className="p-4 border-r border-gray-800">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Return per unit of downside deviation
                </p>
              </div>
              <div className="p-4">
                <p className="text-lg text-cyan-400 font-mono">3.25</p>
              </div>
            </div>

            <div className="grid grid-cols-4 border-b border-gray-800">
              <div className="p-4 border-r border-gray-800">
                <p className="text-sm text-white font-mono">Omega Ratio</p>
              </div>
              <div className="p-4 border-r border-gray-800 font-mono text-sm text-gray-400">
                <div className="flex flex-col items-center">
                  <span>∑(R - τ)<sup>+</sup></span>
                  <span className="text-gray-700">──────</span>
                  <span>∑(τ - R)<sup>+</sup></span>
                </div>
              </div>
              <div className="p-4 border-r border-gray-800">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Probability-weighted gains to losses
                </p>
              </div>
              <div className="p-4">
                <p className="text-lg text-cyan-400 font-mono">1.35</p>
              </div>
            </div>

            <div className="grid grid-cols-4">
              <div className="p-4 border-r border-gray-800">
                <p className="text-sm text-white font-mono">Max Drawdown</p>
              </div>
              <div className="p-4 border-r border-gray-800 font-mono text-sm text-gray-400">
                <span>max<sub>t</sub>(P<sub>peak</sub> - P<sub>t</sub>)</span>
              </div>
              <div className="p-4 border-r border-gray-800">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Maximum peak-to-trough decline
                </p>
              </div>
              <div className="p-4">
                <p className="text-lg text-red-400 font-mono">-13.67%</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg text-gray-300 mb-8 font-mono tracking-wider border-b border-gray-800 pb-3">
            3. Position Sizing via Meta-Score
          </h4>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 bg-gray-950 border border-gray-800">
                <p className="text-xs text-gray-600 font-mono mb-4">AGGREGATION</p>
                <div className="font-mono text-xl text-white text-center py-4">
                  M = ∑<sub>i=1</sub><sup>n</sup> s<sub>i</sub>
                </div>
                <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                  where each module i outputs s<sub>i</sub> ∈ {-1, 0, +1}
                </p>
              </div>

              <div className="p-6 bg-gray-950 border border-gray-800">
                <p className="text-xs text-gray-600 font-mono mb-4">ALLOCATION FUNCTION</p>
                <div className="space-y-3 font-mono text-sm text-gray-400">
                  <div className="flex items-center justify-between p-3 bg-black border-l-2 border-emerald-600">
                    <span>w = 0.5</span>
                    <span className="text-emerald-400">if M ≥ 6</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black border-l-2 border-cyan-600">
                    <span>w = 0.25</span>
                    <span className="text-cyan-400">if 3 ≤ M ≤ 5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black border-l-2 border-gray-700">
                    <span>w = 0</span>
                    <span className="text-gray-600">if M &lt; 3</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-6">
              <div className="p-6 bg-black border border-gray-800">
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  Allocation is discrete. Three states only.
                </p>
                <div className="h-px bg-gray-800 my-4"></div>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  Exposure is conditional. Consensus required.
                </p>
                <div className="h-px bg-gray-800 my-4"></div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  No continuous scaling without threshold breach.
                </p>
              </div>

              <div className="p-6 bg-gray-950 border border-gray-800">
                <p className="text-xs text-gray-600 font-mono mb-3">CURRENT STATE</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-600 mb-2">Meta-Score</p>
                    <p className="text-2xl text-white font-mono">7</p>
                  </div>
                  <div className="border-l border-r border-gray-800">
                    <p className="text-xs text-gray-600 mb-2">Threshold</p>
                    <p className="text-2xl text-emerald-400 font-mono">≥6</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-2">Position</p>
                    <p className="text-2xl text-emerald-400 font-mono">50%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
