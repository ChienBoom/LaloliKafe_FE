import { createBrowserRouter } from 'react-router-dom'
import Home from '../components/management/home/Home'
import AppLayout from '../components/layout/AppLayout'
import Login from '../components/Log/Login/Login'
import Logout from '../components/Log/Logout/Logout'
import LogLayout from '../components/layout/LogLayout'
import Staff from '../components/management/staff/Staff'
import Drink from '../components/management/drink/Drink'
import Report from '../components/management/report/Report'
import Table from '../components/management/table/Table'
import Food from '../components/management/food/Food'
import Area from '../components/management/area/Area'

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: 'management/home',
        element: <Home />
      },
      {
        path: 'management/staff',
        element: <Staff />
      },
      {
        path: 'management/drink',
        element: <Drink />
      },
      {
        path: 'management/food',
        element: <Food />
      },
      {
        path: 'management/area',
        element: <Area />
      },
      {
        path: 'management/table',
        element: <Table />
      },
      {
        path: 'management/report',
        element: <Report />
      }
    ]
  },
  {
    path: '/log',
    element: <LogLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'logout',
        element: <Logout />
      }
      // {
      //   path: '/register',
      //   element: <Logout />
      // }
    ]
  }
])
