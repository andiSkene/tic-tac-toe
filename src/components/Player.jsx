import {useState} from 'react';

export default function Player({initialName,symbol,isActive,onChangeName}) {
    const [playerName,setPlayerName] = useState(initialName);
    const [isEditing,setIsEditing] = useState(false);

    function editHandler() {
        //setIsEditing(isEditing ? false : true); too complicated
        //setIsEditing(!isEditing); do not do this!! new state depends on old state
        setIsEditing((editing) => !editing) //the react team strongly reccommends this method, it's best practice
        //it's passing a function to your state updating function. guarantees the current state is found
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        editablePlayerName = <input type="text" required defaultValue={playerName} onChange={changeHandler} />
    }

    function changeHandler(event) {
        setPlayerName(event.target.value);
    }

    return (<li className={isActive ? "active" : undefined}>
        <span className="player">
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={editHandler}>{isEditing ? "Save" : "Edit"}</button>
    </li>)
};