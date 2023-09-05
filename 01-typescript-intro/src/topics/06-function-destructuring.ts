export interface Product {
    description: string
    price: number
}

interface TaxCalculationOptions {
    tax: number
    products: Product[]
}

const phone: Product = {
    description: "Nokia A1",
    price: 150.0
}

const tablet: Product = {
    description: "iPad Air",
    price: 250.0
}

export function taxCalculator(options: TaxCalculationOptions): number[] {
    let total = 0
    const { tax, products } = options
    
    // products.forEach(product => total += product.price)
    products.forEach(product => {
        const { price } = product
        total += price
    })

    return [total, total * tax]
}

const shoppingCart = [phone, tablet]
const tax = 0.15

// const result = taxCalculator({
//     products: shoppingCart,
//     tax // Se usa cuando el nombre de del atributo es el mismo nombre de la variable
// })

// console.log(`Total ${result[0]}`);
// console.log(`Tax ${result[1]}`);

const [totalPrice, totalWithTax] = taxCalculator({
    products: shoppingCart,
    tax // Se usa cuando el nombre de del atributo es el mismo nombre de la variable
})

console.log(`Cálculo de total de los productos: ${totalPrice} y con impuestos: ${totalWithTax}`);