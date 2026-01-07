// ---------- Demo data (editable) ----------
const dailyLabels = Array.from({length:31}, (_,i) => (i+1).toString().padStart(2,'0'));
const forecastData = [
  40, 55, 35, 58, 62, 70, 28, 45, 60, 72, 58, 48, 75, 64, 55, 40, 68, 80, 60, 72, 46, 58, 88, 95, 80, 70, 58, 60, 78, 85, 78
];
const actualData = [
  35, 60, 30, 50, 65, 75, 30, 50, 58, 70, 55, 52, 72, 61, 50, 45, 65, 78, 52, 70, 42, 60, 92, 100, 86, 67, 62, 62, 81, 88, 82
];

const categoryLabels = ["Beverages","Frozen Goods","Canned Goods","Snacks","Condiments","Toiletries","Others"];
const categoryValues = [56, 85, 73, 60, 92, 33, 98]; // percentages (for demo scale 0-100)
const categoryExpenses = [5600, 8500, 7300, 6000, 9200, 3300, 9800]; // amounts for tooltip/insights

// ---------- UI elements ----------
const totalForecastEl = document.getElementById('totalForecast');
const highestDayValEl = document.getElementById('highestDayVal');
const lowestDayValEl = document.getElementById('lowestDayVal');
const mostCatValEl = document.getElementById('mostCatVal');

// These UI elements might not exist if not present in HTML. Guard against null:
const insightListEl = document.getElementById('insightList');
const quickInsightsEl = document.getElementById('quickInsights');
const toggleActual = document.getElementById('toggleActual');

// ---------- Utility helpers ----------
function formatCurrency(n) {
  return n.toLocaleString('en-PH');
}
function sum(arr){ return arr.reduce((a,b)=>a+b,0); }

// ---------- Compute summary values ----------
const totalForecast = Math.round(sum(forecastData) * 100); // demo multiplier to get Php-like totals
if (totalForecastEl) totalForecastEl.innerText = formatCurrency(totalForecast);

const maxIdx = actualData.indexOf(Math.max(...actualData));
const minIdx = actualData.indexOf(Math.min(...actualData));
if (highestDayValEl) highestDayValEl.innerText = formatCurrency(Math.max(...actualData) * 10);
if (lowestDayValEl) lowestDayValEl.innerText = formatCurrency(Math.min(...actualData) * 10);

const maxCatIdx = categoryExpenses.indexOf(Math.max(...categoryExpenses));
if (mostCatValEl) mostCatValEl.innerText = formatCurrency(categoryExpenses[maxCatIdx]);

// ---------- Chart color gradients helper ----------
function createGradient(ctx, area, colorStart, colorEnd) {
  // area param not always available, fallback for Chart.js 3+
  let gradHeight = (area && area.bottom) ? area.bottom : 350;
  const gradient = ctx.createLinearGradient(0, 0, 0, gradHeight);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);
  return gradient;
}

// ---------- Chart rendering logic with existence checks ----------

// Helper to safely get canvas and context
function getCanvasContextSafe(id) {
  const canvas = document.getElementById(id);
  if (!canvas) {
    console.error(`[SmartForecast] Canvas element with id '${id}' not found.`);
    return null;
  }
  return canvas.getContext('2d');
}

