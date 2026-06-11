# 📈 Zerodha Clone

A full-stack Zerodha-inspired trading dashboard built with a React/Vite frontend and an Express/MongoDB backend. The app shows market watch data, portfolio summaries, holdings, positions, funds, and orders, and includes basic signup/login APIs with JWT authentication.

![Zerodha Clone dashboard preview](Dashboard/src/assets/hero.png)

> 🖼️ Dashboard preview image from the frontend assets.


## ✨ Features

- 📊 **Trading dashboard UI** with top bar, market watch, summary, holdings, positions, funds, orders, and apps routes.
- 👀 **Watchlist interactions** with buy/sell action buttons and a buy order modal.
- 📉 **Portfolio visualizations** using Chart.js and React Chart.js components.
- 🔌 **REST API backend** for holdings, positions, orders, signup, and login.
- 🍃 **MongoDB persistence** through Mongoose models and schemas.
- 🔐 **Authentication endpoints** using Joi validation, bcrypt password hashing, and JWT tokens.

## 🧰 Tech Stack

### 🎨 Frontend (`Dashboard/`)

- React 19
- Vite
- React Router DOM
- Axios
- Material UI icons/components
- Chart.js and `react-chartjs-2`
- ESLint

### ⚙️ Backend (`Backend/`)

- Node.js
- Express
- MongoDB with Mongoose
- bcrypt
- JSON Web Tokens
- Joi validation
- CORS and body parsing middleware
- dotenv

## 🗂️ Project Structure

```text
.
├── Backend/
│   ├── index.js                  # Express server and API routes
│   ├── authentication.js         # JWT authentication middleware
│   ├── middilwares/              # Request validation middleware
│   ├── models/                   # Mongoose models
│   ├── schema/                   # Mongoose schemas
│   ├── package.json
│   └── package-lock.json
├── Dashboard/
│   ├── src/
│   │   ├── components/           # Dashboard UI components
│   │   ├── data/                 # Static watchlist/sample data
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── *.css
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
└── README.md
```

## ✅ Prerequisites

Make sure you have the following installed:

- 🟢 Node.js 20 or newer
- 📦 npm
- 🍃 MongoDB Atlas connection string or a local MongoDB server

## 🔐 Environment Variables

Create a `.env` file inside `Backend/`:

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/zerodha_clone
JWT_SECRET=replace_with_a_strong_secret
```

> Do not commit real secrets or production database credentials.

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone <repository-url>
cd fullStack_zerotha_clone
```

### 2️⃣ Install backend dependencies

```bash
cd Backend
npm install
```

### 3️⃣ Install frontend dependencies

```bash
cd ../Dashboard
npm install
```

### 4️⃣ Start the backend API

From the `Backend/` directory:

```bash
npm test
```

The backend starts on `http://localhost:3000` by default.

### 5️⃣ Start the frontend app

From the `Dashboard/` directory:

```bash
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## 🧪 Available Scripts

### ⚙️ Backend

Run from `Backend/`:

| Command | Description |
| --- | --- |
| `npm test` | Starts the Express server with nodemon. |

### 🎨 Frontend

Run from `Dashboard/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Creates a production frontend build. |
| `npm run lint` | Runs ESLint checks. |
| `npm run preview` | Serves the production build locally. |

## 🔌 API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/allHoldings` | Returns all portfolio holdings. |
| `GET` | `/allPositions` | Returns all open/closed positions. |
| `GET` | `/allOrders` | Returns all orders. |
| `POST` | `/newOrder` | Creates a new order. |
| `DELETE` | `/deleteOrder/:id` | Deletes an order by MongoDB document ID. |
| `POST` | `/signup` | Registers a user with `name`, `email`, and `password`. |
| `POST` | `/login` | Logs in a user and returns a JWT token. |

### 📝 Example Signup Request

```bash
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo User","email":"demo@example.com","password":"password123"}'
```

### 🔑 Example Login Request

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"password123"}'
```

### 🛒 Example Order Request

```bash
curl -X POST http://localhost:3000/newOrder \
  -H "Content-Type: application/json" \
  -d '{"name":"INFY","qty":1,"price":1555.45,"mode":"BUY"}'
```

## 🗃️ Data Notes

- 🖥️ The dashboard expects the backend API to run on `http://localhost:3000`.
- 📦 Holdings and positions are read from MongoDB collections through the backend routes.
- 👀 Watchlist data is currently stored in frontend source data.
- 🌱 The backend contains commented seed helpers for holdings and positions in `Backend/index.js`; these can be adapted for local development if needed.

## 💡 Development Tips

- ▶️ Start the backend before using routes that fetch holdings, positions, or orders.
- ✅ Confirm `MONGO_URL` is valid before launching the server.
- 🧭 If the dashboard cannot load data, check the browser console and backend terminal for CORS, connection, or API errors.
- 🔒 Keep dependency lockfiles committed so installs remain reproducible.

## 🛣️ Future Improvements

- 🔐 Add protected frontend auth flows using the login JWT.
- 🌐 Move API base URLs into frontend environment variables.
- 🧪 Add backend unit/integration tests.
- 🧱 Add consistent API response shapes and error handling.
- 🌱 Add seed scripts for demo holdings and positions.
- 🧹 Rename misspelled folders/files such as `middilwares`, `AuthovAlidation.js`, and `OrderShcema.js` for maintainability.

## 📄 License

This project currently uses the ISC license in the backend package metadata. Add a repository-level `LICENSE` file if you want to publish the project with clear license terms.
