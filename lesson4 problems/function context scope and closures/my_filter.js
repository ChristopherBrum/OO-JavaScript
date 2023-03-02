function myFilter(array, func, context) {
  const result = [];
  let boundFunc = func.bind(context);
  array.forEach(value => {
    if (boundFunc(value)) {
      result.push(value);
    }
  });

  return result;
}