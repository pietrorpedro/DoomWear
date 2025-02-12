export const validateEmail = (email) => {
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return regex.test(email) ? "" : "E-mail inválido";
}

export const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    return regex.test(password) ? "" : "A senha deve ter ao menos uma letra maiúscula, uma minuscula e um número";
}

export const validateName = (name) => {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;
    return regex.test(name) ? "" : "Nome inválido";
}

export const validateSamePasswords = (password, confirmPassword) => {
    return password === confirmPassword ? "" : "As senhas não coincidem";
}