import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Scrollbars } from 'react-custom-scrollbars'
import Home from './pages/Home'
import GoodsChoose from './pages/GoodsChoose'
import GoodsDetailPage from './pages/GoodsDetailPage'
import Info from './pages/Info'
import Order from './pages/Order'
import PayDone from './pages/PayDone'
import Cart from './pages/Cart'
import Other from './pages/Other'
import CartBuy from './pages/CartBuy'

function App() {
  return (
    <Scrollbars style={{ width: '100%', height: '100vh' }}>
      <Router>
        <Switch>
          <Route path="/detail/:id" component={GoodsDetailPage} />

          {/* <Route path="/donateChoose" component={DonateChoose} /> */}

          <Route path="/info/:id/:color/:size/:number" component={Info} />
          <Route path="/order/:orderNo" component={Order} />
          <Route path="/payDone" component={PayDone} />

          <Route path="/cart/:id" component={Cart} />
          <Route path="/cartBuy/:ids" component={CartBuy} />

          <Route path="/donate/:id" component={GoodsChoose} />
          <Route path="/" component={Home} />

          <Route component={Other} />
        </Switch>
      </Router>
    </Scrollbars>
  )
}

export default App
