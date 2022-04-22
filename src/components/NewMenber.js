import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const NewMember = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 20,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 20,
    },
  }

  return (
    <div className="flex w-full py-2 px-4 space-x-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-md">
      <div className="w-1/3 h-full flex flex-col space-y-2">
        <div className="font-bold">新用户0元购买</div>
        <div>新用户可领取15元优惠券，以下商品只需0.01元即可包邮购买</div>
        <div className="w-full bg-blue-300 h-20 rounded-xl">
          <img
            className="w-full h-full object-cover"
            src="https://s3.bmp.ovh/imgs/2022/04/21/234b7d7d3b68fcbc.png"
            alt="sss"
          />
        </div>
      </div>
      <Carousel
        className="w-2/3 h-full"
        itemClass="image-item"
        swipeable
        arrows
        responsive={responsive}
        infinite
        autoPlaySpeed={5000}
        // customTransition='all .5 linear'
        transitionDuration={500}
        removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
      >
        <div className="flex-grow bg-red-400 h-44 rounded-lg">
          <img
            className="w-full h-full object-cover"
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mday-prod-product-ipadmini-wifi-202204?wid=390&hei=446&fmt=jpeg&qlt=90&.v=1648481637875"
            alt="sss"
          />
        </div>
        <div className="flex-grow bg-red-400 h-44 rounded-lg">
          <img
            className="w-full h-full object-cover"
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mday-con-feature-airpods-hero-right-202204?wid=288&hei=458&fmt=png-alpha&.v=1648481655999"
            alt="sss"
          />
        </div>
        <div className="flex-grow bg-red-400 h-44 rounded-lg">
          <img
            className="w-full h-full object-cover"
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mday-con-product-iphone-silicone-blue-202204?wid=194&hei=378&fmt=png-alpha&.v=1648481656444"
            alt="sss"
          />
        </div>
        <div className="flex-grow bg-red-400 h-44 rounded-lg">
          <img
            className="w-full h-full object-cover"
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mday-health-hero-watch-202204?wid=1304&hei=1560&fmt=jpeg&qlt=90&.v=1648746423147"
            alt="sss"
          />
        </div>
        <div className="flex-grow bg-red-400 h-44 rounded-lg">
          <img
            className="w-full h-full object-cover"
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mday-con-product-airtag-202204?wid=344&hei=352&fmt=jpeg&qlt=90&.v=1648481656459"
            alt="sss"
          />
        </div>
      </Carousel>
    </div>
  )
}

export default NewMember
