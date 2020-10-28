import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Zrobione from "./Zrobione";
import marked from 'marked';

let walidatorTytulu = (props, propName, componentName) => {
    if(props[propName]){
        let value = props[propName];
        if(typeof value !== 'string' || value.length > 50){
            return new Error(
                `Wartoość ${propName} w komponencie ${componentName} jest dłuższa niż 50 znaków.`
            );
        }
    }
}

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

        let kolorPaska = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 8,
            backgroundColor: this.props.kolor
        };

        let szczegolyKarty;
        if (this.state.pokazSzczegoly){
            szczegolyKarty = (
                <div className="card__details">
                    <span dangerouslySetInnerHTML={{__html:marked(this.props.opis)}}/>
                    <Zrobione idKarty={this.props.id}
                              zadania={this.props.zadania}
                              funkcjeZwrotne={this.props.funkcjeZwrotne}
                    />
                </div>
            )
        }
        return(
            <div className="card">
                <div style={kolorPaska}/>
                <div className={this.state.pokazSzczegoly?"card__title card__title--is-open":"card__title"}
                     onClick={this.zmienSzczegoly.bind(this)}>
                    {this.props.tytul}
                </div>
                <div>
                    <input type="button"
                           value="Left"
                           className="checklist__add-task"
                           onClick={this.props.funkcjePozycjiKarty.lewo.bind(null, this.props.id)}/>
                    <input type="button"
                           value="Right"
                           className="checklist__add-task"
                           onClick={this.props.funkcjePozycjiKarty.prawo.bind(null, this.props.id)}/>
                    <input type="button"
                           value="Delete"
                           className="checklist__add-task"
                           onClick={this.props.funkcjePozycjiKarty.usun.bind(null, this.props.id)}/>
                </div>
                {szczegolyKarty}
            </div>
        )
    }
}

Karta.propTypes = {
    id: PropTypes.number,
    tytul: walidatorTytulu,
    opis: PropTypes.string,
    kolor: PropTypes.string,
    zadania: PropTypes.arrayOf(PropTypes.object),
    funkcjeZwrotne: PropTypes.object,
    funkcjePozycjiKarty: PropTypes.object
}
export default Karta;