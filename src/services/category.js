import axios from 'axios'
import { BASE_URL } from './api'

const baseUrl = BASE_URL

const getAllCategory = async () => {
  const result = await axios.get(`${baseUrl}cesShopType/cesShopType/rootList`)
  return result.data
}

export default {
  getAllCategory,
}
