import supabaseClient from './supabase';

const supabase = supabaseClient;

export const insertProduct = async (user_id, product_id, qty) => {
    try {
        // procurar se ja existe esse produto no cart do usuario
        const {data, error: fetchError} = await supabase
            .from("shopping_cart")
            .select("id, qty, total, product:products(id, price)")
            .eq("user_id", user_id)
            .eq("product_id", product_id)
            .maybeSingle();

        if (fetchError) {console.error("ERRO AO PROCURAR O PRODUTO"); throw fetchError};

        if (data) {

            const newQty = data.qty + qty;
            const newTotal = data.product.price * newQty;

            const {error: updateError} = await supabase
                .from("shopping_cart")
                .update({qty: newQty, total: newTotal})
                .eq("id", data.id);

            if (updateError) {console.error("ERRO AO ATUALIZAR PRODUTO"); throw updateError};
        } else {
            const {data: productData, error: fetchProductError} = await supabase
                .from("products")
                .select("price")
                .eq("id", product_id)
                .single();

                if (fetchProductError) throw fetchProductError;

                const productPrice = productData.price;
                const total = productPrice * qty;

                const {error: insertError} = await supabase
                .from("shopping_cart")
                .insert([
                    {
                        user_id,
                        product_id,
                        qty,
                        total,
                    }
                ])

            if (insertError) {console.error("ERRO AO INSERIR O PRODUTO"); throw insertError};
        }

    } catch (err) {
        console.error(err.message);
    }
}

export const fetchProducts = async (user_id) => {
    try {
        const {data, error} = await supabase
            .from("shopping_cart")
            .select("id, qty, total, product:products(id, name, price, stock_qty)")
            .eq("user_id", user_id);

            if (error) throw error;
            return data;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export const updateProduct = async (id, new_qty, new_total) => {
    try {
        const {error} = await supabase
            .from("shopping_cart")
            .update({qty: new_qty, total: new_total})
            .eq("id", id);

        if (error) throw error;
    } catch (err) {
        console.error(err);
    }
}

export const removeProduct = async (id) => {
    try {
        const {error} = await supabase
            .from("shopping_cart")
            .delete()
            .eq("id", id);

        if (error) throw error;
    } catch (err) {
        console.error(err);
    }
}