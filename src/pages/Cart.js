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
      <Footer />
    </div>
  )
}

export default Cart
