import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Naglowek from './Naglowek';
import Produkty from "./Produkty";
import DodajProdukt from "./DodajProdukt";

class TablicaKanban extends Component {
    render() {
        return (
            <div className="app">
                <Naglowek tytul="Pawel Piskorz"
                          funkcje={this.props.funkcje}
                          lista={this.props.lista}
                />
                <Produkty funkcje={this.props.funkcje}
                          lista={this.props.lista}
                />
                <DodajProdukt funkcje={this.props.funkcje}
                />
            </div>
        );
    }
}

TablicaKanban.propTypes = {
    lista: PropTypes.arrayOf(PropTypes.object),
    funkcje: PropTypes.object
};
export default TablicaKanban;