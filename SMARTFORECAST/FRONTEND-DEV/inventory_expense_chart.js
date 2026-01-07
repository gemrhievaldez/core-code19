const categoryColors = {
    "Beverages": "#6C63FF",
    "Frozen Goods": "#F47174",
    "Snacks": "#FFC75F",
    "Canned Goods": "#008F7A",
    "Toiletries": "#32B3DC",
    "Condiments": "#FF6E31"
  };
  const allCategoryList = Object.keys(categoryColors);

  function generateAreaData(timeInterval, activeCategory) {
    // Simulate time points and data for chart
    let labels, datasets;
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let weeks = ["W1", "W2", "W3", "W4"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];
    let quarters = ["Q1", "Q2", "Q3", "Q4"];
    let baseData = {
      "Beverages":    [1200, 1420, 1340, 1600, 1500, 1320, 1740],
      "Frozen Goods": [1800, 1940, 2100, 1800, 2200, 2000, 1900],
      "Snacks":       [700, 640, 980, 760, 820, 890, 700],
      "Canned Goods": [940, 900, 990, 960, 1040, 910, 970],
      "Toiletries":   [600, 550, 600, 620, 570, 610, 565],
      "Condiments":   [300, 340, 320, 330, 360, 350, 355]
    };
    if(timeInterval === "daily") {
      labels = days;
    } else if(timeInterval === "weekly") {
      labels = weeks;
    } else if(timeInterval === "monthly") {
      labels = months.slice(0,7);
    } else {
      labels = quarters;
    }

    if(activeCategory === "all") {
      datasets = allCategoryList.map(cat => ({
        label: cat,
        data: baseData[cat].slice(0, labels.length).map(val => val + (Math.random() * 100 - 50)),
        fill: true,
        tension: 0.4,
        backgroundColor: categoryColors[cat] + "33", //opacity .2
        borderColor: categoryColors[cat],
        pointRadius: 3,
      }));
    } else {
      datasets = [{
        label: activeCategory,
        data: baseData[activeCategory].slice(0, labels.length).map(val => val + (Math.random() * 100 - 50)),
        fill: true,
        tension: 0.4,
        backgroundColor: categoryColors[activeCategory] + "33",
        borderColor: categoryColors[activeCategory],
        pointRadius: 3,
      }];
    }
    return {labels, datasets};
  }

  // Draw area line chart
  let areaChartRef;
  function drawAreaChart(timeInterval, activeCategory) {
    const ctx = document.getElementById('areaForecastChart').getContext('2d');
    const dataObj = generateAreaData(timeInterval, activeCategory);
    if (areaChartRef) areaChartRef.destroy();
    areaChartRef = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dataObj.labels,
        datasets: dataObj.datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index', intersect: false,
            callbacks: {label: ctx => `₱${(ctx.parsed.y).toLocaleString('en-PH')}`}
          },
          title: false
        },
        interaction: { mode: 'nearest', axis: 'x', intersect: false },
        scales: {
          y: {
            title: {display: false},
            beginAtZero: true,
            grid: {color: '#EEF1F5'},
            ticks: {color: '#798EAE'}
          },
          x: {ticks:{color: '#1F2936'}, grid:{display:false}}
        }
      }
    });
    // Custom legend
    let legendHTML = "";
    (dataObj.datasets).forEach(ds => {
      legendHTML += `<span class="legend-dot" style="background:${ds.borderColor}"></span>${ds.label}  `;
    });
    document.getElementById('area-chart-legend').innerHTML = legendHTML;
  }

  // Bar chart data and rendering
  let barChartRef;
  function drawBarChart(activeCategory) {
    // Dummy: compare current/last month per category
    const allCats = allCategoryList;
    let labels = activeCategory === "all" ? allCats : [activeCategory];
    let thisMonth = [4800, 3200, 1850, 1600, 1260, 600];
    let lastMonth = [4420, 3000, 1790, 1500, 1160, 700];
    let idx = cat => allCats.indexOf(cat);

    let dataCurrent = [];
    let dataPrev = [];
    labels.forEach(cat => {
      dataCurrent.push(thisMonth[idx(cat)] * (0.9 + Math.random()*0.2));
      dataPrev.push(lastMonth[idx(cat)] * (0.9 + Math.random()*0.2));
    });

    const ctx = document.getElementById('barComparisonChart').getContext('2d');
    if(barChartRef) barChartRef.destroy();
    barChartRef = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Current Month",
            data: dataCurrent,
            backgroundColor: "#6C63FF",
            borderRadius: 8,
            barThickness: 18,
            borderWidth: 1.5,
          },
          {
            label: "Last Month",
            data: dataPrev,
            backgroundColor: "#ECECFD",
            borderRadius: 8,
            barThickness: 18,
            borderWidth: 1.5,
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {callbacks: {label: ctx => `₱${(ctx.parsed.x).toLocaleString('en-PH')}`}},
          title: false
        },
        scales: {
          y: {
            grid: {color: '#EEF1F5'},
            ticks: {color: '#798EAE'}
          },
          x: {
            beginAtZero: true,
            grid: { color: '#EEF1F5'},
            ticks: { color:'#798EAE'},
          }
        }
      }
    });
    // Legend
    document.getElementById('bar-chart-legend').innerHTML = 
        `<span class="legend-dot" style="background:#6C63FF"></span>Current 
         <span class="legend-dot" style="background:#ECECFD; border:1px solid #C6C9DF"></span>Last Month`;
  }

  // Dropdown events and init charts
  function updateCharts() {
    const period = document.getElementById('timeIntervalSelect').value;
    const cat = document.getElementById('categorySelect').value;
    drawAreaChart(period, cat==="All Categories"||cat==="all"? "all":cat);
    drawBarChart(cat==="All Categories"||cat==="all"? "all":cat);
  }
  document.getElementById('timeIntervalSelect').addEventListener('change', updateCharts);
  document.getElementById('categorySelect').addEventListener('change', updateCharts);
  // Init on load
  setTimeout(updateCharts, 100); // run after DOM parse

  // Responsive: make columns stack on small screens
  window.addEventListener("resize", function() {
    document.body.classList.toggle(
      "charts-stacked",
      window.innerWidth < 990
    );
  });
  window.dispatchEvent(new Event("resize"));