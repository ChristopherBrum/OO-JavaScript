let temperatures = [53, 86, 12, 43];

function average(values) {
  let total = 0;
  let i;
  for (i = values.length - 1; i >= 0; i -= 1) {
    total += values[i];
  }

  return total / values.length;
}

console.log(average(temperatures));           // => 48.5