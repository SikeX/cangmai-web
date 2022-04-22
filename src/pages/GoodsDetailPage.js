import GoodsDetail from '../components/GoodsDetail'
import Footer from '../components/Footer'
import Head from '../components/Head'
import Nav from '../components/Nav'

function GoodsDetailPage(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const { id } = props.match.params

  return (
    <div className="w-full flex flex-col">
      <Head />
      <Nav />
      <GoodsDetail id={id} />
      <Footer />
    </div>
  )
}

export default GoodsDetailPage
