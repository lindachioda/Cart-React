//gestione del reducer per variare gli states

import type { Action, InitialState } from "../type"
import { DATA_FETCHING_FAIL, DATA_FETCHING_STARTED, DATA_FETCHING_SUCCESS, DELETE_ITEMS, SVUOTA_CARRELLO,AUMENTA_QTY, DIMINUISCI_QTY, COSTO_TOTALE, CONTATORE } from "./actions"



const reducer = (state: InitialState, action: Action): InitialState =>{

    //se actionetypeè log di prova, in caso torna lo state e muta il payload!!!!
    if(action.type===DATA_FETCHING_STARTED){
        return {...state, isLoading:true}
    }
    if(action.type===DATA_FETCHING_SUCCESS){
        return {...state, isLoading:false, isError:false, products: action.payload.map((el)=>{
            return {...el, qty:1}
        })}
    }
    if(action.type===DATA_FETCHING_FAIL){
        return {...state, isLoading:false, isError:true}
    }
    if(action.type===DELETE_ITEMS){
        return {...state, products: state.products.filter(el => el._id !== action.payload)}
    }
    if(action.type===SVUOTA_CARRELLO){
        return {...state, products: []}
    }
    if(action.type===AUMENTA_QTY){
        return {...state, products: state.products.map(el=>{
            if (action.payload === el._id){
                return {...el, qty: el.qty +1}
            }
            return{...el}
        })}
    }
    if(action.type===DIMINUISCI_QTY){
        return {...state, products: state.products.map(el=>{
            if (action.payload === el._id){
                return {...el, qty: el.qty - 1}
            }
            return{...el}
        })}
    }
    if(action.type===COSTO_TOTALE){
        return {
            //REDUCE
            ...state, total: state.products.reduce((total, item)=>{
                return total + item.qty * item.price
            },0)
        }
    }
    if(action.type===CONTATORE){
        return {
            //REDUCE
            ...state, itemCounter: state.products.reduce((total, item)=>{
                return total + item.qty 
            },0)
        }
    }

    return state
}

export default reducer