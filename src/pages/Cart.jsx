import { React, useEffect, useState } from 'react'
import Head from '../components/Head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import goods from '../services/goods'
import Skeleton from '@mui/material/Skeleton'
import { FILE_BASE_URL } from '../services/api'
import { RiDeleteBinLine } from 'react-icons/ri'
import toast, { Toaster } from 'react-hot-toast'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const CartCheckBox = (props) => {
  const { item, onChange, getTotalMoney } = props

  const [number, setNumber] = useState(item.number)

  console.log(item)

  const imgUrl = `${FILE_BASE_URL}${item.img}`

  const deleteCart = () => {
    goods.deleteCart(item.id).then((res) => {
      if (res.success) {
        toast.success('删除成功')
        onChange(item.id)
      } else {
        toast.error(res.message)
      }
    })
  }

  const changeCheckBox = (e) => {
    console.log(e.target.checked)
    if (e.target.checked) {
      getTotalMoney(item, 'add')
    } else {
      getTotalMoney(item, 'delete')
    }
  }

  const changeNumber = (type) => {
    let numberNow = number
    if (type === 'add') {
      numberNow++
    } else if (type === 'sub') {
      console.log(numberNow === 1)
      numberNow = numberNow === 1 ? 1 : --numberNow
    }
    setNumber(numberNow)
    console.log(number)
    Object.assign(item, { number: numberNow })
    goods.changeCart(item).then((res) => {
      if (!res.success) {
        toast.error(res.message)
      }
    })
  }

  return (
    <div className="flex items-center mb-4">
      <Toaster />
      <input
        id={item.id}
        aria-describedby={item.id}
        type="checkbox"
        className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
        onChange={changeCheckBox}
      />

      <label htmlFor={item.id} className="flex w-full ml-3 text-sm font-medium text-gray-900">
        <div className="w-28 h-28 ">
          <img src={imgUrl} alt={item.name} className="w-full h-full object-cover rounded-md shadow-md" />
        </div>
        <div className="flex flex-col px-2 space-y-3">
          <span className="font-bold">{item.detail}</span>
          <div className="flex space-x-2">
            <div className="text-gray-500 text-sm flex space-x-3">
              <div>颜色: {item.colorId}</div>
              <div>尺寸: {item.sizeId}</div>
            </div>
          </div>
          <div className="text-lg font-bold">￥{item.price}</div>
        </div>
      </label>
      <div className="flex-grow justify-items-end flex flex-col space-y-3">
        <div className="hover:text-red-600 cursor-pointer px-1" onClick={deleteCart}>
          <RiDeleteBinLine className="ml-auto" size={25} />
        </div>
        <div className="flex text-lg mx-auto space-x-2 ml-auto">
          <div
            className="rounded-full bg-gray-200 w-5 h-5 my-auto leading-4 text-center align-middle line cursor-pointer"
            onClick={() => changeNumber('sub')}
          >
            -
          </div>
          <div className="text-gray-500 text-sm">{number}</div>
          <div
            className="rounded-full bg-gray-200 w-5 h-5 my-auto leading-4 text-center align-middle line cursor-pointer"
            onClick={() => changeNumber('add')}
          >
            +
          </div>
        </div>
      </div>
    </div>
  )
}

function Cart(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const { id } = props.match.params

  const [cartList, setCartList] = useState([])
  const [status, setStatus] = useState(false)
  const [totalList, setTotalList] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  let history = useHistory()

  console.log(cartList)

  useEffect(() => {
    goods.getCartList(id).then((res) => {
      console.log(res)
      if (res.success) {
        setCartList(res.result.records)
        setStatus(true)
      } else {
        alert(res.message)
      }
    })
  }, [])

  const toBuy = () => {
    const idsList = totalList.map((item) => item.id)
    const ids = idsList.join(',')
    history.push(`/cartBuy/${ids}`)
  }

  const deleteCart = (id) => {
    const newCartList = cartList.filter((item) => item.id !== id)
    setCartList(newCartList)
  }

  const getTotalMoney = (goods, type) => {
    let newTotalList = []
    if (type === 'add') {
      newTotalList = totalList.concat(goods)
      newTotalList.forEach((item) => {
        setTotalPrice(totalPrice + item.price * item.number)
      })
    } else {
      newTotalList = totalList.filter((item) => item.id !== goods.id)
      if (newTotalList.length === 0) {
        setTotalPrice(0)
      } else {
        newTotalList.forEach((item) => {
          setTotalPrice(totalPrice - item.price * item.number)
        })
      }
    }
    console.log(newTotalList)
    setTotalList(newTotalList)
  }

  return (
    <div className="w-full flex flex-col">
      <Head />
      <Nav />
      {!status && (
        <div className="px-2 my-3 flex flex-col space-y-2 bg-gray-100">
          <Skeleton animation="wave" variant="rectangular" />
          <Skeleton animation="wave" variant="rectangular" />
          <Skeleton animation="wave" variant="rectangular" />
        </div>
      )}
      {status &&
        (cartList.length === 0 ? (
          <div className="flex justify-center items-center h-96 bg-gray-200">购物车还没有东西，赶紧去买买买吧！</div>
        ) : (
          <div className="w-full flex px-20 min-h-96 bg-gray-100 py-2 space-x-2">
            <div className="w-2/3 flex flex-col bg-white rounded-md shadow-md py-4 px-8">
              <div className="border-b-2 py-1">全选</div>
              <div className="flex flex-col py-2 spcae-y-2">
                {cartList.map((item) => (
                  <CartCheckBox key={item.id} item={item} onChange={deleteCart} getTotalMoney={getTotalMoney} />
                ))}
              </div>
            </div>
            {/* ---------------右侧金额区域------------------- */}
            <div className="w-1/3 h-40 flex flex-col bg-white px-10 py-5 rounded-md shadow-md space-y-4">
              <div className="font-bold text-xl">总额</div>
              <div className="text-xl font-bold">￥{totalPrice}</div>
              <div
                className="bg-red-400 hover:bg-red-500 cursor-pointer w-full py-2 rounded-md px-3 text-center"
                onClick={toBuy}
              >
                立即购买
              </div>
            </div>
          </div>
        ))}

      <Footer />
    </div>
  )
}

export default Cart
