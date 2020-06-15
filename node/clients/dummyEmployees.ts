import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class DummyEmployees extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://dummy.restapiexample.com/api/v1', context,
    {
      ...options,
      headers: { 'Access-Control-Allow-Origin':'*', }
    })
  }

  public async getEmployees (): Promise<any> {
    return this.http.get('/employees', {
      metric: 'dummyEmployees-employees',
    })
  }

  public async getEmployee (id: number, cookieHeaders: string): Promise<any> {
    return this.http.get(`/employee/${id}`,
    {
      headers: {
        Cookie: cookieHeaders
      },
      metric: 'dummyEmployees-employee',
    })
  }
}
