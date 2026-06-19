# Vektor

Vektor is a full-stack platform for orchestrating AI-driven workflows, approvals, and audits in a clean, production-ready environment.
It combines a Java Spring Boot backend with an Angular frontend to help manage complex processes with clarity and control.

flowchart TD
  U[User / Operator]

  subgraph P[Vektor Platform]
    FE[Angular UI]
    BE[Spring Boot API]
  end

  subgraph D[Data]
    DB[(PostgreSQL)]
    AL[(Audit Log)]
  end

  subgraph W[Workflow Engine]
    N8N[n8n Container]
    M[Mock Workflows]
    R[Real Workflows]
  end

  U --> FE
  FE --> BE
  BE --> DB
  BE --> AL
  BE --> N8N
  N8N --> M
  N8N --> R
  N8N --> BE

## Why Vektor exists

Vektor is my personal project to build a serious full-stack product that feels closer to a real internal platform than a demo app.
The goal is to explore how to design and ship a maintainable system for workflow orchestration, human approvals, auditability, and future AI-agent integrations.

## What it will do

- Orchestrate multi-step workflows.
- Manage approval gates for sensitive actions.
- Keep a full audit trail of decisions and changes.
- Provide a clear UI to monitor jobs, states, and system health.
- Support future AI-assisted features without turning the project into a toy demo.

## Current status

This project is in early development.
The initial focus is on the foundation: clean repository structure, production-ready boilerplate, backend/frontend separation, and a solid developer experience.

## Tech stack

### Backend
- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- Spring Validation
- Spring Boot Actuator
- Flyway
- PostgreSQL

### Frontend
- Angular
- TypeScript
- Tailwind CSS
- RxJS

### Tooling
- Maven
- Node.js / npm
- ESLint
- Prettier
- Docker

## Repository structure

```text
vektor/
├── backend/
│   ├── .mvn/
│   ├── src/
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   └── application.yaml
├── frontend/
│   ├── src/
│   ├── public/
│   ├── angular.json
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig*.json
└── README.md
```

## Architecture overview

Vektor is organized as a monorepo with two main applications:

- `backend/` exposes a REST API and owns business logic, persistence, security, and audit data.
- `frontend/` consumes the API and provides the user interface for workflow management and monitoring.

The backend is designed to stay API-first, while the frontend stays focused on user experience and state presentation.
This separation keeps the codebase easier to understand, easier to scale, and easier to refactor later.

## Getting started

### Prerequisites
- Java 25
- Node.js
- npm
- Docker
- PostgreSQL

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Full stack with Docker
A Docker Compose setup will be added later to run the full stack locally with one command.

## Roadmap

### Phase 1
- Define the core domain model.
- Add authentication and roles.
- Create the first workflow entities.
- Connect Angular to the backend API.

### Phase 2
- Add approvals and audit trail.
- Build the dashboard UI.
- Add job monitoring and system health views.

### Phase 3
- Add workflow templates.
- Add module generation.
- Introduce AI-assisted features for summaries and suggestions.

## Design principles

- Keep the project production-oriented.
- Prefer clarity over cleverness.
- Build small, testable modules.
- Use explicit workflows and auditability.
- Add AI only where it creates real value.

## Contributing

This is currently a personal project, but the codebase is structured to stay readable and easy to extend.
If it becomes open to contributions later, guidelines will be added here.

## License

License to be defined.