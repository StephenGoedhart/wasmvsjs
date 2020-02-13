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
            borderColor: 'yellowgreen',
            backgroundColor: 'rgba(0,0,0,0'
        },{
            label: 'WASM',
            data: [],
            borderWidth: 2,
            borderColor: 'cornflowerblue',
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
                    beginAtZero: false,
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
    var cycle_size = document.getElementById('cycle_size').value;
    new_data = []

    for(i = 0; i <= parseInt(cycle_size); i++){
        new_data.push(i);
    }
    console.log(cycle_size);
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