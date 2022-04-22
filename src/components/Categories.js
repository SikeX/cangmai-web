import { React, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import category from '../services/category'

const Category = ({ id, name }) => {
  let history = useHistory()

  const showDetail = () => {
    history.push({ pathname: `/donate/${id}`, params: { id } })
  }

  return (
    <div
      className="w-full h-10 leading-10 text-left align-middle hover:bg-blue-50 px-3 cursor-pointer"
      onClick={showDetail}
    >
      {name}
    </div>
  )
}

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    category.getAllCategory().then((res) => {
      console.log(res)
      if (res.success) {
        setCategories(res.result.records)
      }
    })
  }, [])

  return (
    <div className="bg-white w-full h-full rounded-md flex-col content-center">
      <div className="w-full text-center bg-gray-50 py-2 font-bold">商品分类</div>
      {categories.map((category) => (
        <Category key={category.id} id={category.id} name={category.name} />
      ))}
    </div>
  )
}

export default Categories
