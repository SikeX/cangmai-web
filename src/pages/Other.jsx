import { React, useEffect, useState } from 'react'
import Head from '../components/Head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

function Other() {
  // eslint-disable-next-line react/destructuring-assignment

  return (
    <div className="w-full flex flex-col">
      <Head />
      <Nav />
      <div className="w-full flex px-16">
        <div className="mx-auto">找不到</div>
      </div>
      <Footer />
    </div>
  )
}

export default Other
