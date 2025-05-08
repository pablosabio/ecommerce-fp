# QuickCart E-commerce Project

This repository contains the QuickCart e-commerce application, which is currently under active development.

## Project Structure

- `/frontend` - React frontend application with Vite
- `/backend` - Express.js API server

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm (v8+)
- MongoDB

### Installation

1. Clone this repository:
git clone https://github.com/pablosabio/ecommerce-fp.git
cd ecommerce-fp

2. Set up the backend:
cd backend
npm install

3. Create a `.env` file in the backend directory with these values:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret // Just for Pablo
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_SECRET_KEY=your_mailjet_secret_key
MAILJET_SENDER_EMAIL=supportquickcard@proton.me

5. Set up the frontend:
cd ../frontend
npm install

### Running the Application

1. Start the backend:
cd backend
node server.js

2. In a new terminal, start the frontend:
cd frontend
npm run dev

3. Open the application at [http://localhost:5173](http://localhost:5173)

4. You will need to run both frontend and backend for some features to work.

## Development Workflow

1. **Always pull the latest changes before starting work:**
git checkout main
git pull origin main

2. **Create a feature branch for your work:**
git checkout -b feature-name

3. **Install dependencies in the correct folders:**
- For backend dependencies: `cd backend && npm install package-name`
- For frontend dependencies: `cd frontend && npm install package-name`
- Never run npm install in the root directory

4. **Commit your changes frequently:**
git add .
git commit -m "Descriptive message about changes"

5. **Push your branch and create a pull request:**
git push origin feature-name

## Current Features

- Product browsing and searching
- Shopping cart functionality
- Checkout process with Stripe integration
- Order history

## Work in Progress

- User authentication
- Scraping web to add more products
- Product reviews and ratings backend
- Admin dashboard
- Advanced filtering and sorting

## Team Guidelines

- Keep commits small and focused on specific changes
- Write descriptive commit messages
- Test your code before pushing
- Communicate about major structural changes
- Always pull before starting new work

## Contact

For any questions, reach out to Pablo :)
