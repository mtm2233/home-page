/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-17 11:19:17
 * @LastEditTime: 2021-04-17 11:37:14
 * @LastEditors: mTm
 */
const path = require("path");

const Jimp = require('jimp')
const mkdirsSync = require('../units/mkdirsSync')

const Multer = require("koa-multer");

const { FILE_PATH } = require("../constants/file-path");

const articleFileStorage = Multer.diskStorage({
    destination(req, file, cb) {
      const [y, m, d] = new Date(Number(new Date()) + (8 * 3600 * 1000))
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '')
        .slice(0, 10).split('-');
      const PATH_TIME = path.join(FILE_PATH, y, m, d);
      mkdirsSync(PATH_TIME)
      cb(null, PATH_TIME);
    },
    filename(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const articleFileUpload = Multer({
    storage: articleFileStorage
  });
  
  const fileHandler = articleFileUpload.array('files')
  
  const imagesResize = async (ctx,next) => {
    // 1.获取所有的图像信息
    let files = ctx.req.files;
    files = files.filter(v => ['image/png', 'image/jpeg'].includes(v.mimetype))
    
    // 2.对图像进行处理(sharp/jimp)
    for (let file of files) {
      const extname = path.extname(file.filename)
      const destPath = path.join(file.destination, file.filename).replace(extname, '');
  
      Jimp.read(file.path).then(image => {
        image.resize(1280, Jimp.AUTO).write(`${destPath}-large${extname}`);
        image.resize(640, Jimp.AUTO).write(`${destPath}-middle${extname}`);
        image.resize(320, Jimp.AUTO).write(`${destPath}-small${extname}`);
      });
    }
  
  
    await next();
  }
  
  module.exports = {
    fileHandler,
    imagesResize,
  };