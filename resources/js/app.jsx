import React from 'react'
import ReactDOM from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import Layout from './Pages/Layout'
import 'simplebar-react/dist/simplebar.min.css';
import { Inertia } from '@inertiajs/inertia'
import '../css/native.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { faGrip,faBell, faBagShopping, faChevronRight,faUsers, faMoneyCheckDollar, faPaperPlane, faChevronLeft, faCartShopping, faMagnifyingGlass,faPrint, faUser, faGear,faCreditCardAlt, faQuestionCircle,faPlus,faMinus,faList, faFloppyDisk,faTags,faTag, faTrash ,faPlusCircle, faCaretUp,faCaretDown,faHistory,faPenToSquare, faBars, faCaretRight, faKiwiBird,faWarning, faLayerGroup, faPen,faCircle,faUserPlus, faClose, faTimes,faCircleCheck,faCheckDouble, faCheck,faEye, faArrowRight, faShop, faRightFromBracket, faCalendarDay, faListCheck, faAngleDown, faArrowTrendUp, faTent, faFileLines, faUserGroup,faClock,faBowlFood,faArrowUp,faArrowDown,faCircleArrowUp,faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faGrip,faBell, faBagShopping, faChevronRight,faUsers, faMoneyCheckDollar, faPaperPlane, faChevronLeft, faCartShopping, faMagnifyingGlass,faPrint, faUser, faGear,faCreditCardAlt, faQuestionCircle,faPlus,faMinus,faList, faFloppyDisk,faTags,faTag, faTrash ,faPlusCircle, faCaretUp,faCaretDown,faHistory,faPenToSquare, faBars, faCaretRight, faKiwiBird,faWarning, faLayerGroup, faPen,faCircle,faUserPlus, faClose, faTimes,faCircleCheck,faCheckDouble, faCheck,faEye, faArrowRight, faListCheck, faShop, faRightFromBracket, faCalendarDay, faAngleDown, faArrowTrendUp, faTent, faFileLines, faUserGroup,faClock,faBowlFood,faArrowUp,faArrowDown,faCircleArrowUp,faUpRightAndDownLeftFromCenter)


NProgress.configure({ easing: 'ease', speed: 800,trickle: true,trickleSpeed: 200  });
Inertia.on('start', () => NProgress.set(0.6))
Inertia.on('finish', () => NProgress.done())
Inertia.on('finish', (event) => {
    if (event.detail.visit.completed) {
        NProgress.done()
    } else if (event.detail.visit.interrupted) {
        NProgress.set(0.6)
    } else if (event.detail.visit.cancelled) {
        NProgress.done()
        NProgress.remove()
    }
})
Inertia.on('progress', (event) => {
    if (event.detail.progress.percentage) {
        NProgress.set((event.detail.progress.percentage / 100) * 0.9)
    }
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