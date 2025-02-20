import { Box, Typography } from "@mui/material";
import AddAddress from "../components/AddAddress";
import AddPayment from "../components/AddPayment";
import AddressList from "../components/AddressList";
import PaymentList from "../components/PaymentList";
import TransactionList from "../components/TransactionsList";
import { useAuth } from "../contexts/AuthContext";
import { maskEmail } from "../utils/maskEmail";

export default function Profile() {

    const {user} = useAuth();

    return (
        <Box sx={{
            padding: 1,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            maxWidth: 1200,
            margin: "0 auto",
        }}>
            <Box>
                <Typography variant="h5" sx={{marginBottom: 1}}>Informações</Typography>
                <Box>
                    <Typography variant="body1">{user.user_metadata.full_name}</Typography>
                    <Typography variant="body1">{maskEmail(user.email)}</Typography>
                </Box>
            </Box>

            <Box>
                <Typography variant="h5">Suas compras</Typography>
                <Box>
                    <TransactionList user_id={user.id}/>
                </Box>
            </Box>
            <Box>
                <Typography variant="h5">Endereços</Typography>
                <Box>
                    <AddressList/>
                    <AddAddress/>
                </Box>
            </Box>
            <Box>
                <Typography variant="h5">Métodos de Pagamento</Typography>
                <Box>
                    <PaymentList/>
                    <AddPayment/>
                </Box>
            </Box>
        </Box>
    )
}