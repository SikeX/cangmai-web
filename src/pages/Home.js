import { React, useEffect, useState } from 'react'
import Head from '../components/Head'
import Nav from '../components/Nav'
import HeadSlider from '../components/HeadSlider'
import Footer from '../components/Footer'
import DonateClass from '../components/DonateClass'
import category from '../services/category'
import Categories from '../components/Categories'
import NewMember from '../components/NewMenber'
import UserLogin from '../components/UserLogin'

function Home() {
  return (
    <div className="flex w-screen flex-col bg-gray-100">
      {/* <div className="w-full h-6 bg-green-300 my-auto">注册</div> */}
      {/* <Head /> */}
      <Nav />
      <div className="w-full h-99 flex px-8 md:px-20 space-x-2">
        <div className="w-1/5 bg-blue-100 p-2">
          <Categories />
        </div>
        <div className="w-4/5 flex space-x-2">
          <div className="w-2/3 bg-green-100 py-2 flex flex-col space-y-4">
            <HeadSlider />
            <NewMember />
          </div>
          <div className="w-1/3 bg-yellow-100 flex flex-col p-2">
            <div className="h-2/5">
              <UserLogin />
            </div>
            <div className="h-3/5 bg-gray-200">
              <img
                className="w-full h-full object-cover"
                src="https://s3.bmp.ovh/imgs/2022/04/21/4a70f63a04cce711.png"
                alt="aaa"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full flex flex-col px-1 md:px-12 lg:px-16 space-y-3 py-1">
        {donationClassList.map((item) => <DonateClass key={item.id} id={item.id} name={item.name} />)}
      </div> */}
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
