// JS CHART
var ctx = document.getElementById('chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [0, 1, 2, 3, 4, 5],
        datasets: [{
            label: 'JS',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 2,
            borderColor: 'yellowgreen',
            backgroundColor: 'rgba(0,0,0,0'
        },{
            label: 'WASM',
            data: [3, 12, 8, 6, 2],
            borderWidth: 2,
            borderColor: 'cornflowerblue',
            backgroundColor: 'rgba(0,0,0,0'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
