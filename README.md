# Life Insurance Recommendation Frontend

A modern, responsive Next.js 15 application for life insurance recommendations. Users can register, log in, and receive personalized insurance suggestions based on their profile.

## 🌐 Live Demo
- **Frontend Application**: https://life-insurance-recommendation-fe.vercel.app/

## Features
- JWT authentication (login/register)
- Personalized insurance recommendation form
- User dashboard and history
- Protected routes with middleware
- Responsive, accessible UI (Tailwind CSS)
- TypeScript for type safety

## Getting Started

### 1. Install dependencies
```bash
npm install
# or
yarn install
```

### 2. Set environment variables
Create a `.env.local` file in the root:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```
Adjust the URL to match your backend API.

### 3. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm start
```

## Linting & Formatting
Run ESLint to check code quality:
```bash
npm run lint
```

## Project Structure
- `src/components/` – UI components (forms, header, etc.)
- `src/contexts/` – React context for authentication
- `src/services/` – API service layer
- `src/types/` – TypeScript types
- `src/app/` – Next.js app directory (pages, layouts)

## API Endpoints (Expected by Frontend)
- `POST /auth/login` – User login
- `POST /auth/register` – User registration
- `POST /recommendation` – Generate recommendation
- `GET /recommendation/history` – User's recommendation history

## Deployment
This app is ready for deployment on Vercel, Docker, or any Node.js hosting.

### Docker
Build and run with Docker:
```bash
docker build -t life-insurance-fe .
docker run -p 3000:3000 life-insurance-fe
```

---

**For questions or contributions, please open an issue or pull request.**
