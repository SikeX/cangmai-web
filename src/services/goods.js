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

const addCart = async (cart) => {
  const result = await axios.post(`${baseUrl}/user/cart/add`, cart)
  return result.data
}

const addComment = async (comment) => {
  const result = await axios.post(`${baseUrl}user/goodsComment/add`, comment)
  return result.data
}

const listCommentByGoodsId = async (goodsId) => {
  const result = await axios.get(`${baseUrl}user/goodsComment/listByGoodsId`, { params: { goodsId: goodsId } })
  return result.data
}

const getCartList = async (userId) => {
  const result = await axios.get(`${baseUrl}/user/cart/listByUserId`, { params: { userId: userId } })
  return result.data
}

const deleteCart = async (cartId) => {
  const result = await axios.delete(`${baseUrl}user/cart/delete`, { params: { id: cartId } })
  return result.data
}

const changeCart = async (cart) => {
  const result = await axios.put(`${baseUrl}user/cart/edit`, cart)
  return result.data
}

const getCartListByIds = async (cartIds) => {
  const result = await axios.get(`${baseUrl}user/cart/listByIds`, { params: { ids: cartIds } })
  return result.data
}

export default {
  getAllItem,
  getGoodssByTypeId,
  getItemById,
  getColorById,
  getSizeById,
  addComment,
  getAllPromotion,
  getCartList,
  addCart,
  deleteCart,
  changeCart,
  getCartListByIds,
  listCommentByGoodsId,
}
