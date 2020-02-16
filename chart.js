// JS CHART
var ctx = document.getElementById('chart').getContext('2d');
var cycles = document.getElementById('cycle_size').value;

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'JS',
            data: [],
            borderWidth: 2,
            borderColor: 'rgba(245, 221, 66, 1)',
            backgroundColor: 'rgba(0,0,0,0'
        },{
            label: 'WASM',
            data: [],
            borderWidth: 2,
            borderColor: 'rgba(116, 19, 242,1)',
            backgroundColor: 'rgba(0,0,0,0'
        }]
    },
    options: {
        scales: {
            xAxes:[{
                scaleLabel: {
                    display: true,
                    labelString: 'cycle'
                  },
                  ticks: {
                    beginAtZero: true,
                     max:100,
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'milliseconds'
                  },
                ticks: {
                    beginAtZero: false,
                    suggestedMax: 2
                }
            }] 
        }
    }
});

updateChartLabelsCount = () => {
    var cycle_size = parseInt(document.getElementById('cycle_size').value);
    new_data = []

    for(i = 0; i <= cycle_size; i++){
        new_data.push(i);
    }
    myChart.data.labels = new_data;
    myChart.update();
    
}
updateJSChart = (cycle, value) => {
    if(!myChart.data.labels.includes(cycle)){
        myChart.data.labels.push(cycle);
    }
    myChart.config.data.datasets[0].data.push(value);
    myChart.update();
}

updateWasmChart = (cycle, value) => {
    if(!myChart.data.labels.includes(cycle)){
        myChart.data.labels.push(cycle);
    }
    myChart.config.data.datasets[1].data.push(value);
    myChart.update();
}

resetChart = () => {
    myChart.data.labels = [];
    myChart.config.data.datasets[0].data = [];
    myChart.config.data.datasets[1].data = [];
}