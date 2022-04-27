import { useState, useEffect, React } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link, useHistory } from 'react-router-dom'
import { FILE_BASE_URL } from '../services/api'
import TabPanel from './UI/TabPanel'
import goods from '../services/goods'
import promotion from '../services/promotion'
import { TextField, Autocomplete } from '@mui/material'
import { FcPlus, FcMinus } from 'react-icons/fc'
import LoginModal from './LoginModal'
import toast, { Toaster } from 'react-hot-toast'

// const Alert = React.forwardRef((props, ref) => {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
// })

function Item({ name }) {
  return <div className="px-4 py-3 hover:bg-gray-400 cursor-pointer text-xl font-bold">{name}</div>
}

function Option({ lable, value, getOption, name }) {
  // const isChecked = name

  return (
    <div className="donation-option">
      <input
        type="radio"
        name={name}
        id={lable}
        value={value}
        onChange={(e) => {
          console.log(e.target.value)
          getOption(e)
        }}
        className="sr-only"
      />
      <label
        className="cursor-pointer px-2 py-1 border-2 hover:border-blue-500 hover:text-blue-500 focus:text-blue-500 rounded-md"
        htmlFor={lable}
      >
        {lable}
      </label>
    </div>
  )
}

function GoodsDetail({ id }) {
  const [itemDetail, setItemDetail] = useState({})
  const [promotions, setPromotions] = useState([])
  const [colorList, setColorList] = useState([])
  const [sizeList, setSizeList] = useState([])
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [logionModalOpen, setLogionModalOpen] = useState(false)
  const [number, setNumber] = useState(1)
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  let history = useHistory()

  console.log(logionModalOpen)

  useEffect(() => {
    goods.getItemById(id).then((res) => {
      if (res.success) {
        setItemDetail(res.result)
      }
    })
  }, [id])

  useEffect(() => {
    promotion.getPromotions(itemDetail.promotionid).then((res) => {
      if (res.success) {
        setPromotions(res.result)
      }
    })
  }, [itemDetail])

  useEffect(() => {
    goods.getColorById(id).then((res) => {
      if (res.success) {
        console.log(res)
        setColorList(res.result)
      }
    })
  }, [id])

  useEffect(() => {
    goods.getSizeById(id).then((res) => {
      if (res.success) {
        console.log(res)
        setSizeList(res.result)
      }
    })
  }, [id])

  const getSizeOption = (e) => {
    console.log(e.target.value)
    setSelectedSize(e.target.value)
  }

  const getColorOption = (e) => {
    console.log(e.target.value)
    setSelectedColor(e.target.value)
  }

  const [value, setValue] = useState(0)

  const buyNow = () => {
    if (localStorage.getItem('userInfo') === null) {
      setLoginModalOpen(true)
    } else {
      history.push({
        pathname: `/info/${id}/${selectedColor}/${selectedSize}/${number}`,
        params: { id, selectedColor, selectedSize, number },
      })
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const closeLoginModal = () => {
    setLoginModalOpen(false)
  }

  const toCart = () => {
    if (selectedColor === '' || selectedSize === '') {
      toast.error('请选择颜色和尺寸')
      return
    }
    const cart = {
      userId: JSON.parse(localStorage.getItem('userInfo')).id,
      goodsId: id,
      number: number,
      colorId: selectedColor,
      sizeId: selectedSize,
    }
    goods.addCart(cart).then((res) => {
      if (res.success) {
        toast.success('加入购物车成功')
      } else {
        toast.error(res.message)
      }
    })
    // history.push(`/cart/${id}`)
  }

  return (
    <div className="w-full flex flex-col">
      <Toaster />
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
      <div className="w-full py-8 md:px-24 flex flex-col md:flex-row">
        <div
          style={{ backgroundImage: `url(${FILE_BASE_URL}${itemDetail.mainImg})`, height: '420px' }}
          className="w-full md:w-1/3 flex-shrink-0 bg-gray-300 bg-cover"
        />
        <div className="flex flex-col flex-grow px-4 justify-start space-y-3">
          {/* <span className="text-gray-500 text-sm">{donateDone ? 'done' : '筹集中'}</span> */}
          <div className="text-2xl font-bold">{itemDetail.name}</div>
          <div className="px-2 py-4 bg-gray-100 text-gray-500 text-sm flex flex-col space-y-3">
            <div className="flex space-x-4">
              <div className=" inline-text-justify my-auto w-12 text-justify">促销价</div>
              <div className="text-red-600 text-2xl font-bold">￥{itemDetail.price}</div>
            </div>
            <div className="flex space-x-4">
              <div className="inline-text-justify w-12 text-justify">原价</div>
              <div className="my-auto">￥{itemDetail.originPrice}</div>
            </div>
          </div>
          <div className="flex px-2">
            <div className="inline-text-justify w-12 mb-auto text-justify text-gray-500 text-sm">活动</div>
            <div className="flex flex-col text-sm text-red-500 px-4 space-y-2">
              {promotions.map((item) => (
                <div key={item.id} className="flex space-x-1">
                  <div>{item.title}</div>
                  <a className="text-blue-500 hover:underline cursor-pointer">点击选购</a>
                </div>
              ))}
            </div>
          </div>
          <div className="flex space-x-4 px-2 text-sm text-gray-500">
            <div className="inline-text-justify w-12 text-justify">发货</div>
            <div className="my-auto">发货后预计到货时效约7-14个工作日左右</div>
          </div>
          {/* ------------尺寸和颜色---------------- */}
          <div className="flex space-x-4 px-2">
            <div className="inline-text-justify w-12 mb-auto text-justify text-gray-500 text-sm">尺寸</div>
            {sizeList.map((item) => (
              <Option key={item.id} name="size" lable={item.size} value={item.size} getOption={getSizeOption} />
            ))}
          </div>
          <div className="flex space-x-4 px-2">
            <div className="inline-text-justify w-12 mb-auto text-justify text-gray-500 text-sm">颜色</div>
            {colorList.map((item) => (
              <Option key={item.id} name="color" lable={item.color} value={item.color} getOption={getColorOption} />
            ))}
          </div>
          <div className="flex space-x-4 px-2">
            <div className="inline-text-justify w-12 mb-auto text-justify text-gray-500 text-sm">数量</div>
            <div className="flex space-x-2">
              <div
                className="my-auto rounded-full bg-blue-200 cursor-pointer hover:bg-blue-400"
                onClick={() => {
                  setNumber(number === 1 ? 1 : number - 1)
                }}
              >
                <FcMinus size={20} />
              </div>
              <div className="px-2 my-auto border-2 border-blue-300">{number}</div>
              <div
                className="my-auto rounded-full bg-blue-200 cursor-pointer hover:bg-blue-400"
                onClick={() => {
                  setNumber(number + 1)
                }}
              >
                <FcPlus size={20} />
              </div>
            </div>
          </div>
          <div className="flex space-x-4 px-2">
            <div className="px-10 py-4 bg-red-500 text-white hover:bg-red-400 cursor-pointer" onClick={buyNow}>
              立即购买
            </div>
            <div className="px-10 py-4 bg-black text-white hover:bg-gray-600 cursor-pointer" onClick={toCart}>
              加入购物车
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:px-16 bg-gray-100 py-2 space-y-2">
        <div className="flex bg-white">
          <Box sx={{ width: '90%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons={false}
                aria-label="scrollable prevent tabs example"
              >
                <Tab sx={{ fontSize: 16, fontWeight: 'bold' }} label="商品详情" />
                <Tab sx={{ fontSize: 16, fontWeight: 'bold' }} label="商品评论" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div dangerouslySetInnerHTML={{ __html: itemDetail.detail }} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div dangerouslySetInnerHTML={{ __html: itemDetail.story }} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div dangerouslySetInnerHTML={{ __html: itemDetail.question }} />
            </TabPanel>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default GoodsDetail
