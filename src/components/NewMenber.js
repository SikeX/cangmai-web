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
        <div>新用户0元购买</div>
        <div>新用户可领取15元优惠券，以下商品只需0.01元即可包邮购买</div>
        <div className="w-full bg-blue-300 h-20 rounded-xl">1</div>
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
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex-grow bg-red-400 h-44 rounded-lg">
            {item}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default NewMember
