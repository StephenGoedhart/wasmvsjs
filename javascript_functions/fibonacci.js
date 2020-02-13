
  fibonacci = (x) => {
      if (x === 1) return 1;
      if (x === 2) return 1;
      return fibonacci(x - 1) + fibonacci(x - 2);
  }
  
  var data = {
    cycle: 0, // amount of repetitions
    output: 0, // output per repetition
    time: 0,  // time of repetition execution
    done: false // when done with all repetitions
}

// wasm fibonacci function, sequence length
js_fibonacci = (sample_size) => {
    var t0 = performance.now(); // initial time
    result = []
    for(i = 1; i <= sample_size; i++){ // execute func for a couple integers
        var r = fibonacci(i); // wasm function
        result.push(r); // push res to array
    }
    var t1 = performance.now(); // after execution time

    data.output = result; // set output prop
    data.time = t1 - t0; // set time prop
}


// wasm function, n cycles, sequence length
js_fibonacci_cycle = (cycle_size, sample_size) => {
    data.cycle = 0; // reset cycle counter
    data.output = 0; // reset output tracker
    data.time = 0 // reset time calculation
    data.done = false; // reset done parameter

    var interval = setInterval(() => {
        if(data.cycle >= cycle_size){
            clearInterval(interval);
            data.done = true;
        }

        data.cycle += 1; // keep track of cycle
        js_fibonacci(sample_size); // execute func
        postMessage(data); // send data to mainthread

    }, 10);
}
  onmessage = (event) => {
    var cycle_size = event.data.cycle_size;
    var sample_size = event.data.sample_size;
    js_fibonacci_cycle(cycle_size, sample_size)
  }
