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
const getTotals = () => {
  return {
    newTotal: all_mails.filter((m) => m.isNew).length,
    archivedTotal: all_mails.filter((m) => m.isArchived).length,
    total: all_mails.filter((m) => !m.isArchived).length
  }
}

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
          ...getTotals()
        })
      )
  }),



  rest.get<any, any>('/mail/detail', (req, res, ctx) => {
    const id: number = Number(req.url.searchParams.get('id'))

    all_mails = all_mails.map(m => {
      if(m.id === id){
        m.isNew = false
      }
      return m;
    })

    return res(
        ctx.status(200),
        ctx.json({ 
          status: true,
          message: 'Mail detail load',
          data: all_mails.find(m => m.id === id),
          ...getTotals()
        })
      )
  }),



  rest.post<any, any>('/mail/setArchived', (req, res, ctx) => {
    const { id, isArchived } = req.body

    all_mails = all_mails.map(m => {
      if(m.id === id){
        m.isArchived = isArchived;
        m.isNew = false;
      }
      return m;
    })

    return res(
        ctx.status(200),
        ctx.json({ 
          status: true,
          message: 'Mail ' + (isArchived  ? 'Archived' : 'Rolled back')
        })
      )
  }),



  rest.delete<any, any>('/mail', (req, res, ctx) => {
    const id: number = Number(req.url.searchParams.get('id'))

    all_mails = all_mails.filter(m => m.id !== id)

    return res(
        ctx.status(200),
        ctx.json({ 
          status: true,
          message: 'Mail deleted'
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