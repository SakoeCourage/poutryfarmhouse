import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from '@inertiajs/inertia-react'
import Sidebaritem from "./Sidebaritem";
import { usePage } from "@inertiajs/inertia-react";
import { AccessByRole,AccessByPermission } from "../authorization/AcessControl";
import { sidebarRoutes } from "./SidebarRoutes";
import SimpleBar from "simplebar-react";

function Sidebarlink(props) {
    const { url } = usePage()
    return <Link href={props.link}
        className={url === props.link ? 'inline-flex text-sm py-1   pl-7 relative text-indigo-400 w-full gap-2 items-center' : 'inline-flex text-sm py-1 text-white  pl-7 w-full gap-2 items-center'} >
        <FontAwesomeIcon icon={props.icon} />
        <span className="text-sm">{props.title}</span>
    </Link>
}
export default function Sidebar() {
    const { url, component } = usePage()
    const getAllRequiredAbilitiesPerRoute = (route) =>{
            let currentAbilities = [];
            if(route.hasOwnProperty('abilities')){
                currentAbilities = [...currentAbilities,...route.abilities]
            }
            if(route.hasOwnProperty('links')){
                for(const {abilities} of route.links){
                    currentAbilities = [...currentAbilities,...abilities]
                }
            }
            return currentAbilities;
    }
    return (
        <SimpleBar className="bg-[#0E121F]/90 h-screen text-gray-100  w-full">
            <ul className="w-full flex flex-col gap-3">
                <nav className="h-14 sticky top-0 w-full backdrop-blur-lg backdrop-opacity-100 text-white">
                    <h1 className="text-4xl font-bold flex flex-col justify-start items-start px-5 mb-1 space-x-3">
                        <span>Poultry</span>
                        <span className='text-sm block text-center'>Farm House</span>
                    </h1></nav>
                {sidebarRoutes.map((route, i) => <AccessByPermission key={i} abilities={getAllRequiredAbilitiesPerRoute(route)}>
                <li className="w-full"  >
                    {!route.links ?
                        <Sidebarlink title={route.title} link={route.link} icon={route.icon} /> :
                        <Sidebaritem title={route.title} icon={route.icon} links={route.links} />
                    }
                </li>
                </AccessByPermission>
                )}
            </ul>

        </SimpleBar>
    );
}
