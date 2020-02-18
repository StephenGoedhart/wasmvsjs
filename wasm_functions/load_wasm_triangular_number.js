// Initialize wasm with plenty of memory, just to be sure
const ENV = () => ({
    __memory_base: 0,
    __table_base: 0,
    memory: new WebAssembly.Memory({ initial: 256 }),
    table: new WebAssembly.Table({ initial: 256, element: 'anyfunc' })
  });

  // data object to send to main thread
 var wasm_data = {
    cycle: 0, // amount of repetitions
    output: 0, // output per repetition
    time: 0,  // time of repetition execution
    done: false // when done with all repetitions
}

// wasm fibonacci function, sequence length
wasm_triangular_number = (func, sample_size) => {
    var t0 = performance.now(); // initial time
    result = []
    for(i = 1; i <= sample_size; i++){ // execute func for a couple integers
        var r = func(i); // wasm function
        result.push(r); // push res to array
    }
    var t1 = performance.now(); // after execution time

    wasm_data.output = result; // set output prop
    wasm_data.time = Math.round((t1 - t0) * 100) / 100; // set time prop
    
}

// wasm function, n cycles, sequence length
wasm_triangular_number_cycle = (func, cycle_size, sample_size) => {

    wasm_data.cycle = 0; // reset cycle counter
    wasm_data.output = 0; // reset output tracker
    wasm_data.time = 0; // reset time calculation
    wasm_data.done = false; // reset done parameter

    var wasm_interval = setInterval(() => {
        wasm_data.cycle += 1; // keep track of cycle
        
        if(wasm_data.cycle > cycle_size - 1){
            clearInterval(wasm_interval);
            wasm_data.done = true;
        }

        wasm_triangular_number(func, sample_size); // execute func
        postMessage(wasm_data); // send data to mainthread
    }, 10);
}

// when worker receives info start the script
onmessage = (event) => {
    var cycle_size = event.data.cycle_size;
    var sample_size = event.data.sample_size;

    // load wasm, show first 10 fibonacci numbers
    WebAssembly.instantiateStreaming(fetch('wasm_triangular_number.wasm'), ENV)
    .then(obj => {
        wasm_triangular_number_cycle(obj.instance.exports.wasm_triangular_number, cycle_size, sample_size);
    });
}



