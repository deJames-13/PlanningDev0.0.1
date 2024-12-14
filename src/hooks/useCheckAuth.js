import authApi from 'src/states/api/auth';
import { setCredentials } from 'src/states/slices/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogoutAction } from './useLogout.js';

const isDev = import.meta.env.VITE_CLIENT_ENV === 'development' && false;
const ADMIN_ROLES = ['admin', 'super-admin', 'user'];

export const useGetAuth = () => {
    const { userInfo, accessToken, roles } = useSelector((state) => state.auth);
    return { userInfo, accessToken, roles };
};

const useCheckAuth = (isPrivate = false) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogoutAction();

    const { userInfo, accessToken, roles } = useSelector((state) => state.auth);
    const [profile] = authApi.useProfileMutation();

    const isAdmin = userInfo?.id && roles?.some(role => ADMIN_ROLES.includes(role)) && accessToken || isDev;

    const fetchUser = async () => {
        const res = await profile().unwrap();
        res && dispatch(
            setCredentials({
                userInfo: res?.user,
                token: res?.token,
                roles: res?.user?.roles
            })
        );
    };

    useEffect(() => {
        if (!userInfo?.id && accessToken && isPrivate)
            fetchUser();
    }, []);

    const checkPath = (path) => {
        const urlParams = new URLSearchParams(location.search);
        const paramsString = urlParams.toString();
        if (paramsString) path += `?${paramsString}`;
        if (location.pathname.startsWith(path)) return location.pathname;
        return path;
    }

    useEffect(() => {

        // Dashboard Access Control
        if (!isAdmin && isPrivate) {
            logout();
        }

        // User and private route and not currently in /dashboard/*
        else if (userInfo?.id && isPrivate)
            navigate(checkPath('/dashboard'));

        // No user and private route
        else if (!userInfo?.id && isPrivate || userInfo?.id && !accessToken) {
            logout();
            navigate('/login');
        }

    }, [navigate, isPrivate, userInfo, accessToken, logout]);

    return {
        userInfo,
        accessToken,
        roles,
        isAdmin: isAdmin,
    };
};
export default useCheckAuth;
