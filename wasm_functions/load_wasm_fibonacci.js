// Initialize wasm with plenty of memory, just to be sure
const ENV = () => ({
    __memory_base: 0,
    __table_base: 0,
    memory: new WebAssembly.Memory({ initial: 256 }),
    table: new WebAssembly.Table({ initial: 256, element: 'anyfunc' })
  });

 var data = {
    cycle: 0,
    output: 0,
    time: 0
}

// wasm fibonacci function, sequence length
wasm_fibonacci = (func, s) => {
    var t0 = performance.now();
    result = []
    for(i = 1; i <= s; i++){
        var r = func(i);
        result.push(r);
    }
    var t1 = performance.now();

    //data.cycle = k
    data.output = result
    data.time = t1 - t0

    // data = {
    //     cycle: k,
    //     output: result, 
    //     time: t1 - t0,
    // }

    postMessage(data);
}

// wasm function, n cycles, sequence length
wasm_fibonacci_cycle = (func, n, s) => {
    setInterval(() => {
        wasm_fibonacci(func, s);
    }, 200);
}

// load wasm, show first 10 fibonacci numbers
WebAssembly.instantiateStreaming(fetch('wasm_fibonacci.wasm'), ENV)
.then(obj => {
    wasm_fibonacci_cycle(obj.instance.exports.wasm_fibonacci, 10, 40);
});


