
import express from "express";

const PORT = 3000;
const app = express();

app.get("/numbers/:numberid", async (req, res) => {
  const { numberid } = req.params;

  let numbers = [];

  switch (numberid) {
    case "p":
      numbers = getPrimes(1, 100);
      break;
    case "f":
      numbers = getFibonacci(10);
      break;
    case "e":
      numbers = getEvenNumbers(1, 100);
      break;
    case "r":
      numbers = getRandomNumbers(10);
      break;
    default:
      return res.status(400).json({ error: "Invalid number ID" });
  }

  function getPrimes(start, end) {
    const primes = [];
    for (let i = start; i <= end; i++) {
      if (isPrime(i)) primes.push(i);
    }
    return primes;
  }
  
  function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
  
  function getFibonacci(n) {
    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }
    return fib;
  }
  
  function getEvenNumbers(start, end) {
    const evens = [];
    for (let i = start; i <= end; i++) {
      if (i % 2 === 0) evens.push(i);
    }
    return evens;
  }
  
  function getRandomNumbers(count) {
    const randoms = [];
    for (let i = 0; i < count; i++) {
      randoms.push(Math.floor(Math.random() * 100));
    }
    return randoms;
  }
  
  const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;

  res.json({
    numbers,
    average: avg.toFixed(2)
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
