# Authentication System Implementation Guide

This document provides an overview of the authentication system implemented for UniPathAI.com, including setup instructions and usage guidelines.

## Overview

The authentication system includes:

1. **User Model**: Complete with roles (Student, Counselor, Parent, University, Admin)
2. **NextAuth.js Integration**: For secure authentication using both credentials and OAuth
3. **Role-Based Access Control**: To protect routes based on user roles
4. **Login and Registration**: Complete authentication flow with error handling

## Installation

The required packages have been installed:

- `next-auth`: Authentication framework
- `bcrypt`: Password hashing
- `@prisma/client`: Database ORM
- `@auth/prisma-adapter`: (Currently not used due to compatibility issues)
- `@types/bcrypt`: Type definitions for bcrypt

## Setup Steps

### 1. Database Setup

1. **Set up your database**:

   ```bash
   # Create a PostgreSQL database (example using Docker)
   docker run --name unipathai-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

   # Or use a local PostgreSQL server
   ```

2. **Run migrations to create tables**:

   ```bash
   npx prisma migrate dev --name init
   ```

### 2. Environment Variables

Ensure your `.env` file contains the following:

```
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/unipathai"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-in-production"

# OAuth Providers (optional for now)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

In production, generate a strong NEXTAUTH_SECRET value:

```bash
openssl rand -base64 32
```

### 3. OAuth Setup (Optional)

For Google authentication:

1. Go to https://console.cloud.google.com/
2. Create a project
3. Configure OAuth consent screen
4. Create OAuth client ID credentials
5. Add authorized redirect URIs:
   - http://localhost:3000/api/auth/callback/google (development)
   - https://yourdomain.com/api/auth/callback/google (production)
6. Add the Client ID and Secret to your .env file

## Usage

### Authentication API

- **Login**: POST to `/api/auth/callback/credentials` with email/password
- **Register**: POST to `/api/auth/register` with name/email/password
- **OAuth Login**: Redirect to `/api/auth/signin/google`
- **Logout**: POST to `/api/auth/signout`

### React Hooks

**useAuth Hook**: For protected pages and role-based access

```jsx
// Require authentication
const { user, isLoading } = useAuth({ required: true });

// Require specific role
const { user, isLoading } = useAuth({
  required: true,
  roles: [UserRole.ADMIN],
});

// Redirect if logged in (for login/register pages)
useAuth({ redirectIfFound: true });
```

### Protected Routes

Every page that requires authentication should use the `useAuth` hook:

```jsx
export default function ProtectedPage() {
  const { user, isLoading } = useAuth({ required: true });

  if (isLoading) return <LoadingSpinner />;

  return <div>Welcome, {user?.name}!</div>;
}
```

## Custom Components

1. **AuthForm**: Handles both login and registration forms
2. **AuthProvider**: Provides NextAuth session to your app

## User Roles and Permissions

The system supports five roles:

1. **STUDENT**: Default role for all new users
2. **COUNSELOR**: For admission counselors/mentors
3. **PARENT**: For parents monitoring their child's applications
4. **UNIVERSITY**: For university representatives
5. **ADMIN**: For platform administrators

## Next Steps

1. **Setup Dashboard Pages**: Create role-specific dashboard features
2. **Implement Role Assignment**: Currently all users default to STUDENT role
3. **Add Email Verification**: For increased security
4. **Expand OAuth Providers**: Consider adding Microsoft, Apple, etc.
5. **Password Reset Flow**: Implement forgot/reset password functionality

## Troubleshooting

If you encounter issues:

1. Ensure database connection is working
2. Check that Prisma migrations have been applied
3. Verify environment variables are correctly set
4. Check browser console/network tab for errors
5. Examine server logs for backend errors

---

Feel free to modify this authentication system to fit additional requirements as needed.
