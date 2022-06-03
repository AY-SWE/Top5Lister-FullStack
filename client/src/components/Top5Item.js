import { React, useContext, useState } from "react";
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author Andy Yang
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);
    const [ editActive, setEditActive ] = useState(false);
    const [ text, setText ] = useState("");
    store.history = useHistory();
    let oldText = props.text;

    function handleDragStart(event) {
        event.dataTransfer.setData("item", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }


    function handleToggleEdit(event) {
        event.stopPropagation();
        setText(props.text);
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }        
        setEditActive(newActive);
        itemStatus = true;
        //console.log("Asdasd" + newActive);  //newActive is true
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("item-".length);
            let arrayIndex = id-1;
            //console.log(store.currentList);
            //store.updateItem(arrayIndex, text);
            store.addUpdateItemTransaction(arrayIndex, oldText, text); 
            toggleEdit();
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value );
    }

    let itemStatus = false;
    if(store.isItemEditActive){
        itemStatus = true;
    }

    let { index } = props;
    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }

    let itemElement = 
        <div
            id={'item-' + (index + 1)}
            className={itemClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            <input
                disabled = {itemStatus}
                type="button"
                id={"edit-item-" + index + 1}
                className="list-card-button"
                onClick={handleToggleEdit}
                value={"\u270E"}
            />
            {props.text}
        </div>

   // console.log(editActive + "insideitemeedit");
    if(editActive){
        console.log("itemEditActive");
        itemElement =
        <input
            id={'item-' + (index + 1)}
            className="top5-item"
            type='text'
            onKeyPress={handleKeyPress}
            onChange={handleUpdateText}
            defaultValue={props.text}
        />;
    }
    //console.log("top5",editActive)
    return (
        itemElement
    );
}

export default Top5Item;