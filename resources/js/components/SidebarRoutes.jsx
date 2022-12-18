export let sidebarRoutes =
[{
    title: "Flock management",
    icon: "list-check",
    Role: ['Super Admin','Admin', 'data entry operator'],
    links: [{
        title: 'new flock',
        link: '/flock/create',
        abilities: 'create flock'

    },
    {
        title: 'compare flock',
        link: '/flock/compare',
        abilities: 'compare flock'
    },
    {
        title: 'flock control',
        link: '/flock/control',
        abilities: 'create flock control'
    },
    {
        title: 'flock control data',
        link: '/flock/control/data',
        abilities: 'edit flock control'
    },
    ],
},
{
    title: "Stock management",
    icon: "arrow-trend-up",
    Role: ['Super Admin','Admin', 'data entry operator'],
    links: [{
        title: 'all stock',
        link: '/stock/all',
        abilities: 'edit stock'

    },
    {
        title: 'new stock',
        link: '/stock/add',
        abilities: 'create stock'
    }]
},
{
    title: "Shed management",
    icon: "shop",
    Role: ['Super Admin','Admin'],
    links: [{
        title: 'all shed',
        link: '/shed/all',
        abilities: 'edit shed'

    },
    {
        title: 'new shed',
        link: '/shed/create',
        abilities: 'create shed'

    }]
},
{
    title: "Report",
    icon: "file-lines",
    Role: ['Super Admin','Admin', 'data entry operator'],
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
        title: 'add new user',
        link: '/user/create',
        abilities: 'create user'
    },
    {
        title: 'all users',
        link: '/user/all',
        abilities: 'delete user'
    }
]
}
];

