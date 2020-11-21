<template src="./App.html"/>

<script>
export default {
  name: 'MojKomponent',
  data: function () {
    return {
      nazwa: 'laptop',
      cena: 1990,
      nizszyPodatek: 12,
      wyzszyPodatek: 23,
      licznik: 0
    }
  },
  computed: {
    nizszaCalkowitaCena: function () {
      return this.pobierzCalkowitaCene(this.nizszyPodatek)
    },
    wyzszaCalkowitaCena: function () {
      return this.pobierzCalkowitaCene(this.wyzszyPodatek)
    }
  },
  methods: {
    pobierzCalkowitaCene(podatek) {
      return this.cena + (this.cena * (podatek / 100))
    }
  },
  filters: {
    waluta(wartosc, miejsc) {
      return new Intl.NumberFormat("pl-PL",
          {style: "currency", currency: "PLN",
          minimumFractionDigits: miejsc || 2,
          maximumFractionDigits: miejsc || 2
          }).format(wartosc);
    },
    wielka(wartosc) {
      return wartosc[0].toUpperCase() + wartosc.slice(1);
    },
    odwroc(wartosc) {
      return wartosc.split("").reverse().join("");
    }
  }
}
</script>