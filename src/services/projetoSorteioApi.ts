import axios from 'axios'

export const api = axios.create({
    // baseURL: 'https://api-rifa-tupperware.vercel.app'
    baseURL: 'http://localhost:3000'
})
