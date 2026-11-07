//per passare funzioni ecc, useContext

import React, { useContext, useEffect, useReducer} from "react"
import reducer from "./reducer"
import { DATA_FETCHING_FAIL, DATA_FETCHING_STARTED, DATA_FETCHING_SUCCESS, DELETE_ITEMS, SVUOTA_CARRELLO, AUMENTA_QTY, DIMINUISCI_QTY, COSTO_TOTALE, CONTATORE } from "./actions"
import axios from "axios"
import type { ContextType } from "../type"

const url = "https://cart-api-fm7s.onrender.com/products"

//initialState, stato iniziale del reducer:
const initialState = {
    products:[], //è un array
    isLoading: true,
    isError:false,
    total:0, //totale dentro al carrello
    itemCounter:0, //tiene conto degli item del carrello
}

const AppContext = React.createContext<ContextType | null>(null)




const AppProvider = ({children}:any) => {
    //gestione useReducer carrello:
const [state, dispatch] = useReducer(reducer, initialState)

//cancella un elemento
const deleteItems =(_id:string)=>{
    dispatch({type:DELETE_ITEMS, payload:_id})
}

//svuota tutto
const deleteAll =()=>{
    dispatch({type:SVUOTA_CARRELLO})
}

//aggiungi un el
const addQty =(_id:string)=>{
    dispatch({type:AUMENTA_QTY, payload:_id})
}

//sottrai un el
const dimQty =(_id:string)=>{
    dispatch({type:DIMINUISCI_QTY, payload:_id})
}




//DATA FETCHING
useEffect(()=>{
    (async()=>{
        dispatch({type:DATA_FETCHING_STARTED})
        try{
            const response = await axios.get(url)
            console.log("DATI API:", response.data);
            //nel caso non c fossero errori mando il dispatch success:
            dispatch({type:DATA_FETCHING_SUCCESS, payload:response.data})
        }catch(error){
            dispatch({type:DATA_FETCHING_FAIL})
        }
    })()
},[])


//somma carrello + contatore
useEffect(()=>{
    dispatch({type:COSTO_TOTALE})
    dispatch({type:CONTATORE})
}, [state.products])

    return <AppContext.Provider value={{...state, deleteItems, deleteAll, addQty, dimQty}}>
        {children}
    </AppContext.Provider>
}
//ritorna i valori del provider:
const useGlobalContext = () => {
    const context = useContext(AppContext);

    if (context === null) {
        throw new Error("useGlobalContext deve essere utilizzato dentro AppProvider");
    }

    return context
}

export { AppProvider, useGlobalContext}