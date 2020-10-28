import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Podsumowanie extends Component{
    obliczIloscRoznychProduktow(lista) {
        let suma = 0
        for (let i = 0; i < lista.length; i++) {
            if(lista[i].ilosc > 0){
                suma += 1
            }
        }
        return suma
    }

    obliczIloscWszystkichProduktow(lista) {
        let suma = 0
        for (let i = 0; i < lista.length; i++) {
            suma += lista[i].ilosc
        }
        return suma
    }

    obliczCeneWszystkichProduktow(lista) {
        let cena = 0
        for (let i = 0; i < lista.length; i++) {
            cena += lista[i].ilosc * lista[i].cena
        }
        return cena
    }

    render(){
        return(
            <div>
                <div>
                    Ile róznych produktów? {this.obliczIloscRoznychProduktow(this.props.lista)}
                </div>
                <div>
                    Ile wszystkich produktów? {this.obliczIloscWszystkichProduktow(this.props.lista)}
                </div>
                <div>
                    Cena wszystkich produktów? {this.obliczCeneWszystkichProduktow(this.props.lista)} zł
                </div>
            </div>
        )
    }
}

Podsumowanie.propTypes = {
    lista: PropTypes.arrayOf(PropTypes.object),
}
export default Podsumowanie;