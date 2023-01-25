export let sidebarRoutes =
[
    {
        title: 'Dashboard',
        icon: 'grip',
        link: '/',
        Role: ['Super Admin','admin']
    },
    {
        title: 'Expense',
        icon: 'credit-card-alt',
        link: '/expenses',
        Role: ['Super Admin','admin']
    },
    
{
    title: "Pen management",
    icon: "shop",
    Role: ['Super Admin','admin'],
    links: [{
        title: 'pens',
        link: '/pen/all',
        abilities: 'edit pen'

    }]
},
    {
    title: "Flock management",
    icon: "list-check",
    Role: ['Super Admin','admin', 'data entry operator'],
    links: [
 
    {
        title: 'Flocks',
        link: '/flock/all',
        abilities: 'create flock'
    },
    {
        title: 'Flock control data',
        link: '/flock/control/data',
        abilities: 'edit flock control'
    },
    {
        title: 'Compare flock',
        link: '/flock/compare',
        abilities: 'compare flock'
    },
    {
        title: 'Grading',
        link: '/flock/products/grade?filter=ungraded',
        abilities: 'compare flock'
    }
    ],
},
{
    title: "Stock management",
    icon: "arrow-trend-up",
    Role: ['Super Admin','admin', 'data entry operator'],
    links: [{
        title: 'Daily overview',
        link: '/stock/all',
        abilities: 'edit stock'

    },
    {
        title: 'Manage stock',
        link: '/stock/add',
        abilities: 'create stock'
    }]
},
{   title: "Sale management",
    Role: ['Super Admin','admin'],
    icon: "tags",
    links: [{
            title: 'Product orders',
            link: '/salemanagement/newsale',
            abilities: 'create user'
    },
    {
        title: 'Make payment',
        link: '/invoice/all/?filter=unpaid',
        abilities: 'create user'
    },
    {
        title: 'Payments history',
        link: '/payments/all',
        abilities: 'delete user'
    }
]
},
{
    title: "Report",
    icon: "file-lines",
    Role: ['Super Admin','admin', 'data entry operator'],
    links: [{
        title: 'Tabular',
        link: '/report/tabular'
    },
    {
        title: 'Grapical',
        link: '/report/graphical'
    }]
},
{   title: "User management",
    Role: ['Super Admin'],
    icon: "user-group",
    links: [
        {
            title: 'All users',
            link: '/user/all',
            abilities: 'delete user'
        },
        {
        title: ' Onboard a user',
        link: '/user/create',
        abilities: 'create user'
    },
 
    
]
},
{
    title: 'System definition',
    icon: 'gear',
    link: '/system/definitions',
    Role: ['Super Admin','admin']
},

];

