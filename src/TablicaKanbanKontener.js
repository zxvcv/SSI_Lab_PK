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

    dodajZadanie(idKarty, nazwaZadania){
        console.log(`dodajZmiane: ${idKarty}, nazwaZadania: ${nazwaZadania}`);

        let poprzedniStan = this.state.karty;

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

        let poprzedniStan = this.state.karty;

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

    render(){
        return <TablicaKanban karty={this.state.karty}
                              funkcjeZwrotne={
                                  {
                                      zmien: this.zmienZadanie.bind(this),
                                      usun: this.usunZadanie.bind(this),
                                      dodaj: this.dodajZadanie.bind(this)
                                  }
                              }
        />
    }
}

export default TablicaKanbanKontener;