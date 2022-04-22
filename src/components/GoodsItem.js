import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import { FILE_BASE_URL } from '../services/api'

function GoodsItem(props) {
  const { id, itemDesc, tag = true, title, picture } = props

  let history = useHistory()

  const imgUrl = FILE_BASE_URL + picture

  console.log(title)

  const [leftDay, setLeftDay] = useState(30)
  const [support, setSupport] = useState(100)

  const defaultStyle =
    'flex lg:flex-col lg:flex-shrink-0 lg:flex-shrink shadow-lg hover:shadow-2xl rounded-lg transition transform hover:-translate-y-1 cursor-pointer w-full'

  const test = tag ? `${defaultStyle} lg:w-1/4` : defaultStyle

  const showDetail = (name) => {
    history.push({ pathname: `/detail/${id}`, params: { id } })
  }

  const toCart = () => {
    history.push({ pathname: `/cart/${id}`, params: { id } })
  }

  return (
    <div className={test}>
      <div
        style={{ backgroundImage: `url(${imgUrl})` }}
        className="w-1/3 lg:w-full h-0 pb-1/3 lg:pb-full bg-red-200 rounded-t-md bg-cover"
      >
        {/* <img src={imgUrl} style={{width:'auto',height:'100%'}} /> */}
      </div>
      <div className="flex flex-col divide-y-2 divide-dotted justify-between w-2/3 lg:w-full flex-grow md:py-3">
        <div className="flex flex-col px-4">
          {/* <div className="text-gray-400 text-sm">筹集中</div> */}
          {/* <Link to={{ pathname:`/detail/${title}` }}> */}
          {/* <div aria-hidden onClick={showDetail} className="md:py-2 hover:underline font-bold">
            {title}
          </div> */}
          <div className="flex font-bold">
            <div className="my-auto text-sm">￥</div>
            <div className="mt-auto text-2xl text-red-600 font-semibold ">9.98</div>
          </div>

          <div className="py-1 font-bold">{title}</div>
          <div
            className="md:block text-sm md:break-all md:h-auto truncate md:overflow-clip md:whitespace-normal hover:underline py-2"
            onClick={showDetail}
          >
            {itemDesc}
          </div>
          <div className="bg-black text-white px-3 py-2 shadow-sm rounded-xl cursor-pointer text-center hover:bg-gray-200 hover:text-black my-2">
            <div className="mx-auto" onClick={toCart}>
              加入购物车
            </div>
          </div>
          <div className="flex text-xs text-green-500 justify-start py-1 space-x-2">
            <div>{1048}已售</div>
            <div className="my-auto flex">
              <AiFillStar size={15} color="red" />
              <div>4.8</div>
            </div>
          </div>
          {/* </Link> */}
        </div>
      </div>
    </div>
  )
}

export default GoodsItem
