var ctx = document.getElementById("myChart").getContext('2d');
let prices = [];
let labels = [];
setInterval(async() => {
await fetch("https://api.coingecko.com/api/v3/coins/bitcoin").then(res => res.json()).then(data => {
    console.log(data);
    let currentPrice = data.market_data.current_price.vnd;
    console.log(currentPrice);
    let currentDate = new Date().toTimeString().replace('GMT+0700 (Indochina Time)', '');
    if(prices.length >= 180) {
    prices.shift();
    labels.shift();
    prices = [...prices, currentPrice];
    labels = [...labels, currentDate];
    } else {
        prices.push(currentPrice);
        labels.push(currentDate);
    }
    console.log(prices);
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Btc Price (vnđ)', // Name the series
            data: prices, // Specify the data values array
            fill: false,
            borderColor: '#ff9900', // Add custom color border (Line)
            backgroundColor: '#ff9900', // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
        }]},
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false,
       scales: {
        yAxes: [
            {
                ticks: {
                    callback: function(label, index, labels) {
                        return label.toLocaleString()+' vnđ';
                    }
                }
            }
        ]
    }
    }
});
});
}, 5000);

