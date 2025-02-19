import supabaseClient from './supabase';

const supabase = supabaseClient;

export const getCategories = async () => {
    try {
        const { data, error } = await supabase
            .from("categories")
            .select("*");

        if (error) throw error;
        return data;
    } catch (err) {
        console.error(err.message);
        return [];
    }
};
