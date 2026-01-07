document.addEventListener('DOMContentLoaded', function() {
  // Wait for Chart.js to be available
  if (typeof Chart === 'undefined') {
    console.error('Chart.js is not loaded');
    return;
  }

  // Line Chart - Daily Expenses
  const lineChartEl = document.getElementById('lineChart');
  if (lineChartEl) {
    const ctxLine = lineChartEl.getContext('2d');
    new Chart(ctxLine, {
      type: 'bar',
      data: {
        labels: ['Apr 1', 'Apr 5', 'Apr 10', 'Apr 15', 'Apr 20', 'Apr 25', 'Apr 30'],
        datasets: [{
          label: 'Daily Expense (PHP)',
          data: [8500, 7200, 10500, 6800, 9200, 11500, 8900],
          backgroundColor: '#6366f1',
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { callback: value => '₱' + value.toLocaleString() } }
        }
      }
    });
  }

  // Pie Chart - Category Distribution
  const pieChartEl = document.getElementById('pieChart');
  if (pieChartEl) {
    const ctxPie = pieChartEl.getContext('2d');
    new Chart(ctxPie, {
      type: 'doughnut',
      data: {
        labels: ['Canned Goods', 'Beverages', 'Snacks', 'Frozen Goods', 'Instant Foods', 'Condiments'],
        datasets: [{
          data: [35, 25, 20, 12, 5, 3],
          backgroundColor: [
            '#ef4444',
            '#3b82f6',
            '#f59e0b',
            '#10b981',
            '#8b5cf6',
            '#ec4899'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { callbacks: { label: ctx => ctx.label + ': ' + ctx.raw + '%' } }
        }
      }
    });
  }
});