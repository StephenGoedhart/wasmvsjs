dataset = [] //share this dataset with wasm file
for(i = 0; i < 10000000; i++){
    dataset.push(Math.round(Math.random() * 10))
}

factorial = (x) => {
    if(x <= 1) return x;
    sum = x;
    
    for(i = x - 1; i > 1; i--){
        sum = sum * i;
    }
    return sum;
}

js_factorial = (i) => {
        if(i >= dataset.length) return;
        var result = factorial(dataset[i]);
        var data = {
            index: i,
            outcome: result
        }
        postMessage(data);
        setTimeout(() => {
            js_factorial(i+1);
        }, 5);

};

js_factorial_complete = () =>{
    var t0 = performance.now();
    dataset.forEach(element => {
        factorial(element);
    });
    var t1 = performance.now();
    postMessage(t1 - t0);
}

//js_factorial(0)
js_factorial_complete();