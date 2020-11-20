import { ApolloProvider, useQuery } from '@apollo/client'
import { Redirect, Router } from '@reach/router'
import * as React from 'react'
import { hydrate, render } from 'react-dom'
import { Provider as StyletronProvider } from 'styletron-react'
import { appContext } from '../../../common/src/context'
import { getApolloClient } from '../graphql/apolloClient'
import { FetchUserContext } from '../graphql/query.gen'
import { style } from '../style/styled'
import { fetchUser } from './auth/fetchUser'
import { UserContext, UserCtx } from './auth/user'
import { Route } from './nav/route'
import { AuctionsPage } from './page/AuctionsPage'
import { BearwearPage } from './page/BearwearPage'
import { DormsupplyPage } from './page/DormsupplyPage'
import { ElectronicPage } from './page/ElectronicPage'
import { HomePage } from './page/HomePage'
import { LecturesPage } from './page/LecturesPage'
import { LogInPage } from './page/LogInPage'
import { NewListingPage } from './page/NewListingPage'
import { PlaygroundPage } from './page/PlaygroundPage'
import { Profile } from './page/Profile'
import { ProjectsPage } from './page/ProjectsPage'
import { SignUpPage } from './page/SignUpPage'
import { TextbookPage } from './page/TextbookPage'
import { UserActiveBidsPage } from './page/UserActiveBidsPage'
import { UserListingsPage } from './page/UserListingsPage'
import { UserPurchasesPage } from './page/UserPurchasesPage'


const Styletron = require('styletron-engine-monolithic')

export function init() {
  const renderFn = appContext().serverRendered ? hydrate : render
  const engine = new Styletron.Client({
    hydrate: document.getElementsByClassName('_styletron_hydrate_'),
  })

  renderFn(
    <ApolloProvider client={getApolloClient()}>
      <StyletronProvider value={engine}>
        <App />
      </StyletronProvider>
    </ApolloProvider>,
    document.getElementById('app')
  )
}

export function App() {
  const { loading, data } = useQuery<FetchUserContext>(fetchUser)
  if (loading || data == null) {
    return null
  }

  return (
    <UserContext.Provider value={new UserCtx(data.self)}>
      <AppBody />
    </UserContext.Provider>
  )
}

export function AppBody() {
  return (
    <>
      <Router className={bodyClass}>
        <Redirect noThrow from="app" to="index" />
        <Redirect noThrow from="app/playground" to="surveys" />
        <HomePage path={Route.HOME} />
        <LecturesPage path={Route.LECTURES} />
        <AuctionsPage path={Route.AUCTIONS} />
        <AuctionsPage path={Route.AUCTION_LISTING} />
        <UserListingsPage path={Route.USER_LISTINGS} />
        <UserPurchasesPage path={Route.USER_PURCHASES} />
        <UserActiveBidsPage path={Route.USER_ACTIVE_BIDS} />
        <NewListingPage path={Route.USER_CREATE_LISTING} />
        <ProjectsPage path={Route.PROJECTS} />
        <PlaygroundPage path={Route.PLAYGROUND} />
        <PlaygroundPage path={Route.PLAYGROUND_APP} />
        <SignUpPage path={Route.SIGNUP} />
        <LogInPage path={Route.LOGIN} />
        <ElectronicPage path={Route.ELECTRONICS} />
        <BearwearPage path={Route.BEARWEAR} />
        <DormsupplyPage path={Route.DORMSUPPLY} />
        <TextbookPage path={Route.TEXTBOOK} />
        <Profile path={Route.PROFILE} />


      </Router>
      <Footer>
        <FooterText>© 2020 Bruin Market</FooterText>
      </Footer>
    </>
  )
}

const bodyClass = 'flex flex-column items-center mh2 mh3-ns mh5-l pt6 min-vh-100 sans-serif'

const Footer = style('footer', 'fixed flex items-center bottom-0 w-100')

const FooterText = style('small', 'mid-gray avenir', { margin: 'auto', opacity: '0.2' })
