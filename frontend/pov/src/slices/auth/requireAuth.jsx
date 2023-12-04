import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const RequireAuth = () => {
    const location = useLocation()
    const { token } = useSelector((state) => state.login)

    return token ? <Outlet /> : <Navigate to="/login" replace={{ from: location}} />
}