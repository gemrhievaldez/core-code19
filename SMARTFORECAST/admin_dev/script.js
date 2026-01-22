// Forecast Accuracy Chart
const ctx = document.getElementById('forecastChart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [52, 38, 18, 97, 30, 25],
      fill: true,
      borderColor: '#7b61ff',
      backgroundColor: 'rgba(123,97,255,0.2)',
      tension: 0.4
    }]
  },
  options: {
    plugins: { legend: { display: false }},
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  }
});
