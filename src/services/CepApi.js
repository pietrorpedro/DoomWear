import axios from "axios";

export const findAddressByCep = (cep) => {
    if (cep.length < 8) return;
    try {
        const res = axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        return res;
    } catch(err) {
        console.error(err.message);
    }
}