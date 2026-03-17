export interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  language?: string;
  role?: string;
}

export interface Dependency {
  name: string;
  version: string;
  type: "production" | "dev";
}

export interface AnalysisResult {
  projectName: string;
  language: string;
  framework: string;
  summary: string;
  architecture: string;
  entryPoint: string;
  executionFlow: string;
  modules: { name: string; description: string }[];
  fileTree: FileNode[];
  dependencies: Dependency[];
}

export const sampleAnalysis: AnalysisResult = {
  projectName: "e-commerce-platform",
  language: "TypeScript",
  framework: "React + Node.js (Express)",
  summary:
    "This project is a full-stack e-commerce platform built with React and Node.js. The frontend uses React with Redux for state management and Tailwind CSS for styling. The backend is an Express.js server following MVC architecture with MongoDB as the database. It includes user authentication via JWT, payment processing with Stripe, and a RESTful API.",
  architecture:
    "The system follows a 3-tier architecture: Presentation Layer (React SPA) → Application Layer (Express API) → Data Layer (MongoDB). Communication between frontend and backend happens via RESTful API calls. External integrations include Stripe for payments, SendGrid for emails, and AWS S3 for file storage.",
  entryPoint: "server/src/index.ts",
  executionFlow:
    "1. server/src/index.ts initializes Express and connects to MongoDB\n2. Routes are loaded from server/src/routes/\n3. Middleware handles auth, logging, and error handling\n4. Controllers process requests and call service layer\n5. Services interact with MongoDB models\n6. Frontend boots from client/src/main.tsx → App.tsx → Router",
  modules: [
    { name: "Authentication", description: "JWT-based auth with refresh tokens, OAuth2 Google/GitHub login, password reset flow" },
    { name: "Product Catalog", description: "CRUD operations for products with categories, search, filtering, and pagination" },
    { name: "Shopping Cart", description: "Redis-backed cart with real-time sync, quantity management, and price calculation" },
    { name: "Payment Processing", description: "Stripe integration for checkout, webhooks for order status, refund handling" },
    { name: "User Management", description: "Profile management, order history, wishlist, and address book" },
    { name: "Admin Dashboard", description: "Analytics, inventory management, order processing, and user administration" },
  ],
  fileTree: [
    {
      name: "client",
      type: "folder",
      children: [
        {
          name: "src",
          type: "folder",
          children: [
            { name: "main.tsx", type: "file", language: "TypeScript", role: "Entry Point" },
            { name: "App.tsx", type: "file", language: "TypeScript", role: "Root Component" },
            {
              name: "components",
              type: "folder",
              children: [
                { name: "Header.tsx", type: "file", language: "TypeScript" },
                { name: "ProductCard.tsx", type: "file", language: "TypeScript" },
                { name: "CartDrawer.tsx", type: "file", language: "TypeScript" },
                { name: "CheckoutForm.tsx", type: "file", language: "TypeScript" },
              ],
            },
            {
              name: "pages",
              type: "folder",
              children: [
                { name: "Home.tsx", type: "file", language: "TypeScript" },
                { name: "ProductList.tsx", type: "file", language: "TypeScript" },
                { name: "ProductDetail.tsx", type: "file", language: "TypeScript" },
                { name: "Cart.tsx", type: "file", language: "TypeScript" },
                { name: "Checkout.tsx", type: "file", language: "TypeScript" },
                { name: "Dashboard.tsx", type: "file", language: "TypeScript" },
              ],
            },
            {
              name: "store",
              type: "folder",
              children: [
                { name: "index.ts", type: "file", language: "TypeScript", role: "Redux Store" },
                { name: "cartSlice.ts", type: "file", language: "TypeScript" },
                { name: "authSlice.ts", type: "file", language: "TypeScript" },
                { name: "productSlice.ts", type: "file", language: "TypeScript" },
              ],
            },
            {
              name: "services",
              type: "folder",
              children: [
                { name: "api.ts", type: "file", language: "TypeScript", role: "API Client" },
                { name: "auth.ts", type: "file", language: "TypeScript" },
                { name: "products.ts", type: "file", language: "TypeScript" },
              ],
            },
          ],
        },
        { name: "package.json", type: "file", role: "Config" },
        { name: "tailwind.config.js", type: "file", role: "Config" },
      ],
    },
    {
      name: "server",
      type: "folder",
      children: [
        {
          name: "src",
          type: "folder",
          children: [
            { name: "index.ts", type: "file", language: "TypeScript", role: "Server Entry" },
            { name: "app.ts", type: "file", language: "TypeScript", role: "Express App" },
            {
              name: "routes",
              type: "folder",
              children: [
                { name: "auth.ts", type: "file", language: "TypeScript" },
                { name: "products.ts", type: "file", language: "TypeScript" },
                { name: "orders.ts", type: "file", language: "TypeScript" },
                { name: "users.ts", type: "file", language: "TypeScript" },
              ],
            },
            {
              name: "controllers",
              type: "folder",
              children: [
                { name: "authController.ts", type: "file", language: "TypeScript", role: "Controller" },
                { name: "productController.ts", type: "file", language: "TypeScript", role: "Controller" },
                { name: "orderController.ts", type: "file", language: "TypeScript", role: "Controller" },
              ],
            },
            {
              name: "models",
              type: "folder",
              children: [
                { name: "User.ts", type: "file", language: "TypeScript", role: "Model" },
                { name: "Product.ts", type: "file", language: "TypeScript", role: "Model" },
                { name: "Order.ts", type: "file", language: "TypeScript", role: "Model" },
              ],
            },
            {
              name: "services",
              type: "folder",
              children: [
                { name: "stripeService.ts", type: "file", language: "TypeScript", role: "Service" },
                { name: "emailService.ts", type: "file", language: "TypeScript", role: "Service" },
                { name: "s3Service.ts", type: "file", language: "TypeScript", role: "Service" },
              ],
            },
            {
              name: "middleware",
              type: "folder",
              children: [
                { name: "auth.ts", type: "file", language: "TypeScript", role: "Middleware" },
                { name: "errorHandler.ts", type: "file", language: "TypeScript", role: "Middleware" },
                { name: "rateLimiter.ts", type: "file", language: "TypeScript", role: "Middleware" },
              ],
            },
          ],
        },
        { name: "package.json", type: "file", role: "Config" },
        { name: "tsconfig.json", type: "file", role: "Config" },
      ],
    },
    { name: "docker-compose.yml", type: "file", role: "Config" },
    { name: ".env.example", type: "file", role: "Config" },
    { name: "README.md", type: "file", role: "Documentation" },
  ],
  dependencies: [
    { name: "react", version: "^18.2.0", type: "production" },
    { name: "react-dom", version: "^18.2.0", type: "production" },
    { name: "react-router-dom", version: "^6.20.0", type: "production" },
    { name: "@reduxjs/toolkit", version: "^2.0.1", type: "production" },
    { name: "axios", version: "^1.6.2", type: "production" },
    { name: "tailwindcss", version: "^3.4.0", type: "dev" },
    { name: "express", version: "^4.18.2", type: "production" },
    { name: "mongoose", version: "^8.0.3", type: "production" },
    { name: "jsonwebtoken", version: "^9.0.2", type: "production" },
    { name: "stripe", version: "^14.11.0", type: "production" },
    { name: "bcryptjs", version: "^2.4.3", type: "production" },
    { name: "@sendgrid/mail", version: "^8.1.0", type: "production" },
    { name: "aws-sdk", version: "^2.1517.0", type: "production" },
    { name: "redis", version: "^4.6.12", type: "production" },
    { name: "jest", version: "^29.7.0", type: "dev" },
    { name: "typescript", version: "^5.3.3", type: "dev" },
  ],
};
