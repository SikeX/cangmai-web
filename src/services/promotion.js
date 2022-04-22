import axios from 'axios'
import { BASE_URL } from './api'

const baseUrl = BASE_URL

const getPromotions = async (promotionIds) => {
  const result = await axios.get(`${baseUrl}promotion/promotion/queryByIds`, { params: { ids: promotionIds } })
  return result.data
}

export default {
  getPromotions,
}
