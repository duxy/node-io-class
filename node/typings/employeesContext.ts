import { ServiceContext } from '@vtex/api'

import { Clients } from '../clients'


export interface EmployeeContext extends ServiceContext<Clients> {
  clients: Clients
  state: any
}
