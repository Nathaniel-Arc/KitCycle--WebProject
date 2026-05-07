/**
 * admin-analytics.js
 * High-fidelity System Intelligence using ApexCharts
 */

document.addEventListener('DOMContentLoaded', () => {
    initRevenueAreaChart();
    initUserDonutChart();
    initHealthRadarChart();
});

function initRevenueAreaChart() {
    const options = {
        series: [{
            name: 'Transaction Volume',
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 63]
        }, {
            name: 'Revenue (₱)',
            data: [13, 23, 20, 8, 13, 27, 33, 12, 67, 22, 43, 21]
        }],
        chart: {
            type: 'area',
            height: 350,
            toolbar: { show: false },
            zoom: { enabled: false },
            fontFamily: 'Inter, sans-serif'
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3 },
        colors: ['#800000', '#10b981'], // WMSU Crimson, Emerald Green
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100]
            }
        },
        labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
        xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: '#64748b', fontWeight: 600 } }
        },
        yaxis: {
            labels: { style: { colors: '#64748b', fontWeight: 600 } }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            fontWeight: 700,
            markers: { radius: 12 }
        },
        tooltip: {
            theme: 'dark',
            x: { show: true },
            y: { formatter: (val) => val.toLocaleString() }
        }
    };

    const chart = new ApexCharts(document.querySelector("#revenueAreaChart"), options);
    chart.render();
}

function initUserDonutChart() {
    const options = {
        series: [1250, 85, 5],
        chart: {
            type: 'donut',
            height: 280,
            fontFamily: 'Inter, sans-serif'
        },
        labels: ['Students', 'Faculty', 'Admins'],
        colors: ['#800000', '#f59e0b', '#1e293b'],
        legend: {
            position: 'bottom',
            fontWeight: 700
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total Users',
                            formatter: () => '1,340'
                        }
                    }
                }
            }
        },
        dataLabels: { enabled: false }
    };

    const chart = new ApexCharts(document.querySelector("#userDonutChart"), options);
    chart.render();
}

function initHealthRadarChart() {
    const options = {
        series: [{
            name: 'Target Performance',
            data: [90, 85, 95, 80],
        }, {
            name: 'Actual Performance',
            data: [82, 75, 88, 92],
        }],
        chart: {
            type: 'radar',
            height: 280,
            toolbar: { show: false },
            fontFamily: 'Inter, sans-serif'
        },
        colors: ['#e2e8f0', '#800000'],
        xaxis: {
            categories: ['Security', 'Punctuality', 'Item Care', 'Resolution Speed'],
            labels: {
                style: {
                    colors: ["#64748b", "#64748b", "#64748b", "#64748b"],
                    fontSize: '11px',
                    fontWeight: 700
                }
            }
        },
        yaxis: { show: false },
        legend: { show: false },
        markers: { size: 4 },
        stroke: { width: 2 },
        fill: { opacity: 0.2 }
    };

    const chart = new ApexCharts(document.querySelector("#healthRadarChart"), options);
    chart.render();
}
