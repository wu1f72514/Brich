var app = new Vue({
  el: '#app',
  data: {
    loaded: false,
    alertNotEnoughCash: false,
    moneyCapital: 99999999,
    moneyRendement: 9999,
    items: {
      0: {
        name: 'item1',
        description: 'Lorem ipsum text',
        img: '',
        price: 999,
        rendement: 99,
        owned: 2,
      },
      1: {
        name: 'item2',
        description: 'Lorem ipsum text2',
        img: '',
        price: 99,
        rendement: 9999,
        owned: 0,
      },
    },
  },
  mounted: function () {
    this.$nextTick(function () {
      this.loaded = true;
    });
  },
  methods: {
    buy(e) {
      this.impactOwned(
        'buy',
        e.target.parentNode.getElementsByClassName('buy')[0].value * 1,
        e.target.getAttribute('data-id')
      );
    },
    sell(e) {
      this.impactOwned(
        'sell',
        e.target.parentNode.getElementsByClassName('buy')[0].value * 1,
        e.target.getAttribute('data-id')
      );
    },
    impactOwned(action, qty, ind) {
      // montant achat
      let total_amount = qty * this.items[ind].price;
      if (action === 'buy' && total_amount > this.moneyCapital) {
        this.alertNotEnoughCash = true;
        setTimeout(
          function () {
            this.alertNotEnoughCash = false;
          }.bind(this),
          5000
        );
        return;
      }
      // rendement + capital + owned
      if (action === 'buy') {
        this.items[ind].owned += qty;
        this.moneyCapital -= total_amount;
        this.moneyRendement += this.items[ind].rendement * qty;
      } else if (action === 'sell') {
        this.items[ind].owned -= qty;
        this.moneyCapital += total_amount;
        this.moneyRendement -= this.items[ind].rendement * qty;
      }
    },
  },
});
