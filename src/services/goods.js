import axios from 'axios'
import { BASE_URL } from './api'

const baseUrl = BASE_URL

const getAllItem = async (params) => {
  const result = await axios.get(`${baseUrl}user/donationItem/list`, { params })
  return result.data
}

const getAllPromotion = async () => {
  const result = await axios.get(`${baseUrl}promotion/promotion/list`)
  return result.data
}

const getGoodssByTypeId = async (params) => {
  console.log(params)
  const result = await axios.get(`${baseUrl}cesShopGoods/cesShopGoods/listByTypeId`, { params: params })
  return result.data
}

const getItemById = async (id) => {
  const result = await axios.get(`${baseUrl}cesShopGoods/cesShopGoods/queryById`, { params: { id } })
  return result.data
}

const getColorById = async (id) => {
  const result = await axios.get(`${baseUrl}/cesShopGoods/cesShopGoods/queryColorByMainId`, { params: { id } })
  return result.data
}

const getSizeById = async (id) => {
  const result = await axios.get(`${baseUrl}cesShopGoods/cesShopGoods/querySizeByMainId`, { params: { id } })
  return result.data
}

const postTaskList = async (task) => {
  const result = axios.post(`${baseUrl}/Tasks`, task)
  return result
}

const addComment = async (comment) => {
  const result = axios.post(`${baseUrl}online/goodsComment/add`, comment)
  return result.data
}

const deleteTodo = async (taskName, todoName) => {
  const result = axios.delete(`${baseUrl}/Tasks/${taskName}`, { data: { name: todoName } })
  return result
}

export default {
  getAllItem,
  getGoodssByTypeId,
  getItemById,
  getColorById,
  getSizeById,
  addComment,
  getAllPromotion,
}
