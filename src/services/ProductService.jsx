// services/ProductService.js
import supabaseClient from './supabase';

const supabase = supabaseClient;

export const getProducts = async (page = 1, pageSize = 10) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .range(start, end);

    if (error) throw error;
    return data;
};

export const getProduct = async (id) => {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id);

    if (error) throw error;
    return data;
};

export const getProductsByCategory = async (category) => {
    const { data, error } = await supabase
        .from("products")
        .select("*, categories!inner(name)")
        .eq("categories.link", category);

    if (error) throw error;
    return data;
};

export const getProductsByName = async (name, page = 1) => {
    const { count, error: countError } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .ilike("name", `%${name}%`);

    if (countError) throw countError;

    const limit = 5;
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
};
