import React, {Component} from 'react';

class Zrobione extends Component{
    render(){

        let zadania = this.props.zadania.map((zadanie) => {
            return (<li className="checklist__task">
                <input type="checkbox" defaultChecked={zadanie.zrobione} />
                {zadanie.nazwa}
                <a href="#" className="checklist__task--remove"/>
            </li>)
        })

        return(
            <div className="checkList">
                <ul>{zadania}</ul>
            </div>
        )
    }
}
export default Zrobione;