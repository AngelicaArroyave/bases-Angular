// export function whatsMyType(argument: any): any { // No es recomendable usar 'any'
export function whatsMyType<T>(argument: T): T { // No es recomendable usar 'any'
    return argument
}

let amIString = whatsMyType<string>('Hi world!')
console.log(amIString.split(' ')); // ['Hi', 'world!']

let amINumber = whatsMyType<number>(2000)
console.log(amINumber.toFixed());

let amIArray = whatsMyType<number[]>([1, 2, 3, 4, 5])
console.log(amIArray.join('-'));