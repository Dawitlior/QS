import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3, Target } from 'lucide-react';

const metrics = [
  {
    label: 'System Profit',
    value: '75.70%',
    icon: TrendingUp,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-950',
    borderColor: 'border-cyan-900'
  },
  {
    label: 'Sharpe Ratio',
    value: '1.95',
    icon: Activity,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950',
    borderColor: 'border-emerald-900'
  },
  {
    label: 'Sortino Ratio',
    value: '3.25',
    icon: Target,
    color: 'text-blue-400',
    bgColor: 'bg-blue-950',
    borderColor: 'border-blue-900'
  },
  {
    label: 'Rolling Daily Omega',
    value: '1.10',
    icon: BarChart3,
    color: 'text-purple-400',
    bgColor: 'bg-purple-950',
    borderColor: 'border-purple-900'
  },
  {
    label: 'Max Drawdown',
    value: '-13.67%',
    icon: TrendingDown,
    color: 'text-red-400',
    bgColor: 'bg-red-950',
    borderColor: 'border-red-900'
  },
  {
    label: 'Profit in Move',
    value: '62.00%',
    icon: DollarSign,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-950',
    borderColor: 'border-yellow-900'
  }
];

const additionalMetrics = [
  { label: 'HODL (BTC)', value: '-13.71%', negative: true },
  { label: 'Days in Cash', value: '60', neutral: true },
  { label: 'Omega Active', value: '1.35', positive: true }
];

export default function PerformanceMetrics() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              className={`group p-6 ${metric.bgColor} bg-opacity-20 border ${metric.borderColor} hover:bg-opacity-30 transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-start justify-between mb-4">
                <Icon className={`w-6 h-6 ${metric.color}`} />
                <span className={`text-3xl font-mono font-light ${metric.color}`}>
                  {metric.value}
                </span>
              </div>
              <p className="text-gray-400 text-sm font-mono uppercase tracking-wider">
                {metric.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {additionalMetrics.map((metric, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-900 bg-opacity-50 border border-gray-800 flex items-center justify-between hover:border-gray-700 transition-colors"
          >
            <span className="text-gray-400 text-sm font-mono">{metric.label}</span>
            <span
              className={`text-xl font-mono ${
                metric.negative
                  ? 'text-red-400'
                  : metric.positive
                  ? 'text-emerald-400'
                  : 'text-gray-300'
              }`}
            >
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
