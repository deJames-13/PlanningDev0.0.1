import { createBrowserRouter } from 'react-router-dom'
import defaultRoutes from './default'
import guestRoutes from './guest'
import privateRoutes from './private'

export const routes = [
        ...defaultRoutes,
        ...privateRoutes,
        ...guestRoutes,
]
const router = createBrowserRouter(routes)
export default router



