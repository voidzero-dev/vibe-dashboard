# Vibe Dashboard

A modern frontend dashboard for displaying different metrics using bar charts.

## 🚀 Features

- **Interactive Bar Charts**: Visualize metrics with responsive Recharts components
- **Multiple Metrics**: Switch between Sales, User Activity, and Revenue data
- **Modern UI**: Clean, professional dashboard design with smooth transitions
- **Responsive Design**: Works across desktop and mobile devices
- **TypeScript**: Full type safety throughout the application
- **Monorepo Structure**: Organized with pnpm workspaces

## 📦 Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7 with Rolldown bundler (rolldown-vite)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Monorepo**: pnpm workspaces

## ⚡ Performance

The dashboard uses **rolldown-vite** for significantly faster build times and **oxlint** for ultra-fast linting:
- **Build Performance**: ~13.8x faster builds (309ms vs 4.28s) with Rolldown
- **Linting Performance**: Extremely fast linting (~2ms) with oxlint
- **Development**: Fast startup (306ms) with Rolldown's Rust-based bundler
- **Hot Module Replacement**: Instant updates during development

## 🏗 Project Structure

```
vibe-dashboard/
├── apps/
│   └── dashboard/          # Main dashboard application
│       ├── src/
│       │   ├── App.tsx     # Main dashboard component
│       │   ├── App.css     # Dashboard styles
│       │   └── ...
│       └── package.json
├── packages/               # Shared packages (future)
├── package.json           # Root package.json
├── pnpm-workspace.yaml   # pnpm workspace configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- pnpm (v10 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Boshen/vibe-dashboard.git
cd vibe-dashboard
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build all applications for production
- `pnpm lint` - Run linting across all packages
- `pnpm test` - Run tests across all packages
- `pnpm clean` - Clean build artifacts
- `pnpm build-deploy` - Lint and build for deployment

### Deployment

The dashboard is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

**Live Demo**: [https://boshen.github.io/vibe-dashboard/](https://boshen.github.io/vibe-dashboard/)

The deployment process:
1. Runs linting and builds the project
2. Deploys the built assets to GitHub Pages
3. The app is served with the correct base path `/vibe-dashboard/`

## 📊 Dashboard Features

### Metrics Views

1. **Sales**: Monthly sales data with trend visualization
2. **User Activity**: Daily active/inactive users with stacked bars
3. **Revenue**: Quarterly revenue breakdown

### Interactive Elements

- Click navigation buttons to switch between different metrics
- Hover over chart elements for detailed tooltips
- Responsive design adapts to different screen sizes

## 🔧 Development

### Adding New Metrics

1. Add your data to the respective data arrays in `apps/dashboard/src/App.tsx`
2. Update the metrics configuration with your new metric
3. Customize the chart rendering logic if needed

### Styling

The dashboard uses modern CSS with:
- CSS Grid for responsive layouts
- Flexbox for component alignment
- Custom CSS variables for consistent theming
- Responsive breakpoints for mobile support

## 📝 License

MIT
