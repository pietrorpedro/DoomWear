import { Box, Button, Checkbox, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { fetchAddresses } from "../services/AddressService";

import AddAddress from "../components/AddAddress";

export default function Delivery() {

    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedDelivery, setSelectedDelivery] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            const res = await fetchAddresses(user.id);
            setAddresses(res);
        }

        fetch();
    }, [])

    const handleNavigate = () => {
        if (selectedAddress === null || selectedDelivery === null) {
            return;
        }
        
        navigate("/payment", {state: {selectedAddress, selectedDelivery}});
    }


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
                    Entrega
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        marginBottom: 2,
                        textAlign: { xs: "center", md: "start" }
                    }}
                >
                    Selecione o tipo de entrega
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
                    Seus endereços
                </Typography>
                {addresses.map(address => (
                    <Box
                        key={address.id}
                        onClick={() => setSelectedAddress(address.id)}
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
                            checked={selectedAddress === address.id}
                        />
                        <Box>
                            <Typography>
                                {`${address.full_name}`}
                            </Typography>
                            <Typography>
                                {`${address.address}${address.number ? `, ${address.number}` : ""}`}
                            </Typography>
                            <Typography color="textSecondary">
                                {`${address.neighborhood}, ${address.city}, ${address.state}`}
                            </Typography>
                        </Box>
                    </Box>
                ))}
                <AddAddress/>
            </Box>

            <Box>
                <Typography
                    variant="body1"
                    sx={{
                        marginBottom: 2,
                        textAlign: { xs: "center", md: "start" }
                    }}
                >
                    Fretes
                </Typography>

                <Box>
                    <Box
                        onClick={() => setSelectedDelivery(1)}
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
                            checked={selectedDelivery === 1}
                        />
                        <Box>
                            <Typography>
                                Entrega Expressa
                            </Typography>
                            <Typography>
                                Entrega em até 7 dias úteis
                            </Typography>
                            <Typography>
                                R$ 19,99
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        onClick={() => setSelectedDelivery(2)}
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
                            checked={selectedDelivery === 2}
                        />
                        <Box>
                            <Typography>
                                Entrega Expressa
                            </Typography>
                            <Typography>
                                Entrega em até 7 dias úteis
                            </Typography>
                            <Typography>
                                R$ 19,99
                            </Typography>
                        </Box>
                    </Box>
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
                            onClick={handleNavigate}
                        >
                            Ir para o pagamento
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}