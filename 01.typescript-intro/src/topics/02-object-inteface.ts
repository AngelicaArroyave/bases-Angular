// let skills = ['Bash', 'Counter', 'Healing', true, 123] // let skills: (string | number | boolean)[]

// Para forzar al arreglo que sea completamente de strings:
const skills: string[] = ['Bash', 'Counter', 'Healing']

interface Character {
    name: string
    hp: number
    skills: string[]
    hometown?: string // El símbolo ? indica que este valor es opcional, también se podría colocar como hometown: string | undefined
}

const strider: Character = {
    name: 'Strider',
    hp: 100,
    skills: ['Bash', 'Counter']
}

strider.hometown = 'Rivendell'
console.table(strider)

export {}