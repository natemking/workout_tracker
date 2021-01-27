//*** Dependencies ***//
//====================//
const express = require('express');
const path = require('path');
const logger = require('morgan');

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
app.use(logger('dev'));

//*** Routers ***//
//===============//
app.use('/', require(path.join(ROUTE_DIR, 'html-routes.js')));
app.use('/api', require(path.join(ROUTE_DIR, 'api-routes.js')));

//*** Listener ***//
//================//
app.listen(PORT, () => console.log(`Server listening on PORT:${PORT}`));

