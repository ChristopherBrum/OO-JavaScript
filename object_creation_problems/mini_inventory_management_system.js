/*
build a simple inventory management system

The system is composed of:
- ITEM CREATOR: makes sure that all necessary info is present/valid.
- ITEM MANAGER: responsible for creating/updating/deleting/querying information about the items.
- REPORTS MANAGER: generates reports for a specific item or ALL items
  - Reports for specific items are generated from report objects created from the report manager. 
  - The report manager is responsible for reports for all items.


Required info for an Item:
- SKU CODE: unique identifier for item. The first 3 letters of the item and the first 2 letters of the category. If the item name is more than 1 word, then take two letters from the tfirst and 1 from the second.
- ITEM NAME: min 5 characters, spaces not counted as characters.
- CATEGORY: that the item belongs to. Min 5 chars, and only 1 word.
- QUANTITY: of stock of the item. Not blank. Assume a valid number will be provided.


Methods the ITEM MANAGER can perform:
1. create -- create a new item. Return false is not successful.
2. update -- acepts a SKU CODE and an OBJECT as args. Updates info on item. Assume values given will be valid.
3. delete -- accepts a SKU CODE anddeletes the item from the list. Assume the SKU CODE will be valid. 
4. items -- this propery contains a list of all items.
5. inStock -- method lists the items with a QUANTITY greater than 0.
6. itemsInCategory -- lists items in a given CATEGORY.


Methods a REPORTS MANAGER can perform:
1. init -- accepts the ItemManager object as an arg and assigns it to the items property.
2. createReporter -- accepts a SKU CODE and returns an object. 
  - the returned object has one method 'itemInfo' that logs the props of an object to the console as "key:value" pairs on separate lines
3. reportInStock -- logs the item names of all items athat are in stock as a comma separated value.


- There's no need to add the ability to validate the uniqueness of the SKU code. Given the current description, it's possible that a duplicate will exist.
- Each required piece of information for an item corresponds to one property.
- If any of the information provided is not valid, the item creator returns an object with a notValid property with a value of true.
- The created item objects should not have any methods/properties on them other than the required information above and those inherited from Object.prototype.
- You may add methods to the item manager as you deem necessary.


Helpers:
- validArgs(name, category, quantity): 
  - checks that the args exists
  - checks that name is > 5 chars
  - checks that category is a single word

- createSKU(name, category)
  - if name is greater than 1 word
    - return first 2 chars of first word and first 1 chars of second
  - otherwise
    - return first 3 chars from first word
  - capitalize chars and return

///////

ItemCreator
- properties:
  - sku
  - name
  - category
  - quantity
- methods

ItemManager 
- properties
  - items (list of all items) (publicly accessible)
- methods
  - create(name, cateogry, quantity)
    - validate args
      - retrun false if not valid
    - create new item
    - push to list property
    
  - update(sku, object)
    - updates the item of that matches the sku with the properties/values in the given object
    
  - delete(sku)
    - removes the item object from list that matches the given sku
    
  - inStock
    - returns a lit of all items with a quanitity > 0
    
  - itemsInCategory(category)
    - returns a list of all items that have a category matching the value 
    passed in

ReportManager
- properties
  - items
- methods
  - init
    - takes ItemManager as arg
    - sets ItemManager object to the items property
    
  - createReporter(sku)
    - returns an object with one method: itemInfo
    - this method logs all properties and values to the console on separate lines
  
  - reportInStock
    - logs the item mname of each item thats quantity is > 0 as a comma separated value
*/

////////// Helpers //////////
function invalidArgs(...context) {
  return (context.some(argument => argument === undefined) ||
          context[0].length <= 5 ||
          context[1].split(' ').length > 1);
}

function collectAbbreviation(string) {
  let abbreviation = '';
  
  if (/ /.test(this.name)) {
    let stringArray = this.name.split(' ');
    abbreviation += charAbbreviation(stringArray[0], 2)
    abbreviation += charAbbreviation(stringArray[1], 1)
  } else {
    abbreviation += charAbbreviation(string, 3)
  }
  
  return abbreviation;
}

function charAbbreviation(string, length) {
  return string.slice(0, length);
}


function generateSKU(name, category) {
  let nameAbbreviation = collectAbbreviation(name);
  let categoryAbbreviation = charAbbreviation(category, 2);
  let newSKU = (nameAbbreviation + categoryAbbreviation).toUpperCase();
  return newSKU;
}

function findItemBySKU(enteredSKU, items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].sku === enteredSKU.toUpperCase()) {
      return items[i];
    }
  }
}

////////// Item Creation //////////
function Item(name, category, quantity) { 
  // Validate arguments
  let argError = invalidArgs(name, category, quantity);
  if (argError) return { notValid: true };
  
  this.sku = generateSKU(name, category); 
  this.name = name; 
  this.category = category; 
  this.quantity = quantity;
};

////////// Item Manager //////////
const ItemManager = {
  items: [],
  create(name, category, quantity) {
  const newItem = new Item(name, category, quantity);
    if (newItem.notValid) {
      return false;
    } else {
      this.items.push(newItem);
      return newItem;
    }
  },

  update(enteredSKU, object) {
    let selectedItem = findItemBySKU(enteredSKU, this.items);
    if (!selectedItem) return false;

    for (let prop in object) {
      if (selectedItem.hasOwnProperty(prop)) {
        selectedItem[prop] = object[prop];
      }
    }
  },

  delete(enteredSKU) {
    const numOfItems = this.items.length;

    for (let i = 0; i < numOfItems; i++) {
      if (this.items[i].sku === enteredSKU) {
        this.items.splice(i, 1);
        return;
      }
    }
  },

  inStock() {
    return this.items.filter(item => {
      return item.quantity > 0;
    });
  },

  itemsInCategory(enteredCategory) {
    return this.items.filter(item => item.category === enteredCategory);
  }
}
  
////////// Report Manager //////////
const ReportManager = {
  init(itemMngr) {
    this.items = itemMngr;
  },

  reportInStock() {
    let inStock = this.items.inStock()
                      .map(item => item.name)
                      .join(', ');
    return "Items in stock: " + inStock;
  },

  createReporter(enteredSKU) {
    return {
      item: findItemBySKU(enteredSKU, this.items.items),
      itemInfo() {
        console.log("Item info:");
        for (let prop in this.item) {
          console.log("- " + prop + ': ' + this.item[prop]);
        }
        console.log('');
      }
    }
  },
}

////////// Tests //////////

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

console.log(ItemManager.items);
// returns list with the 4 valid items

ReportManager.init(ItemManager);
console.log(ReportManager.reportInStock());
// logs soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
console.log(ItemManager.inStock());
// returns list with the item objects for football and kitchen pot
console.log(ReportManager.reportInStock());
// logs football,kitchen pot
console.log(ItemManager.itemsInCategory('sports'));
// returns list with the item objects for basket ball, soccer ball, and football
console.log(ItemManager.items);
ItemManager.delete('SOCSP');
console.log(ItemManager.items);
// returns list with the remaining 3 valid items (soccer ball is removed from the list)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10
