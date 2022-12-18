export const data = [

    {
        name: 'flockone',
        data: [56.5, 82.1, 88.7, 70.1, 53.4, 85.1]

    }, {
        name: 'flocktwo',
        data: [51.1, 51.4, 55.1, 53.3, 73.8, 68.7]

    },
    {
        name: 'flockthree',
        data: [40.1, 62.2, 69.5, 36.4, 45.2, 32.5]

    },
    {
        name: 'flockfour',
        data: [25.2, 37.1, 41.2, 18, 33.9, 49.1]

    },
    {
        name: 'flockfive',
        data: [50, 17, 23, 20, 30, 15]

    },
    {
        name: 'flocksix',
        data: [10.5, 12.1, 50, 80, 10, 60]

    },

]

export function getData() {
    return new Promise((resolve) => {
        resolve(data);
    })

}