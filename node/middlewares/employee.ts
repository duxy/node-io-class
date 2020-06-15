import { EmployeeContext } from './../typings/employeesContext';

export async function employee(ctx: EmployeeContext, _: () => Promise<any>) {
  const {
    state: { id },
    clients: {
      vbase,
      dummyEmployees
    }
  } = ctx

  const cookieResponse: CookieJSON = await vbase.getJSON('dummyEmployeeApp', 'cookie-header.json', true)
  let cookieHeaders
  if (cookieResponse) {
    cookieHeaders = cookieResponse.Cookie
  } else {
    cookieHeaders = ''
  }
  try {
    const response = await dummyEmployees.getEmployee(id, cookieHeaders)
    const employee = response.data
    ctx.body = employee
    ctx.status = 200
    return
  } catch(error) {
      const headersArray = await Promise.all(error.response.headers['set-cookie'].map((header: string) => header.split(';')[0]))
      const headerString = headersArray.join('; ')
      vbase.saveJSON('dummyEmployeeApp', 'cookie-header.json', { 'Cookie': headerString })
      ctx.status = 400
      ctx.body = 'Saved to VBase'
      return
  }
}

interface CookieJSON {
  Cookie: string
}
