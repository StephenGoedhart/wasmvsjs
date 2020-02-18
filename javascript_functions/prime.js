
  // double recusion
  prime = (x) => {
    prime = 0;
    counter = 0;
    number = 0;
  
    for(i = 2; i < x; i++){
      prime = 1;
      for(j = 2; j <= i; j++){
        if(i % j == 0){
          prime = 0;
        }
      }
  
      if(prime == 1){
        counter++;
        if(counter == x){ 
          number = i;
        }
      }
    }
  
    return number;
}

var js_data = {
  cycle: 0, // amount of repetitions
  output: 0, // output per repetition
  time: 0,  // time of repetition execution
  done: false // when done with all repetitions
}

// wasm fibonacci function, sequence length
js_prime = (sample_size) => {
  var t0 = performance.now(); // initial time
  result = []
  for(i = 1; i <= sample_size; i++){ // execute func for a couple integers
      var r = prime(i); // wasm function
      result.push(r); // push res to array
  }
  var t1 = performance.now(); // after execution time

  js_data.output = result; // set output prop
  js_data.time = Math.round((t1 - t0) * 100) / 10 // set time prop
}

// wasm function, n cycles, sequence length
js_prime_cycle = (cycle_size, sample_size) => {
 
  js_data.cycle = 0; // reset cycle counter
  js_data.output = 0; // reset output tracker
  js_data.time = 0 // reset time calculation
  js_data.done = false; // reset done parameter

  var js_interval = setInterval(() => {
      js_data.cycle += 1;
      
      if(js_data.cycle > cycle_size - 1){
          clearInterval(js_interval);
          js_data.done = true;
      }

      js_prime_cycle(sample_size); // execute func
      postMessage(js_data); // send data to mainthread

  }, 10);
}

onmessage = (event) => {
  var cycle_size = event.data.cycle_size;
  var sample_size = event.data.sample_size;
  js_prime_cycle(cycle_size, sample_size)
}
