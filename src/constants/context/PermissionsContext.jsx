import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';

const PermissionsContext = createContext();

export const usePermissions = () => useContext(PermissionsContext);

export const PermissionsProvider = ({ children }) => {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const userRole = localStorage.getItem('userRole');

    const fetchPermissions = async () => {
        try {
            const res = await API.get("/api/rbac/my-permissions");
            if (res.data.success) {
                setPermissions(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch permissions", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            fetchPermissions();
        } else {
            setLoading(false);
        }
    }, []);

    const hasPermission = (moduleName, action) => {
        const currentUserRole = localStorage.getItem('userRole');
        if (currentUserRole === 'admin') return true;
        const perm = permissions.find(p => p.moduleName === moduleName);
        if (!perm) return false;

        switch (action) {
            case 'create': return perm.can_create;
            case 'read': return perm.can_read;
            case 'update': return perm.can_update;
            case 'delete': return perm.can_delete;
            default: return false;
        }
    };

    return (
        <PermissionsContext.Provider value={{ permissions, loading, hasPermission, refreshPermissions: fetchPermissions }}>
            {children}
        </PermissionsContext.Provider>
    );
};
