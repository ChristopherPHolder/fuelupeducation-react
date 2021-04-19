import React from 'react'
import PropTypes, { string } from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import LandingPage from '../pages/Landing'
import Team from '../pages/Team/components/Team'
import Donate from '../pages/Donate/Donate'

const ROUTES = [
  { path: '/', key: 'ROOT', exact: true, component: LandingPage },
  { path: '/team', key: 'TEAM', exact: false, component: Team },
  { path: '/donate', key: 'DONATE', exact: false, component: Donate },
  {
    path: '/page1',
    key: 'page1',
    exact: true,
    // eslint-disable-next-line no-use-before-define
    component: RenderRoutes,
    routes: [
      {
        path: '/page1',
        key: 'PAGE1_ROOT',
        exact: true,
        component: () => <h1>page1 Index</h1>,
      },
      {
        path: '/page1/page1-child',
        key: 'PAGE1_CHILD',
        exact: true,
        component: () => <h1>page1 Rings</h1>,
      },
    ],
  },
]
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  )
}

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  )
}

RenderRoutes.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      exact: PropTypes.bool.isRequired,
      component: PropTypes.objectOf.isRequired,
    }),
  ).isRequired,
}

export default ROUTES
