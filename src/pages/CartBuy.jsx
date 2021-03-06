import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
// import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
// import {
//   loadCaptchaEnginge,
//   LoadCanvasTemplate,
//   LoadCanvasTemplateNoReload,
//   validateCaptcha,
// } from 'react-simple-captcha'
import { React, useEffect, useState, useRef } from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { TextField, Autocomplete } from '@mui/material'
import goods from '../services/goods'
import { FILE_BASE_URL } from '../services/api'
import dict from '../services/dict'
import Nav from '../components/Nav'
import Head from '../components/Head'
import Footer from '../components/Footer'
import { pca, pcaa } from 'area-data' // v3 or higher
import 'react-area-linkage/dist/index.css' // v2 or higher
import { AreaSelect, AreaCascader } from 'react-area-linkage'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import user from '../services/user'
import { RadioGroup } from '@headlessui/react'
import { FaCheck } from 'react-icons/fa'
import order from '../services/order'
import { useHistory } from 'react-router-dom'

function CartBuy(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const { ids } = props.match.params
  const [goodsInfo, setGoodsInfo] = useState({})
  const [item, setItem] = useState({})
  const [shippingModal, setShippingModal] = useState(false)
  const [address, setAddress] = useState([])
  const [addressList, setAddressList] = useState([])
  const [selectedAddress, setSelectedAddress] = useState({})
  const [cartList, setCartList] = useState([])

  const history = useHistory()

  const rootUrl = FILE_BASE_URL

  useEffect(() => {
    goods.getCartListByIds(ids).then((res) => {
      if (res.success) {
        setCartList(res.result)
      }
    })
  }, [])

  const getTotalMoney = () => {
    let total = 0
    cartList.forEach((item) => {
      total += item.price * item.number
    })
    return total
  }

  console.log(props.match.params)

  const phoneRegExp = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/

  const validationSchema = yup.object({
    name: yup.string('?????????????????????').required('?????????????????????'),
    phone: yup.string().matches(phoneRegExp, '??????????????????').required('????????????????????????'),
  })

  const initialValues = {
    detailAddress: '',
    name: '',
    phone: '',
    // department: {value: '', text: '', title: ''},
  }

  useEffect(() => {
    user.queryByUserId(JSON.parse(localStorage.getItem('userInfo'))['id']).then((res) => {
      if (res.success) {
        setAddressList(res.result)
      }
    })
  }, [shippingModal])

  // useEffect(() => {
  //   loadCaptchaEnginge(6, '#1e40af', 'white')
  // }, [])

  const changeShipping = (e) => {
    setAddress(e)
  }

  // const addShippingInfo = () => {}

  const addShippingInfo = (e) => {
    console.log(e)
    const addressNode = {
      receiverName: e.name,
      receiverPhone: e.phone,
      detailAddress: e.detailAddress,
      pca: address.join(','),
      userId: JSON.parse(localStorage.getItem('userInfo'))['id'],
    }
    // alert('haha')
    // alert(JSON.stringify(addressNode, null, 2))
    user.addAddress(addressNode).then((res) => {
      if (res.success) {
        alert('????????????')
        setShippingModal(false)
      } else {
        alert(res.message)
      }
    })
  }

  const addOrderInfo = (e) => {
    console.log(e)
    const orderInfo = {
      shoppingId: ids,
      payment: getTotalMoney(),
      userId: JSON.parse(localStorage.getItem('userInfo'))['id'],
      addId: selectedAddress.id,
    }
    // alert('haha')
    // alert(JSON.stringify(addressNode, null, 2))
    order.postOrder(orderInfo).then((res) => {
      if (res.success) {
        alert('??????????????????')
        history.push(`/order/${res.result.orderid}`)
      } else {
        alert(res.message)
      }
    })
  }

  // const handleChange = (e, name) => {
  //     console.log(name)
  //     console.log(e.target.value)
  // }

  return (
    <div className="w-full h-screen flex flex-col">
      <Head />
      <Nav />
      <Dialog fullWidth={true} open={shippingModal} onClose={() => setShippingModal(false)}>
        <DialogTitle>??????????????????</DialogTitle>
        <div className="flex flex-col px-4 py-4 space-y-4">
          <AreaSelect type="text" level={2} data={pcaa} onChange={changeShipping} />
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={addShippingInfo}>
            {({ errors, touched, handleChange, values, setFieldValue }) => (
              <Form className="flex flex-col space-y-3">
                <div className="w-full flex space-x-2">
                  <TextField
                    id="detailAddress"
                    name="detailAddress"
                    label="????????????"
                    required
                    fullWidth
                    value={values.detailAddress}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full flex space-x-2">
                  <TextField
                    id="name"
                    name="name"
                    label="???????????????"
                    required
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </div>
                <TextField
                  id="phone"
                  name="phone"
                  type="phone"
                  fullWidth
                  required
                  label="?????????"
                  value={values.phone}
                  onChange={handleChange}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
                <div className="flex w-full">
                  <div className="w-full" />
                  {/* <TextField
                                        label="?????????"
                                        placeholder="??????????????????"
                                        id="outlined-size-small"
                                        size="small"
                                    /> */}
                </div>
                <div className="flex space-x-2">
                  {/* <Button className="w-36" variant="contained" type="submit" disableElevation>
                    ????????????
                  </Button> */}
                  <button type="submit" className="bg-black text-white px-4 py-2 cursor-pointer">
                    ??????
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Dialog>
      <div className="w-full flex lg:flex-row flex-col flex-grow bg-gray-100 lg:px-16 lg:py-8 space-y-2 md:space-x-2">
        <div className="w-full lg:w-1/3 flex flex-col bg-white shadow-lg rounded-lg">
          <div className="p-4 font-bold text-xl">????????????</div>
          <div className="flex flex-col py-2 px-2 spcae-y-2">
            {cartList.map((item) => (
              <div key={item.id} className="flex items-center mb-4">
                <div htmlFor={item.id} className="flex w-full ml-3 text-sm font-medium text-gray-900">
                  <div className="w-28 h-28 ">
                    <img
                      src={rootUrl + item.img}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md shadow-md"
                    />
                  </div>
                  <div className="flex flex-col px-2 space-y-3">
                    <span className="font-bold">{item.detail}</span>
                    <div className="flex space-x-2">
                      <div className="text-gray-500 text-sm flex space-x-3">
                        <div>??????: {item.colorId}</div>
                        <div>??????: {item.sizeId}</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold">???{item.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col flex-grow p-4 ">
            <div className="px-2 py-1 text-gray-500">?????????</div>
            <div className="px-1 py-1 text-3xl font-bold ">???{getTotalMoney()} CNY</div>
          </div>
        </div>
        <div className="w-full lg:w-2/3">
          <div className="bg-white w-full flex flex-col space-y-4 py-2 px-4 md:px-16">
            <div className="py-1 flex flex-col space-y-2">
              <div className="text-xl font-bold">??????????????????</div>
              <div className="text-sm text-gray-400 border-b-2">??????????????????????????????</div>
            </div>
            {/* ----------????????????----------------- */}
            <div className="flex flex-col bg-gray-100 px-4 py-2 rounded-md shadow-sm space-y-3">
              <div className="font-bold">????????????</div>
              <RadioGroup value={selectedAddress} onChange={setSelectedAddress}>
                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                <div className="space-y-2">
                  {addressList.map((address) => (
                    <RadioGroup.Option
                      key={address.id}
                      value={address}
                      className={({ active, checked }) =>
                        `${active ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60' : ''}
                  ${checked ? 'bg-blue-900 bg-opacity-75 text-white' : 'bg-white'}
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                      }
                    >
                      {({ active, checked }) => (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
                              >
                                <div className="flex flex-col space-y-1">
                                  <div>{address.receiverName}</div>
                                  <div>{address.receiverPhone}</div>
                                </div>
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className={`inline ${checked ? 'text-blue-100' : 'text-gray-500'}`}
                              >
                                <div className="py-2">{address.pca + ' ' + address.detailAddress}</div>
                              </RadioGroup.Description>
                            </div>
                          </div>
                          {checked && (
                            <div className="flex-shrink-0 text-blue">
                              <FaCheck className="w-6 h-6" color="blue" />
                            </div>
                          )}
                        </div>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
              <a
                className="text-sm text-blue-700 hover:underline cursor-pointer"
                onClick={() => setShippingModal(true)}
              >
                +??????????????????
              </a>
            </div>

            {/* ----------????????????----------------- */}

            <TextField
              name="msg"
              id="outlined-multiline-flexible"
              label="??????"
              multiline
              rows={4}
              // value={values.msg}
              // onChange={handleChange}
              // error={touched.msg && Boolean(errors.msg)}
              // helperText={touched.msg && errors.msg}
            />

            <div className="flex w-full">
              <div className="w-full" />
              <Button className="w-36" variant="contained" type="submit" disableElevation onClick={addOrderInfo}>
                ????????????
              </Button>
            </div>

            {/* form */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CartBuy
