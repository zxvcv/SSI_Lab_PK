import React from 'react';
import {render} from 'react-dom';
import TablicaKanban from './TablicaKanban';

let listaKart = [
    {   id: 1,
        tytul: "Przeczytać książkę",
        opis: "Muszę przeczytać całą książkę",
        status: "in-progress",
        zadania: []
    },
    {   id: 2,
        tytul: "Napisać trochę kodu",
        opis: "Będę przepisywać kod przykładu z laboratorium",
        status: "todo",
        zadania: [
            {
                id: 1,
                nazwa: "Przykład listy zakupów",
                zrobione: true
            },
            {
                id: 2,
                nazwa: "Przykład Kanban",
                zrobione: false
            },
            {
                id: 3,
                nazwa: "Mój własny przykład",
                zrobione: false
            }
        ]
    }
];

render(<TablicaKanban karty={listaKart}/>, document.getElementById('root'));