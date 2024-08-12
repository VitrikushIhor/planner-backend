# Planner Backend

The Planner Backend is a robust backend service designed to manage and support a comprehensive planning application. Built with NestJS, Prisma ORM, and PostgreSQL, it offers a scalable and efficient platform for handling various planning-related tasks. The service is containerized using Docker, ensuring easy deployment and consistent environment management.This backend provides RESTful APIs with comprehensive documentation via Swagger, allowing for seamless integration with frontend services and other applications. It also includes unit and E2E tests for maintaining code quality.

## Requirements

- Node.js (v16+)
- Yarn
- PostgreSQL

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/VitrikushIhor/planner-backend.git
    cd planner-backend
    ```

2. Install dependencies:
    ```bash
    yarn install
    ```

3. Set up environment variables in the `.env` file.

4. Start Docker:
    ```bash
    docker-compose up
    ```

## Running the Application

- Development:
    ```bash
    yarn run start:dev
    ```

- Production:
    ```bash
    yarn run start:prod
    ```

## Technologies Used

- **NestJS** - A progressive Node.js framework.
- **Prisma ORM** - Type-safe database access for TypeScript & Node.js.
- **PostgreSQL** - A powerful, open-source object-relational database.
- **Docker** - Containerization for consistent environments.

## License

This project is licensed under the MIT License.
