import { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'

const UserLogin = () => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('userInfo') !== null)

  useEffect(() => {}, [isLogin])

  return (
    <div className="w-full h-full flex flex-col content-center bg-white rounded-md shadow-sm p-4 space-y-4">
      <div className="mx-auto">
        <FaUserCircle size={45} />
      </div>
      <div className="mx-auto text-xl font-bold">欢迎加入Cangmai</div>
      {localStorage.getItem('userInfo') === null ? (
        <div className="flex space-x-2 mx-auto">
          <div className="py-2 px-10 rounded-2xl shadow-md hover:shadow-sm bg-red-400 cursor-pointer">注册</div>
          <div className="py-2 px-10 rounded-2xl shadow-md hover:shadow-sm bg-gray-100 cursor-pointer">登录</div>
        </div>
      ) : (
        <div className="flex space-x-2 mx-auto">
          <div className="py-2 px-10 rounded-2xl shadow-md hover:shadow-sm bg-red-400 cursor-pointer">查看购物车</div>
          <div
            className="py-2 px-10 rounded-2xl shadow-md hover:shadow-sm bg-gray-100 cursor-pointer"
            onClick={() => {
              setIsLogin(false)
              localStorage.clear()
            }}
          >
            登出
          </div>
        </div>
      )}
    </div>
  )
}

export default UserLogin
