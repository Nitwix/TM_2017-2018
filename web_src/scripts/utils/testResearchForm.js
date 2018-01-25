let prob = .01;
let pow = 1.005;
for(let i=0; i<1e2; i++){
    prob += Math.pow((1/prob),pow);
    console.log(prob);
}