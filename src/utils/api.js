import axios from "axios";


const baseUrl = process.env.REACT_APP_ENV === "development" ? "https://bs9m28vrpo.execute-api.localhost.localstack.cloud:4566/dev" : "https://fakestoreapi.com"

export const apiInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json"
    }
});


