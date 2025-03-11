# UniPathAI Backend

This is the backend server for UniPathAI, an AI-powered college application platform. It provides APIs for user authentication, profile management, essay assistance, college recommendations, and more.

## Technology Stack

- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** with Prisma ORM for data storage
- **Firebase** for real-time features
- **OpenAI API** with LangChain for AI features
- **JWT** for authentication
- **Stripe** for payment processing

## Prerequisites

Before setting up the backend, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v8 or higher)
- PostgreSQL (v13 or higher)
- Firebase account (for real-time features)
- OpenAI API key
- Stripe account (for payment processing)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd unipathai-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/unipathai_db"

# JWT Secret Key (should be a complex string in production)
JWT_SECRET="your-jwt-secret-key-change-in-production"
JWT_EXPIRY="7d"

# Stripe API Keys
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"

# OpenAI API Key
OPENAI_API_KEY="your-openai-api-key"

# Firebase Config (Add your Firebase Admin SDK config values)
FIREBASE_PROJECT_ID="your-firebase-project-id"
FIREBASE_PRIVATE_KEY="your-firebase-private-key"
FIREBASE_CLIENT_EMAIL="your-firebase-client-email"

# Server Config
PORT=4000
NODE_ENV="development"
```

Replace the placeholder values with your actual credentials.

### 4. Set Up the Database

Create a PostgreSQL database:

```bash
createdb unipathai_db
```

Or use a PostgreSQL client to create the database.

### 5. Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

This will create the database tables based on the Prisma schema.

### 6. Generate Prisma Client

```bash
npx prisma generate
```

This will generate the Prisma client for database operations.

### 7. Start the Development Server

```bash
npm run dev
```

The server will start on http://localhost:4000 (or the port specified in your .env file).

### 8. Build for Production

```bash
npm run build
```

This will compile the TypeScript code to JavaScript in the `dist` directory.

### 9. Start the Production Server

```bash
npm start
```

## API Documentation

The API provides the following endpoints:

- **Authentication**

  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login a user
  - `GET /api/auth/me` - Get current user

- **User Management**

  - `GET /api/users` - Get all users (admin only)
  - `GET /api/users/profile` - Get user profile
  - `POST /api/users/profile` - Create or update user profile

- **Essay Management**

  - `GET /api/essays` - Get all essays for a user
  - `GET /api/essays/:id` - Get a specific essay
  - `POST /api/essays` - Create a new essay
  - `PUT /api/essays/:id` - Update an essay
  - `DELETE /api/essays/:id` - Delete an essay
  - `POST /api/essays/:id/feedback` - Get AI feedback for an essay
  - `POST /api/essays/:id/improvements` - Get AI improvement suggestions (premium)
  - `POST /api/essays/outline` - Generate an essay outline (premium)

- **University Management**

  - `GET /api/universities` - Get all universities
  - `GET /api/universities/:id` - Get a specific university

- **Application Management**

  - `GET /api/applications` - Get all applications for a user
  - `GET /api/applications/:id` - Get a specific application
  - `POST /api/applications` - Create a new application
  - `PUT /api/applications/:id` - Update an application
  - `DELETE /api/applications/:id` - Delete an application

- **Payment Management**
  - `POST /api/payments/create-subscription` - Create a subscription
  - `POST /api/payments/webhook` - Handle Stripe webhook events

## License

[MIT](LICENSE)
