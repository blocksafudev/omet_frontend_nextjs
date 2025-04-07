import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const TokenMetricCharts = ({ valueMetric, labelMetric, colorMetric, themes, symbol }) => {
    const series = valueMetric;
    const options = {
        labels: labelMetric,
        chart: {
            type: 'donut',
            darkMode: true,
        },
        colors: colorMetric,
        stroke: {
            colors: themes === 'dark' ? ['#373d3f'] : ['#fff'],
            show: false,
            width: 0
        },
        responsive: [
            {
                breakpoint: 360,
                options: {
                    chart: {
                        width: 190,
                    },
                    legend: {
                        show: true
                    },
                },
            },
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 260,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
            {
                breakpoint: 720,
                options: {
                    chart: {
                        width: 256,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        width: 340,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
            {
                breakpoint: 2048,
                options: {
                    chart: {
                        width: 500,
                        height: 200
                    },
                    legend: {
                        position: 'right',
                    },
                },
            },
        ],
        legend: {
            position: 'right',
            labels: {
                colors: themes === 'dark' ? '#373d3f' : '#fff',
            }
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "48%",
                    labels: {
                        show: true,
                        name: {
                            show: true,
                        },
                        value: {
                            offsetY: -1,
                            show: false,
                            fontSize: '14px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            color: themes === 'dark' ? '#373d3f' : '#fff',
                        },
                        total: {
                            offsetY: 20,
                            label: symbol,
                            fontSize: '16px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            color: themes === 'dark' ? '#373d3f' : '#fff',
                            show: true,
                        },
                    },
                },
            },
        },
        offsetY: 30
    };

    return (
        <Chart
            options={options}
            series={series}
            type="donut"
        />
    )
}