import React from 'react'
import ReactDOM from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import Layout from './Pages/Layout'
import 'simplebar-react/dist/simplebar.min.css';
import '../css/native.css'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { faGrip,faCartShopping, faMagnifyingGlass,faPrint, faUser, faGear,faCreditCardAlt, faQuestionCircle,faPlus,faMinus,faList, faFloppyDisk,faTags,faTag, faTrash ,faPlusCircle, faCaretUp,faCaretDown,faHistory,faPenToSquare, faBars, faCaretRight, faKiwiBird,faWarning, faLayerGroup, faPen,faCircle,faUserPlus, faClose, faTimes,faCircleCheck,faCheckDouble, faCheck,faEye, faArrowRight, faShop, faRightFromBracket, faCalendarDay, faListCheck, faAngleDown, faArrowTrendUp, faTent, faFileLines, faUserGroup,faClock,faBowlFood,faArrowUp,faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faGrip,faCartShopping, faMagnifyingGlass,faPrint, faUser, faGear,faCreditCardAlt, faQuestionCircle,faPlus,faMinus,faList, faFloppyDisk,faTags,faTag, faTrash ,faPlusCircle, faCaretUp,faCaretDown,faHistory,faPenToSquare, faBars, faCaretRight, faKiwiBird,faWarning, faLayerGroup, faPen,faCircle,faUserPlus, faClose, faTimes,faCircleCheck,faCheckDouble, faCheck,faEye, faArrowRight, faListCheck, faShop, faRightFromBracket, faCalendarDay, faAngleDown, faArrowTrendUp, faTent, faFileLines, faUserGroup,faClock,faBowlFood,faArrowUp,faArrowDown)

InertiaProgress.init({
    color: '#3730a3',
    showSpinner: true,
    
})
const app = document.getElementById('app');
const root = ReactDOM.createRoot(app);

createInertiaApp({
    resolve:(name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))
    .then((module) => {
        let exceptLayout = ['Login']
        const page = module.default
        if(!exceptLayout.includes(name))
        {page.layout = page => <Layout children={page} /> 
        }
        return page;
    }),

    setup({App, props }) {
        root.render(<App {...props}/>)
    },
})