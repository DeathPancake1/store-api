import { Router, Response, Request } from 'express';
import ProductsStore from '../models/products';
import { Product } from '../interfaces/product';
import { authToken } from '../../authenticator';

export const ProductController: Router = Router()
const product: ProductsStore = new ProductsStore()

ProductController.get('/', async (req : Request, res : Response) => {
    const products: Product[] = await product.index()
    return res.json(products)
})

ProductController.get('/:id', async (req : Request, res : Response) => {
    const productID = parseInt(req.params.id)
    const retProduct: Product = await product.getProduct(productID)
    return res.json(retProduct)
})

ProductController.post('/', authToken, async (req : Request, res : Response) => {
    const createdProduct: Product = await product.createProduct(req.body)
    return res.json(createdProduct)
})

ProductController.delete('/:id', authToken, async (req : Request, res : Response) => {
    const productID: number = parseInt(req.params.id)
    const deletedProduct: Product = await product.deleteProduct(productID)
    return res.json(deletedProduct)
})