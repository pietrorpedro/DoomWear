import supabaseClient from './supabase';

const supabase = supabaseClient;

export const fetchPayments = async (user_id) => {
    
    try {
        const {data, error} = await supabase
            .from("payments")
            .select("*")
            .eq("user_id", user_id);
            
        if (error) throw error;
        return data;
    } catch (err) {
        console.error(err);
    }
}
export const insertPayments = async (user_id, number, expiration_date, cvv, type) => {
    
    try {
        const {error} = await supabase
            .from("payments")
            .insert([
                {
                    user_id,
                    number,
                    expiration_date,
                    cvv,
                    type
                }
            ])

        if (error) throw error;
    } catch (err) {
        console.error(err);
    }
}

export const updatePayment = async (id, number, expiration_date, cvv, type) => {
    try {
        const {error} = await supabase
            .from("payments")
            .update(
                {
                    number,
                    expiration_date,
                    cvv,
                    type
                }
            )
            .eq("id", id);

        if (error) throw error;
    } catch (err) {
        console.error(err);
    }
}

export const deletePayment = async (id) => {
    try {
        const {error} = await supabase
            .from("payments")
            .delete()
            .eq("id", id);

        if (error) throw error;
    } catch (err) {
        console.error(err);
    }
}