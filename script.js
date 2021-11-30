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
      let ind = e.target.getAttribute('data-id');
      // alert(this.items[ind].name);
      // retirer montant achat
      let qty = e.target.parentNode.getElementsByClassName('buy')[0].value;
      let total_amount = qty * this.items[ind].price;
      if (total_amount > this.moneyCapital) {
        this.alertNotEnoughCash = true;
        return;
      }
      // setTimeout(
      //   function () {
      //     this.alertNotEnoughCash = false;
      //   }.bind(this),
      //   5000
      // );

      this.moneyCapital -= total_amount;
    },
  },
});
