var app = new Vue({
  el: '#app',
  data: {
    page: {
      loaded: false,
      msg: {
        alert: {
          notEnoughCash: false,
        },
      },
    },
    game: {
      init: {
        // initialisation nouvelle partie
        moneyCapital: 5000, // capital initial
        moneyRendement: 0, // rendement initial
        rendementAuto: 5, // rente auto à chaque cycle
      },
      items: {
        0: {
          name: 'item1',
          description: 'Lorem ipsum text',
          img: '', // url img
          price: 1000, // prix d'achat
          rendement: 2, // rendement $ par tour
          maxNb: 500, // nombre max pouvant être possédés
          reliabilityFloorPct: 80, // pourcentage state à partir duquel le rendement diminue
        },
        1: {
          name: 'item2',
          description: 'Lorem ipsum text2',
          img: '',
          price: 5000,
          rendement: 15,
          maxNb: 100,
          reliabilityFloorPct: 75,
        },
      },
    },
    playerDatas: {
      // donnée en cours du joueur
      newPlay: false,
      moneyCapital: null,
      moneyRendement: null,
      items: {
        0: {
          qty: 12,
          state: 58,
        },
      },
      config: {
        browserSave: true, // sauver dans le navigateur automatiquement la partie
        companyName: 'My company', // nom société
        playerName: 'Me', // nom joueur
      },
    },
  },
  mounted: function () {
    this.$nextTick(function () {
      this.page.loaded = true;
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
        this.page.msg.alert.notEnoughCash = true;
        setTimeout(
          function () {
            this.page.msg.alert.notEnoughCash = false;
          }.bind(this),
          5000
        );
        return;
      }
      // rendement + capital + owned
      if (action === 'buy') {
        this.items[ind].owned += qty;
        this.playerDatas.moneyCapital -= total_amount;
        this.playerDatas.moneyRendement += this.items[ind].rendement * qty;
      } else if (action === 'sell') {
        this.items[ind].owned -= qty;
        this.playerDatas.moneyCapital += total_amount;
        this.playerDatas.moneyRendement -= this.items[ind].rendement * qty;
      }
    },
  },
});
