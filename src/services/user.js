import axios from 'axios'
import { BASE_URL } from './api'

const baseUrl = BASE_URL

const register = async (userInfo) => {
  const result = await axios.post(`${baseUrl}online/user/register`, userInfo)
  return result.data
}

const login = async (userInfo) => {
  const result = await axios.post(`${baseUrl}online/login`, userInfo)
  return result.data
}

const addAddress = async (address) => {
  const result = await axios.post(`${baseUrl}online/address/add`, address)
  return result.data
}

const queryByUserId = async (userId) => {
  const result = await axios.get(`${baseUrl}online/address/queryByUserId`, { params: { userId: userId } })
  return result.data
}

export default {
  register: register,
  login: login,
  addAddress: addAddress,
  queryByUserId: queryByUserId,
}
