// Forma 1
// export class Person {
//     public name: string
//     public address: string

//     constructor(name: string, address: string) {
//         this.name = name
//         this.address = address
//     }
// }

// Forma 2
export class Person {

    constructor(
        public name: string,
        public address: string = 'No address'
    ) {}
}

// export class Hero extends Person {
//     constructor(
//         public alterEgo: string,
//         public age: number,
//         public realName: string
//     ) {
//         super(realName, 'New York')
//     }
// }

// const ironman = new Person('Fernando', 'New York')
// console.log(ironman);
// const ironman2 = new Person('Fernando')
// console.log(ironman2);

// const { name, address } = new Person('Fernando', 'New York')
// console.log(name, address);

// const hero = new Hero('Superman', 40, 'Kal-El')
// console.log(hero);

// Forma 1 de instanciar clases
export class Hero {
    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person // Forma 2
    ) {}
}

const person = new Person('Tony Stark', 'New York')
const hero = new Hero('Ironman', 40, 'Tony', person)
console.log(hero);