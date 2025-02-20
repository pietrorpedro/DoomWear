import supabaseClient from './supabase';

const supabase = supabaseClient;

export const fetchAddresses = async (user_id) => {
    try {
        const { data, error } = await supabase
            .from("addresses")
            .select("*")
            .eq("user_id", user_id);

        if (error) throw error;
        return data;
    } catch (err) {
        console.error(err.message);
        return [];
    }
};

export const saveAddress = async (
    user_id,
    full_name,
    contact_number,
    address,
    number,
    neighborhood,
    zip,
    city,
    state,
    country,
    type
) => {

    try {
        const { error } = await supabase
            .from("addresses")
            .insert([{
                user_id,
                full_name,
                contact_number,
                address,
                number,
                neighborhood,
                zip,
                city,
                state,
                country,
                type
            }])

        if (error) throw error;
    } catch (err) {
        console.error(err.message);
    }
}

export const updateAddress = async (
    address_id,
    full_name,
    contact_number,
    address,
    number,
    neighborhood,
    zip,
    city,
    state,
    country,
    type
) => {
    try {
        const { error } = await supabase
            .from("addresses")
            .update({
                full_name,
                contact_number,
                address,
                number,
                neighborhood,
                zip,
                city,
                state,
                country,
                type
            })
            .eq("id", address_id);

        if (error) throw error;
        return true;
    } catch (err) {
        console.error(err.message);
        return false;
    }
};

export const deleteAddress = async (address_id) => {
    try {
        const { error } = await supabase
            .from("addresses")
            .delete()
            .eq("id", address_id);

        if (error) throw error;
        return true;
    } catch (err) {
        console.error(err.message);
        return false;
    }
}
