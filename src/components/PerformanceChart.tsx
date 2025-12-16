import { useEffect, useState, useRef } from 'react';

export default function PerformanceChart() {
  const [revealProgress, setRevealProgress] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  const dataPoints = [
    { date: 'May 31', system: 0, btc: 0 },
    { date: 'Jun 30', system: 12, btc: -5 },
    { date: 'Jul 31', system: 28, btc: -8 },
    { date: 'Aug 31', system: 35, btc: -3 },
    { date: 'Sep 30', system: 48, btc: 2 },
    { date: 'Oct 31', system: 58, btc: -6 },
    { date: 'Nov 30', system: 68, btc: -10 },
    { date: 'Dec 12', system: 75.7, btc: -13.71 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progress = Math.min(1, entry.intersectionRatio * 2);
            setRevealProgress(progress);
          }
        });
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const chartWidth = 800;
  const chartHeight = 450;
  const padding = { top: 40, right: 40, bottom: 60, left: 60 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const maxValue = 80;
  const minValue = -20;

  const getY = (value: number) => {
    const normalizedValue = value < 0
      ? (value / minValue) * 0.25
      : (value / maxValue) * 0.75;

    return innerHeight - (normalizedValue + 0.25) * innerHeight;
  };

  const xStep = innerWidth / (dataPoints.length - 1);

  const systemPathFull = dataPoints.map((d, i) => {
    const x = i * xStep;
    const y = getY(d.system);
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(' ');

  const btcPathFull = dataPoints.map((d, i) => {
    const x = i * xStep;
    const y = getY(d.btc);
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(' ');

  const visiblePointCount = Math.floor(revealProgress * dataPoints.length);

  const systemPath = dataPoints
    .slice(0, visiblePointCount + 1)
    .map((d, i) => {
      const x = i * xStep;
      const y = getY(d.system);
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(' ');

  const btcPath = dataPoints
    .slice(0, visiblePointCount + 1)
    .map((d, i) => {
      const x = i * xStep;
      const y = getY(d.btc);
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(' ');

  const gridLines = [80, 60, 40, 20, 0, -20];

  return (
    <div ref={chartRef} className="p-4 sm:p-8 bg-gray-950 border border-gray-800 w-full overflow-hidden">
      <h3 className="text-lg sm:text-xl text-white mb-6 sm:mb-8 font-mono">Cumulative Performance</h3>

      <div className="flex justify-center w-full overflow-x-auto">
        <svg
          width={chartWidth}
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="bg-black max-w-full h-auto"
          style={{ fontFamily: 'monospace', minWidth: '320px' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <clipPath id="revealClip">
              <rect
                x={0}
                y={0}
                width={innerWidth * revealProgress}
                height={innerHeight}
              />
            </clipPath>
          </defs>

          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {gridLines.map((value) => {
              const y = getY(value);
              return (
                <g key={value}>
                  <line
                    x1={0}
                    y1={y}
                    x2={innerWidth}
                    y2={y}
                    stroke={value === 0 ? '#374151' : '#1a1a1a'}
                    strokeWidth={value === 0 ? 1 : 0.5}
                    opacity={0.3}
                  />
                  <text
                    x={-12}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="10"
                    fill="#4b5563"
                  >
                    {value}%
                  </text>
                </g>
              );
            })}

            {dataPoints.map((d, i) => {
              const x = i * xStep;
              return (
                <g key={i}>
                  <line
                    x1={x}
                    y1={0}
                    x2={x}
                    y2={innerHeight}
                    stroke="#1a1a1a"
                    strokeWidth={0.5}
                    strokeDasharray="2,3"
                    opacity={0.2}
                  />
                  <text
                    x={x}
                    y={innerHeight + 20}
                    textAnchor="end"
                    fontSize="9"
                    fill="#6b7280"
                    transform={`rotate(-45, ${x}, ${innerHeight + 20})`}
                  >
                    {d.date}
                  </text>
                </g>
              );
            })}

            <g clipPath="url(#revealClip)">
              <path
                d={btcPathFull}
                fill="none"
                stroke="#d97706"
                strokeWidth={1.5}
                strokeLinejoin="miter"
                strokeLinecap="butt"
                opacity={0.7}
                style={{
                  strokeDasharray: innerWidth * 2,
                  strokeDashoffset: innerWidth * 2 * (1 - revealProgress),
                  transition: 'stroke-dashoffset 0.3s ease-out'
                }}
              />

              <path
                d={systemPathFull}
                fill="none"
                stroke="#06b6d4"
                strokeWidth={3}
                strokeLinejoin="miter"
                strokeLinecap="butt"
                style={{
                  strokeDasharray: innerWidth * 2,
                  strokeDashoffset: innerWidth * 2 * (1 - revealProgress),
                  transition: 'stroke-dashoffset 0.3s ease-out'
                }}
              />

              {dataPoints.map((d, i) => {
                if (i > visiblePointCount) return null;

                const x = i * xStep;
                const ySystem = getY(d.system);
                const yBtc = getY(d.btc);

                return (
                  <g key={`points-${i}`}>
                    <circle
                      cx={x}
                      cy={yBtc}
                      r={2.5}
                      fill="#d97706"
                      opacity={0.8}
                    />
                    <circle
                      cx={x}
                      cy={ySystem}
                      r={3.5}
                      fill="#06b6d4"
                    />

                    {i > 0 && (
                      <>
                        <line
                          x1={dataPoints[i-1] ? (i-1) * xStep : x}
                          y1={dataPoints[i-1] ? getY(dataPoints[i-1].system) : ySystem}
                          x2={x}
                          y2={dataPoints[i-1] ? getY(dataPoints[i-1].system) : ySystem}
                          stroke="#06b6d4"
                          strokeWidth={3}
                          opacity={0.3}
                        />
                        <line
                          x1={dataPoints[i-1] ? (i-1) * xStep : x}
                          y1={dataPoints[i-1] ? getY(dataPoints[i-1].btc) : yBtc}
                          x2={x}
                          y2={dataPoints[i-1] ? getY(dataPoints[i-1].btc) : yBtc}
                          stroke="#d97706"
                          strokeWidth={1.5}
                          opacity={0.2}
                        />
                      </>
                    )}
                  </g>
                );
              })}
            </g>
          </g>
        </svg>
      </div>

      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-0.5 bg-cyan-500"></div>
          <span className="text-gray-400 text-xs sm:text-sm font-mono">Meta Decision Engine</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-0.5 bg-orange-600 opacity-70"></div>
          <span className="text-gray-500 text-xs sm:text-sm font-mono">Bitcoin HODL</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="p-4 bg-black border border-cyan-900">
          <p className="text-cyan-400 text-2xl font-mono text-center">+75.70%</p>
          <p className="text-gray-600 text-xs font-mono mt-1 text-center">System Performance</p>
        </div>
        <div className="p-4 bg-black border border-orange-900 opacity-80">
          <p className="text-orange-500 text-2xl font-mono text-center">-13.71%</p>
          <p className="text-gray-600 text-xs font-mono mt-1 text-center">BTC HODL</p>
        </div>
      </div>

      <div className="mt-6 p-3 bg-black border border-gray-900">
        <p className="text-xs text-gray-600 font-mono text-center">
          31 May 2025 – 12 December 2025
        </p>
      </div>
    </div>
  );
}
