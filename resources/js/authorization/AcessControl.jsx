import React from 'react'
import { usePage } from '@inertiajs/inertia-react'

export function AcessControl({ abilities, children }) { 
    const { auth } = usePage().props
    const { permissions, roles } = auth?.user
    if (roles.includes('Super Admin')) {
        return <div> {children}</div>;
    }
    if (!roles.includes('Super Admin')) {
        for (const ability of abilities) {
            if (permissions.some((permision, i) => permision === ability)) {
                return <div> {children}</div>;
            }
        }

    }

}

export function AccessByRole({ requiredRoles, children }){
    const { auth } = usePage().props
    const { roles } = auth?.user
    for (const requiredrole of requiredRoles) {
        if (roles.some((role, i) => role === requiredrole)) {
            return <div> {children}</div>;
        }
    }
}
