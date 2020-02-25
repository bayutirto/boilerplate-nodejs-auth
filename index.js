const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

const port = process.env.PORT || 5000;

//connect db
mongoose.connect(process.env.DB_CONNECT,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    },
    () => console.log('Database Terhubung!')
);

//middleware
app.use(cors());
app.use(bodyParser.json());

//route middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});