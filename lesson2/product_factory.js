let nextId = 0;

function createProduct(name, quantity, price) {
  let currentId = nextId;
  nextId += 1;

  return {
    id: currentId,
    name,
    quantity,
    price,    
    setPrice(newPrice) {
      if (newPrice >= 0) {
        this.price = newPrice;
      } else {
        alert('Invalid price.');
      }
    },

    describe() {
      console.log(`Name: ${this.name}\n` +
                  `ID: ${this.id}\n` +
                  `Price: $${this.price}\n` +
                  `Stock: ${this.quantity}`);
    },
  }
}

let scissor = createProduct('Scissors', 8, 10);
let drill = createProduct('Cordless Drill', 15, 45);
let saw = createProduct(2, 'Circular Saw', 12, 95);
let hammer = createProduct(3, 'Sledge Hammer', 78, 45);
let boxCutter = createProduct(4, 'Box Cutter', 41, 15);

// console.log(drill.price);
// drill.setPrice(69);
// console.log(drill.price);
// console.log(drill.setPrice(-69));

scissor.describe();
drill.describe();
saw.describe();
hammer.describe();
boxCutter.describe();
