import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3000'
    // baseURL: 'https://api-sorteio-sable.vercel.app'
})

export const apiUploads = axios.create({
    baseURL: 'http://localhost:3000/uploads'
    // baseURL: 'https://api-sorteio-sable.vercel.app/uploads'
})
