import { Product, taxCalculator } from "./06-function-destructuring";

const shoppingCart: Product[] = [
    {
        description: 'Samsung',
        price: 200
    },
    {
        description: 'iPhone',
        price: 300
    }
]

const tax = 0.15
const [totalPrice, totalWithTax] = taxCalculator({
    products: shoppingCart,
    tax
})

console.log(`Cálculo de total de los productos: ${totalPrice} y con impuestos: ${totalWithTax}`);