import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Podsumowanie from "./Podsumowanie";
import Produkt from "./Produkt";

class Naglowek extends Component{
    render(){
        return(
            <div>
                <div>
                    {this.props.tytul}
                </div>
                <Podsumowanie lista={this.props.lista}/>
            </div>
        )
    }
}

Naglowek.propTypes = {
    tytul: PropTypes.string,
    funkcje: PropTypes.object,
    lista: PropTypes.arrayOf(PropTypes.object)
}
export default Naglowek;