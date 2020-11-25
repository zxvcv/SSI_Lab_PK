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
      },

      rozmiarStrony: 5,
      aktualnaStrona: 1,
      filtrowanie: false,
      sortowanie: 'id',
      kierunekSortowania: 'malejaco',
      produktyPaginacja: [
        { id: 0, nazwa: "Kajak", cena: 234, kolor: '#400808', ilosc: 0 },
        { id: 1, nazwa: "Kamizelka ratunkowa", cena: 49.99, kolor: '#d6a61a', ilosc: 0 },
        { id: 2, nazwa: "Piłka do metalu", cena: 19.49, kolor: '#7c9400', ilosc: 0 },
        { id: 3, nazwa: "Stadion", cena: 9999999, kolor: '#0bf35f', ilosc: 0 },
        { id: 4, nazwa: "Czapeczka", cena: 15, kolor: '#01f5a9', ilosc: 0 },
        { id: 5, nazwa: "Krzesełko", cena: 29.49, kolor: '#0393c1', ilosc: 0 },
        { id: 6, nazwa: "Szachownica", cena: 59, kolor: '#4a08e7', ilosc: 0 },
        { id: 7, nazwa: "Czhorągiewka", cena: 9.99, kolor: '#230377', ilosc: 0 },
        { id: 8, nazwa: "Jabłuszko", cena: 2.99, kolor: '#8b05e0', ilosc: 0 },
        { id: 9, nazwa: "Gruszeczka", cena: 3.99, kolor: '#6b0794', ilosc: 0 },
        { id: 10, nazwa: "Laptop", cena: 3500, kolor: '#f961ff', ilosc: 0 },
        { id: 11, nazwa: "Samochód", cena: 30000, kolor: '#ff0000', ilosc: 0 }
      ]
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
    },
    wyswietlaneElementy() {
      let dane = this.filtrowanie ? this.produktyPaginacja.filter(p => p.ilosc > 0) : this.produktyPaginacja;
      return dane.concat().sort((p1, p2) => {
        if(this.kierunekSortowania === 'malejaco'){
          let temp = p1;
          p1 = p2;
          p2 = temp;
        }

        if(this.sortowanie === 'nazwa')
          return p2.nazwa.localeCompare(p1.nazwa);
        else if(this.sortowanie === 'cena')
          return p2.cena - p1.cena;
        else if(this.sortowanie === 'kolor')
          return p2.kolor.localeCompare(p1.kolor);
        else if(this.sortowanie === 'ilosc')
          return p2.ilosc - p1.ilosc;
        else
          return p2.id - p1.id;
      });
    },
    liczbaStron() {
      return Math.ceil(this.wyswietlaneElementy.length / this.rozmiarStrony);
    },
    elementyStrony() {
      let start = (this.aktualnaStrona - 1) * this.rozmiarStrony;
      return this.wyswietlaneElementy.slice(start, start + this.rozmiarStrony);
    },
    iloscRoznychProduktow() {
      let suma = 0;
      let step;
      for (step = 0; step < this.produktyPaginacja.length; step++)
        if(this.produktyPaginacja[step].ilosc > 0)
          suma += 1;
      return suma
    },
    iloscWszystkichProduktow() {
      let suma = 0;
      let step;
      for (step = 0; step < this.produktyPaginacja.length; step++)
        suma += this.produktyPaginacja[step].ilosc;
      return suma;
    },
    cenaWszystkichProduktow() {
      let cena = 0;
      let step;
      for (step = 0; step < this.produktyPaginacja.length; step++)
        cena += this.produktyPaginacja[step].ilosc * this.produktyPaginacja[step].cena;
      return cena;
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
    },
    wybierzStrone(strona) {
      this.aktualnaStrona = strona;
    },
    zmienSortowanie() {
      this.sortowanie = !this.sortowanie;
      this.aktualnaStrona = 1;
    },
    zmienFiltrowanie() {
      this.filtrowanie = !this.filtrowanie;
      this.aktualnaStrona = 1;
    },
    dodajProdukt(itemID) {
      console.log("DODAJ:" + itemID);
      var step;
      for (step = 0; step < this.produktyPaginacja.length; step++)
        if (this.produktyPaginacja[step].id === itemID)
          this.produktyPaginacja[step].ilosc += 1;
    },
    odejmijProdukt(itemID) {
      console.log("ODEJMIJ:" + itemID);
      var step;
      for (step = 0; step < this.produktyPaginacja.length; step++)
        if (this.produktyPaginacja[step].id === itemID &
            this.produktyPaginacja[step].ilosc > 0)
          this.produktyPaginacja[step].ilosc -= 1;
    },
    zerujProdukt(itemID) {
      console.log("ZERUJ:" + itemID);
      var step;
      for (step = 0; step < this.produktyPaginacja.length; step++)
        if (this.produktyPaginacja[step].id === itemID)
          this.produktyPaginacja[step].ilosc = 0;
    },
    usunProdukt(itemID) {
      console.log("USUN:" + itemID);
      var step;
      for (step = 0; step < this.produktyPaginacja.length; step++)
        if (this.produktyPaginacja[step].id === itemID)
          this.produktyPaginacja.splice(step, 1);
    },
    dodajElement() {
      let len = this.produktyPaginacja.length;
      let newIndex = this.produktyPaginacja[len - 1].id + 1;
      console.log("DODAJ ELEMENT" + newIndex);

      let r = Math.random().toString(36).substring(10);
      console.log("random", r);

      this.produktyPaginacja.push({
        id: newIndex,
        nazwa: Math.random().toString(36).substring(7),
        cena: (1. + (100000. - 1.) * Math.random()).toFixed(2),
        kolor: '#' + Math.floor(Math.random()*16777215).toString(16),
        ilosc: 0
      });
    },
    sortuj(obiektSortowania) {
      this.sortowanie = obiektSortowania
      this.aktualnaStrona = 1;

      if(this.sortowanie === obiektSortowania)
      {
        if(this.kierunekSortowania === 'malejaco')
          this.kierunekSortowania = 'rosnaco';
        else
          this.kierunekSortowania = 'malejaco';
      }
      else
      {
        this.kierunekSortowania = 'rosnaco';
      }
    },
    ustawKolor(itemID) {
      let step;
      for (step = 0; step < this.produktyPaginacja.length; step++)
        if (this.produktyPaginacja[step].id === itemID)
          return {
            "background-color": this.produktyPaginacja[step].kolor,
            "padding": 5
          }
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