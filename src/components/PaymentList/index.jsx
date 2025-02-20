import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Divider, Fade, FormControl, FormControlLabel, FormLabel, IconButton, Input, InputLabel, List, Modal, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { deletePayment, fetchPayments, updatePayment } from '../../services/PaymentService';
import { validateCardNumber, validateCVV, validateExpirationDate } from '../../utils/validation';

export default function PaymentList() {

    const { user } = useAuth();
    const [payments, setPayments] = useState([]);
    const [data, setData] = useState([]);

    const [open, setOpen] = useState(false);

    const [cardNumberInput, setCardNumberInput] = useState("");
    const [expirationDateInput, setExpirationDateInput] = useState("");
    const [cvvInput, setCvvInput] = useState("");
    const [cardTypeInput, setCardTypeInput] = useState("Credit");

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetch = async () => {
            const res = await fetchPayments(user.id);
            setPayments(res);
        }

        fetch();
    }, [])

    useEffect(() => {
        setCardTypeInput(data.type)
    }, [open])

    const handleAdd = async () => {
        const newErrors = {
            cardNumber: validateCardNumber(cardNumberInput),
            expirationDate: validateExpirationDate(expirationDateInput),
            cvv: validateCVV(cvvInput)
        };

        setErrors(newErrors);

        if (Object.values(newErrors).every((error) => !error)) {
            
            await updatePayment(data.id, cardNumberInput, expirationDateInput, cvvInput, cardTypeInput)
            const updatedPayments = await fetchPayments(user.id)
            setPayments(updatedPayments)
            setOpen(false);
        }
    };

        const handleDelete = async (id) => {
            await deletePayment(id)
            const updatedPayments = await fetchPayments(user.id)
            setPayments(updatedPayments)
        }

    const getInputError = (field) => {
        return errors[field] ? true : false;
    };

    const getLastFourDigits = (cardNumber) => {
        if (cardNumber && typeof cardNumber === "string" && cardNumber.length > 3) {
            return cardNumber.slice(-4)
        }
    };
    

    return (
        <List>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth: 600,
                        width: "100%",
                        bgcolor: 'background.paper',
                    }}>
                        <Box sx={{
                            padding: 2,
                        }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    textAlign: "center",
                                    marginBottom: 2,
                                }}
                            >
                                Atualizar Cartão
                            </Typography>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}>
                                <FormControl fullWidth error={getInputError('cardNumber')}>
                                    <InputLabel>Número do cartão</InputLabel>
                                    <Input
                                        value={cardNumberInput}
                                        onChange={(e) => setCardNumberInput(e.target.value)}
                                    />
                                    {getInputError('cardNumber') && (
                                        <Typography color="error">{errors.cardNumber}</Typography>
                                    )}
                                </FormControl>

                                <Box sx={{
                                    display: "flex",
                                    gap: 2,
                                    maxWidth: 200,
                                }}>
                                    <FormControl error={getInputError('expirationDate')}>
                                        <InputLabel>Data de validade (MM/AA)</InputLabel>
                                        <Input
                                            value={expirationDateInput}
                                            onChange={(e) => setExpirationDateInput(e.target.value)}
                                        />
                                        {getInputError('expirationDate') && (
                                            <Typography color="error">{errors.expirationDate}</Typography>
                                        )}
                                    </FormControl>
                                </Box>

                                <Box sx={{
                                    maxWidth: 200,
                                }}>
                                    <FormControl fullWidth error={getInputError('cvv')}>
                                        <InputLabel>CVV</InputLabel>
                                        <Input
                                            value={cvvInput}
                                            onChange={(e) => setCvvInput(e.target.value)}
                                        />
                                        {getInputError('cvv') && (
                                            <Typography color="error">{errors.cvv}</Typography>
                                        )}
                                    </FormControl>
                                </Box>

                                <FormControl>
                                    <FormLabel>Tipo de cartão</FormLabel>
                                    <RadioGroup
                                        value={cardTypeInput}
                                        onChange={(e) => setCardTypeInput(e.target.value)}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <FormControlLabel value="Credit" control={<Radio />} label="Crédito" />
                                        <FormControlLabel value="Debit" control={<Radio />} label="Débito" />
                                    </RadioGroup>
                                </FormControl>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleAdd}
                                >
                                    Salvar
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>

            {payments.length === 0 && (
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Typography>
                        Nenhum cartão adicionado.
                    </Typography>
                </Box>
            )}
            {payments.map(payment => (
                <Box key={payment.id}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Typography>
                            {payment.type === "Credit" ? "Crédito" : "Débito"}
                        </Typography>
                        <Box>
                            <IconButton size="small" onClick={() => { setData(payment); setOpen(true) }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleDelete(payment.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}>
                        <Typography>...{getLastFourDigits(payment.number.toString())}</Typography>
                    </Box>
                    <Divider sx={{ marginTop: 2 }} />
                </Box>
            ))}
        </List>
    );
}
