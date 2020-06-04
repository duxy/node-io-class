import { EmployeeContext } from '../typings/employeesContext'

export async function employees(ctx: EmployeeContext, _: () => Promise<any>) {
  const {
    clients: {
      dummyEmployees
    }
  } = ctx

  const employees = await dummyEmployees.getEmployees()
  ctx.body = employees
  ctx.status = 200
  return
}
