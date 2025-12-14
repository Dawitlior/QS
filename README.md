# Meta Decision Engine

A systematic investment framework visualization that demonstrates structured capital allocation across cryptocurrency markets using multiple independent decision systems.

## Overview

This project presents a comprehensive visual representation of a quantitative trading system that aggregates multiple independent analytical frameworks to make capital allocation decisions. The system prioritizes structure, temporal coherence, and consensus-based decision-making over discretionary trading.

## Core Concepts

### Time Coherency
The foundation of the system is temporal alignment. Signals are only considered valid within their intended time horizon, preventing the mixing of short-term signals with long-term positions.

### Meta Decision Engine
A structured aggregation layer that synthesizes multiple independent systems, each answering different market questions across various time horizons:

- **LTPI** - Long-term trend persistence evaluation
- **MTPI** - Medium-term momentum analysis
- **TPI** - Tactical positioning opportunities
- **STPI** - Short-term signals for Bitcoin, Ethereum, Solana, and SUI
- **Regime Systems** - Market state and structural condition assessment
- **Relative Strength** - Pairwise asset dominance network

### Aggregation Logic
No single system can trigger capital allocation. Decisions emerge only from quantitative consensus across multiple independent frameworks, reducing timing errors and false conviction.

## System Architecture

```
Signal Systems → Meta Score Engine → Relative Strength Network → Capital Allocation
     ↓                  ↓                      ↓                        ↓
  +1/0/-1        Aggregation Score      Pairwise Analysis       BTC/ETH/SOL/SUI
```

### Decision States

1. **CASH** - No allocation permitted (negative or low consensus)
2. **PERMITTED** - Allocation allowed but position size below threshold
3. **ALLOCATED** - Active position based on consensus strength

## Features

- **Interactive Signal Visualization** - Real-time animation of system states and signal flows
- **Performance Metrics** - Backtest results comparing system performance vs. benchmark
- **Quantitative Scoring** - Mathematical representation of scoring methodology
- **Tournament Bracket** - Visual representation of relative strength selection process
- **Time Coherency Diagrams** - Illustration of temporal alignment principles
- **Signal Conflict Resolution** - Visualization of aggregation logic

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── MetaEngineFlow.tsx       # Main decision engine visualization
│   │   ├── PerformanceMetrics.tsx   # Performance data display
│   │   ├── PerformanceChart.tsx     # Equity curve visualization
│   │   ├── TimeCoherencyVisual.tsx  # Time alignment demonstration
│   │   ├── QuantitativeScoring.tsx  # Scoring methodology
│   │   ├── SignalConflictVisual.tsx # Aggregation logic illustration
│   │   ├── TournamentBracket.tsx    # Asset selection visualization
│   │   ├── EvidenceLayer.tsx        # Performance proof section
│   │   ├── TimelineNav.tsx          # Section navigation
│   │   └── SystemArchitecture.tsx   # System overview
│   ├── App.tsx                       # Main application component
│   ├── main.tsx                      # Application entry point
│   └── index.css                     # Global styles
├── public/                           # Static assets
└── package.json                      # Dependencies and scripts
```

## Key Principles

### No Prediction
The system does not forecast prices or predict market tops/bottoms. It manages exposure, allocation, and rotation based on quantitative state.

### No Discretion
All decisions follow quantitative rules with no subjective interpretation. Emotional decision-making is eliminated through structural constraints.

### Regime Awareness
Capital allocation adapts based on market regime. The system holds cash during unfavorable conditions rather than maintaining continuous exposure.

### Capital Preservation
Risk management is prioritized over aggressive returns. No leverage is assumed in performance calculations.

## Performance Data

The system includes empirical results from May 31, 2025 to December 12, 2025, demonstrating:

- Risk-adjusted outperformance vs. Bitcoin benchmark
- Regime-aware capital allocation reducing drawdowns
- Capital preservation during adverse market conditions
- Strategic cash positions (60 days out of market during the period)

Individual system proof (MTPI) shows standalone functionality with 62% returns vs. Bitcoin's 40% from August 24, 2024 onwards.

## Constraints

The system operates under strict structural constraints:

- No discretionary trading
- No signal selling or monetization
- No leverage assumption
- No continuous exposure requirement
- No narrative-based decisions
- No single-system dominance

## Disclaimer

This framework is presented for structural and educational transparency only. It does not constitute financial advice, a trading recommendation, or a guarantee of performance. The system is under continuous development, and formulas, scoring logic, and execution rules may evolve.

All data reflects the system state as of December 30, 2025.

## License

This project is provided as-is for educational and research purposes.

## Author

Systematic Investment Framework Research Project

---

**Note**: This is a visualization and documentation tool for a systematic investment framework. It is not a trading platform and does not execute actual trades.
# systematic-investment-framework
# systematic-investment-framework
# systematic-investment-framework
