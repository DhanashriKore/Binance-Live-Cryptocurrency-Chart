# Binance Live Cryptocurrency Chart

This project is a **real-time cryptocurrency market data visualization tool** built using React, Material-UI, and Chart.js. It connects to the **Binance WebSocket API** to display live candlestick charts for selected cryptocurrency pairs, providing users with a smooth and interactive experience for monitoring cryptocurrency price movements.

## Features
- **Real-time Charting**: Displays live candlestick charts for ETH/USDT, BNB/USDT, and DOT/USDT.
- **Cryptocurrency Toggle**: Users can select between ETH, BNB, and DOT with data persistence across sessions.
- **Time Interval Selection**: Offers 1-minute, 3-minute, and 5-minute interval options for candlestick charts.
- **Smooth and Responsive UI**: Built with Material-UI for a modern and visually appealing interface.
- **Data Persistence**: Previous chart data is stored locally, so historical data is restored when switching coins.

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **Material-UI**: Component library for creating responsive, modern UI designs.
- **Chart.js**: Charting library for rendering candlestick data.
- **Binance WebSocket API**: Provides real-time market data for cryptocurrencies.

## Getting Started

### Prerequisites
- **Node.js** and **npm** installed on your machine.

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/Binance-Live-Cryptocurrency-Chart.git
   cd Binance-Live-Cryptocurrency-Chart
