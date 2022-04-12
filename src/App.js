import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Donate from './pages/DonateChoose'
import DonateDetail from './pages/DonateDetail'
import Info from './pages/Info'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/detail/:id" component={DonateDetail} />

        {/* <Route path="/donateChoose" component={DonateChoose} /> */}

        <Route path="/info/:id/:option" component={Info} />
        <Route path="/donate" component={Donate} />

        <Route path="/" component={Home} />
      </Switch>
    </Router>
  )
}

export default App
