import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DodajProdukt extends Component{
    constructor() {
        super();
        this.state = {
            nazwa: '',
            cena: 0
        };

        this.handleChangeNazwa = this.handleChangeNazwa.bind(this);
        this.handleChangeCena = this.handleChangeCena.bind(this);
    }

    handleChangeNazwa(event) {
        this.setState({nazwa: event.target.value});
    }

    handleChangeCena(event) {
        this.setState({cena: event.target.value});
    }

    render(){
        return(
            <form>
                <input type="text"
                       placeholder="Podaj nazwę"
                       onChange={this.handleChangeNazwa}
                />
                <input type="number"
                       placeholder="Podaj cenę"
                       onChange={this.handleChangeCena}
                />
                <input type="button"
                       value="Dodaj nowy produkt"
                       onClick={this.props.funkcje.dodajProdukt.bind(null, this.state.nazwa, this.state.cena, this.props.id)}/>
            </form>
        )
    }
}

DodajProdukt.propTypes = {
    funkcje: PropTypes.object
}
export default DodajProdukt;