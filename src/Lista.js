import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Karta from "./Karta";
import DodajKarte from "./DodajKarte";

class Lista extends Component{
    render() {
        var karty = this.props.karty.map((karta) => {
            return <Karta key={karta.id}
                          id={karta.id}
                          tytul={karta.tytul}
                          opis={karta.opis}
                          kolor={karta.kolor}
                          zadania={karta.zadania}
                          funkcjeZwrotne={this.props.funkcjeZwrotne}
                          funkcjePozycjiKarty={this.props.funkcjePozycjiKarty}
            />
        })

        return (
            <div className="list">
                <h1>{this.props.tytul}</h1>
                {karty}
                <DodajKarte id={this.props.id} funkcjeZwrotne={this.props.funkcjeZwrotne} />
            </div>
        )
    }
}

Lista.propTypes = {
    id: PropTypes.string,
    tytul: PropTypes.string.isRequired,
    karty: PropTypes.arrayOf(PropTypes.object),
    funkcjeZwrotne: PropTypes.object,
    funkcjePozycjiKarty: PropTypes.object
}
export default Lista;