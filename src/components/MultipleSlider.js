import Carousel from 'react-grid-carousel'
import GoodsItem from './GoodsItem'

function MultipleSlider() {
  const settings = {
    dots: true,
    infinite: false,
    rows: 2,
    slidesToShow: 4,
    slidesPerRow: 4,
  }
  return (
    <Carousel
      cols={4}
      rows={1}
      gap={10}
      responsiveLayout={[
        {
          breakpoint: 768,
          cols: 1,
          rows: 4,
        },
      ]}
      mobileBreakpoint={300}
      loop
    >
      <Carousel.Item>
        <GoodsItem tag={false} title="1" />
      </Carousel.Item>
      <Carousel.Item>
        <GoodsItem tag={false} title="1" />
      </Carousel.Item>
      <Carousel.Item>
        <GoodsItem tag={false} title="1" />
      </Carousel.Item>
      <Carousel.Item>
        <GoodsItem tag={false} title="1" />
      </Carousel.Item>
      <Carousel.Item>
        <GoodsItem tag={false} title="1" />
      </Carousel.Item>
      <Carousel.Item>
        <GoodsItem tag={false} title="1" />
      </Carousel.Item>
      <Carousel.Item>
        <GoodsItem tag={false} title="1" />
      </Carousel.Item>
    </Carousel>
  )
}

export default MultipleSlider
