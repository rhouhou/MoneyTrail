# Contributing

Thank you for your interest in MoneyTrail.

MoneyTrail is a portfolio project for a full-stack business finance dashboard. Contributions, suggestions, and improvements are welcome.

## How to Contribute

1. Fork the repository.
2. Create a new branch for your change.
3. Make your changes.
4. Test the app locally.
5. Open a pull request with a clear description of the change.

## Local Development

Install backend dependencies from the root folder:

```bash
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

Create a `.env` file in the root folder:

```env
MONGO=your_mongodb_connection_string
PORT=3000
```

Start the backend:

```bash
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

## Before Opening a Pull Request

Please check that:

- The backend starts successfully.
- The frontend starts successfully.
- Products, sales, and expenses can be loaded.
- Add, edit, and delete actions still work.
- No private `.env` values or secrets are committed.

## Code Style

- Keep code readable and consistent with the existing structure.
- Use clear commit messages.
- Avoid committing generated folders such as `node_modules` or `frontend/dist`.

## Project Scope

This project is intended for portfolio and demonstration purposes. It is not intended for production financial or accounting use without further validation, authentication, and security review.
