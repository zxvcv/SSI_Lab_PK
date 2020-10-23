import React, {Component} from 'react';
import Zrobione from "./Zrobione";

class Karta extends Component{

    constructor() {
        super();
        this.state = {
            pokazSzczegoly: false
        };
    }

    zmienSzczegoly(){
        this.setState({pokazSzczegoly: !this.state.pokazSzczegoly});
    }

    render(){
        let szczegolyKarty;
        if (this.state.pokazSzczegoly){
            szczegolyKarty = (
                <div className="card__details">{this.props.opis}
                    {this.props.opis}
                    <Zrobione idKarty={this.props.id} zadania={this.props.zadania} />
                </div>
            )
        }
        return(
            <div className="card">
                <div className={this.state.pokazSzczegoly?"card__title card__title--is-open":"card__title"} onClick={this.zmienSzczegoly.bind(this)}>
                    {this.props.tytul}</div>
                {szczegolyKarty}
            </div>
        )
    }
}
export default Karta;