# Backend Service Documentation

## Overview

This backend service is built following Clean Architecture principles, providing a robust and maintainable foundation for task management functionality.

## Architecture

### Clean Architecture Layers

1. **Domain Layer**

   - Contains business logic and rules
   - Defines entities, value objects, and domain events
   - Implements domain-driven design patterns
   - Location: `src/task/domain`

2. **Application Layer**

   - Implements use cases
   - Orchestrates domain objects
   - Handles business operations
   - Location: `src/task/application`

3. **Infrastructure Layer**

   - Implements repositories
   - Handles database operations
   - Manages external services
   - Location: `src/task/infrastructure`

4. **Interface Layer**
   - Contains API controllers
   - Handles HTTP requests/responses
   - Manages API documentation
   - Location: `src/task/infrastructure/controllers`

## Technologies

### Core Technologies

- **Node.js**: Runtime environment
- **NestJS**: Progressive Node.js framework
- **TypeScript**: Programming language

### Database

- **PostgreSQL**: Primary database
- **Prisma**: ORM for database operations
  - Type-safe database client
  - Schema management
  - Migrations

### API Documentation

- **OpenAPI (Swagger)**: API documentation and testing
  - Interactive API documentation
  - Request/response schema validation
  - Available at: `http://127.0.0.1:3000/api/v1/docs`

### Testing

- **Jest**: Testing framework
- **Supertest**: HTTP testing

## Project Structure

```
src/
├── config/         # Application configuration
├── shared/         # Shared utilities and base classes
└── task/           # Task module
    ├── application/  # Use cases
    ├── domain/      # Domain entities and logic
    └── infrastructure/ # External implementations
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Run database migrations
pnpm prisma migrate dev

# Start development server
pnpm dev
```

### API Documentation

Once the server is running, access the Swagger documentation at:

```
http://localhost:3000/api/docs
```

### Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm test`: Run tests
- `pnpm test:watch`: Run tests in watch mode
- `pnpm prisma:generate`: Generate Prisma client
- `pnpm prisma:migrate`: Run database migrations

## API Features

### Task Management

- Create tasks
- Update task status
- Delete tasks
- List tasks with filters
- Task status tracking (PENDING/OVERDUE)

## Error Handling

- Standardized error responses
- Domain-specific exceptions
- Global exception filters

## Development Guidelines

### Code Organization

- Follow Clean Architecture principles
- Use domain-driven design patterns
- Maintain separation of concerns

### Testing Strategy

- Unit tests for domain logic
- Integration tests for use cases
- E2E tests for API endpoints

### Naming Conventions

- Use descriptive names for classes and methods
- Follow TypeScript naming conventions
- Use domain terminology consistently
