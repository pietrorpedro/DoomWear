import supabaseClient from './supabase';

const supabase = supabaseClient;

export const saveTransaction = async (buyer_id, product_id, value, address_id, delivery_type, group_id) => {
    try {
        const {error} = await supabase
            .from("transactions")
            .insert({
                buyer_id,
                product_id,
                value,
                address_id,
                delivery_type,
                completed: false,
                group_id
            });

        if (error) throw error;
            
    } catch (err) {
        console.error(err)
    }
}

const groupTransactionsByGroupId = (transactions) => {
    return Object.values(
        transactions.reduce((acc, transaction) => {
            const groupId = transaction.group_id;
            if (!acc[groupId]) {
                acc[groupId] = [];
            }
            acc[groupId].push(transaction);
            return acc;
        }, {})
    );
};


export const fetchTransactions = async (buyer_id) => {
    try {
        const {data, error} = await supabase
            .from("transactions")
            .select("*, product:products(id, name, price)")
            .eq("buyer_id", buyer_id);

        if (error) throw error;
        return groupTransactionsByGroupId(data);
    } catch (err) {
        console.error(err);
        return []
    }
}