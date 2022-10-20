import { createGenerateClassName, StylesProvider } from '@material-ui/core'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Header from './components/Header'
import Progress from './components/Progress'

const Marketing = lazy(() => import ('./components/MarketingApp'))
const Auth = lazy(() => import ('./components/AuthApp'))
const Dashboard = lazy(() => import ('./components/DashboardApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const history = createBrowserHistory();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard')
    }
  }, [isSignedIn])

  return (
    <Router history={history}>
    <StylesProvider generateClassName={generateClassName}>
        <div>
            <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>
            <Suspense fallback={<Progress/>}>
            <Switch>
                <Route path='/auth'>
                  <Auth onSignIn={() => setIsSignedIn(true)}/>
                </Route>
                <Route path='/dashboard'>
                  { !isSignedIn && <Redirect to='/'/> }
                  <Dashboard/>
                </Route>
                <Route path='/' component={Marketing}/>
            </Switch>
            </Suspense>
        </div>
    </StylesProvider>
    </Router>
  )
}
