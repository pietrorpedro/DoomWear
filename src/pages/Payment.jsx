import { Box, Button, Checkbox, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { v4 } from "uuid";
import AddPayment from "../components/AddPayment";
import { useAuth } from "../contexts/AuthContext";
import { fetchPayments } from "../services/PaymentService";
import { fetchProducts } from "../services/ShoppingCartService";
import { saveTransaction } from "../services/TransactionService";

export default function Payment() {

    const location = useLocation();
    const { selectedAddress, selectedDelivery } = location.state || {};

    const {user} = useAuth();

    const [payments, setPayments] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        if (selectedAddress === null || selectedDelivery === null) {
            navigate("/cart")
        }

        const fetchPaymentsDB = async () => {
            const res = await fetchPayments(user.id);
            setPayments(res);
        }

        const fetchCartItems = async () => {
            const res = await fetchProducts(user.id);
            console.log(res);
            setCartItems(res)
        }

        fetchPaymentsDB();
        fetchCartItems();
    }, [])

    const getLastFourDigits = (cardNumber) => {
        if (cardNumber && typeof cardNumber === "string" && cardNumber.length > 3) {
            return cardNumber.slice(-4)
        }
    };

    const handlePayment = () => {

        if (selectedPayment === null) {
            return;
        }

        // biblioteca uuid
        const groupId = v4();

        cartItems.map(async (item) => (
            await saveTransaction(user.id, item.product.id, item.total, selectedAddress, selectedDelivery, groupId)
        ));
        
        navigate("/")
    }

    return (
        <Box sx={{
            maxWidth: 1200,
            padding: 1,
            margin: "0 auto"
        }}>

            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        marginBottom: 2,
                        textAlign: { xs: "center", md: "start" }
                    }}
                >
                    Pagamento
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        marginBottom: 2,
                        textAlign: { xs: "center", md: "start" }
                    }}
                >
                    Selecione o método de pagamento
                </Typography>
            </Box>

            <Box sx={{
                marginBottom: 3,
            }}>
                <Typography
                    variant="body1"
                    sx={{
                        marginBottom: 2,
                        textAlign: { xs: "center", md: "start" }
                    }}
                >
                    Seus cartões
                </Typography>
                {payments.map(payment => (
                    <Box
                        key={payment.id}
                        onClick={() => setSelectedPayment(payment.id)}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 2,
                            boxShadow: 1,
                            padding: 1.5,
                            cursor: "pointer"
                        }}
                    >
                        <Checkbox
                            checked={selectedPayment === payment.id}
                        />
                        <Box>
                            <Typography>Cartão com final: {getLastFourDigits(payment.number.toString())}</Typography>
                        </Box>
                    </Box>
                ))}
                <AddPayment />
            </Box>

            <Box sx={{
                width: "100%",
                position: "relative",
            }}>
                <Box sx={{
                    position: { xs: "static", md: "absolute" },
                    right: 0,

                }}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handlePayment}
                    >
                        Realizar o pagamento
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}