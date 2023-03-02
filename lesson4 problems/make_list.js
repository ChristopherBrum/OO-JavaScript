function makeList() {
  let items = [];

  return {
    list() {
      if (items.length === 0) {
        console.log('The list is empty.')
      } else {
        items.forEach(listItem => console.log(listItem));
      }
    },

    add(arg) {
      items.push(arg);
      console.log(arg + ' added!');
    },

    remove(arg) {
      let index = items.indexOf(arg);
      let deleted = items.splice(index, 1);
      console.log(deleted[0] + ' removed!');
    },
  }
}

let list = makeList();
list.list();
list.add('peas');
// peas added!
list.list();
// peas
list.add('corn');
// corn added!
list.list();
// peas
// corn
list.remove('peas');
// peas removed!
list.list();
// corn
console.log(list.items);