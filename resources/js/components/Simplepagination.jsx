import React from 'react'
import { Link } from '@inertiajs/inertia-react'
export default function Simplepagination(props) {
  return (
    <div className="flex flex-col px-10 py-10 items-start   ">
    <span className="text-sm text-gray-700 ">
        Showing <span className="font-semibold text-gray-900 ">
        {props.from ?? 0}
        </span> to <span className="font-semibold text-gray-900 ">{props.to ?? 0}</span> of <span className="font-semibold text-gray-900 ">{props.total}</span> Entries
    </span>
    <div className="inline-flex mt-2 xs:mt-0">
        {props.prev_page_url && <Link as='button' only={[props.only ?? null]} href={props.prev_page_url} className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 ">
            Prev
        </Link>}
        {props.next_page_url &&
        <Link as='button' only={[props.only ?? null]} href={props.next_page_url} className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 ">
            Next
        </Link>}
    </div>
</div>
  )
}
