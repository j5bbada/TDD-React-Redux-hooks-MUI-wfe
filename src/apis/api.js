import axios from "axios"

const baseURL = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response.status === 401 && window.location.pathname !== "/login") {
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default api
