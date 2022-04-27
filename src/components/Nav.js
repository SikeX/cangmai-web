import { useState, useEffect } from 'react'
import { FaSearch, FaCaretDown } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import category from '../services/category'
import goods from '../services/goods'
import { FiShoppingCart } from 'react-icons/fi'

function Nav() {
  let history = useHistory()

  const toHome = () => {
    history.push('/')
  }

  const toCart = () => {
    history.push(`/cart/${JSON.parse(localStorage.getItem('userInfo')).id}`)
  }

  return (
    <div className="flex shadow-sm w-full px-10 py-6 my-3 bg-white">
      <div className="block text-gray-600 text-4xl font-bold px-6 my-auto cursor-pointer" onClick={toHome}>
        ℂ𝕒𝕟𝕘𝕄𝕒𝕚
      </div>
      <form className="w-2/3">
        <div className="relative flex rounded-full bg-white border border-yellow-200 shadow-md p-1">
          <select className="hidden p-3 rounded-full bg-transparent md:block md:p-4">
            <option value="">家电</option>
            <option value="">数码</option>
            <option value="">家具</option>
          </select>
          <input className="flex-grow p-4 rounded-full focus:outline-none" placeholder="搜索你想要买的" />
          <button
            type="button"
            className="ml-auto py-2 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400"
          >
            搜索
          </button>
        </div>
      </form>
      <div className="my-auto px-2 hover:text-gray-600 cursor-pointer" onClick={toCart}>
        <FiShoppingCart size={40} />
      </div>

      {/* <div className="hidden md:inline-block md:flex-grow" />
      <div className="hidden lg:inline-block lg:flex-grow" />
      <form className="flex-grow md:w-40 flex">
        <span className="absolute text-gray-500 text-xl pl-2 py-2">
          <FaSearch />
        </span>
        <input
          className="w-full border-2 px-3 py-2 pl-7 text-sm bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus-blue rounded-xl transition duration-700 ease-in-out"
          placeholder="请输入关键词"
        />
      </form> */}
    </div>
  )
}

export default Nav
