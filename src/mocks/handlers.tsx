import { setupWorker, rest } from 'msw'

interface LoginBody {
  email: string,
  password: string
}

/*
interface LoginResponse {
  email: string
  firstName: string
  avatar: string
}
*/

const worker = setupWorker(
  // TODO: response was throwing error on LoginResponse so had to set it as any
  rest.post<LoginBody, any>('/login', (req, res, ctx) => {
    const { email, password } = req.body
    if(email === 'joe@gmail.com' && password === 'password'){
      return res(
        ctx.status(200),
        ctx.json({ 
          status: true,
          message: 'Login success',
          data: {
            email,
            firstName: 'John',
            avatar: ''
          }
        })
      )
    }
    return res(
        ctx.status(400),
        ctx.json({ 
          status: false,
          message: 'Invalid Credentials',
          data: {}
        })
      )
  }),
)

/*
  [
    {
      id: 1,
      title: 'Mail 1',
      description: 'Mail 1 description. Added for testing the mail display',
      isNew: true,
      isArchived: true
    }
  ]
*/
worker.start()