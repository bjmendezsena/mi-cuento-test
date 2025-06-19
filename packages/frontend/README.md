# Mi Cuento Test - Frontend

This is the frontend application for Mi Cuento Test, built with React, TypeScript, and Vite. The application provides a modern and responsive user interface for task management.

## Core Technologies

- React 18
- TypeScript
- Vite
- Material UI
- React Query
- React Hook Form

## Prerequisites

- Node.js (version 18 or higher)
- pnpm (package manager)
- Backend application running

## Environment Setup

1. Clone the repository (if you haven't already):
```bash
git clone <repository-url>
cd mi-cuento-test
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.template .env
```

Edit the `.env` file with appropriate values:
```env
VITE_API_URL=http://localhost:3000/api/v1  # Backend URL
```

## Running the Application

### Development

To run the application in development mode:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Production

To build the application for production:

```bash
pnpm build
```

To preview the production build:

```bash
pnpm preview
```

## Code Quality

### ESLint

The project uses ESLint to maintain consistent and high-quality code. The configuration includes rules for TypeScript and React.

To run the linter:

```bash
pnpm lint
```

To automatically fix issues that can be resolved:

```bash
pnpm lint:fix
```

### Testing

To run tests:

```bash
pnpm test
```

To run tests in watch mode:

```bash
pnpm test:watch
```

## Project Structure

```
src/
├── components/     # Reusable components
├── hooks/          # Custom hooks
├── lib/            # Configurations and utilities
├── pages/          # Application pages/routes
├── services/       # API services
└── types/          # TypeScript type definitions
```

## Contributing

1. Create a branch for your feature: `git checkout -b feature/feature-name`
2. Make your changes and commit: `git commit -m 'feat: change description'`
3. Push your changes: `git push origin feature/feature-name`
4. Create a Pull Request

```
