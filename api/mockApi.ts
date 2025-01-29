export interface Home {
    id: string
    address: string
    description: string
    image: string
    latitude: number
    longitude: number
}

export const fetchHomes = async (): Promise<Home[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: '1',
                    address: '1234 Golf Course Road, DLF Phase 5, Gurgaon, Haryana',
                    description: 'A luxurious 3-bedroom apartment with a stunning view of the golf course.',
                    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
                    latitude: 26.9071124,
                    longitude: 80.9698179,
                },
                {
                    id: '2',
                    address: '567 Sector 56, Gurgaon, Haryana',
                    description: 'A spacious 4-bedroom villa with a private garden.',
                    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
                    latitude: 28.4567,
                    longitude: 77.0726,
                },
                {
                    id: '3',
                    address: '8901 Sector 89, Faridabad, Haryana',
                    description: 'A cozy 2-bedroom apartment in a quiet neighborhood.',
                    image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600',
                    latitude: 28.4022,
                    longitude: 77.3132,
                },
            ])
        }, 1000)
    })
}
