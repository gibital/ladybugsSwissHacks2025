# Team: Ladybugs & Co. 

## Project name: MonoLoan

This is the full-stack implementation of the **Ladybugs & Co. MonoLoan App**, built for **SwissHacks 2025**. The project consists of a **React + TypeScript frontend** and a **Node.js + Python backend**. It offers credit analysis and loan management based on blockchain wallet data.

---

## warning: it is not all info on what we did! 

## 🌐 Frontend

Built using React (Vite) + TypeScript with TailwindCSS.

```
### 🛠️ Run Frontend

```bash
cd frontend
npm install
npm run dev
```

### 🔐 Auth & Wallet

- Uses **Supabase** for user authentication
- Wallet integration via `WalletConnect.tsx`

---

## 🖥️ Backend

Node.js API with Python-based blockchain analysis.

### 📁 Folder Structure (Backend)

```bash
backend/
├── analyze_wallet.py             # Python script to process wallet data
├── ledger_objects.csv            # Input CSVs for testing
├── nfts.csv
├── token_balances.csv
├── xrp_transactions.csv
├── src/
│   └── routes/
│       └── pythonRoutes.js       # Express route that runs the Python script
```

### 🛠️ Run Backend

```bash
cd backend
npm install
node src/server.js
```

```bash
example

python analyze_wallet.py
```

### 🧪 API Endpoint (examples)
- GET /api/balance/:wallet
  
Fetch live XRP balance & trust lines from XRP Ledger

- GET /api/report/:wallet

Pull wallet data from XRP Ledger and save to CSVs

- GET /api/analyze

Run credit score analysis based on saved CSVs

- GET /api/python/analyze

Run Python script manually to return wallet analysis results

### Frontend (Client-side) (examples)
- POST /auth/signup – Register user (Supabase)

- POST /auth/signin – Sign in user

WalletConnect handles on-chain wallet connection


##  Features
- Analyze wallet data and provide credit scores
- Request and manage loans
- Real-time interaction between frontend and backend
- Modular and scalable architecture


