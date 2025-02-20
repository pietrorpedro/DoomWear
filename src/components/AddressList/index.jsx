import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Divider, Fade, FormControl, FormControlLabel, FormHelperText, FormLabel, IconButton, Input, InputLabel, List, Modal, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { deleteAddress, fetchAddresses, updateAddress } from "../../services/AddressService";
import { findAddressByCep } from "../../services/CepApi";
import { validateAddress, validateCep, validateCity, validateName, validateNeighborhood, validatePhoneNumber, validateState } from "../../utils/validation";

export default function AddressList() {

    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);

    const [data, setData] = useState([]);

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
        setFullNameInput(data.full_name);
        setContactNumberInput(data.contact_number);
        setAddressInput(data.address);
        setNumberInput(data.number);
        setCepInput(data.zip);
        setCityInput(data.city);
        setStateInput(data.state)
        setNeighborhood(data.neighborhood);
        setAddressTypeInput(data.type)
    }, [open])

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

    const handleEdit = async () => {
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
            const isUpdated = await updateAddress(
                data.id,
                fullNameInput,
                contactNumberInput,
                addressInput,
                numberInput,
                neighborhood,
                cepInput,
                cityInput,
                stateInput,
                "Brasil",
                addressTypeInput
            );

            if (isUpdated) {
                const updatedAddresses = await fetchAddresses(user.id);
                setAddresses(updatedAddresses);
                setOpen(false);
            } else {
                console.error("Erro ao atualizar o endereço.");
            }
        }
    };

    const handleDelete = async (id) => {
        await deleteAddress(id);
        const updatedAddresses = await fetchAddresses(user.id);
        setAddresses(updatedAddresses);
    }

    const getInputError = (field) => {
        return errors[field] ? true : false;
    }

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
                                Atualizar Endereço
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
                                    onClick={handleEdit}
                                >
                                    Salvar
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>

            {addresses.length === 0 && (
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Typography>
                        Nenhum endereço adicionado.
                    </Typography>
                </Box>
            )}
            {addresses.map(address => (
                <Box key={address.id}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Typography>
                            {address.type === "Home" ? "Casa" : "Trabalho"}
                        </Typography>
                        <Box>
                            <IconButton size="small" onClick={() => { setData(address); setOpen(true) }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleDelete(address.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}>
                        <Typography>{address.full_name}</Typography>
                        <Typography color="textSecondary">|</Typography>
                        <Typography color="textSecondary">{address.contact_number}</Typography>
                    </Box>
                    <Typography color="textSecondary">
                        {`${address.address}, ${address.number ? address.number : ""}, ${address.neighborhood}`}
                    </Typography>
                    <Typography color="textSecondary">
                        {`${address.city}, ${address.state}, ${address.zip}`}
                    </Typography>
                    <Divider sx={{ marginTop: 2 }} />
                </Box>
            ))}
        </List>
    );
}
