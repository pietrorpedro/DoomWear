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

export const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{11}$/;
    return regex.test(phoneNumber) ? "" : "Número de celular inválido";
};

export const validateSamePasswords = (password, confirmPassword) => {
    return password === confirmPassword ? "" : "As senhas não coincidem";
}

export const validateCep = (cep) => {
    const regex = /^\d{8}$/;
    return regex.test(cep) ? "" : "CEP inválido";
};

export const validateState = (state) => {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿÇç\s]{2,}$/;
    return regex.test(state) ? "" : "Estado inválido";
};

export const validateCity = (city) => {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/;
    return regex.test(city) ? "" : "Cidade inválida";
};

export const validateAddress = (address) => {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s,.-]{5,}$/;
    return regex.test(address) ? "" : "Endereço inválido";
};

export const validateNeighborhood = (neighborhood) => {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;
    return regex.test(neighborhood) ? "" : "Nome de bairro inválido. Deve ter pelo menos 3 letras.";
};

export const validateCardNumber = (number) => {
    const regex = /^[0-9]{13,19}$/;
    return regex.test(number) ? "" : "Número de cartão inválido. Deve ter entre 13 e 19 dígitos.";
};

export const validateExpirationDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/(2[0-9])$/;
    return regex.test(date) ? "" : "Data de validade inválida. O formato deve ser MM/AA.";
};

export const validateCVV = (cvv) => {
    const regex = /^[0-9]{3,4}$/;
    return regex.test(cvv) ? "" : "CVV inválido. Deve ter 3 ou 4 dígitos.";
};
