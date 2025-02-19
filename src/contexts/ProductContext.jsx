import { createContext, useContext, useState } from "react";
import supabaseClient from "../services/supabase";

const ProductContext = createContext();

const supabase = supabaseClient;

export function ProductProvider({ children }) {

    const [loading, setLoading] = useState(false);

    const getProducts = async (page = 1, pageSize = 10) => {
        setLoading(true);
        try {

            const start = (page - 1) * pageSize;
            const end = start + pageSize - 1;

            const { data, error } = await supabase
                .from("products")
                .select("*")
                .range(start, end);

            if (error) throw error;
            return data;
        } catch (err) {
            console.error(err.message)
            return [];
        } finally {
            setLoading(false);
        }
    }

    const getProduct = async (id) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)

            if (error) throw error;
            return data;
        } catch (err) {
            console.error(err.message)
            return [];
        } finally {
            setLoading(false);
        }
    }

    const getProductsByCategory = async (category) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("products")
                .select("*, categories!inner(name)")
                .eq("categories.link", category)

            if (error) throw error;
            return data;
        } catch (err) {
            console.error(err.message)
            return [];
        } finally {
            setLoading(false);
        }
    }

    const getProductsByName = async (name, page = 1) => {
        setLoading(true);
        try {
            const { count, error: countError } = await supabase
                .from("products")
                .select("*", { count: "exact", head: true })
                .ilike("name", `%${name}%`);
    
            if (countError) throw countError;
            
            const limit = 5
            const totalPages = Math.ceil(count / limit);
            const start = (page - 1) * limit;
            const end = start + limit - 1;
    
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .ilike("name", `%${name}%`)
                .range(start, end);
    
            if (error) throw error;
    
            return { data, totalPages };
        } catch (err) {
            console.error(err.message);
            return { data: [], totalPages: 0 };
        } finally {
            setLoading(false);
        }
    };
    



    return (
        <ProductContext.Provider
            value={{
                loading,
                getProducts,
                getProduct,
                getProductsByCategory,
                getProductsByName,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export function useProduct() {
    return useContext(ProductContext);
}