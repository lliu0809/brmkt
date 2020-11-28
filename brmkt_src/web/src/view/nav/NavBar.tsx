import { useLocation } from '@reach/router'
import * as React from 'react'
import { useContext, useEffect } from 'react'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { addToastListener, removeToastListener, Toast, ToastType } from '../toast/toast'
import { link } from './Link'
import { getLoginPath, getPath, getProfilePath, getSignupPath, Route } from './route'

const title = {
  name: 'BRMKT',
  path: getPath(Route.HOME),
  title: true,
}

export function NavBar() {
  {
    /* const location = useLocation() */
  }
  const [toast, setToast] = React.useState<Toast | null>(null)

  function onToast(feedback: Toast) {
    setToast(feedback)
  }

  useEffect(() => {
    addToastListener(onToast)
    return () => removeToastListener(onToast)
  }, []) // only call on mount and unmount

  // clear toast after 3 secs whenever it changes to a non-empty value
  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timeout)
    }
    return void 0
  }, [toast])

  {
    /* const tabs = isSmall ? [otherTabs.find(t => location.pathname.startsWith(t.path)) || otherTabs[0]] : otherTabs */
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-100 avenir">
        {/* mount point for NavMenu */}
        <div id="nav-modal" />

        <RealNav />
        <SubNav />
      </div>
      {toast && <ToastContainer $isError={toast.type === ToastType.ERROR}>{toast.message}</ToastContainer>}
    </>
  )
}

function RealNav() {
  const { user } = useContext(UserContext)
  return (
    <div className="fixed top-0 left-0 w-100 avenir">
      <div id="nav-modal" />
      <Nav>
        <NavItem {...title} />
        <NavItem name="Auction" path={getPath(Route.AUCTIONS)} />
        <NavItem name="Make A Listing" path={user ? getPath(Route.USER_CREATE_LISTING) : getPath(Route.LOGIN)} />
        <NavItem name={user ? 'Hi, '+ user.name : 'Log In'} path={getPath(Route.LOGIN)} />
        {user && <NavItem name="Edit Profile" path={getPath(Route.PROFILE)} />}
        {!user && <NavItem name="Sign Up" path={getPath(Route.SIGNUP)} />}
      </Nav>
    </div>
  )
}

function SubNav() {
  const location = useLocation()
  const { user } = useContext(UserContext)
  if (!location.pathname.startsWith(getPath(Route.PLAYGROUND))) {
    // only playground has subnav
    return null
  }
  return (
    <Nav $isSubNav>
      <NavItem name={user ? 'logout' : 'login'} path={getLoginPath()} />
      <NavItem name="profile" path={getProfilePath()} />
      {!user && <NavItem name="signup" path={getSignupPath()} />}
    </Nav>
  )
}

const Nav = style(
  'nav',
  'flex white items-center list pa2 ph4 ph5-ns ph7-l avenir f4',
  (p: { $isSubNav?: boolean }) => ({
    background: `linear-gradient(90deg, ${'#005587'} 0%, ${'#2774AE'} 100%)`,
    opacity: '0.9',
    paddingTop: p.$isSubNav ? 0 : undefined,
    paddingBottom: p.$isSubNav ? 0 : undefined,
    justifyContent: p.$isSubNav ? 'flex-end' : 'space-between',
  })
)

function NavItem(props: { name: string; path: string; title?: boolean }) {
  const location = useLocation()
  return (
    <NavLink $title={props.title} $bold={props.title || location.pathname.startsWith(props.path)} to={props.path}>
      {props.name}
    </NavLink>
  )
}

const NavAnchor = style(
  'a',
  'link near-white hover-bg-black-10 pa2 br2',
  (p: { $bold?: boolean; $title?: boolean }) => ({
    fontWeight: p.$bold ? 600 : 200,
    fontSize: p.$title ? '1.5em' : undefined,
  })
)
const NavLink = link(NavAnchor)

const ToastContainer = style<'div', { $isError?: boolean }>(
  'div',
  'avenir f5 fixed bottom-0 white right-0 br3 pa3 bg-black-90 mb3 mr4 mr5-ns mr7-l',
  () => ({
    // color: p.$theme.textColor(p.$isError),
    zIndex: 100,
  })
)
