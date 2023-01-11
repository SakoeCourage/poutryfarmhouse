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
        abilities: 'edit shed'

    }]
},
    {
    title: "Flock management",
    icon: "list-check",
    Role: ['Super Admin','admin', 'data entry operator'],
    links: [
 
    {
        title: 'flocks',
        link: '/flock/all',
        abilities: 'create flock'
    },
    {
        title: 'flock control data',
        link: '/flock/control/data',
        abilities: 'edit flock control'
    },
    {
        title: 'compare flock',
        link: '/flock/compare',
        abilities: 'compare flock'
    }
    ],
},
{
    title: "Stock management",
    icon: "arrow-trend-up",
    Role: ['Super Admin','admin', 'data entry operator'],
    links: [{
        title: 'tabular view',
        link: '/stock/all',
        abilities: 'edit stock'

    },
    {
        title: 'manage stock',
        link: '/stock/add',
        abilities: 'create stock'
    }]
},
{   title: "Sale management",
    Role: ['Super Admin','admin'],
    icon: "tags",
    links: [{
            title: 'generate invoice',
            link: '/salemanagement/newsale',
            abilities: 'create user'
    },
    {
        title: 'make payment',
        link: '/invoice/all',
        abilities: 'create user'
    },
    {
        title: 'payments history',
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
        title: 'tabular',
        link: '/report/tabular'
    },
    {
        title: 'grapical',
        link: '/report/graphical'
    }]
},
{   title: "User management",
    Role: ['Super Admin'],
    icon: "user-group",
    links: [{
        title: ' create user',
        link: '/user/create',
        abilities: 'create user'
    },
    {
        title: 'users',
        link: '/user/all',
        abilities: 'delete user'
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

