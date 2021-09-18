import express from 'express'
import morgan from 'morgan'
import productRoutes from './routes/products.routes'

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        author: "David",
        description: "",
        version: "1.0.0"
    });
})
app.use('/products',productRoutes)
export default app;
