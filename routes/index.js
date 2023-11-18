const express = require('express');
const router = express.Router();
const multer = require("multer");

const homeController= require('../controllers/homeController');
const fileController = require('../controllers/fileController');
const upload = multer({ dest: 'uploads/'})

router.get('/',homeController.home);
router.get('/csv/:id',fileController.viewCSV);
router.post('/upload-csv',upload.single('csv'),fileController.uploadCSV);

module.exports=router; 