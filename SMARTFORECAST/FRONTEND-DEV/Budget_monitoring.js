const allocationCtx = document.getElementById("allocationChart");
const trendCtx = document.getElementById("budgetTrendChart");

const categories = ["Beverages", "Frozen Goods", "Canned Goods", "Snacks", "Condiments", "Toiletries"];
const budgetValues = [10000, 5000, 15000, 20000, 3000, 5500];
const actualValues = [11300, 5500, 15000, 19800, 2300, 5000];

const currency = value => `Php ${value.toLocaleString()}`;
const totals = {
    budget: budgetValues.reduce((sum, val) => sum + val, 0),
    actual: actualValues.reduce((sum, val) => sum + val, 0)
};

const centerTextPlugin = {
    id: "centerText",
    afterDraw(chart, args, options) {
        const { ctx, chartArea: { width, height } = {} } = chart;
        if (!options || !width || !height) return;
        ctx.save();
        ctx.fillStyle = "#1c204b";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "600 16px Poppins, sans-serif";
        ctx.fillText(options.title || "", width / 2, height / 2 - 6);
        ctx.font = "500 14px Poppins, sans-serif";
        ctx.fillStyle = "#7780a1";
        ctx.fillText(options.subtitle || "", width / 2, height / 2 + 14);
        ctx.restore();
    }
};

Chart.register(centerTextPlugin);

if (allocationCtx) {
    new Chart(allocationCtx, {
        type: "doughnut",
        data: {
            labels: categories,
            datasets: [
                {
                    label: "Budget Share",
                    data: budgetValues,
                    backgroundColor: [
                        "#5d6bff",
                        "#4dd7d1",
                        "#ff9f43",
                        "#fdd15c",
                        "#51c878",
                        "#a166ff"
                    ],
                    borderWidth: 2,
                    borderColor: "#ffffff"
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            cutout: "62%",
            interaction: { mode: "nearest", intersect: false },
            plugins: {
                legend: { position: "bottom" },
                tooltip: {
                    backgroundColor: "#1f2539",
                    padding: 12,
                    callbacks: {
                        label: context => `${context.label}: ${currency(context.parsed)}`
                    }
                },
                centerText: {
                    title: currency(totals.budget),
                    subtitle: "Total Budget"
                }
            }
        }
    });
}

if (trendCtx) {
    const ctx = trendCtx.getContext("2d");
    const budgetGradient = ctx.createLinearGradient(0, 0, 0, 260);
    budgetGradient.addColorStop(0, "rgba(93,107,255,0.35)");
    budgetGradient.addColorStop(1, "rgba(93,107,255,0)");

    const actualGradient = ctx.createLinearGradient(0, 0, 0, 260);
    actualGradient.addColorStop(0, "rgba(255,138,128,0.3)");
    actualGradient.addColorStop(1, "rgba(255,138,128,0)");

    new Chart(trendCtx, {
        type: "line",
        data: {
            labels: categories,
            datasets: [
                {
                    label: "Actual",
                    data: actualValues,
                    borderColor: "#ff8a80",
                    backgroundColor: actualGradient,
                    borderWidth: 3,
                    pointRadius: 4,
                    pointBorderColor: "#fff",
                    tension: 0.4,
                    fill: true
                },
                {
                    label: "Budget",
                    data: budgetValues,
                    borderColor: "#5d6bff",
                    backgroundColor: budgetGradient,
                    borderWidth: 3,
                    pointRadius: 4,
                    pointBorderColor: "#fff",
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
                legend: {
                    position: "bottom"
                },
                tooltip: {
                    backgroundColor: "#1f2539",
                    padding: 12,
                    callbacks: {
                        label: context => `${context.dataset.label}: ${currency(context.parsed)}`
                    }
                },
                title: {
                    display: true,
                    text: `Remaining Budget: ${currency(totals.budget - totals.actual)}`
                }
            },
            scales: {
                x: {
                    grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => currency(value)
                    }
                }
            }
        }
    });
}

const categoryMap = categories.reduce((acc, label, index) => {
    acc[label] = { budget: budgetValues[index], actual: actualValues[index] };
    return acc;
}, {});

document.querySelectorAll(".category-card").forEach(card => {
    const label = card.dataset.category;
    if (!label || !categoryMap[label]) return;
    const { budget, actual } = categoryMap[label];
    const percent = Math.round((actual / budget) * 100);
    const diff = actual - budget;
    const fill = card.querySelector(".progress-fill");
    const text = card.querySelector(".progress-label");
    const pill = card.querySelector(".status-pill");
    const actualLabel = card.querySelector(".actual-amount");

    if (fill) {
        const safePercent = Math.min(percent, 160);
        fill.style.setProperty("--progress", `${safePercent}%`);
        fill.classList.toggle("safe", percent <= 100);
    }

    if (text) {
        text.textContent = `${percent}% of budget used`;
    }

    if (pill) {
        if (diff > 0) {
            pill.textContent = `Over by Php ${Math.abs(diff).toLocaleString()}`;
            pill.classList.add("over");
            pill.classList.remove("under");
        } else if (diff < 0) {
            pill.textContent = `Under by Php ${Math.abs(diff).toLocaleString()}`;
            pill.classList.add("under");
            pill.classList.remove("over");
        } else {
            pill.textContent = "On track";
            pill.classList.remove("over", "under");
        }
    }

    if (actualLabel) {
        actualLabel.textContent = currency(actual);
    }
});
