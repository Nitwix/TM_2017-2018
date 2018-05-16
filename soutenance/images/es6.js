const objet = { a: 5, b: 10 };
let { a, b } = objet;

let mult = (x, y) => x * y;
mult(a, b); // => 50

class Foo {/*...*/}

const primes = [2, 3, 5, 7, 11, 13];
for (let prime of primes) {
    console.log(`Le nombre premier est ${prime}`);
}