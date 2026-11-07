//carrello con elementi all'interno

import { MdRemoveShoppingCart } from "react-icons/md";
import CartItem from "./CartItems";
import { useGlobalContext } from "../context/context";
import type { ContextType } from "../type";

const Cart = () => {
const {products, deleteAll}:ContextType =useGlobalContext()
  

  return (
  <section className="section-center" style={{marginTop: "2rem"}}>
    <div className="cart-info">
      <h6>Item</h6>
      <h6>Nome</h6>
      <h6>Qty</h6>
      <h6>Prezzo</h6>

      <button className="btn icon-btn"onClick={deleteAll}>
        <MdRemoveShoppingCart className="icon minus-icon"/>
      </button>
    </div>
    <hr />

    <section className="cart-section">
      {products.map(el=>{
          return <CartItem key={el._id} {...el}/>
        })}
    </section>
  </section>
)
}

export default Cart;