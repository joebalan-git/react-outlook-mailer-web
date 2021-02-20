import { setupWorker, rest } from 'msw'
import { DEFAULT_MAILS } from './data/mails';

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

let all_mails = [...DEFAULT_MAILS];

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



  rest.post<any, any>('/mails', (req, res, ctx) => {
    const { mailFilterType, mailFilterSearch } = req.body

    let filteredMails = all_mails.filter((m) => {
      if(!mailFilterType && !mailFilterSearch) return true;
      return ((mailFilterType && ((mailFilterType === 'NEW' && m.isNew) || (mailFilterType === 'ARCHIVED' && m.isArchived) || (mailFilterType === 'TOTAL' && !m.isArchived))) || 
        (mailFilterSearch && (m.title.toLowerCase().indexOf(mailFilterSearch.toLowerCase()) > -1 || (m.description && m.description.toLowerCase().indexOf(mailFilterSearch.toLowerCase()) > -1))))
    });

    return res(
        ctx.status(200),
        ctx.json({ 
          status: true,
          message: 'Mails fetch success',
          data: filteredMails,
          newTotal: all_mails.filter((m) => m.isNew).length,
          archivedTotal: all_mails.filter((m) => m.isArchived).length,
          total: all_mails.length
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