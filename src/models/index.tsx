export interface Product {
    id: number
    name: string
    price: number
    image: string
    freeDelivery: boolean
}

export interface ProductList {
    productList: Product[]
}