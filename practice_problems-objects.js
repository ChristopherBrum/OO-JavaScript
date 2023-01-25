let invoices = {
  unpaid: [],
  paid: [],

  add: function(name, amount) {
    this.unpaid.push({
      name,
      amount,
    });
  },

  totalDue: function() {
    return this.unpaid.reduce((total, invoice) => total + invoice.amount, 0);
  },

  totalPaid: function() {
    return this.paid.reduce((total, invoice) => total + invoice.amount, 0);
  },

  payInvoice: function(clientName) {
    let unpaidLocal = [];
    this.unpaid.forEach(invoice => {
      if (invoice.name === clientName) {
        this.paid.push(invoice);
      } else {
        unpaidLocal.push(invoice);
      }
    })

    this.unpaid = unpaidLocal;
  },
};

invoices.add('Due North Development', 250);
invoices.add('Moonbeam Interactive', 187.50);
invoices.add('Slough Digital', 300);

invoices.payInvoice('Due North Development')
invoices.payInvoice('Slough Digital')
console.log(invoices.totalPaid());
console.log(invoices.totalDue());