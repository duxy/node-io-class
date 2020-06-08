
export async function employee(ctx: Context, next: () => Promise<any>) {
  const {
    state: { id },
    clients: {
      dummyEmployees
    }
  } = ctx

  const employee = await dummyEmployees.getEmployee(id)
  console.log(employee)
  ctx.body = employee
  ctx.status = 200

  await next()
}