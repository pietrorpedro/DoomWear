import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

import { getProducts } from "../services/ProductService";

export default function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const res = await getProducts(1, 10);
            setProducts(res)
        }

        fetchProducts();
    }, [])

    return (
        <Box sx={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: 1,
        }}>
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                    }}
                >
                    Novidades!
                </Typography>
                <img
                    src="https://placehold.co/1920x600"
                    style={{
                        width: "100%",
                        margin: "20px 0 20px 0",
                    }}
                />
            </Box>

            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        marginBottom: 2
                    }}
                >
                    Os mais vendidos!
                </Typography>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
                    gap: 2,
                    justifyItems: "center",
                }}>
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            inStock={product.stock_qty > 0}
                        />
                    ))}
                </Box>

            </Box>
        </Box>
    )
}