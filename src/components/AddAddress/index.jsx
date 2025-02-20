import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Fade, FormControl, FormControlLabel, FormHelperText, FormLabel, Input, InputLabel, Modal, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchAddresses, saveAddress } from '../../services/AddressService';
import { findAddressByCep } from '../../services/CepApi';
import { validateAddress, validateCep, validateCity, validateName, validateNeighborhood, validatePhoneNumber, validateState } from '../../utils/validation';

export default function AddAddress() {

    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);

    const [open, setOpen] = useState(false);

    // update
    const [fullNameInput, setFullNameInput] = useState("");
    const [contactNumberInput, setContactNumberInput] = useState("");
    const [addressInput, setAddressInput] = useState("");
    const [numberInput, setNumberInput] = useState("");
    const [cepInput, setCepInput] = useState("");
    const [cityInput, setCityInput] = useState("");
    const [stateInput, setStateInput] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [addressTypeInput, setAddressTypeInput] = useState("Home");

    const [cepTimer, setCepTimer] = useState(null);
    const [errors, setErrors] = useState({});
    const [isCepFilled, setIsCepFilled] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const res = await fetchAddresses(user.id);
            setAddresses(res);
        }

        fetch();
    }, [])

    useEffect(() => {
        if (cepInput.length === 0) setIsCepFilled(false);
    }, [cepInput])

    const handleCepChange = (e) => {
        setCepInput(e.target.value);
        if (cepTimer) clearTimeout(cepTimer);

        setCepTimer(
            setTimeout(async () => {
                const res = await findAddressByCep(e.target.value);
                if (res) {
                    setAddressInput(res.data.logradouro)
                    setStateInput(res.data.estado)
                    setCityInput(res.data.localidade)
                    setNeighborhood(res.data.bairro)
                    setIsCepFilled(true);
                    setErrors({});
                }
            }, 1500)
        )
    }

    const handleAdd = async () => {
        const newErrors = {
            fullName: validateName(fullNameInput),
            contactNumber: validatePhoneNumber(contactNumberInput),
            address: validateAddress(addressInput),
            neighborhood: validateNeighborhood(neighborhood),
            cep: validateCep(cepInput),
            state: validateState(stateInput),
            city: validateCity(cityInput)
        };

        setErrors(newErrors);

        if (Object.values(newErrors).every((error) => !error)) {
            await saveAddress(
                user.id,
                fullNameInput,
                contactNumberInput,
                addressInput,
                numberInput,
                neighborhood,
                cepInput,
                cityInput,
                stateInput,
                "Brasil",
                addressTypeInput,
            )

            const updatedAddresses = await fetchAddresses(user.id);
            setAddresses(updatedAddresses);
            setOpen(false);
        }
    }

    const getInputError = (field) => {
        return errors[field] ? true : false;
    }

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
                                Adicionar Endereço
                            </Typography>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}>
                                <FormControl fullWidth error={getInputError('fullName')}>
                                    <InputLabel>Nome Completo</InputLabel>
                                    <Input
                                        value={fullNameInput}
                                        onChange={(e) => setFullNameInput(e.target.value)}
                                    />
                                    {getInputError('fullName') && (
                                        <FormHelperText>{errors.fullName}</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl fullWidth error={getInputError('contactNumber')}>
                                    <InputLabel>Número de contato</InputLabel>
                                    <Input
                                        value={contactNumberInput}
                                        onChange={(e) => setContactNumberInput(e.target.value)}
                                    />
                                    {getInputError('contactNumber') && (
                                        <FormHelperText>{errors.contactNumber}</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl fullWidth error={getInputError('address')}>
                                    <InputLabel>Endereço</InputLabel>
                                    <Input
                                        value={addressInput}
                                        onChange={(e) => setAddressInput(e.target.value)}
                                        disabled={isCepFilled}
                                    />
                                    {getInputError('address') && (
                                        <FormHelperText>{errors.address}</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl fullWidth error={getInputError('number')}>
                                    <InputLabel>Número</InputLabel>
                                    <Input
                                        value={numberInput}
                                        onChange={(e) => setNumberInput(e.target.value)}
                                    />
                                    {getInputError('number') && (
                                        <FormHelperText>{errors.number}</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl fullWidth error={getInputError('neighborhood')}>
                                    <InputLabel>Bairro</InputLabel>
                                    <Input
                                        value={neighborhood}
                                        onChange={(e) => setNeighborhood(e.target.value)}
                                        disabled={isCepFilled}
                                    />
                                    {getInputError('neighborhood') && (
                                        <FormHelperText>{errors.neighborhood}</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl fullWidth error={getInputError('cep')}>
                                    <InputLabel>CEP</InputLabel>
                                    <Input
                                        value={cepInput}
                                        onChange={handleCepChange}
                                    />
                                    {getInputError('cep') && (
                                        <FormHelperText>{errors.cep}</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl fullWidth error={getInputError('state')}>
                                    <InputLabel>Estado</InputLabel>
                                    <Input
                                        value={stateInput}
                                        onChange={(e) => setStateInput(e.target.value)}
                                        disabled={isCepFilled}
                                    />
                                    {getInputError('state') && (
                                        <FormHelperText>{errors.state}</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl fullWidth error={getInputError('city')}>
                                    <InputLabel>Cidade</InputLabel>
                                    <Input
                                        value={cityInput}
                                        onChange={(e) => setCityInput(e.target.value)}
                                        disabled={isCepFilled}
                                    />
                                    {getInputError('city') && (
                                        <FormHelperText>{errors.city}</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Tipo de endereço</FormLabel>
                                    <RadioGroup
                                        value={addressTypeInput}
                                        onChange={(e) => setAddressTypeInput(e.target.value)}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <FormControlLabel value="Home" control={<Radio />} label="Casa" />
                                        <FormControlLabel value="Work" control={<Radio />} label="Trabalho" />
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
                Adicionar endereço
            </Button>
        </Box>
    )
}