// Draw Area Chart (Forecast vs Actual)
let areaChart = null;
const areaCtx = getCanvasContextSafe('forecastAreaChart');
if (areaCtx) {
  const areaGradientF = areaCtx.createLinearGradient(0,0,0,350);
  areaGradientF.addColorStop(0, 'rgba(244,114,182,0.26)');
  areaGradientF.addColorStop(1, 'rgba(217,70,239,0.05)');

  const areaGradientA = areaCtx.createLinearGradient(0,0,0,350);
  areaGradientA.addColorStop(0, 'rgba(96,165,250,0.25)');
  areaGradientA.addColorStop(1, 'rgba(79,70,229,0.05)');

  const areaConfig = {
    type: 'line',
    data: {
      labels: dailyLabels,
      datasets: [
        {
          label: 'Forecast',
          data: forecastData,
          tension: 0.45,
          fill: true,
          backgroundColor: areaGradientF,
          borderColor: '#db2777',
          pointRadius: 2,
          pointHoverRadius: 5,
          yAxisID: 'y'
        },
        {
          label: 'Actual',
          data: actualData,
          tension: 0.45,
          fill: true,
          backgroundColor: areaGradientA,
          borderColor: '#4f46e5',
          pointRadius: 3,
          pointHoverRadius: 6,
          yAxisID: 'y'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        tooltip: {
          callbacks: {
            label: ctx => {
              return `${ctx.dataset.label}: Php ${formatCurrency(Math.round(ctx.parsed.y * 10))}`;
            }
          }
        },
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { display:false, drawBorder:false },
          ticks: { color:'#6b7280' }
        },
        y: {
          beginAtZero: true,
          grid: { color:'rgba(15,23,42,0.04)' },
          ticks: {
            callback: v => 'Php ' + formatCurrency(Math.round(v*10))
          }
        }
      }
    }
  };

  areaChart = new Chart(areaCtx, areaConfig);

  // Toggle Actual dataset visibility if checkbox exists
  if (toggleActual) {
    toggleActual.addEventListener('change', (e) => {
      areaChart.data.datasets[1].hidden = !e.target.checked;
      areaChart.update();
    });
  }
}

// Draw Bar Chart (Category horizontal bars)
let barChart = null;
const barCtx = getCanvasContextSafe('categoryBarChart');
if (barCtx) {
  const barGradient = barCtx.createLinearGradient(0,0,600,0);
  barGradient.addColorStop(0, 'rgba(107,70,255,0.85)');
  barGradient.addColorStop(1, 'rgba(147,51,234,0.55)');
  const barConfig = {
    type: 'bar',
    data: {
      labels: categoryLabels,
      datasets: [{
        label: 'Current Month',
        data: categoryValues,
        backgroundColor: barGradient,
        borderRadius: 8,
        barThickness: 18
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const idx = ctx.dataIndex;
              return `Expense: Php ${formatCurrency(categoryExpenses[idx])} (${ctx.parsed.x}%)`;
            }
          }
        },
        legend: { display:false }
      },
      scales: {
        x: { max: 100, grid: { color:'rgba(15,23,42,0.04)' }, ticks: { callback: v => v + '%' } },
        y: { grid: { display:false } }
      }
    }
  };
  barChart = new Chart(barCtx, barConfig);
}

// ---------- Insights generation (auto) ----------
function generateInsights() {
  const insights = [];
  insights.push({
    type: 'positive',
    text: `Total forecast sits at Php ${formatCurrency(totalForecast)} across ${categoryLabels.length} categories.`
  });
  const highestDayPhp = Math.max(...actualData) * 10;
  const lowestDayPhp = Math.min(...actualData) * 10;
  insights.push({
    type: 'warning',
    text: `Highest spend day projected on April ${maxIdx + 1} at Php ${formatCurrency(highestDayPhp)}.`
  });
  insights.push({
    type: 'positive',
    text: `Lowest spend day projected on April ${minIdx + 1} keeps expenses near Php ${formatCurrency(lowestDayPhp)}.`
  });
  // 1) detect largest month-to-month rise in forecast
  let largestRise = 0, riseDay = 0;
  for (let i=1;i<forecastData.length;i++){
    const diff = forecastData[i] - forecastData[i-1];
    if (diff > largestRise) { largestRise = diff; riseDay = i+1; }
  }
  if (largestRise > 15) {
    insights.push({type:'warning', text:`Speaking peak expected on May ${riseDay}. Forecast rose by ${largestRise} points.`});
  }

  // 2) Inventory expenses steady rising in week 3 (simple check)
  const week3 = forecastData.slice(14,21);
  const trend = week3[week3.length-1] - week3[0];
  if (trend > 5) insights.push({type:'warning', text:'Inventory expenses steadily rising in week 3.'});

  // 3) category spikes
  const topIdx = categoryExpenses.indexOf(Math.max(...categoryExpenses));
  const topPct = Math.round((categoryExpenses[topIdx] / sum(categoryExpenses)) * 100);
  insights.push({type:'negative', text:`${categoryLabels[topIdx]} expenses dominate: Php ${formatCurrency(categoryExpenses[topIdx])} - ${topPct}% of total.`});

  // 4) detect rising beverages scenario (simulate)
  if (categoryExpenses[0] > 5000) {
    insights.push({type:'warning', text:'Beverages expected to spike last week of May.'});
  }
  // 5) stable categories
  if (Math.max(...categoryValues) - Math.min(...categoryValues) < 60) {
    insights.push({type:'positive', text:'Stable trend in Snacks category — no major shifts.'});
  }

  return insights;
}

