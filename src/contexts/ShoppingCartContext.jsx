import { createContext, useContext, useState } from "react";
import supabaseClient from "../services/supabase";

const ShoppingCartContext = createContext();

const supabase = supabaseClient;

export function ShoppingCartProvider({children}) {

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);


    return (
        <ShoppingCartContext.Provider
            value={{
                loading,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}