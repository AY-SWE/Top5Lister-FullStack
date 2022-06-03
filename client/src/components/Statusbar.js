import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    let text ="";
    if (store.currentList)
        text = store.currentList.name;
    return (
        <div id="top5-statusbar">
            {text}
        </div>
    );
}

export default Statusbar;