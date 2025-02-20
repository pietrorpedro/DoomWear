import { Box, List, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";

import { fetchTransactions } from "../../services/TransactionService";

import dayjs from "dayjs";

export default function TransactionList({ user_id }) {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await fetchTransactions(user_id);
            setTransactions(res);
            console.log(res)
        }

        fetch();
    }, [])

    return (
        <List>
            {transactions.length === 0 && (
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Typography>
                        Nenhuma compra realizada.
                    </Typography>
                </Box>
            )}
            {/* {transactions.map(transaction => (
                <Box key={transaction.id}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                    </Box>
                    <Typography color="textSecondary">
                        {`${transaction.address}, ${transaction.number ? transaction.number : ""}, ${transaction.neighborhood}`}
                    </Typography>
                    <Typography color="textSecondary">
                        {`${transaction.city}, ${transaction.state}, ${transaction.zip}`}
                    </Typography>
                    <Divider sx={{ marginTop: 2 }} />
                </Box>
            ))} */}
            {transactions.map(group => (
                <Box
                    key={group[0].group_id}
                    sx={{
                        
                    }}
                >
                    {group.map(item => (
                        <Box key={item.id}>
                            <Typography>{dayjs(item.created_at).format("DD/MM/YYYY HH:mm")}</Typography>
                            <Box sx={{
                                display: "flex",
                                gap: 2,
                            }}>
                                <Typography>{item.product.name}</Typography>
                                <Typography color="textSecondary">{`Qtd: ${item.product.qty || "0"}`}</Typography>
                                <Typography color="textSecondary">{`R$ ${item.product.price}`}</Typography>
                            </Box>
                        </Box>
                    ))}
                    <Divider/>
                </Box>
            ))}
        </List>
    )
}