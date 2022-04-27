/* eslint-disable max-len */
import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Head from '../components/Head'
import Footer from '../components/Footer'
import order from '../services/order'
import { FILE_BASE_URL } from '../services/api'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { TextField, Autocomplete } from '@mui/material'
import goods from '../services/goods'

function PayDone(props) {
  const [orderList, setOrderList] = useState([])
  const [commentModal, setCommentModal] = useState(false)
  const [comment, setComment] = useState('')
  const [goodsId, setGoodsId] = useState('')

  const imgRoot = FILE_BASE_URL

  useEffect(() => {
    order.queryByUserId(JSON.parse(localStorage.getItem('userInfo'))['id']).then((res) => {
      if (res.success) {
        setOrderList(res.result)
      }
    })
  }, [])

  const addComment = (goosdId) => {
    setCommentModal(true)
    setGoodsId(goosdId)
  }

  const postComment = () => {
    const commentInfo = {
      proId: goodsId,
      detail: comment,
      userId: JSON.parse(localStorage.getItem('userInfo'))['id'],
    }
    goods.addComment(commentInfo).thrn((res) => {
      if (res.success) {
        setCommentModal(false)
        alert('评价成功')
      }
    })
  }

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  return (
    <div className="w-full h-screen flex flex-col ">
      <Head />
      <Nav />
      <Dialog fullWidth={true} open={commentModal} onClose={() => setCommentModal(false)}>
        <DialogTitle>评论商品</DialogTitle>
        <div className="flex flex-col px-4 py-4 space-y-4">
          <TextField
            name="msg"
            id="outlined-multiline-flexible"
            label="备注"
            multiline
            rows={4}
            // value={values.msg}
            onChange={handleChange}
            // error={touched.msg && Boolean(errors.msg)}
            // helperText={touched.msg && errors.msg}
          />
          <div className="flex space-x-2">
            {/* <Button className="w-36" variant="contained" type="submit" disableElevation>
                    提交订单
                  </Button> */}
            <button type="submit" className="bg-black text-white px-4 py-2 cursor-pointer" onClick={postComment}>
              提交
            </button>
          </div>
        </div>
      </Dialog>
      <div className="flex flex-col px-16 py-4">
        <div className="text-xl font-bold border-b-2 py-2">已购列表</div>
        {orderList.map((item) => {
          return (
            <div className="flex flex-col py-2 px-4 shadow-md bg-white" key={item.id}>
              <div className="flex">
                <div
                  style={{ backgroundImage: `url(${imgRoot + item.mainImg})` }}
                  className="w-20 h-20 bg-red-200 rounded-t-md bg-cover"
                />

                <div className="flex flex-col text-gray-500 text-sm space-y-2 justify-center px-3">
                  <div>商品名称: {item.name}</div>
                  <div>商品简介: {item.subTitle}</div>
                </div>
                <div
                  className="bg-blue-300 px-3 py-2 rounded-md shadow-sm my-auto hover:bg-blue-400 cursor-pointer"
                  onClick={() => addComment(item.id)}
                >
                  评价商品
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Footer />
    </div>
  )
}

export default PayDone
