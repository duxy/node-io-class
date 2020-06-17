import { EmployeeContext } from '../typings/employeesContext'

export async function validate(ctx: EmployeeContext, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
  } = ctx


  const { id } = params

 try {
  const idNumber = parseInt(id as string, 10)
  ctx.state.id = idNumber
  await next()
 } catch(e) { 
   console.log(e)
   return
 }

}
