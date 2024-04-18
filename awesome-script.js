const fs = require("fs");

function getNumbersFromFile(filename) {
  try {
    const data = fs.readFileSync(filename, "utf8");
    const numbers = data
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
      .map(Number);
    return numbers;
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
}

function getSum(numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function getAverage(numbers) {
  if (numbers.length === 0) return 0;
  return getSum(numbers) / numbers.length;
}

function main() {
  const numbers = getNumbersFromFile("numbers.txt");
  const total = getSum(numbers);
  const average = getAverage(numbers);

  console.log(`Sum: ${total}`);
  console.log(`Average: ${average}`);
}

main();
