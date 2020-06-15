import { ServiceContext } from '@vtex/api'

import { Clients } from '../clients'


export interface EmployeeContext extends ServiceContext<Clients> {
  clients: Clients
  state: State
}

interface Employee {
  id: string
  employee_name: string
  employee_salary: string
  employee_age: string
  profile_image: string
}

export interface EmployeeResponse {
  status: string
  data: Employee
}

export interface EmployeesResponse {
  status: string
  data: [Employee]
}
