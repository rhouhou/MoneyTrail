# MoneyTrail

MoneyTrail is a full-stack web application for managing small-business products, expenses, sales entries, and accounting summaries. It provides a simple dashboard-style interface for tracking business operations and reviewing financial activity in one place.

## Live Demo

[View the live app](https://moneytrail-raps.onrender.com/)

## Features

* Manage product records with category, scent, color, bottle size, cost, and selling price information
* Add, edit, delete, search, filter, and paginate product entries
* Record business expenses with category, date, description, exchange rate, paid amount, and unit price
* Track sales transactions with product name, business type, quantity, unit price, and total amount
* Generate accounting-style summaries from sales and expenses
* Responsive React frontend with reusable table, filter, dropdown, and pagination components
* Express and MongoDB backend with REST API routes for products, expenses, and sales

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv

### Deployment

* Render

## Project Structure

```text
MoneyTrail/
├── api/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Main Pages

* **Home** — Overview page for the application
* **Products** — Product inventory management
* **Sales** — Sales transaction tracking
* **Expenses** — Business expense tracking
* **Accounting** — Financial summary view based on sales and expenses

## API Routes

### Products

```text
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Sales

```text
GET    /api/sales
POST   /api/sales
PUT    /api/sales/:id
DELETE /api/sales/:id
```

### Expenses

```text
GET    /api/expenses
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id
```

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB Atlas account or local MongoDB database

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGO=your_mongodb_connection_string
PORT=3000
```

An example file is included as `.env.example`.

> Do not commit your real `.env` file to GitHub.

## Installation

Clone the repository:

```bash
git clone https://github.com/rhouhou/MoneyTrail.git
cd MoneyTrail
```

Install backend dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

## Running the App Locally

Start the backend server from the root directory:

```bash
npm run dev
```

In a second terminal, start the frontend development server:

```bash
cd frontend
npm run dev
```

The frontend runs with Vite and proxies API requests to the backend at:

```text
http://localhost:3000
```

## Production Build

Build the frontend and install dependencies:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

The Express server serves the built frontend from:

```text
frontend/dist
```

## Screenshots

Screenshots can be added here to show the main workflow of the application.

Suggested screenshots:

```text
docs/screenshots/home.png
docs/screenshots/products.png
docs/screenshots/sales.png
docs/screenshots/expenses.png
docs/screenshots/accounting.png
```

## Current Status

MoneyTrail is a portfolio project demonstrating a MERN-style business management dashboard. The core product, sales, and expense management features are implemented, with additional improvements planned for validation, authentication, and reporting.

## Planned Improvements

* Add user authentication and protected routes
* Improve backend request validation
* Add stronger error handling and loading states
* Add automated tests for backend routes
* Improve accounting summary logic
* Add charts for sales, expenses, and profit trends
* Add screenshots and demo data
* Clean and standardize field names across models and frontend forms

## Known Limitations

* Authentication and user roles are not currently implemented
* The app is intended as a portfolio/demo project
* Financial summaries are basic and should be reviewed before use in real business settings
* Environment variables must be configured before deployment