import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class DummyEmployees extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://dummy.restapiexample.com/api/v1', context, options)
  }

  public async getEmployees (): Promise<any> {
    return this.http.get('/employees', {
      metric: 'dummyEmployees-employees',
    })
  }
}
