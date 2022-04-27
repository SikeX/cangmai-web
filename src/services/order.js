import axios from 'axios'
import { BASE_URL } from './api'
import qs from 'qs'

const baseUrl = BASE_URL

const postOrder = async (orderInfo) => {
  const result = await axios.post(`${baseUrl}/user/orders/add`, orderInfo)
  return result.data
}

const queryByOrderId = async (orderId) => {
  const result = await axios.get(`${baseUrl}/user/orders/queryByOrderId`, { params: { orderId: orderId } })
  return result.data
}

const postAlipay = async (orderInfo) => {
  const result = await axios.post(`${baseUrl}/alipay/create`, qs.stringify(orderInfo), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  })
  return result.data
}

const queryByUserId = async (userId) => {
  const result = await axios.get(`${baseUrl}/user/orders/queryByUserId`, { params: { userId: userId } })
  return result.data
}

export default {
  postOrder,
  queryByOrderId,
  postAlipay,
  queryByUserId,
}
