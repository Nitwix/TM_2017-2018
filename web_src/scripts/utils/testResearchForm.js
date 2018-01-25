let c = 5;
let r = .9;
let sum = 0;
for(let i=0; i<=1e2; i++){
    sum += c*Math.pow(r, i);
    console.log(sum);
}
