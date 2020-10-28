import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Produkt extends Component{
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
        let kolorDiva = {
            backgroundColor: this.props.kolor
        };

        return(
            <div style={kolorDiva}>
                {this.props.ilosc},
                {this.props.nazwa}, {this.props.cena} zł
                <input type="button"
                       value="+"
                       onClick={this.props.funkcje.zwiekszProdukt.bind(null, this.props.id)}/>
                <input type="button"
                       value="-"
                       onClick={this.props.funkcje.odejmijProdukt.bind(null, this.props.id)}/>
                <input type="button"
                       value="0"
                       onClick={this.props.funkcje.wyzerujProdukt.bind(null, this.props.id)}/>
                <input type="button"
                       value="Usuń"
                       onClick={this.props.funkcje.usunProdukt.bind(null, this.props.id)}/>
                <form>
                    <input type="text"
                           placeholder="nazwa"
                           onChange={this.handleChangeNazwa}
                    />
                    <input type="number"
                           placeholder="cena"
                           onChange={this.handleChangeCena}
                    />
                    <input type="button"
                           value="Zaktualizuj"
                           onClick={this.props.funkcje.zaktualizujProdukt.bind(null, this.state.nazwa, this.state.cena, this.props.id)}/>
                </form>
            </div>
        )
    }
}

Produkt.propTypes = {
    id: PropTypes.number,
    nazwa: PropTypes.string,
    ilosc: PropTypes.number,
    cena: PropTypes.number,
    kolor: PropTypes.string,
    funkcje: PropTypes.object
}
export default Produkt;