import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { TextField, Autocomplete } from '@mui/material'
import { useEffect, useState } from 'react'
import GlobalAlert from './GlobalAlert'
import user from '../services/user'

const LoginModal = (props) => {
  console.log('LoginModal.props', props)
  const { isOpen, onClose } = props

  console.log('isOpen', isOpen)

  // const [logionModalOpen, setLogionModalOpen] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [registerUserInfo, setRegisterUserInfo] = useState({})
  const [isRegister, setIsRegister] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [snackOpen, setSnackOpen] = useState(false)

  const handleNameChange = (event) => {
    console.log(event)
    if (isRegister) {
      setRegisterUserInfo({ ...registerUserInfo, username: event.target.value })
    } else {
      setUserInfo({ ...userInfo, username: event.target.value })
    }
  }

  const handlePasswordChange = (event) => {
    if (isRegister) {
      setRegisterUserInfo({ ...registerUserInfo, password: event.target.value })
    } else {
      setUserInfo({ ...userInfo, password: event.target.value })
    }
  }

  const handleRegister = () => {
    user.register(registerUserInfo).then((res) => {
      if (res.success) {
        setIsRegister(false)
        message('注册成功')
      } else {
        message('注册失敗')
      }
    })
  }

  const handleLogin = () => {
    console.log(userInfo)
    user.login(userInfo).then((res) => {
      console.log(res)
      if (res.success) {
        setIsRegister(false)
        onClose()
        localStorage.setItem('userInfo', JSON.stringify(res.result.userInfo))
        message('登录成功')
      } else {
        message(res.message)
      }
    })
  }

  const message = (msg) => {
    setAlertMsg(msg)
    setSnackOpen(true)
  }

  return (
    <Dialog fullWidth={true} open={isOpen} onClose={() => onClose()}>
      <GlobalAlert message={alertMsg} isOpen={snackOpen} onClose={() => setSnackOpen(false)} />
      <DialogTitle>{isRegister ? '用户注册' : '用户登录'}</DialogTitle>
      <div className="flex flex-col px-4 py-4 space-y-4">
        <TextField
          id="name"
          name="name"
          type="name"
          // fullWidth
          required
          label="用户名"
          // value={values.phone}
          onChange={handleNameChange}
          // error={touched.phone && Boolean(errors.phone)}
          // helperText={touched.phone && errors.phone}
        />
        <TextField
          name="password"
          type="password"
          label="密码"
          required
          // fullWidth
          // value={values.email}
          onChange={handlePasswordChange}
          // error={touched.email && Boolean(errors.email)}
          // helperText={touched.email && errors.email}
        />
        <div className="flex space-x-2">
          {isRegister ? (
            <button type="submit" className="bg-black text-white px-4 py-2 cursor-pointer" onClick={handleRegister}>
              立即注册
            </button>
          ) : (
            <button type="submit" className="bg-black text-white px-4 py-2 cursor-pointer" onClick={handleLogin}>
              立即登录
            </button>
          )}

          {!isRegister && (
            <a
              className="text-sm text-blue-500 hover:underline mt-auto cursor-pointer"
              onClick={() => setIsRegister(true)}
            >
              还没有账号?，立即注册
            </a>
          )}
          {isRegister && (
            <a
              className="text-sm text-blue-500 hover:underline mt-auto cursor-pointer"
              onClick={() => setIsRegister(false)}
            >
              已有账号?，立即登录
            </a>
          )}
        </div>
      </div>
    </Dialog>
  )
}

export default LoginModal
