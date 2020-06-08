import { IOClients } from '@vtex/api'

import DummyEmployees from './dummyEmployees'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get dummyEmployees() {
    return this.getOrSet('employees', DummyEmployees)
  }

  public get dummyEmployee() {
    return this.getOrSet('employee', DummyEmployees)
  }
}
