let chris = {
  name: 'Chris',
  nums: [1, 2],
  sayHiTwice() {
    this.nums.forEach(num => console.log('hello, ' + this.name));
  },
};

chris.sayHiTwice(); // 'hello, Chris' (repeated twice)