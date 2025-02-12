import { Box, Button, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import { Navigate, useNavigate } from "react-router-dom";
import { validateEmail, validateName, validatePassword, validateSamePasswords } from "../utils/validation";

export default function Auth() {

    const { loading, signUp, signIn } = useAuth();

    const [isLogin, setIsLogin] = useState(true);

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
    const [fullNameInput, setFullNameInput] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [fullNameError, setFullNameError] = useState("");

    const navigate = useNavigate();

    const handleAuth = () => {
        setEmailError(validateEmail(emailInput));
        setPasswordError(validatePassword(passwordInput));

        if (!isLogin) {
            setFullNameError(validateName(fullNameInput));
            setConfirmPasswordError(validateSamePasswords(passwordInput, confirmPasswordInput));
        } else {
            setFullNameError("");
            setConfirmPasswordError("");
        }

        if (!emailError && !passwordError && !fullNameError && !confirmPasswordError) {
            isLogin ? signIn(emailInput, passwordInput) : signUp(emailInput, passwordInput, fullNameInput)
            navigate("/")
        }
    }

    return (
        <Box sx={{
            padding: 1,
            maxWidth: 800,
            margin: "20px auto",
        }}>
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center"
                }}
            >
                {isLogin ? "Entrar" : "Criar Conta"}
            </Typography>
            <Box sx={{
                display: { xs: "flex", md: "grid" },
                flexDirection: "column",
                gridTemplateColumns: "1fr 1fr",
                gap: 1,
            }}>
                <FormControl fullWidth error={!!emailError}>
                    <InputLabel htmlFor="emailInput">E-mail</InputLabel>
                    <Input
                        id="emailInput"
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                    />
                    {emailError && <FormHelperText>{emailError}</FormHelperText>}
                </FormControl>

                {!isLogin && (
                    <FormControl fullWidth error={!!fullNameError}>
                        <InputLabel htmlFor="fullNameInput">Nome completo</InputLabel>
                        <Input
                            id="fullNameInput"
                            type="text"
                            value={fullNameInput}
                            onChange={(e) => setFullNameInput(e.target.value)}
                        />
                        {fullNameError && <FormHelperText>{fullNameError}</FormHelperText>}
                    </FormControl>
                )}

                <FormControl fullWidth error={!!passwordError}>
                    <InputLabel htmlFor="passwordInput">Senha</InputLabel>
                    <Input
                        id="passwordInput"
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />
                    {passwordError && <FormHelperText>{passwordError}</FormHelperText>}
                </FormControl>

                {!isLogin && (
                    <FormControl fullWidth error={!!confirmPasswordError}>
                        <InputLabel htmlFor="confirmPasswordInput">Confirmar Senha</InputLabel>
                        <Input
                            id="confirmPasswordInput"
                            type="password"
                            value={confirmPasswordInput}
                            onChange={(e) => setConfirmPasswordInput(e.target.value)}
                        />
                        {confirmPasswordError && <FormHelperText>{confirmPasswordError}</FormHelperText>}
                    </FormControl>
                )}
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                marginTop: 3
            }}>
                <Button
                    variant="contained"
                    onClick={handleAuth}
                >
                    {isLogin ? "Entrar" : "Criar Conta"}
                </Button>
                <Button
                    variant="text"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Não tem uma conta? Criar" : "Já tem uma conta? Entrar"}
                </Button>
            </Box>
        </Box>
    )
}