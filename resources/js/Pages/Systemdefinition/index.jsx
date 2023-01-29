import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useState} from 'react'
import Productdefinition from './Productdefinition';
import Discountdefinition from './Discountdefinition';
import Userdefinition from './Userdefinition';
import FeedDefinition from './FeedDefinition';
import BreedDefinition from './BreedDefinition';
import RolesAndPermissions from './RolesAndPermissions';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab
} from "@material-tailwind/react";

function Tablist() {
  const [currentValue,setCurrentValue]= useState('rp');
  const data = [
    {
      label: "Product Definition",
      value: "pd",
      comp: <Productdefinition/>
    },
    {
      label: "Feed Definition",
      value: "fd",
      comp: <FeedDefinition/>
    },
    {
      label: "Breed Definition",
      value: "bd",
      comp: <BreedDefinition/>
    },
    {
      label: "Roles and Permissions",
      value: "rp",
      comp: <RolesAndPermissions />
    }
  ];

  return (
    <Tabs value="rp" className="">
      <TabsHeader  className="bg-gray-200/30 text-sm isolate ">
        {data.map(({ label, value }) => (
          <Tab className='text-sm ' onClick={()=>setCurrentValue(value)} key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, comp }) => (
          <div className='mx-2 pt-4' key={value}>
              {currentValue == value && comp}
          </div>
        ))}
      </TabsBody>
    </Tabs>
  );
}


export default function index() {

  return (
    <div className='container mx-auto'>
      <header className='flex items-center justify-start mt-5'>
        <nav className='flex items-center gap-2'>
          <FontAwesomeIcon className='p-2 bg-gray-600 text-white rounded-full h-4 w-4' icon="gear" />
          <span className='text-2xl font-semibold tracking-normal text-gray-600 flex flex-col' >
            <span>Settings</span>
            <span className=' text-xs font-normal text-gray-500'>define and edit system data</span>
          </span>
        </nav>
      </header>
      <div className='mt-5'>
        <Tablist className="w-full" />
      </div>
    </div>
  )
}
