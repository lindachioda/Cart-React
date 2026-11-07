//elementi del carello

import { BiMinus, BiPlus } from "react-icons/bi";
import type { ContextType, Products } from "../type";
import { MdDelete } from "react-icons/md";
import { useGlobalContext } from "../context/context";
import formatNumber from '../utils/formatNumber';


const CartItem = ({_id, name, image, price, qty, countInStock}:Products) => {
  const {deleteItems, addQty, dimQty}:ContextType = useGlobalContext()

  //aggiungi quantità massima
  const aggiungiQty = (_id:string)=>{
    if(qty + 1> countInStock){
      return
    }
    return addQty(_id)
  }

  //sottrai qty massima
  const diminuisciQty = (_id:string)=>{
    if(qty - 1 <= 0){
      return deleteItems(_id)
    }
    return dimQty(_id)
  }
  
  return (
  <article className="cart-item">

    <div className="img-container">
      <img src={image} alt={name} className="img"/>
    </div>

    <p className="prod-name"> {name}</p>

    <div className="qty-selector">
      <button className="btn icon-btn" onClick={()=>aggiungiQty(_id)}>
        <BiPlus className="icon"/>
      </button>
      <p>{qty}</p>
      <button className="btn icon-btn" onClick={()=>diminuisciQty(_id)}>
        <BiMinus className="icon minus-icon"/>
      </button>
    </div>

    <p className="price-p">{formatNumber(price)}</p>

    <button className="btn icon-btn" onClick={()=>deleteItems(_id)}>
      <MdDelete className="icon minus-icon"/>
    </button>
  </article>
)}

export default CartItem;