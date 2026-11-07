import { DATA_FETCHING_STARTED, DATA_FETCHING_SUCCESS, DELETE_ITEMS, SVUOTA_CARRELLO, DATA_FETCHING_FAIL, AUMENTA_QTY, DIMINUISCI_QTY, COSTO_TOTALE, CONTATORE } from "./context/actions";

export type Products = {
_id:string,
name:string,
image:string, 
price:number, 
countInStock:number,
qty:number,
}

//union type
export type Action =
    | { type: typeof DATA_FETCHING_STARTED }
    | { type: typeof DATA_FETCHING_FAIL }
    | { type: typeof SVUOTA_CARRELLO }
    | { type: typeof AUMENTA_QTY, payload: string }
    | { type: typeof DIMINUISCI_QTY, payload: string }
    | { type: typeof DATA_FETCHING_SUCCESS, payload: Products[] }
    | { type: typeof DELETE_ITEMS, payload: string }
    | { type: typeof COSTO_TOTALE }
    | { type: typeof CONTATORE }


export type InitialState = {
    products: Products[];
    isLoading: boolean;
    isError: boolean;
    total: number;
    itemCounter: number;
}

export type ContextType = InitialState & {
    deleteItems: (_id: string) => void;
    addQty: (_id: string) => void;
    dimQty: (_id: string) => void;
    deleteAll: () => void;
}