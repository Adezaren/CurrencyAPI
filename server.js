import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;
const API_KEY = '18c80f421cf841e0ac5cb7357a6a7e21';
const API_URL = `http://data.fixer.io/api/latest?access_key=${API_KEY}`;

app.use(cors());
app.use(express.static('public'));

let exchangeRates = {};

app.get('/api/currencies', async (req, res) => {
    const response = await fetch(`https://api.exchangerate.host/symbols?access_key=${API_KEY}`);
    const data = await response.json();


    if (!data.success) {
        return res.status(500).json({error: "něco se nepodařilo"});
    }

    const currencies = Object.entries(data.symbols).map(([symbol, name]) => ({
        symbol,
        name
    }));

    res.json({currencies});
});

app.get('/api/convert', async (req, res) => {
    const {amount, currency} = req.query;
    const response = await fetch(API_URL);
    const data = await response.json();
    const exchageRate = data.rates[currency];
    
    const convertedAmount = parseFloat(amount) * exchageRate;
    res.json({amount: parseFloat(amount), currency, convertedAmount});
});

app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});