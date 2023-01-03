import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Productdefinition from './Productdefinition';
import Discountdefinition from './Discountdefinition';
import Userdefinition from './Userdefinition';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

function Tablist() {
  const data = [
    {
      label: "product definition",
      value: "pd",
      desc: <Productdefinition/>
    },
    {
      label: "discount definition",
      value: "dd",
      desc: <Discountdefinition />
    },

    {
      label: "user definition",
      value: "ud",
      desc: <Userdefinition />
    }
  ];

  return (
    <Tabs value="pd" className="">
      <TabsHeader className="bg-gray-200/30 text-sm isolate ">
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
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
