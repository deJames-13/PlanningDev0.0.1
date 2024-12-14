const USER_ONLY = [
    'budgets',
    'budget-annual',
    'objectives',
    'bar-data',
    'particular',
    'particular-value',
    'sectors',
    'departments',
]

const ADMIN_ONLY = [
    ...USER_ONLY,
]

const SUPER_ADMIN_ONLY = [
    ...ADMIN_ONLY,
    'users',
    'roles',
    'permissions',
]

import { useLogoutAction } from 'src/hooks/useLogout.js';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function useIsPermitted({ roles = [], currentResource }) {
    const nav = useNavigate()
    const [permitted, setPermitted] = useState(false);
    useEffect(() => {
        if (roles.length === 0) {
            setPermitted(false)
        }

        let isPermitted = false;
        if (roles.includes('super-admin')) {
            isPermitted = true
        }

        if (roles.includes('admin') && ADMIN_ONLY.includes(currentResource)) {
            isPermitted = true
        }

        if (roles.includes('user') && USER_ONLY.includes(currentResource)) {
            isPermitted = true
        }

        if (!isPermitted && roles.length > 0) {
            nav('/403')
        }


    }, [roles, currentResource])

    return permitted
}