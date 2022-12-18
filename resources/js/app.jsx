import React from 'react'
import ReactDOM from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import Layout from './Pages/Layout'
import 'simplebar-react/dist/simplebar.min.css';
import '../css/native.css'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { faGrip,faMagnifyingGlass, faCaretUp,faCaretDown, faKiwiBird,faWarning, faLayerGroup, faPen, faClose, faTimes, faCheck, faArrowRight, faShop, faRightFromBracket, faCalendarDay, faListCheck, faAngleDown, faArrowTrendUp, faTent, faFileLines, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faGrip,faMagnifyingGlass, faCaretUp,faCaretDown, faKiwiBird,faWarning, faLayerGroup, faPen, faClose, faTimes, faCheck, faArrowRight, faListCheck, faShop, faRightFromBracket, faCalendarDay, faAngleDown, faArrowTrendUp, faTent, faFileLines, faUserGroup)

InertiaProgress.init({
    
    color: '#3730a3',
    showSpinner: false,
    
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