const express = require('express');
const dotenv = require('dotenv').config()
const contactRoute = require('./routes/contactRoute');
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const app = express();

connectDb();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/contact',contactRoute);
app.use('/api/user',userRoute);
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})