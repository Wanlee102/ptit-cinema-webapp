# Aicademy Frontend

A modern, interactive learning platform that combines AI-powered education with gamified experiences. Built with cutting-edge web technologies to deliver personalized learning journeys in AI, blockchain, and emerging technologies.

## ✨ Features

- 🌐 **Multi-language Support** - Full internationalization with English and Vietnamese
- 🎮 **Interactive Learning Games** - Drag-and-drop, quizzes, and engaging activities
- 🤖 **AI Assistant (Ailo)** - 24/7 AI companion for learning support
- 📊 **Progress Tracking** - XP system, achievements, and learning analytics
- 🏆 **Gamified Experience** - Badges, leagues, and Hall of Fame
- 📱 **Mobile-First Design** - Responsive across all devices
- 🔐 **Social Learning** - Share progress and learn with friends

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Routing**: TanStack Router (file-based routing)
- **Styling**: Tailwind CSS
- **Internationalization**: Paraglide JS
- **State Management**: Jotai
- **UI Components**: Radix UI + shadcn/ui
- **Build Tool**: Vite
- **Deployment**: Cloudflare Pages
- **APIs**: TanStack Query for data fetching

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **pnpm** package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd aicademy-frontend

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

The application will be available at `http://localhost:3000`

### Environment Setup

Create a `.env.local` file with necessary environment variables:

```env
# Add your environment variables here
VITE_API_BASE_URL=your-api-url
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   ├── course/         # Course-related components
│   ├── games/          # Interactive learning games
│   ├── chatbot/        # AI assistant components
│   └── lesson/         # Lesson and learning components
├── routes/             # File-based routing (TanStack Router)
│   ├── __layout/       # Layout routes
│   ├── courses/        # Course pages
│   └── learn/          # Learning interface
├── messages/           # Translation files
│   ├── en.json         # English translations
│   └── vi.json         # Vietnamese translations
├── data/              # Static data and configurations
├── services/          # API services and data fetching
├── store/             # Zustand state management
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── docs/              # Project documentation
```

## 🔗 Available Scripts

```bash
# Development
pnpm dev                # Start development server
pnpm build              # Build for production
pnpm preview            # Preview production build

# Code Quality
pnpm lint               # Run ESLint
pnpm typecheck          # Run TypeScript checks

# Translation
pnpm paraglide:compile  # Compile translation messages
```

## 🌍 Internationalization

The project uses **Paraglide JS** for internationalization:

- Translation files: `messages/en.json` and `messages/vi.json`
- Usage in components: `import * as m from "@/paraglide/messages.js"`
- Language switching: Built-in language toggle component

### Adding Translations

1. Add keys to both `en.json` and `vi.json`
2. Use in components: `{m["your.translation.key"]()}`
3. Always call translation functions inside React components

See `docs/translation-flow.md` for detailed guidelines.

## 🎯 Key Learning Features

### Interactive Games
- **Drag & Drop**: Organize concepts and statements
- **Quizzes**: Multiple choice and single answer formats
- **Line Matching**: Connect related concepts

### AI Assistant (Ailo)
- Context-aware help during lessons
- Instant explanations and examples
- 24/7 availability for learning support

### Progress System
- **XP Points**: Earned through lesson completion
- **Badges**: Achievement milestones
- **Leagues**: Competitive ranking system
- **Hall of Fame**: Top learner recognition

## 🏗️ Architecture Decisions

### Routing
- **TanStack Router**: File-based routing with type safety
- Layouts for consistent page structure
- Route-level code splitting

### State Management
- **Jotai**: Lightweight state management
- Separate stores for different domains (auth, chat, lesson, etc.)

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **UnoCSS**: Additional atomic CSS utilities
- **Custom Design System**: Consistent component library

### Data Fetching
- **TanStack Query**: Server state management
- Optimistic updates and caching
- Background refetching

## 🔧 Development Guidelines

### Component Development
- Use TypeScript for all components
- Follow the component composition pattern
- Implement proper error boundaries

### Translation Best Practices
- Always call `m["key"]()` inside React components
- Use nested key structure: `"section.subsection.key"`
- Test both English and Vietnamese translations

### Code Quality
- Run type checking before commits
- Follow established naming conventions
- Write self-documenting code

**Happy Learning! 🚀**

For detailed documentation, see the `docs/` folder.
