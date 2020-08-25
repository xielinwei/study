const cheerio = require('cheerio');
const fs = require("fs");
const axios = require('axios');

let httpUrl = "https://www.doutula.com/article/list/?page=3";
axios.get(httpUrl).then((res)=>{
  console.log(res.data)
  let $ = cheerio.load(res.data)
})