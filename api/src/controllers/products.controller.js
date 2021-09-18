import Product from "../models/Product";

export const createProduct = async (req, res) => {
    console.log(req.body)

    const {name, category, price, imageURL} = req.body

    const newProduct = new Product({
        name,
        category,
        price,
        imageURL
    });

    const productSaved = await newProduct.save();

    res.status(201).json(productSaved)
}

export const getProducts = async (req, res) => {
    const product = await Product.find();
    res.status(201).json(product)
}

export const getProductById = (req, res) => {

}

export const updateProductById = (req, res) => {

}

export const deleteProductById = (req, res) => {

}
