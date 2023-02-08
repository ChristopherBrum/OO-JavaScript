// Implement a function countdown that uses an IIFE to generate the desired output.

function countdown(count) {
  (function(num) {
  console.log(String(num));
  if (num === 0) {
    console.log('Done!');
    return;
  }
  return countdown(num - 1);
  })(count);
}

countdown(7);

// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0
// Done!