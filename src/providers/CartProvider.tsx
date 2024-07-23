import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import {randomUUID} from 'expo-crypto'


type CartType = {
    items:CartItem[];
    addItem : (product:Product,size:CartItem["size"]) => void;
    updateQuantity : (itemId:string,amount:-1|1) => void;



}
export const CartContext = createContext<CartType>({
    items: [],
    addItem :() => {},
    updateQuantity :() => {},
});

const CartProvider = ({children} : PropsWithChildren) =>{

    const [items,setItems] = useState<CartItem[]>([]);
    //add item function
    const addItem = (product:Product,size:CartItem["size"]) =>{
        // if already in cart 
        const newCartItem:CartItem = {
            id:randomUUID(),
            product,
            product_id:product.id,
            size,
            quantity:1
        }

        setItems([newCartItem,...items]);
        //update quantity
    }
    //update quantity function
    const updateQuantity =  (itemId:string,amount:-1 | 1) => {
        setItems(items.map(item=>item.id !== itemId ? item : {...item ,quantity:item.quantity + amount }).filter((item)=>item.quantity > 0));
    }
    
    return (
        <CartContext.Provider value={{items:items,addItem,updateQuantity}}>
          {children}
        </CartContext.Provider>
    )
}


export default CartProvider;


export const useCart = () => useContext(CartContext);