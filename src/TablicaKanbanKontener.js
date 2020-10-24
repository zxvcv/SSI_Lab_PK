import React, {Component} from 'react';
import update from 'immutability-helper';
import TablicaKanban from "./TablicaKanban";

class TablicaKanbanKontener extends Component{
    constructor() {
        super();
        this.state = {
            karty: []
        };
    }

    componentDidMount() {
        fetch('./karty.json')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({karty: responseData});
            })
            .catch((error) => {
                console.log('Błąd pobierania i przetwarzania danych.', error);
            })
    }

    pobierzKolor(status){
        if(status === "todo")
            return "#3A7A2A";
        if(status === "in-progress")
            return "#BD8D3D";
        if(status === "done")
            return "#FF8D3D";
    }

    moveLeft(idKarty){
        console.log(`moveLeft`);

        //let poprzedniStan = this.state.karty;

        //znajdujemy indeks karty
        let indexKarty = this.state.karty.findIndex((karta) =>karta.id === idKarty);

        let nowyStatus = this.state.karty[indexKarty].status;
        if(this.state.karty[indexKarty].status === "in-progress")
            nowyStatus = "todo";
        if(this.state.karty[indexKarty].status === "done")
            nowyStatus = "in-progress";

        let nowyStan = update(this.state.karty, {
            [indexKarty]: {
                status: {$set: nowyStatus},
                kolor: {$set: this.pobierzKolor(nowyStatus)}
            }
        });

        this.setState({karty: nowyStan});
    }

    moveRight(idKarty){
        console.log(`moveRight`);

        //let poprzedniStan = this.state.karty;

        //znajdujemy indeks karty
        let indexKarty = this.state.karty.findIndex((karta) =>karta.id === idKarty);

        let nowyStatus = this.state.karty[indexKarty].status;
        if(this.state.karty[indexKarty].status === "in-progress")
            nowyStatus = "done";
        if(this.state.karty[indexKarty].status === "todo")
            nowyStatus = "in-progress";

        let nowyStan = update(this.state.karty, {
            [indexKarty]: {
                status: {$set: nowyStatus},
                kolor: {$set: this.pobierzKolor(nowyStatus)}
            }
        });

        this.setState({karty: nowyStan});
    }

    usunKarte(idKarty){
        console.log(`deleteKard`);

        //let poprzedniStan = this.state.karty;

        //znajdujemy indeks karty
        let indexKarty = this.state.karty.findIndex((karta) =>karta.id === idKarty);


        let nowyStan = update(this.state.karty, { $splice: [[indexKarty, 1]] });

        this.setState({karty: nowyStan});
    }

    dodajZadanie(idKarty, nazwaZadania){
        console.log(`dodajZmiane: ${idKarty}, nazwaZadania: ${nazwaZadania}`);

        //let poprzedniStan = this.state.karty;

        //znajdujemy indeks karty
        let indexKarty = this.state.karty.findIndex((karta) =>karta.id === idKarty);

        //tworzymy nowe zadanie z podaną nazwą i tymczasowym identyfikatorem
        let noweZadanie = {id: Date.now(), nazwa: nazwaZadania, zrobione: false};

        //tworzymy nowy obiekt i dodajemy zadanie do tablicy zadań
        let nowyStan = update(this.state.karty, {
            [indexKarty]: {
                zadania: {$push: [noweZadanie]}
            }
        });

        //ustawiamy stan komponentu na zmieniony obiekt
        this.setState({karty: nowyStan});

        //ewentualnie wywołujemy API, aby dodać zadanie na serwer i otrzymać ostateczny identyfikator zadania
    }

    usunZadanie(idKarty, idZadania, indexZadania){
        console.log(`idKarty: ${idKarty}, idZadania: ${idZadania}, indexZadania ${indexZadania}`);

        //let poprzedniStan = this.state.karty;

        //znajdujemy indeks karty
        let indexKarty = this.state.karty.findIndex((karta) =>karta.id === idKarty);

        //Tworzymy nowy obiekt stanu bez wybranego zadania
        let nowyStan = update(this.state.karty, {
            [indexKarty]: {
                zadania: {$splice: [[indexZadania, 1]]}
            }
        })

        this.setState({karty: nowyStan});
    }

    zmienZadanie(idKarty, idZadania, indexZadania){
        console.log(`zmienZadanie: ${idKarty}, idZadania: ${idZadania}, indexZadania ${indexZadania}`);
    }

    dodajKarte(nowy_tytul, nowy_opis, nowy_status){
        console.log(`dodajKarte: ${nowy_tytul}, ${nowy_opis}, ${nowy_status}`);

        //let poprzedniStan = this.state.karty;

        if(nowy_opis === '' || nowy_tytul === '') {
            console.log(`opis i/lub tytul nie moze byc pusty`);
            return
        }

        let iloscKart = this.state.karty.length;

        //tworzymy nową karte
        let nowy_id = iloscKart + 1;
        let nowy_kolor = this.pobierzKolor(nowy_status);

        let nowaKarta = {id: nowy_id, tytul: nowy_tytul, opis: nowy_opis,
                            kolor: nowy_kolor, status: nowy_status, zadania: []};


        //tworzymy nową kartę i dodajemy ją do kart
        let nowyStan = update(this.state.karty, { $push: [nowaKarta] });

        //ustawiamy stan komponentu na zmieniony obiekt
        this.setState({karty: nowyStan});

        //ewentualnie wywołujemy API, aby dodać zadanie na serwer i otrzymać ostateczny identyfikator zadania
    }

    render(){
        return <TablicaKanban karty={this.state.karty}
                              funkcjeZwrotne={
                                  {
                                      zmien: this.zmienZadanie.bind(this),
                                      usun: this.usunZadanie.bind(this),
                                      dodaj: this.dodajZadanie.bind(this),
                                      dodajKarte: this.dodajKarte.bind(this)
                                  }
                              }
                              funkcjePozycjiKarty={
                                  {
                                      lewo: this.moveLeft.bind(this),
                                      prawo: this.moveRight.bind(this),
                                      usun: this.usunKarte.bind(this)
                                  }
                              }
        />
    }
}

export default TablicaKanbanKontener;