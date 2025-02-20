import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Fade, FormControl, FormControlLabel, FormLabel, Input, InputLabel, Modal, Radio, RadioGroup, Typography } from "@mui/material";
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { insertPayments } from '../../services/PaymentService';
import { validateCardNumber, validateCVV, validateExpirationDate } from '../../utils/validation';

export default function AddPayment() {

    const { user } = useAuth();
    const [payments, setPayments] = useState([]);

    const [open, setOpen] = useState(false);

    const [cardNumberInput, setCardNumberInput] = useState("");
    const [expirationDateInput, setExpirationDateInput] = useState("");
    const [cvvInput, setCvvInput] = useState("");
    const [cardTypeInput, setCardTypeInput] = useState("Credit");

    const [errors, setErrors] = useState({});

    const handleAdd = async () => {
        const newErrors = {
            cardNumber: validateCardNumber(cardNumberInput),
            expirationDate: validateExpirationDate(expirationDateInput),
            cvv: validateCVV(cvvInput)
        };

        setErrors(newErrors);

        if (Object.values(newErrors).every((error) => !error)) {
            
            insertPayments(user.id, cardNumberInput, expirationDateInput, cvvInput, cardTypeInput)
            setOpen(false);
        }
    };

    const getInputError = (field) => {
        return errors[field] ? true : false;
    };

    return (
        <Box sx={{
            boxShadow: 1,
        }}>
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
                                Adicionar Cartão
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
            <Button
                startIcon={<AddIcon />}
                fullWidth
                onClick={() => setOpen(true)}
                sx={{
                    padding: 2,
                }}
            >
                Adicionar Cartão
            </Button>
        </Box>
    );
}
