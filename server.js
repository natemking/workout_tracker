//*** Dependencies ***//
//====================//
const express = require('express');
const path = require('path');

//*** Directories ***//
//===================//
const PUBLIC_DIR = path.resolve(__dirname, './public');
const ROUTE_DIR = path.resolve(__dirname, './routers');

//*** Express app ***//
//===================//
const app = express();
const PORT = process.env.PORT || 3000;

//*** Middleware ***//
//==================// 
app.use(express.static(PUBLIC_DIR));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//*** Routers ***//
//===============//
app.use('/', require(`${ROUTE_DIR}/html.js`));
app.use('/api', require(`${ROUTE_DIR}/api.js`));

//*** Listener ***//
//================//
app.listen(PORT, () => console.log(`Server listening on PORT:${PORT}`));

