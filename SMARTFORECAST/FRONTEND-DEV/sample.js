
/* File: scripts.js */
// Sample dataset generator
const categories = ["Beverages","Frozen","Snacks","Canned","Toiletries","Condiments"];

function sampleSeries(timeframe){
  // Returns labels and values per category for area chart for each category as a series
  const points = timeframe === 'daily' ? 7 : timeframe === 'weekly' ? 12 : timeframe === 'monthly' ? 12 : 4;
  const labels = Array.from({length:points},(_,i)=> (timeframe==='daily')? `Day ${i+1}` : (timeframe==='weekly')? `Wk ${i+1}` : (timeframe==='monthly')? `M ${i+1}` : `Q ${i+1}`);
  const datasets = categories.map((cat, idx)=>{
    // create smoother ascending/descending patterns
    let base = 6000 + idx*1200;
    const data = labels.map((_,i)=> Math.round(base * (0.6 + Math.abs(Math.sin(i*0.6 + idx))*0.9) * (0.7 + Math.random()*0.6)) );
    return {label:cat, data}
  });
  return {labels,datasets}
}

// Create area (filled-line) chart
let areaChart, barChart;
function createAreaChart(ctx, timeframe='monthly'){
  const s = sampleSeries(timeframe);
  const datasets = s.datasets.map((d, i)=>({
    label:d.label,
    data:d.data,
    fill:true,
    tension:0.3,
    borderWidth:2,
    backgroundColor: `rgba(${40 + i*30}, ${140 - i*10}, ${200 - i*12}, 0.14)`,
    borderColor: `rgba(${40 + i*30}, ${140 - i*10}, ${200 - i*12}, 0.9)`,
    pointRadius:2
  }));

  if(areaChart) areaChart.destroy();
  areaChart = new Chart(ctx, {
    type:'line',
    data:{labels:s.labels,datasets},
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:false},
      scales:{x:{grid:{display:false},ticks:{color:'#9aa4b2'}},y:{ticks:{color:'#9aa4b2'},grid:{color:'rgba(255,255,255,0.03)'}}
    }
  });
  makeLegend(areaChart,'areaLegend');
}

// Create horizontal bar comparing current vs last month per category
function createBarChart(ctx){
  // sample current and last month numbers per category
  const current = categories.map(()=> Math.round(6000 + Math.random()*9000));
  const last = current.map(v => Math.round(v * (0.8 + Math.random()*0.4)));

  const data = {
    labels: categories,
    datasets:[
      {label:'Last Month', data:last, backgroundColor:'rgba(115,125,255,0.7)'},
      {label:'Current Month', data:current, backgroundColor:'rgba(255,125,100,0.8)'}
    ]
  }

  if(barChart) barChart.destroy();
  barChart = new Chart(ctx,{type:'bar',data,options:{
    indexAxis:'y',responsive:true,maintainAspectRatio:false,
    plugins:{legend:false},
    scales:{x:{ticks:{color:'#9aa4b2'},grid:{color:'rgba(255,255,255,0.03)'}},y:{ticks:{color:'#9aa4b2'}}
  }});
  makeLegend(barChart,'barLegend');
}

// Custom legend generator (simple) – places colored labels below chart
function makeLegend(chart, containerId){
  const container = document.getElementById(containerId);
  if(!container) return;
  const items = chart.data.datasets.map(ds=>`<span class="legend-item"><span style="display:inline-block;width:12px;height:12px;background:${ds.backgroundColor};margin-right:8px;border-radius:3px;vertical-align:middle"></span>${ds.label}</span>`);
  container.innerHTML = items.join(' &nbsp; ');
}

// Wire UI
window.addEventListener('DOMContentLoaded',()=>{
  const areaCtx = document.getElementById('areaChart').getContext('2d');
  const barCtx = document.getElementById('barChart').getContext('2d');
  createAreaChart(areaCtx,'monthly');
  createBarChart(barCtx);

  const tf = document.getElementById('timeframeSelect');
  const cat = document.getElementById('categorySelect');

  tf.addEventListener('change',()=>{
    createAreaChart(areaCtx, tf.value);
    // update smart insight text and budget projection as a demonstration
    updateSmartInsight(tf.value);
  })

  cat.addEventListener('change',()=>{
    // If single category selected, filter area chart to that dataset
    const val = cat.value;
    if(val==='all') createAreaChart(areaCtx, tf.value);
    else{
      const s = sampleSeries(tf.value);
      const idx = categories.indexOf(val);
      const ds = s.datasets[idx];
      const dataset = [{label:ds.label,data:ds.data,fill:true,tension:0.3,borderWidth:2,backgroundColor:'rgba(80,160,255,0.16)',borderColor:'rgba(80,160,255,0.95)',pointRadius:2}];
      if(areaChart) areaChart.destroy();
      areaChart = new Chart(areaCtx,{type:'line',data:{labels:s.labels,datasets:dataset},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:false}}});
      makeLegend(areaChart,'areaLegend');
    }
  })

  // Buttons: attach generic handlers
  document.querySelectorAll('.insight-actions .btn').forEach(b=>b.addEventListener('click', (e)=>{
    const action = e.target.textContent.toLowerCase();
    const box = e.target.closest('.insight-box');
    const label = box.querySelector('.label').textContent;
    alert(`${action.toUpperCase()} > ${label}`);
  }))

  // small animation for progress bars just to show dynamics
  setTimeout(()=>{
    document.getElementById('progressCurrent').style.width = '62%';
    document.getElementById('progressSuggested').style.width = '75%';
  },200);

});

// Update Smart Insight (demo changes)
function updateSmartInsight(timeframe){
  const boxes = document.querySelectorAll('.insight-box');
  boxes[0].querySelector('.insight-content').textContent = (timeframe==='daily')? 'Beverages spike today — verify deliveries.' : (timeframe==='weekly')? 'Beverages increased 12% vs last week.' : 'Beverages trending up 28% month-over-month.';
  boxes[1].querySelector('.insight-content').textContent = (timeframe==='monthly')? 'Frozen goods variance moderate — consider reorder schedule.' : 'Frozen goods steady.';
}

// End of scripts.js
