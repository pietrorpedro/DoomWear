// components/Search.js
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, FormControl, Input, InputLabel, Pagination, Typography } from "@mui/material";
import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useLoading } from '../contexts/LoadingContext';
import { getProductsByName } from '../services/ProductService';

export default function Search() {
    const { loading, setLoadingState } = useLoading();
    const [productNameInput, setProductNameInput] = useState("");
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    const handleSearch = async () => {
        setLoadingState(true);
        const { data, totalPages } = await getProductsByName(productNameInput, page);
        setProducts(data);
        setTotalPages(totalPages);
        setLoadingState(false);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        handleSearch();
    };

    return (
        <Box sx={{ padding: 1, maxWidth: 1200, margin: "0 auto" }}>
            <Box sx={{ marginBottom: 5 }}>
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                    Buscar Produtos
                </Typography>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, marginY: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="productNameInput">Nome do produto</InputLabel>
                        <Input
                            id="productNameInput"
                            value={productNameInput}
                            onChange={(e) => setProductNameInput(e.target.value)}
                        />
                    </FormControl>
                    <Button variant="contained" startIcon={<SearchIcon />} onClick={handleSearch}>
                        Buscar
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }, gap: 2, justifyItems: "center" }}>
                {loading ? (
                    <Typography variant="h4" sx={{ textAlign: "center" }}>
                        Carregando
                    </Typography>
                ) : (
                    products.map(product => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            inStock={product.stock_qty > 0}
                        />
                    ))
                )}

            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "center"
            }}>
                {products.length > 0 && (
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} />
                )}
            </Box>
        </Box>
    );
}
