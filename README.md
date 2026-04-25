# 🍽️ Food App - Food Classification & Management System

A modern web application built with **Next.js** that helps users classify and manage food items based on their nutritional characteristics. Users can distinguish between **fresh/whole foods** and **ultra-processed foods (UPF)** with an intuitive interface.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Scripts](#scripts)
- [Contributing](#contributing)

## ✨ Features

- **Food Classification**: Categorize foods as Fresh or Ultra-Processed Food (UPF)
- **Create & Manage Foods**: Add, view, and manage food items with detailed information
- **Food Details**: Store ingredients, descriptions, images, and classification type
- **Responsive Design**: Modern, mobile-friendly UI with Tailwind CSS
- **Real-time Database**: PostgreSQL via Supabase with Prisma ORM
- **Type-Safe**: Full TypeScript support for robust development
- **RESTful API**: Complete CRUD operations for food management
- **Authentication Ready**: Supabase authentication integration (expandable)

## 🛠️ Tech Stack

### Frontend

- **Next.js 16.2.4** - React framework with App Router
- **React 19.2.4** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Modern icon library

### Backend & Database

- **Prisma 5.22.0** - ORM for database operations
- **PostgreSQL** - Relational database (via Supabase)
- **Supabase** - Backend-as-a-Service (Authentication & Database)

### Development Tools

- **ESLint 9** - Code quality & linting
- **TypeScript** - Static type checking
- **TSX** - TypeScript CLI support

### HTTP Client

- **Axios 1.15.2** - HTTP client for API calls

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Git** - Version control
- **Supabase Account** - [Sign up](https://supabase.com)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd food-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]"

# Supabase (optional for auth features)
NEXT_PUBLIC_SUPABASE_URL="https://[project].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

## 🗄️ Database Setup

### 1. Initialize Prisma & Create Database

```bash
# Push the schema to your database
npm run db:push
```

### 2. Seed Sample Data (Optional)

```bash
npm run db:seed
```

This will populate the database with sample food items for testing.

### 3. View Database in Prisma Studio

```bash
npx prisma studio
```

Opens a visual interface to manage your database at `http://localhost:5555`

## 📁 Project Structure

```
food-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── foods/              # API endpoints for food operations
│   │   │       ├── route.ts        # GET all foods, POST new food
│   │   │       └── [id]/
│   │   │           └── route.ts    # GET detail, PUT update, DELETE
│   │   ├── foods/
│   │   │   ├── page.tsx            # Food list page
│   │   │   ├── [id]/               # Food detail page
│   │   │   └── create/             # Create food page
│   │   ├── login/                  # Authentication page (ready for expansion)
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home/landing page
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── CreateFoodForm.tsx      # Form for creating foods
│   │   ├── FoodCard.tsx            # Food item card component
│   │   ├── FoodDetailForm.tsx      # Form for editing foods
│   │   ├── Navbar.tsx              # Navigation bar
│   │   └── ui/                     # Reusable UI components
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── FormField.tsx
│   │       └── index.ts
│   ├── hooks/
│   │   └── useFoodForm.ts          # Custom hook for form state management
│   ├── lib/
│   │   ├── axios.ts                # Axios instance configuration
│   │   ├── prisma.ts               # Prisma client singleton
│   │   └── utils.ts                # Utility functions
│   ├── types/
│   │   ├── food.ts                 # Food-related types
│   │   └── middleware.ts           # Middleware types
│   └── services/                   # (Ready for expansion)
├── prisma/
│   ├── schema.prisma               # Database schema definition
│   ├── migrations/                 # Migration history
│   └── seed.ts                     # Seed data script
├── public/                         # Static assets
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.mjs             # Tailwind CSS configuration
├── eslint.config.mjs               # ESLint configuration
└── package.json                    # Project dependencies
```

## 🔌 API Documentation

### Endpoints

#### 1. Get All Foods

```http
GET /api/foods
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "clxx123456",
      "name": "Apple",
      "description": "Fresh red apple from farm",
      "ingredients": "100% Apple",
      "type": "fresh",
      "imageUrl": "https://...",
      "createdAt": "2025-04-24T10:30:00Z"
    }
  ]
}
```

#### 2. Create Food

```http
POST /api/foods
Content-Type: application/json

{
  "name": "Instant Ramen",
  "description": "Instant noodles with seasoning",
  "ingredients": "Wheat flour, salt, flavorings, preservatives",
  "type": "upf",
  "imageUrl": "https://..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "clxx789012",
    "name": "Instant Ramen",
    "type": "upf",
    ...
  }
}
```

#### 3. Get Food Detail

```http
GET /api/foods/:id
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "clxx123456",
    "name": "Apple",
    ...
  }
}
```

#### 4. Update Food

```http
PUT /api/foods/:id
Content-Type: application/json

{
  "name": "Green Apple",
  "description": "Fresh green apple",
  ...
}
```

#### 5. Delete Food

```http
DELETE /api/foods/:id
```

### Food Types

- **fresh**: Fresh/whole food (fruits, vegetables, etc.)
- **upf**: Ultra-Processed Food (packaged snacks, instant noodles, etc.)

## 👨‍💻 Development

### Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

## 🏗️ Code Architecture

### Type Safety

- All API responses use `ApiResponse<T>` wrapper type
- Food data uses Prisma-generated types from schema
- Custom hooks use TypeScript generics for flexibility

### Component Structure

- **Smart Components**: Pages with data fetching logic
- **Presentational Components**: Reusable UI components (Button, FormField, etc.)
- **Custom Hooks**: Shared form logic in `useFoodForm`

### State Management

- React hooks for local component state
- Axios for API calls
- No additional state management library needed (lightweight architecture)

## 📝 Database Schema

### Food Model

```prisma
model Food {
  id          String   @id @default(cuid())
  name        String
  ingredients String
  description String   @db.Text
  type        FoodType
  imageUrl    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum FoodType {
  upf      # Ultra Processed Food
  fresh    # Fresh/whole food
}
```

## 🎨 Styling

- **Framework**: Tailwind CSS 4
- **Icons**: Lucide React
- **Colors**: Warm color scheme (amber, orange, stone)
- **Responsive**: Mobile-first design approach

## 🔒 Security Features

- Environment variables for sensitive data
- Prisma for SQL injection prevention
- Type safety with TypeScript
- Input validation on API routes
