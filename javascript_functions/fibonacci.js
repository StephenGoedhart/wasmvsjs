
  dataset = [] //share this dataset with wasm file
  for(i = 0; i < 10000000; i++){
      dataset.push(Math.round(Math.random() * 10))
  }
  
  fibonacci = (x) => {
      if (x === 1) return 1;
      if (x === 2) return 1;
      return fibonacci(x - 1) + fibonacci(x - 2);
  }
  
  // print n number of fibonacci
  js_fibonacci = (n) => {
      var t0 = performance.now();
      result = []
      for(i = 1; i <= n; i++){
          var r = fibonacci(i);
          result.push(r);
      }
      var t1 = performance.now();
  
      data = {
          output: result, 
          time: t1 - t0
      }
  
      postMessage(data);
  }
  
  js_fibonacci(40)