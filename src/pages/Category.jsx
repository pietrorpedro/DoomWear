// pages/Category.js
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLoading } from "../contexts/LoadingContext";
import { getCategories } from "../services/CategoryService";
import { getProductsByCategory } from "../services/ProductService";

export default function Category() {
    const { category } = useParams();
    const { setLoadingState } = useLoading();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoadingState(true);
            const data = await getCategories();
            setCategories(data);
            setLoadingState(false);
        };

        fetchCategories();
    }, [setLoadingState]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getProductsByCategory(category);
            setProducts(res);
        };

        fetchProducts();
    }, [category, getProductsByCategory]);

    const categoryName = category
        .replace(/-/g, " ") // Substitui todos os "-" por espaço
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza cada palavra

    return (
        <Box sx={{ padding: 1, maxWidth: 1200, margin: "0 auto" }}>
            <Box>
                <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
                    {categoryName}
                </Typography>

                {products.length === 0 ? (
                    <Typography variant="h4" sx={{ textAlign: "center" }}>
                        Nenhum produto encontrado.
                    </Typography>
                ) : (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
                            gap: 2,
                            justifyItems: "center",
                        }}
                    >
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                inStock={product.stock_qty > 0}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
