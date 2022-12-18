import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AcessControl } from "../authorization/AcessControl";
import { Link } from '@inertiajs/inertia-react'
import {useState,useMemo,useEffect,useRef}  from 'react'
import React from 'react'
import { usePage } from "@inertiajs/inertia-react";
export default function Sidebaritem(props) {
    const [isColapsed ,setisColapsed] = useState(false) 
    const [isIncurrentRoute ,setisIncurrentRoute] = useState(false) 
    // const location = useLocation()
    const { url, component } = usePage()
    let listitems = useRef(null)
    // useEffect(()=>{
    //    let checkisIncurrentRoute = Object.values(props.links).map((value)=>value.link).some(value => value == location.pathname)
    //    setisIncurrentRoute(checkisIncurrentRoute)  
    // //    setisColapsed(!checkisIncurrentRoute)                            
    // },[location.pathname])
    return (
        <div className="px-6 ">
            <nav className={`flex items-center justify-between cursor-pointer transition-all duration-200  ${isIncurrentRoute && 'text-indigo-400'} `} onClick={()=>setisColapsed(!isColapsed)}>
                <span className="flex items-center gap-3">
                <FontAwesomeIcon icon={props.icon} size='sm' />
                <span className=" sentence text-sm">{props.title}</span>
                </span>
                <FontAwesomeIcon icon='angle-down' size='sm' className={ ` transfrom transition-transform justify-self-end ml-3  ${!isColapsed && ' rotate-180'}`}  />
            </nav>
            <ul ref={listitems} className={`overflow-hidden transition-[height] duration-500 ${isColapsed ? 'h-0' : 'h-auto'}`}>
                {props.links.map((link, i) =>
                <AcessControl key={i} abilities={[link.abilities]}>
                    <li >
                        <Link
                            href={link.link}
                            className={url === link.link ? 'inline-block text-sm py-1 mt-1  pl-7  bg-gray-500/50 rounded-md w-full' : 'inline-block text-sm py-1 mt-1 pl-7 w-full'}
                        >
                            {link.title}
                        </Link>
                    </li>
                 </AcessControl>
                )}
            </ul>

        </div>
    );
}