function renderInsights() {
  const insights = generateInsights();
  if (insightListEl) {
    insightListEl.innerHTML = '';
    insights.forEach(ins => {
      const div = document.createElement('div');
      div.className = 'insight-item ' + (ins.type === 'positive' ? 'positive' : (ins.type === 'warning' ? 'warning' : 'negative'));
      div.innerText = ins.text;
      insightListEl.appendChild(div);
    });
  }
  if (quickInsightsEl) {
    quickInsightsEl.innerHTML = '';
    insights.forEach(ins => {
      const c = document.createElement('div');
      c.className = 'insight-item ' + (ins.type === 'positive' ? 'positive' : (ins.type === 'warning' ? 'warning' : 'negative'));
      c.innerText = ins.text;
      quickInsightsEl.appendChild(c);
    });
  }
}
renderInsights();

// ---------- Export functions ----------
const btnExportCSV = document.getElementById('btnExportCSV');
if (btnExportCSV) {
  btnExportCSV.addEventListener('click', () => {
    const rows = [
      ['Metric','Value'],
      ['Total Forecast', totalForecast],
      ['Highest Day (Php)', Math.max(...actualData)*10],
      [],
      ['Category','Expense Php','Percent'],
    ];
    const totalCat = sum(categoryExpenses);
    categoryLabels.forEach((lbl, i) => {
      rows.push([lbl, categoryExpenses[i], ((categoryExpenses[i]/totalCat)*100).toFixed(2) + '%']);
    });
    const csvContent = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics_export.csv';
    a.click();
    URL.revokeObjectURL(url);
  });
}

const btnExportPDF = document.getElementById('btnExportPDF');
if (btnExportPDF) {
  btnExportPDF.addEventListener('click', async () => {
    const area = document.querySelector('.main-content');
    if (typeof html2canvas === "undefined" || typeof window.jspdf === "undefined") {
      alert("Required libraries to export PDF (html2canvas, jsPDF) are missing.");
      return;
    }
    const canvas = await html2canvas(area, { scale: 2, useCORS:true });
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit:'px', format: [canvas.width, canvas.height] });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('dashboard_report.pdf');
  });
}

// ---------- Generate insights button ----------
const btnGenerateInsights = document.getElementById('btnGenerateInsights');
if (btnGenerateInsights) {
  btnGenerateInsights.addEventListener('click', () => {
    renderInsights();
  });
}

const btnGenerateInsightsSecondary = document.getElementById('btnGenerateInsightsSecondary');
if (btnGenerateInsightsSecondary) {
  btnGenerateInsightsSecondary.addEventListener('click', () => {
    renderInsights();
    alert('Business insight summary generated and displayed in the Insight Alerts panel.');
  });
}

// ---------- small interactive demo: update numbers and re-draw charts ----------
function updateData(newForecast, newActual) {
  if (areaChart) {
    areaChart.data.datasets[0].data = newForecast;
    areaChart.data.datasets[1].data = newActual;
    areaChart.update();
  }
  renderInsights();
}

// Expose updateData in console for quick testing
window.updateData = updateData;

