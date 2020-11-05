import axios from 'axios'

const api = axios.create({
  baseURL: 'https://pilas-node.herokuapp.com'
})

export default api
