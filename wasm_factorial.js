dataset = [] //share this dataset with wasm file
for(i = 0; i < 10000000; i++){
    dataset.push(Math.round(Math.random() * 10))
}

wasm_factorial = (i, obj) => {
//console.log(obj.instance.exports.wasm_factorial(5));
    if(i >= dataset.length) return;
    var result = obj.instance.exports.wasm_factorial(dataset[i]);
    postMessage(i);
    setTimeout(()=>{
        wasm_factorial(i+1, obj);
    }, 5);
}

// Callback on wasm instantiate
wasm_factorial_complete = (obj) => {
    var t0 = performance.now();
    dataset.forEach(element => {
        obj.instance.exports.wasm_factorial(element);
    });
    var t1 = performance.now();
    postMessage(t1 - t0);
}


WebAssembly.instantiateStreaming(fetch('wasm_factorial.wasm'))
.then(obj => {
        //wasm_factorial(0, obj);
        wasm_factorial_complete(obj)
});
