import  express from "express";
const app = express();
const PORT = 9876;

let windowNumbers = [];

app.get("/numbers/:numberid", (req, res) => {
  const { numberid } = req.params;

  let newNumbers = [];

  switch (numberid) {
    case "p":
      newNumbers = getPrimes(1, 100).slice(0, 5);
      break;
    case "f":
      newNumbers = getFibonacci(5);
      break;
    case "e":
      newNumbers = getEvenNumbers(1, 100).slice(0, 5);
      break;
    case "r":
      newNumbers = getRandomNumbers(5);
      break;
    default:
      return res.status(400).json({ error: "Invalid number ID" });
  }

  const previousWindow = [...windowNumbers];
  const previousAvg = average(previousWindow);


  const merged = [...windowNumbers, ...newNumbers];
  windowNumbers = merged.slice(-10);
  const currentAvg = average(windowNumbers);

  res.json({
    windowPrevState: previousWindow,
    windowCurrState: windowNumbers,
    numbers: newNumbers,
    avgPrev: previousAvg.toFixed(2),
    avgCurr: currentAvg.toFixed(2),
  });
});

function average(arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
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
  return fib.slice(0, n);
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

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
