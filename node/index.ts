import { ClientsConfig, LRUCache, Service, ParamsContext, ServiceContext } from '@vtex/api'

import { Clients } from './clients'
import { employees } from './middlewares/employees'
import { employee } from './middlewares/employee'
import { validate } from './middlewares/validate'
const TIMEOUT_MS = 800

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({max: 5000})
metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
      // API needs theese kind of cookies for ohter calls than employees...
      headers: {'Cookie': 'active_template::133674=pub_site.1591590864; ezoab_133674=mod27; ezoadgid_133674=-1; ezoref_133674=restapiexample.com; PHPSESSID=1973d6c5a0329edb201e015cd74715b7'}
    },
    // This key will be merged with the default options and add this cache to our Status client.
    employees: {
      memoryCache,
    },
    employee: {
      memoryCache,
    },
  },
}

// interface State extends RecorderState {

// }

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State {
    id: number,
    recorder: any,
    body: any
  }
}


// Export a service that defines route handlers and client options.
export default new Service<Clients, State, ParamsContext>({
  clients,
  routes: {
    // `status` is the route ID from service.json. It maps to an array of middlewares (or a single handler).
    employees: employees,
    employee: [ validate, employee ]
  },
})
