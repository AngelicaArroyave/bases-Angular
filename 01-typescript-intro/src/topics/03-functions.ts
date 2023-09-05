// Función normal
function addNumbers(number1: number, number2: number): number {
    return number1 + number2
}

const total: number = addNumbers(4, 6)
console.log(total);

// Función de flecha
const addNumbersArrow = (number1: number, number2: number): string => `${number1 + number2}`
const totalArrow: string = addNumbersArrow(1, 9) // Si se desea dejar el retorno como un número se quitan los template
console.log(totalArrow);

// Argumentos opcionales y opcionales con valores por defecto
function multiply(number1: number, number2?: number, base: number = 2) {
    return number1 * base
}

const totalMultply: number = multiply(5)
console.log(totalMultply);

// Funciones con objetos como argumentos
interface Character {
    name: string
    hp: number
    showHp: () => void
}

const healCharacter = (character: Character, amount: number) => {
    character.hp += amount
}

const strider: Character = {
    name: 'Strider',
    hp: 50,
    showHp() {
        console.log(`Puntos de vida ${this.hp}`);
    }
}

strider.showHp()
healCharacter(strider, 20)
strider.showHp()

export {}