<template src="./App.html"/>

<script>
import Vue from "vue";

export default {
  name: 'MojKomponent',
  data: function () {
    return {
      nazwa: 'laptop',
      cena: 1990,
      nizszyPodatek: 12,
      wyzszyPodatek: 23,
      kategoria: 'komputery',
      licznik: 0,

      fragment: `<div class="from-group">
                    Hasło: <input class="form-control" />
                 </div>`,
      pokazElementy: true,
      podswietlenie: false,

      podswietlenie1: false,
      podswietlenie2: false,

      podswietlenieStyle: false,

      podswietlenieData: false,

      podswietlenieAtrybuty: false,

      podswietlenieProp: false,

      produkty: [
        { nazwa: "Kajak", cena: 234 },
        { nazwa: "Kamizelka ratunkowa", cena: 49.99 },
        { nazwa: "Piłka do metalu", cena: 19.49 },
        { nazwa: "Stadion", cena: 9999999 },
        { nazwa: "Czapeczka", cena: 15 }
      ],

      produktyObiekt: {
        "kajak": { nazwa: "Kajak", cena: 234 },
        22: { nazwa: "Kamizelka ratunkowa", cena: 49.99 },
        3: { nazwa: "Piłka do metalu", cena: 19.49 },
        "4": { nazwa: "Stadion", cena: 9999999 }
      }
    }
  },
  computed: {
    nizszaCalkowitaCena: function () {
      return this.pobierzCalkowitaCene(this.nizszyPodatek)
    },
    wyzszaCalkowitaCena: function () {
      return this.pobierzCalkowitaCene(this.wyzszyPodatek)
    },
    klasyElementu() {
      return this.podswietlenie
          ? ["bg-light", "text-dark", "display-4"]
          : ["bg-dark", "text-light", "p-2"];
    },
    klasyElementu2() {
      return {
          "text-dark": this.podswietlenie1,
          "bg-light": this.podswietlenie2
      }
    },
    styleElementu() {
      return {
        "border": "5px solid red",
        "background-color": this.podswietlenieStyle ? "coral" : ""
      }
    },
    rozmiar() {
      return this.podswietlenieData ? "big": "small";
    },
    wartosciAtrybutow() {
      return {
        class: this.podswietlenieAtrybuty ? ["bg-light", "text-dark"] : [],
        style: { border: this.podswietlenieAtrybuty ? "5px solid red" : "" },
        "data-size": this.podswietlenieAtrybuty ? "big" : "small"
      }
    },
    zawartoscTekstowa() {
      return this.podswietlenieProp ? "Podswietlenie" : `Produkt: ${this.nazwa}`;
    }
  },
  methods: {
    pobierzCalkowitaCene(podatek) {
      return this.cena + (this.cena * (podatek / 100))
    },
    przechwycKlikniecie() {
      this.pokazElementy = !this.pokazElementy;
    },
    przechwycKlikniecieShow() {
      this.licznik++;
    },
    przechwycKlikniecieBind() {
      this.podswietlenie = !this.podswietlenie;
    },
    przechwycKlikniecieBind1() {
      this.podswietlenie1 = !this.podswietlenie1;
    },
    przechwycKlikniecieBind2() {
      this.podswietlenie2 = !this.podswietlenie2;
    },
    przechwycKlikniecieStyle() {
      this.podswietlenieStyle = !this.podswietlenieStyle;
    },
    przechwycKlikniecieData() {
      this.podswietlenieData = !this.podswietlenieData;
    },
    przechwycKlikniecieAtrybuty() {
      this.podswietlenieAtrybuty = !this.podswietlenieAtrybuty;
    },
    przechwycKlikniecieProp() {
      this.podswietlenieProp = !this.podswietlenieProp;
    },
    przechwycKlikniecieTable() {
      //this.produkty.push(this.produkty.shift())
      //this.produkty = this.produkty.filter(p => p.cena > 20);
      //this.produkty[1] = { nazwa: "Buty do bigania", cena: 99 }; //nie aktualizuje się na widoku
      Vue.set(this.produkty, 1, { nazwa: "Buty do bigania", cena: 99 });
      //modyfikacja też nie pociągnie za sobą aktualizacji na widoku
      //trzeba używac metody splice() żeby coś usunąc
    },
    przechwycKlikniecieTableObiekt() {
      Vue.set(this.produktyObiekt, 5, { nazwa: "Buty do bigania", cena: 99 });
    },
    przechwycKlikniecieLiczba(liczba) {
      console.log(`liczba: ${liczba}`);
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

<style>
  h2:first-child { background-color: aquamarine; padding: 10px; color: black; }

  [data-size=big] { font-size: 40pt; }
  [data-size=small] { font-size: 20pt; }

  [odd] { color: royalblue }
</style>