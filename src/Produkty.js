import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Produkt from "./Produkt";

class Produkty extends Component{
    render() {
        var produkty = this.props.lista.map((obiekt) => {
            return <Produkt key={obiekt.id}
                            id={obiekt.id}
                            nazwa={obiekt.nazwa}
                            ilosc={obiekt.ilosc}
                            cena={obiekt.cena}
                            kolor={obiekt.kolor}
                            funkcje={this.props.funkcje}
            />
        })

        return (
            <div>
                <input type="button"
                       value="Resetuj"
                       onClick={this.props.funkcje.resetujProdukty.bind(null)}/>
                {produkty}
            </div>
        )
    }
}

Produkty.propTypes = {
    funkcje: PropTypes.object,
    lista: PropTypes.arrayOf(PropTypes.object)
}
export default Produkty;