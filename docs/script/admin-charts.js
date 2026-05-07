/**
 * admin-charts.js
 * High-fidelity Data Visualization for WMSU KitCycle Admin
 */

document.addEventListener('DOMContentLoaded', () => {
    initActivityChart();
    initAllocationChart();
});

function initActivityChart() {
    const ctx = document.getElementById('platformActivityChart').getContext('2d');
    
    // Gradient Backgrounds
    const gradientNew = ctx.createLinearGradient(0, 0, 0, 400);
    gradientNew.addColorStop(0, 'rgba(128, 0, 0, 0.2)');
    gradientNew.addColorStop(1, 'rgba(128, 0, 0, 0)');

    const gradientActive = ctx.createLinearGradient(0, 0, 0, 400);
    gradientActive.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
    gradientActive.addColorStop(1, 'rgba(59, 130, 246, 0)');

    const gradientDone = ctx.createLinearGradient(0, 0, 0, 400);
    gradientDone.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
    gradientDone.addColorStop(1, 'rgba(16, 185, 129, 0)');

    const labels = ['Dec 19', 'Dec 21', 'Dec 23', 'Dec 25', 'Dec 27', 'Dec 29', 'Dec 31', 'Jan 02', 'Jan 04', 'Jan 06'];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'New Listings',
                    data: [12, 19, 15, 22, 18, 25, 30, 28, 35, 42],
                    borderColor: '#800000',
                    backgroundColor: gradientNew,
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#800000',
                },
                {
                    label: 'Active Transactions',
                    data: [45, 52, 48, 60, 55, 68, 72, 70, 78, 85],
                    borderColor: '#3b82f6',
                    backgroundColor: gradientActive,
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#3b82f6',
                },
                {
                    label: 'Completed',
                    data: [30, 35, 42, 38, 45, 50, 55, 52, 60, 65],
                    borderColor: '#10b981',
                    backgroundColor: gradientDone,
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#10b981',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    titleFont: { size: 13, weight: 'bold' },
                    bodyFont: { size: 12 },
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#64748b', font: { size: 11, weight: '600' } }
                },
                y: {
                    grid: { color: '#f1f5f9' },
                    ticks: { color: '#64748b', font: { size: 11, weight: '600' } },
                    beginAtZero: true
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            }
        }
    });
}

function initAllocationChart() {
    const ctx = document.getElementById('categoryAllocationChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Technology', 'Laboratory', 'Media/Arts', 'Books'],
            datasets: [{
                data: [40, 30, 20, 10],
                backgroundColor: [
                    '#800000', // WMSU Crimson
                    '#f59e0b', // Amber
                    '#3b82f6', // Blue
                    '#10b981'  // Emerald
                ],
                borderWidth: 0,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` ${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
}
