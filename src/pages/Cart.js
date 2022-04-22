import { React, useEffect, useState } from 'react'
import Head from '../components/Head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

function Cart(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const { id } = props.match.params

  return (
    <div className="w-full flex flex-col">
      <Head />
      <Nav />
      <div className="w-full flex px-16">
        <div className="w-2/3">left</div>
        <div className="w-1/3">right</div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart
