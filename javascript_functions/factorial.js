// no recursion
factorial = (x) => {
    if(x <= 0) return 0;
    if(x == 1) return 1;
    if(x == 2) return 2;
    
    sum = 1;
    for(i = 2; i < x; i++){
        sum = sum * i;
   }
   return sum;
}

var js_data = {
    cycle: 0, // amount of repetitions
    output: 0, // output per repetition
    time: 0,  // time of repetition execution
    done: false // when done with all repetitions
}

// wasm fibonacci function, sequence length
js_factorial = (sample_size) => {
  var t0 = performance.now(); // initial time
  result = []
  for(i = 1; i <= sample_size; i++){ // execute func for a couple integers
      var r = factorial(i); // wasm function
      result.push(r); // push res to array
  }
  var t1 = performance.now(); // after execution time
  
  js_data.output = result; // set output prop
  js_data.time = Math.round((t1 - t0) * 100) / 100; // set time prop
}

// wasm function, n cycles, sequence length
js_factorial_cycle = (cycle_size, sample_size) => {
 
  js_data.cycle = 0; // reset cycle counter
  js_data.output = 0; // reset output tracker
  js_data.time = 0 // reset time calculation
  js_data.done = false; // reset done parameter

  var js_interval = setInterval(() => {
      js_data.cycle += 1;
      
      if(js_data.cycle > cycle_size){
          clearInterval(js_interval);
          js_data.done = true;
      }

      js_factorial(sample_size); // execute func
      postMessage(js_data); // send data to mainthread

  }, 10);
}

onmessage = (event) => {
  var cycle_size = event.data.cycle_size;
  var sample_size = event.data.sample_size;
  js_factorial_cycle(cycle_size, sample_size)
}
