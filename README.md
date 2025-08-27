# Crypto Price Tracking Application 🚀

A modern, responsive, and **real-time cryptocurrency price tracking app** built with **React + TypeScript**.  
Track live prices, explore market trends, visualize interactive charts, and monitor top-performing coins — all powered by **CoinMarketCap API integration** (mock data included for development).

🔗 **Live Demo**: [Coming_soon](https://your-live-demo-link.com)

---

## 🚀 Features

### **Core Functionalities**
- 💹 **Real-Time Crypto Price Tracking** — Live price updates every 30 seconds *(mock API simulation for now)*
- 📊 **Interactive Charts & Market Data Visualization** — Dynamic graphs for price trends
- 🌍 **Multi-Currency Support** — View prices in **USD, EUR, BTC, ETH**
- 🔍 **Search & Filter Cryptocurrencies** — Quickly find specific coins by name or symbol
- 🏆 **Market Overview Dashboard** — Highlights **top-performing cryptocurrencies**
- 📈 **Price Change Indicators** — Green for gains, red for losses
- 📱 **Responsive Design** — Works seamlessly on mobile, tablet, and desktop
- 🔗 **API Integration Ready** — Built to connect easily with **CoinMarketCap APIs**

---

## 🎨 UI & Design Highlights

| **Design Element**    | **Details** |
|----------------------|------------|
| **Theme Support**    | Dark & Light theme toggle |
| **Data Tables**      | Clean, sortable tables with hover effects |
| **Price Charts**     | Interactive and animated graphs |
| **Color Indicators** | 🟢 Gains, 🔴 Losses |
| **Typography**       | Optimized for readability |
| **Layout**           | Responsive, mobile-first, grid-based UI |
| **Animations**       | Smooth transitions and micro-interactions |

---

## 🛠 Tech Stack

| **Category**     | **Technologies Used** |
|------------------|------------------------|
| **Frontend**    | React 18 + TypeScript |
| **Styling**     | Tailwind CSS |
| **Charts**      | Recharts / Chart.js |
| **State Mgmt**  | React Hooks (`useState`, `useEffect`) |
| **API Layer**   | CoinMarketCap API *(mocked for now)* |
| **Icons**       | Lucide React |
| **Build Tool**  | Vite |
| **Deployment**  | Vercel / Netlify |

---

## 📊 Project Structure

```bash
crypto-price-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── MarketOverview.tsx      # Top coins & overall stats
│   │   ├── CryptoTable.tsx         # Crypto price listing & filters
│   │   ├── PriceChart.tsx          # Interactive price visualization
│   │   ├── Header.tsx              # Navbar & theme switch
│   ├── hooks/
│   │   └── useCryptoData.ts        # Fetches and manages crypto data
│   ├── services/
│   │   └── mockData.ts             # Simulated mock crypto prices
│   ├── types/
│   │   └── crypto.ts              # TypeScript types & interfaces
│   ├── App.tsx
│   ├── index.html
└── README.md
```

⚙️ Getting Started
1. Clone the Repository
git clone https://github.com/<your-username>/crypto-price-tracker.git
cd crypto-price-tracker

2. Install Dependencies
npm install

3. Start the Development Server
npm run dev


Your app will be running on http://localhost:5173

🔗 CoinMarketCap API Integration

Currently, the app uses mock data for price tracking but is fully ready for integration with CoinMarketCap APIs.

Steps to Integrate the API

Sign Up → https://coinmarketcap.com/api/

Generate your API Key

Replace the mock data service in:
src/services/mockData.ts

Implement a real API call using fetch or axios:

const response = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
    headers: {
        "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY
    }
});
const data = await response.json();


Add error handling for API rate limits.

(Optional) Use WebSockets for real-time updates.

📥 Planned Features

🔹 Live integration with CoinMarketCap API

🔹 WebSocket support for real-time price tracking

🔹 Portfolio tracking & favorite coins watchlist

🔹 Historical price trends with advanced charts

🔹 Push notifications for price alerts

👨‍💻 Author

Mohd Hussain
Full Stack Engineer | API Integrations | Automation Specialist

🌐 Portfolio: https://mohdhusaindarji.eu.org

🐙 GitHub: https://github.com/Hussyn72

💼 LinkedIn: https://linkedin.com/in/mohd-husain-darji-sde

🏷️ License

This project is open-source and free to use for personal or educational purposes.
