
import authApi from 'src/states/api/auth';
import { logout as logoutAction } from 'src/states/slices/auth';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useLogoutAction = () => {

    const dispatch = useDispatch();
    const [logout] = authApi.useLogoutMutation();

    const action = useCallback(async () => {
        await logout();
        dispatch(logoutAction());
    }, [dispatch, logout]);

    return action;
};


const useLogout = () => {
    const dispatch = useDispatch();
    const logout = useLogoutAction();
    const navigate = useNavigate();
    const handleLogout = useCallback(
        async (e) => {
            e?.preventDefault();
            try {
                await logout();
                await signOut();
                navigate('/login');
                toast.success('Logged out successfully');
            } catch (error) {
                if ([401, 403].includes(error?.status)) return toast.error('Logged out due to unauthorized access');
                toast.error(error?.data?.message || 'Logout failed');
                console.error('Error:', error);
            }
        },
        [logout, navigate]
    );

    return handleLogout;
};
export default useLogout;
