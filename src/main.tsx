import React from 'react'
import ReactDOM from 'react-dom/client'
import Seminars from './seminars/seminar-home/Seminars'
import { Provider } from './providers/Provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
    <Seminars />
    </Provider>
  </React.StrictMode>,
)
