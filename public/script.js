async function convertCurrency () {
    
    const amount = parseFloat(document.getElementById('amount').value);
    const targetCurrency = document.getElementById('currency').value;
    
    if (isNaN(amount) || amount <= 0) {
        alert('Zadejte kladnou sumu.');
        return;
    }

    const response = await fetch(`http://localhost:3000/api/convert?amount=${amount}&currency=${targetCurrency}`);
    const data = await response.json();

    document.getElementById('result').textContent = `${amount} EUR = ${data.convertedAmount.toFixed(2)} ${targetCurrency}`;
    
};

async function fetchCurrencies() {
    
        const response = await fetch('http://localhost:3000/api/currencies');
        const data = await response.json();
        const currencySelect = document.getElementById('currency');

        currencySelect.innerHTML = '';
        
        data.currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency.symbol;
            option.textContent = `${currency.symbol} - ${currency.name}`;
            currencySelect.appendChild(option);
        });
    
}


fetchCurrencies();

