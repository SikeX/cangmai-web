import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { FILE_BASE_URL } from '../services/api'
import goods from '../services/goods'

function SliderItem({ url }) {
  // const color = 'bg-red-' + name + '00'

  const headStyle = 'w-full mx-auto h-96 text-white rounded-md text-2xl'

  const imgUrl = FILE_BASE_URL + url.split(',')[0]

  const heightStyle = {
    height: 0,
    paddingBottom: '40%',
  }

  return (
    <div className={headStyle}>
      <img className="w-full h-full object-cover" src={imgUrl} alt="banner" />
    </div>
  )
}

function HeadSlider() {
  const [headImg, setHeadImg] = useState([])

  useEffect(() => {
    goods.getAllPromotion().then((res) => {
      if (res.success) {
        console.log(res.result.records)
        setHeadImg(res.result.records)
      }
    })
  }, [])

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  }

  return (
    <Carousel
      className="w-full"
      itemClass="image-item"
      swipeable
      showDots
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={5000}
      // customTransition='all .5 linear'
      transitionDuration={500}
      removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
    >
      {/* <div className="bg-blue-500 h-80 rounded-lg">1</div>
      <div className="bg-red-500 h-80 rounded-lg">2</div> */}
      {headImg.map((item) => (
        <SliderItem key={item.id} url={item.img} />
      ))}
    </Carousel>
  )
}

export default HeadSlider
