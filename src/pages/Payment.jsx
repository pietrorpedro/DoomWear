import { Box, Button, FormControl, FormControlLabel, FormLabel, Input, InputLabel, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { useState } from "react";

export default function Payment() {

    const [cardNumber, setCardNumber] = useState("");
    const [cardExpirationDate, setCardExpirationDate] = useState(null)
    const [cardCode, setCardCode] = useState("");

    return (
        <Box sx={{
            maxWidth: 1200,
            padding: 1,
            margin: "0 auto"
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between"
            }}>



                <Box sx={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <FormControl>
                        <FormLabel>Forma de pagamento</FormLabel>
                        <RadioGroup defaultValue="credit">
                            <FormControlLabel value="credit" control={<Radio />} label="Crédito" />
                            <FormControlLabel value="debit" control={<Radio />} label="Débito" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <InputLabel>Número do cartão</InputLabel>
                        <Input fullWidth />
                    </FormControl>
                    <Box>
                        <InputLabel>Data de expiração</InputLabel>
                        <Box sx={{
                            display: "flex",
                            gap: 2,
                            maxWidth: 150
                        }}>
                            <FormControl>
                                <Input type="number" />
                            </FormControl>
                            <Typography color="textDisabled">/</Typography>
                            <FormControl>
                                <Input type="number" />
                            </FormControl>
                        </Box>
                    </Box>
                    <FormControl>
                        <InputLabel>CVV</InputLabel>
                        <Input />
                    </FormControl>
                </Box>

                <Box>
                    <Typography>Total da compra R$ 000</Typography>
                    <Button variant="contained" fullWidth>PAGAR</Button>
                </Box>

            </Box>
        </Box>
    )
}