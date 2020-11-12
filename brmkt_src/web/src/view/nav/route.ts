/**
 * All of our CC URL routes. You may navigate to any route by providing the route
 * and an argument specifying all it's route params, e.g. { taskId: 1, contactId: 3}.
 *
 * Some routes are special values that map to one of the other routes depending on current location context.
 */
export enum Route {
  HOME = 'app/index',
  LECTURES = 'app/lectures',
  PROJECTS = 'app/projects',
  PLAYGROUND = 'app/playground',
  PLAYGROUND_APP = 'app/playground/:app',
  SIGNUP = 'app/signup',

  AUCTIONS = 'app/auction',
  AUCTION_LISTING = 'app/auction/listing',
  BUYITNOWS = 'app/buyitnow',
  BUYITNOW_LISTING = 'app/buyitnow/listing',
  SELL = "app/SellProduct",
  LOGIN = 'app/login',
}

export enum PlaygroundApp {
  SURVEYS = 'surveys',
  LOGIN = 'login',
  PROFILE = 'profile',
  SIGNUP = 'signup',
}

export function getAuctionListingPath(auctionId?: number) {
  const path = getPath(Route.AUCTION_LISTING)
  return path + (auctionId ? `?auctionId=${auctionId}` : '')
}

export function getBinListingPath(binId?: number) {
  const path = getPath(Route.BUYITNOW_LISTING)
  return path + (binId ? `?binId=${binId}` : '')
}

export function getSurveyPath(surveyId?: number) {
  const path = getPath(Route.PLAYGROUND_APP, { app: PlaygroundApp.SURVEYS })
  return path + (surveyId ? `?surveyId=${surveyId}` : '')
}

export function getSignupPath() {
  return getPath(Route.PLAYGROUND_APP, { app: PlaygroundApp.SIGNUP })
}

export function getLoginPath() {
  return getPath(Route.PLAYGROUND_APP, { app: PlaygroundApp.LOGIN })
}

export function getPlaygroundPath() {
  return getPath(Route.PLAYGROUND)
}

export function getProfilePath() {
  return getPath(Route.PLAYGROUND_APP, { app: PlaygroundApp.PROFILE })
}

/**
 * Example: getPath(ROUTES.TASK) returns "/leasing/tasks" while getPath(ROUTES.TASK, {taskId: 5}) returns "leasing/tasks/task/5".
 *
 * CAVEAT: currently this reads from window.location, the appropriate way to get location is through @reach/router.
 */
export function getPath(route: Route, arg?: Partial<ReturnType<typeof routeParams>>) {
  const routes = [route] as Route[]

  for (const r of routes) {
    const params = r.split('/').filter(t => t.startsWith(':'))
    const keys = arg ? Object.keys(arg) : []
    const paramMatches = params.map(p => keys.includes(p.replace(':', ''))).filter(m => m)
    if (keys.length !== params.length || paramMatches.length < params.length) {
      continue // every parameter must be replaced
    }

    // matching case: arg specifies all params in the URL
    let path = r.toString()
    for (const k of keys) {
      path = path.replace(':' + k, '' + (arg as any)[k])
    }
    return '/' + path
  }

  throw new Error('no matching route')
}

/**
 * Represents parameters parsed from URL routes, e.g. /leasing/tasks/task/123 parses taskId=123.
 */
export interface AppRouteParams {
  userId?: string
  app?: PlaygroundApp
}

/**
 * Parses string route params into numbers. Values are 0 where undefined. Useful for converting URL parameters into GraphQL query variables.
 */
export function routeParams(params: AppRouteParams) {
  return {
    userId: Number(params.userId || 0),
    app: params.app,
  }
}
