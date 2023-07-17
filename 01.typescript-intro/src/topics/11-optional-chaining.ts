export interface Passenger {
    name: string
    children?: string[]
}

const passenger1: Passenger = {
    name: 'Angelica'
}

const passenger2: Passenger = {
    name: 'Diana',
    children: [ 'Andrea', 'Carlos' ]
}

const printChildren = (passenger: Passenger): number => {
    const howManyChildren = passenger.children?.length || 0 // Optional chaining

    console.log(passenger.name, howManyChildren);

    return howManyChildren
}

printChildren(passenger1) // Angelica 0
printChildren(passenger2) // Diana 2