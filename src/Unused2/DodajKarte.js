import React, {Component} from 'react';
import PropTypes from 'prop-types';


class DodajKarte extends Component{
    constructor() {
        super();
        this.state = {
            tytul: '',
            opis: ''
        };

        this.handleChangeTytul = this.handleChangeTytul.bind(this);
        this.handleChangeOpis = this.handleChangeOpis.bind(this);
    }

    handleChangeTytul(event) {
        this.setState({tytul: event.target.value});
    }

    handleChangeOpis(event) {
        this.setState({opis: event.target.value});
    }

    render(){
        return(<form>
                <input type="text"
                       className="checklist__add-task"
                       value={this.state.tytul}
                       placeholder="Proszę podać tytul"
                       onChange={this.handleChangeTytul}
                />
                <input type="text"
                       className="checklist__add-task"
                       value={this.state.opis}
                       placeholder="Proszę podać opis"
                       onChange={this.handleChangeOpis}
                />
                <input type="button"
                       className="checklist__add-task"
                       value="Dodaj"
                       onClick={this.props.funkcjeZwrotne.dodajKarte.bind(null, this.state.tytul, this.state.opis, this.props.id)}/>
            </form>

        );
    }
}

DodajKarte.propTypes = {
    id: PropTypes.string,
    funkcjeZwrotne: PropTypes.object
}
export default DodajKarte;