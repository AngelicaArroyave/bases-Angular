// let name = 'Strider' // let name: string
// const name = "Strider" // const name: "Strider"
const name: string = "Strider" // const name: string
let hpPoints: number | string = 95 // Acepta valores con números o cadenas
hpPoints = 'FULL'
const isAlive: boolean = true

console.log({ name, hpPoints, isAlive });


// Para definir este archivo como un módulo se agrega:
export {}