// 1 page = 64 kb
var memory = new WebAssembly.Memory({initial:10, maximum:100}); // memory objects

var importObj = {obj: { importedFunc : arg => console.log(arg)}} // how to use imports

WebAssembly.instantiateStreaming(fetch('main.wasm'), importObj, memory)
.then(obj => {
    var i32 = new Uint32Array(memory.buffer); // How much freedom do we have?

    // Can different Web Assembly objects access different memories? 

    for(var i = 0; i < 10; i++){
        i32 = i;
    }
    var sum = obj.instance.exports.accumulate(0, 10); // Utilizing a function written in wasm
})
.then(obj => obj.instance.exports.main()); // When promise resolves function is called


bytestr = ""

WebAssembly.instantiateStreaming()