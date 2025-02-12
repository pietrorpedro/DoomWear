import { createContext, useContext, useState } from "react";
import supabaseClient from "../services/supabase";

const CategoryContext = createContext();

const supabase = supabaseClient;

export function CategoryProvider({children}) {

    const [loading, setLoading] = useState(false);

    const getCategories = async () => {
        setLoading(true)
        try {
            const {data, error} = await supabase
                .from("categories")
                .select("*");

            if (error) throw error;
            return data;
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CategoryContext.Provider
            value={{
                loading,
                getCategories,
            }}
        >
            {children}
        </CategoryContext.Provider>
    )
}

export function useCategory() {
    return useContext(CategoryContext);
}