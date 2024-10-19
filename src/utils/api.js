import axios from "axios";


const baseUrl = process.env.REACT_APP_ENV === "development" ? "https://zqqv728exd.execute-api.localhost.localstack.cloud:4566/prod" : "https://fakestoreapi.com"

export const apiInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json"
    }
});


