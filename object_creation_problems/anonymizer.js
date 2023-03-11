const Account = function() {
  // Private Data
  let acctEmail, acctPassword, acctFirstName, acctLastName;
  
  // Private Methods
  function generateValidChars() {
    let validNums = [...Array(123).keys()].filter(num => {
      return ((num >= 48 && num <= 57) || 
             (num >= 65 && num <= 90) ||
             (num >= 97 && num <= 122))
    });
    
    return validNums.map(char => {
      return String.fromCharCode(char);
    });
  }
  
  function anonymize() {
    const chars = generateValidChars();
    let sequence = '';
    
    for (; sequence.length < 16;) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      sequence += chars[randomIndex];
    }
    
    return sequence;
  }
  
  function isValidPassword(enteredPassword) {
    return enteredPassword === acctPassword;
  }
  
  // Returned Object
  return {
    init(email, password, firstName, lastName) {
      acctEmail = email;
      acctPassword = password;
      acctFirstName = firstName;
      acctLastName = lastName;
      this.displayName = anonymize();
      return this;
    },

    reanonymize(password) {
      if (isValidPassword(password)) {
        this.displayName = anonymize();
        return true;
      }
      
      return "Invalid Password";
    },

    resetPassword(enteredPassword, newPassword) {
      if (isValidPassword(enteredPassword)) {
        acctPassword = newPassword;
        return true;
      }
        
      return "Invalid Password";
    },

    firstName(password) {
      if (isValidPassword(password)) return acctFirstName; 
      return "Invalid password";
    },

    lastName(password) {
      if (isValidPassword(password)) return acctLastName; 
      return "Invalid password";
    },

    email(password) {
      if (isValidPassword(password)) return acctEmail; 
      return "Invalid password";
    },
  }
}();


let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');

console.log(Object.getPrototypeOf(fooBar) === Account);

console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
console.log(fooBar.reanonymize('abc'));            // logs true
console.log(displayName === fooBar.displayName);   // logs false

let fooBar2 = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar2.firstName);                     // returns the firstName function
console.log(fooBar2.email);                         // returns the email function
console.log(fooBar2.firstName('123456'));           // logs 'foo'
console.log(fooBar2.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar2.displayName);                   // logs 16 character sequence
console.log(fooBar2.resetPassword('123', 'abc'))    // logs 'Invalid Password'
console.log(fooBar2.resetPassword('123456', 'abc')) // logs true

let displayName2 = fooBar2.displayName;
console.log(fooBar2.reanonymize('abc'));            // logs true
console.log(displayName2 === fooBar2.displayName);  // logs false

let bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar2.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar2.email('abc'));                  // logs 'Invalid Password'