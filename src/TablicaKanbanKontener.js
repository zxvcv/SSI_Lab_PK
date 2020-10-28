import React, {Component} from 'react';
import update from 'immutability-helper';
import TablicaKanban from "./TablicaKanban";


class TablicaKanbanKontener extends Component{
    constructor() {
        super();
        this.state = {
            lista: []
        };
    }

    componentDidMount() {
        fetch('./karty.json')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({lista: responseData});
            })
            .catch((error) => {
                console.log('Błąd pobierania i przetwarzania danych.', error);
            })
    }

    zwiekszProdukt(idProduktu){
        console.log(`zwieksz produkt: ${idProduktu}`);

        //znajdujemy indeks produktu
        let indexProduktu = this.state.lista.findIndex((produkt) =>produkt.id === idProduktu);

        let nowaIlosc = this.state.lista[indexProduktu].ilosc
        if(nowaIlosc >= 255){
            nowaIlosc = 255
        }else{
            nowaIlosc += 1;
        }

        let nowyStan = update(this.state.lista, {
            [indexProduktu]: {
                ilosc: {$set: nowaIlosc}
            }
        });

        this.setState({lista: nowyStan});
    }

    odejmijProdukt(idProduktu){
        console.log(`odejmij produkt: ${idProduktu}`);


        //znajdujemy indeks produktu
        let indexProduktu = this.state.lista.findIndex((produkt) =>produkt.id === idProduktu);

        let nowaIlosc = this.state.lista[indexProduktu].ilosc
        if(nowaIlosc <= 0){
            nowaIlosc = 0
        }else{
            nowaIlosc = nowaIlosc - 1;
        }

        let nowyStan = update(this.state.lista, {
            [indexProduktu]: {
                ilosc: {$set: nowaIlosc}
            }
        });

        this.setState({lista: nowyStan});
    }

    wyzerujProdukt(idProduktu){
        console.log(`wyzeruj produkt: ${idProduktu}`);

        //znajdujemy indeks produktu
        let indexProduktu = this.state.lista.findIndex((produkt) =>produkt.id === idProduktu);

        let nowyStan = update(this.state.lista, {
            [indexProduktu]: {
                ilosc: {$set: 0}
            }
        });

        this.setState({lista: nowyStan});
    }

    usunProdukt(idProduktu){
        console.log(`usun produkt: ${idProduktu}`);

        //znajdujemy indeks produktu
        let indexProduktu = this.state.lista.findIndex((produkt) =>produkt.id === idProduktu);

        let nowyStan = update(this.state.lista, {
            $splice: [[indexProduktu, 1]]
        });

        this.setState({lista: nowyStan});
    }

    dodajProdukt(nazwa, cena, idProduktu){
        console.log(`dodaj produkt: ${nazwa}, ${cena}, ${idProduktu}`);

        //znajdujemy nawiększy indeks
        let maxIndex = 0
        for (let i = 0; i < this.state.lista.length; i++) {
            if(this.state.lista[i].id > maxIndex){
                maxIndex = this.state.lista[i].id
            }
        }

        //zwiekszamy znaleziony indeks o jeden (generowanie unikalnego indeksu)
        maxIndex += 1

        const randomColor = Math.floor(Math.random()*16777215).toString(16);

        let nowaNazwa = nazwa
        if(nazwa === ""){
            nowaNazwa = "Brak nazwy"
        }

        //tworzymy nowy produkt
        let nowyProdukt = {
            id: maxIndex,
            nazwa: nowaNazwa,
            ilosc: 0,
            cena: parseInt(cena),
            kolor: "#" + randomColor
        };

        let nowyStan = update(this.state.lista, {
            $push: [nowyProdukt]
        });

        this.setState({lista: nowyStan});
    }

    zaktualizujProdukt(nazwa, cena, idProduktu){
        console.log(`zaktualizuj produkt: ${nazwa}, ${cena}, ${idProduktu}`);

        //znajdujemy indeks produktu
        let indexProduktu = this.state.lista.findIndex((produkt) =>produkt.id === idProduktu);

        let nowaNazwa = nazwa
        if(nazwa === ""){
            nowaNazwa = "Brak nazwy"
        }

        let nowyStan = update(this.state.lista, {
            [indexProduktu]: {
                nazwa: {$set: nowaNazwa},
                cena: {$set: parseInt(cena)}
            }
        });

        this.setState({lista: nowyStan});
    }

    resetujProdukty() {
        console.log(`resetuj produkty`);

        this.componentDidMount()
    }

    render(){
        return <TablicaKanban lista={this.state.lista}
                              funkcje={
                                  {
                                      zwiekszProdukt: this.zwiekszProdukt.bind(this),
                                      odejmijProdukt: this.odejmijProdukt.bind(this),
                                      wyzerujProdukt: this.wyzerujProdukt.bind(this),
                                      usunProdukt: this.usunProdukt.bind(this),
                                      dodajProdukt: this.dodajProdukt.bind(this),
                                      zaktualizujProdukt: this.zaktualizujProdukt.bind(this),
                                      resetujProdukty: this.resetujProdukty.bind(this)
                                  }
                              }
        />
    }
}

export default TablicaKanbanKontener;