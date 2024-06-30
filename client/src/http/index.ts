import axios from 'axios'
// import { AuthResponce } from "../models/responce/AuthResponce"

export const API_URL = `http://localhost:5000/api`

const $api = axios.create({
    // для того, чтобы куки цеплялись автоматически
    // withCredentials: true,
    // базовый url
    baseURL: API_URL,
})

export default $api