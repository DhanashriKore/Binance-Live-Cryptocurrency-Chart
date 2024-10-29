import React, { useState, useEffect } from 'react';
import Chart from './Chart';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const App = () => {
  const [symbol, setSymbol] = useState('ethusdt');
  const [interval, setInterval] = useState('1m');
  const [candlestickData, setCandlestickData] = useState({});
  const symbols = ['ethusdt', 'bnbusdt', 'dotusdt'];
  const intervals = ['1m', '3m', '5m'];

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.k && data.k.x) { // 'k' is the candlestick data, 'x' checks if it's closed
        const { t, o, h, l, c } = data.k;
        const newCandle = { time: t, open: o, high: h, low: l, close: c };

        setCandlestickData(prev => {
          const updatedData = { ...prev, [symbol]: [...(prev[symbol] || []), newCandle] };
          localStorage.setItem(symbol, JSON.stringify(updatedData[symbol])); // Persist data
          return updatedData;
        });
      }
    };

    return () => ws.close();
  }, [symbol, interval]);

  const handleSymbolChange = (e) => {
    const selectedSymbol = e.target.value;
    setSymbol(selectedSymbol);
    const savedData = localStorage.getItem(selectedSymbol);
    if (savedData) {
      setCandlestickData(prev => ({ ...prev, [selectedSymbol]: JSON.parse(savedData) }));
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 4 }}>
          Binance Market Data
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 4 }}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>Cryptocurrency</InputLabel>
          <Select value={symbol} onChange={handleSymbolChange} label="Cryptocurrency">
            {symbols.map((s) => (
              <MenuItem key={s} value={s}>
                {s.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>Interval</InputLabel>
          <Select value={interval} onChange={(e) => setInterval(e.target.value)} label="Interval">
            {intervals.map((i) => (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Chart data={candlestickData[symbol] || []} />
    </Container>
  );
};

export default App;
