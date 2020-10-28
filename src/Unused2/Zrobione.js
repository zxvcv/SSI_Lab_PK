import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Zrobione extends Component{

    sprawdzKlawisz(evt){
        if(evt.key === 'Enter'){
            this.props.funkcjeZwrotne.dodaj(this.props.idKarty, evt.target.value)
            evt.target.value = '';
        }
    }

    render(){
        let zadania = this.props.zadania.map((zadanie, indexZadania) => {
            return (
                <li key={zadanie.id} className="checklist__task">
                    <input type="checkbox" defaultChecked={zadanie.zrobione}
                           onChange={this.props.funkcjeZwrotne.zmien.bind(null, this.props.idKarty, zadanie.id, indexZadania)}
                    />
                    {zadanie.nazwa}
                    <a href="#" className="checklist__task--remove"
                                onClick={this.props.funkcjeZwrotne.usun.bind(null, this.props.idKarty, zadanie.id, indexZadania)}
                    />
                </li>)
        });

        return(
            <div className="checkList">
                <ul>{zadania}</ul>
                <input type="text"
                       className="checklist__add-task"
                       placeholder="Proszę podać nazwę i nacisnąć Enter, aby wykonać zadanie"
                       onKeyPress={this.sprawdzKlawisz.bind(this)}
                />
            </div>
        )
    }
}

Zrobione.propTypes = {
    idKarty: PropTypes.number,
    zadania: PropTypes.arrayOf(PropTypes.object),
    funkcjeZwrotne: PropTypes.object
}
export default Zrobione;