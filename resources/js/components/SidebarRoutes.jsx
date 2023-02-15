export let sidebarRoutes =
[
    {
        title: 'Dashboard',
        icon: 'grip',
        link: '/',
        Role: ['Super Admin'],
        abilities: ['view dashboard']
    },
    {
        title: 'Expense',
        icon: 'credit-card-alt',
        link: '/expenses',
        Role: ['Super Admin'],
        abilities: ['create expense','authorize expense']
    },
    
{
    title: "Pen management",
    icon: "shop",
    Role: ['Super Admin'],
    links: [{
        title: 'Pens',
        link: '/pen/all',
        abilities: ['create pen','edit pen','delete pen']

    }]
},
    {
    title: "Flock management",
    icon: "list-check",
    Role: ['Super Admin'],
    links: [
 
    {
        title: 'Flocks',
        link: '/flock/all',
        abilities: ['create flock','edit flock','delete flock']
    },
    {
        title: 'Flock control data',
        link: '/flock/control/data',
        only: ['controldata'],
        abilities: ['create flock control','edit flock control','delete flock control']
    },
    {
        title: 'Compare flock',
        link: '/flock/compare',
        abilities: ['compare flock']
    },
    {
        title: 'Grading',
        link: '/flock/products/grade?filter=ungraded',
        abilities:['grade flock control data']
    }
    ],
},
{
    title: "Stock management",
    icon: "arrow-trend-up",
    Role: ['Super Admin'],
    links: [{
        title: 'Daily overview',
        link: '/stock/daily',
        abilities: ['create stock data']

    },
    {
        title: 'Manage stock',
        link: '/stock/add',
        abilities: ['create stock data','manage stock data','delete stock data']
    }]
},
{   title: "Sale management",
    Role: ['Super Admin'],
    icon: "bag-shopping",
    links: [{
            title: 'Product orders',
            link: '/salemanagement/newsale',
            abilities: ['generate product order']
    },
    {
        title: 'Make payment',
        link: '/invoice/all/?filter=unpaid',
        abilities: ['process payments']
    },
    {
        title: 'Payments history',
        link: '/payments/all',
        abilities: ['process payments']
    }
]
},
{
    title: "Report",
    icon: "file-lines",
    Role: ['Super Admin'],
    links: [{
        title: 'new report',
        link: '/report/new',
        abilities: ['generate report']
    },
   ]
},
{   title: "User management",
    Role: ['Super Admin'],
    icon: "user-group",
    links: [
        {
            title: 'All users',
            link: '/user/all',
            abilities: ['create user','delete user','edit user']
        },
        {
        title: ' Onboard a user',
        link: '/user/create',
        abilities: ['create user']
    },
 
    
]
},
{
    title: 'System definition',
    icon: 'gear',
    link: '/system/definitions',
    Role: ['Super Admin'],
    abilities:['define system data']
},

];

