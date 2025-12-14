import { ArrowRight, Database, GitBranch, Layers } from 'lucide-react';

export default function SystemArchitecture() {
  return (
    <div className="mt-16 p-8 bg-gray-900 bg-opacity-50 border border-purple-900">
      <h3 className="text-xl text-white mb-8 font-mono">Architecture Overview</h3>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-4">
            <div className="p-4 bg-orange-950 bg-opacity-20 border border-orange-900">
              <div className="flex items-center space-x-3 mb-2">
                <Database className="w-5 h-5 text-orange-400" />
                <h4 className="text-orange-400 font-mono text-sm">Return Systems</h4>
              </div>
              <p className="text-gray-400 text-xs">LTPI, MTPI, TPI, STPI Assets</p>
            </div>

            <div className="p-4 bg-blue-950 bg-opacity-20 border border-blue-900">
              <div className="flex items-center space-x-3 mb-2">
                <GitBranch className="w-5 h-5 text-blue-400" />
                <h4 className="text-blue-400 font-mono text-sm">Regime Systems</h4>
              </div>
              <p className="text-gray-400 text-xs">USDT TPI, Others TPI, Trend SPI</p>
            </div>

            <div className="p-4 bg-emerald-950 bg-opacity-20 border border-emerald-900">
              <div className="flex items-center space-x-3 mb-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <h4 className="text-emerald-400 font-mono text-sm">Relative Strength</h4>
              </div>
              <p className="text-gray-400 text-xs">Pairs Analysis & RSPS ALTS</p>
            </div>
          </div>

          <div className="flex items-center px-8">
            <div className="flex flex-col space-y-2">
              <ArrowRight className="w-8 h-8 text-purple-500" />
              <ArrowRight className="w-8 h-8 text-purple-500" />
              <ArrowRight className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="flex-1">
            <div className="p-6 bg-purple-950 bg-opacity-30 border-2 border-purple-700">
              <h4 className="text-purple-400 font-mono text-lg mb-3">Aggregation Layer</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Weighted Scoring</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Consensus Logic</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Threshold Validation</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center px-8">
            <ArrowRight className="w-10 h-10 text-cyan-500" />
          </div>

          <div className="flex-1">
            <div className="p-6 bg-cyan-950 bg-opacity-30 border-2 border-cyan-700">
              <h4 className="text-cyan-400 font-mono text-lg mb-3">Final Output</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                  <span>Allocation Decision</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                  <span>Position Sizing</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                  <span>Capital Rotation</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-black bg-opacity-50 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-gray-500 text-xs font-mono mb-2">INPUT</p>
              <p className="text-white font-mono">Multiple Independent Systems</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-mono mb-2">PROCESS</p>
              <p className="text-white font-mono">Weighted Aggregation</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-mono mb-2">OUTPUT</p>
              <p className="text-white font-mono">Unified Allocation Signal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
