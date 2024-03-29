import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://api-sorteio-ha14.vercel.app'
    // baseURL: 'http://localhost:3000'
})
