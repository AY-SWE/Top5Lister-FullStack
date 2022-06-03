import { useContext, useState} from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author Andy Yang
    @author McKilla Gorilla
*/
function EditToolbar(props) {
    const { store } = useContext(GlobalStoreContext);

    const history = useHistory();
    //const {disabledTo} = props;
    //const [ disabled, setDisabled ] = useState(true);  //disabled true means buttons should be disabled

    // if(store.currentList){  //if it's not null
    //     let newDisabled = !disabled;
    //     setDisabled(newDisabled);   //made disabled false
    // }

    let undoButtonClass = "top5-button-disabled";
    let redoButtonClass = "top5-button-disabled";
    let closeButtonClass = "top5-button-disabled";
    if (store.canUndo) undoButtonClass = "top5-button";
    if (store.canRedo) redoButtonClass = "top5-button";
    if (store.canClose) closeButtonClass = "top5-button";

    
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");   //brings back to homepage?
        store.closeCurrentList();
    }
    let editStatus = true;
    //let closeEditStatus = true;

    if (store.currentList) {  //if there is currentList, don't make the buttons look disabled
        editStatus = false;
        //closeEditStatus = false;
        //toggleEdit();
    }

    // if(store.isItemEditActive){
    //     closeEditStatus = true;
    // }

    return (
        <div id="edit-toolbar">
            <div
                disabled={editStatus}
                id='undo-button'
                onClick={handleUndo}
                className={undoButtonClass}>
                &#x21B6;
            </div>
            <div
                disabled={editStatus}
                id='redo-button'
                onClick={handleRedo}
                className={redoButtonClass}>
                &#x21B7;
            </div>
            <div
                disabled={editStatus}
                id='close-button'
                onClick={handleClose}
                className={closeButtonClass}>
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;