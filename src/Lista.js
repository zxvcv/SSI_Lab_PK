import React, {Component} from 'react';
import Karta from "./Karta";

class Lista extends Component{
    render() {
        var karty = this.props.karty.map((karta) => {
            return <Karta id={karta.id}
                          tytul={karta.tytul}
                          opis={karta.opis}
                          zadania={karta.zadania} />
        })

        return (
            <div className="list">
                <h1>{this.props.tytul}</h1>
                {karty}
            </div>
        )
    }
}
export default Lista;