import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from '@inertiajs/inertia-react'
import Sidebaritem from "./Sidebaritem";
import { usePage } from "@inertiajs/inertia-react";
import { AccessByRole } from "../authorization/AcessControl";
import { sidebarRoutes } from "./SidebarRoutes";

export default function Sidebar() {
    const { url, component } = usePage()
    return (
        <div className="bg-[#0E121F]/90 h-screen text-gray-100 pt-5 w-full  ">
         <ul className="w-full flex flex-col gap-5">
         <Link href="/"
          className={ url === '/' ? 'flex items-center gap-3 px-6 text-indigo-400' : 'flex items-center gap-3 px-6'}
            >
                <FontAwesomeIcon icon="grip" />
                <span className="text-sm"> Dashboard</span>
            </Link>
            {sidebarRoutes.map((route,i) => <AccessByRole key={i} requiredRoles={route.Role}>

            <li className="w-full"  >
                <Sidebaritem title={route.title} icon={route.icon} links={route.links}/>
            </li>        
            </AccessByRole>
            )}
        </ul>   
           
        </div>
    );
}
