const express = require('express');
require('dotenv').config();
const serverConfig = require('./configs/serverConfig');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const categoryRouter = require('./routes/categoryRouter');
const newsRouter = require('./routes/newsRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');

const app = express();

serverConfig(app);

app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/status', userRouter);
app.use('/api/order', orderRouter);
app.use('/api/users', userRouter);
app.use('/api/news', newsRouter);
app.use('/api/cart', cartRouter);

// =======================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server has started on port, ${PORT}`);
});

module.exports = app;
