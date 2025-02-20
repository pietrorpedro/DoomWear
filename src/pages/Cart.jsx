import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import { useNavigate } from 'react-router-dom';
import { fetchProducts, removeProduct, updateProduct } from '../services/ShoppingCartService';

export default function Cart() {
    const { user } = useAuth();

    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();

    const updateProductsList = async () => {
        const res = await fetchProducts(user.id);

        setProducts(res)
        setTotalPrice(res.reduce((prev, product) => prev + product.total, 0))
    }

    const handleChangeQty = async (qty, id, prevTotal, price) => {
        if (qty <= 0) return;
        const newTotal = price * qty
        await updateProduct(id, qty, newTotal);
        
        updateProductsList();
    }

    const handleRemove = async (id) => {
        await removeProduct(id);
        updateProductsList()
    }

    useEffect(() => {
        updateProductsList();
    }, [])

    return (
        <Box sx={{
            padding: 1,
            maxWidth: 1200,
            margin: "0 auto",
        }}>
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        marginBottom: 2,
                        textAlign: { xs: "center", md: "start" }
                    }}
                >
                    Seu carrinho
                </Typography>
                {products.length === 0 && (
                    <Typography variant="body1">Seu carrinho está vazio...</Typography>
                )}
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}>
                    <Box sx={{
                        marginBottom: 10,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}>
                        {products.map(product => (
                            <Box
                                key={product.id}
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    boxShadow: 1,
                                }}
                            >
                                <img
                                    src="https://placehold.co/100x100"
                                    alt={product.product.name}
                                />
                                <Box sx={{
                                    width: "100%",
                                    position: "relative",
                                }}>
                                    <Typography>{product.product.name}</Typography>
                                    <Typography>R$ {product.product.price}</Typography>
                                    <Input
                                        size="small"
                                        inputProps={{
                                            defaultValue: product.qty,
                                            step: 1,
                                            min: 1,
                                            max: product.product.stock_qty,
                                            type: 'number',
                                        }}
                                        onChange={(e) => handleChangeQty(e.target.value, product.id, product.total, product.product.price)}
                                    />
                                    <IconButton sx={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                    }}
                                        onClick={() => handleRemove(product.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    {products.length !== 0 && (
                        <Box sx={{
                            width: "100%",
                            position: "relative",
                        }}>
                            <Box sx={{
                                position: {xs: "static", md: "absolute"},
                                right: 0,
                                
                            }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        textAlign: {xs: "center", md: "start"}
                                    }}
                                >
                                    Total da compra: <b>R$ {totalPrice.toFixed(2)}</b>
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => navigate("/delivery")}
                                >
                                    Ir para a entrega
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
