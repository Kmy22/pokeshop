import axios from 'axios'

let baseURL = "http://localhost:5000"

export const API_BACK = axios.create(
{
   baseURL: baseURL
})
