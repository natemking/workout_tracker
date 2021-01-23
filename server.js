//*** Dependencies ***//
//====================//
const express = require('express');
const path = require('path');

//*** Directories ***//
//===================//
const PUBLIC_DIR = path.resolve(__dirname, './public');
const ROUTE_DIR = path.resolve(__dirname, './routes');
const htmlRoutes = path.join(ROUTE_DIR, './html-routes.js');
const apiRoutes = path.join(ROUTE_DIR, './api-routes.js')

//*** Express app ***//
//===================//
const app = express();
const PORT = process.env.PORT || 3000;

//*** Express Router ***//
//======================//
const router = express.Router();

//*** Middleware ***//
//==================// 
app.use(express.static(PUBLIC_DIR));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//*** Routing ***//
//===============//
require(htmlRoutes)(router);
require(apiRoutes)(router);

//*** Listener ***//
//================//
app.listen(PORT, () => console.log(`Server listening on PORT:${PORT}`));