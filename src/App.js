import React, {useReducer} from 'react';
import io from 'socket.io-client'

let socket;

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE LOG': {
            return (
                `${state}${action.payload}`
            )
        }
        default:
            return state;
    }
}

function App() {
    const [logData, dispatcher] = useReducer(reducer, 'initial state\n');

    if (!socket) {
        socket = io(":3001");

        socket.on('connect', () => console.log("connected to server"));

        socket.on('message', (data) => {
            // console.log("received message");
            // console.log(data)
            dispatcher({type: "UPDATE LOG", payload: data.toString()})
        });
        socket.on('update log', (data) => {
            dispatcher({type: "UPDATE LOG", payload: data.toString()})
        })
    }
    return (
        <div className="App">
            {logData.split('\n').map((log, index) => <div key={index}>{log}<br/></div>)}
        </div>
    );
}

export default App;
