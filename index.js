const SLR = require("ml-regression").SLR;
let inputs = [80,60,10,20,30]
let outputs = [20,40,30,50,60]
let reg = new SLR (inputs,outputs)
console.log(reg.predict(69))