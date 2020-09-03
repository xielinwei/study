const cheerio = require('cheerio');
const fs = require("fs");
const axios = require('axios');
const path = require('path')

let httpUrl = "https://www.doutula.com/article/list/?page=3";
axios.get(httpUrl).then((res) => {
  let $ = cheerio.load(res.data);
  $("#home .col-sm-9>a").each((i, item) => {
    let url = $(item).attr("href")
    let title = $(item).find(".random_title").text().slice(0, -10);
    fs.mkdir('./img/' + title, function(err,data){
      if(err){
        console.log(err)
      }
    })
    parsePage(url,title)
  })
})

async function parsePage(url, title) {
  let res = await axios.get(url);
  let $ = cheerio.load(res.data);
  $(".pic-content img").each((i, item) => {
    let imgUrl = $(item).attr("src");
    writeImg(imgUrl, title, i)
  })
}

async function writeImg(url, title, i) {
  let extName = path.parse(url).ext;
  let ws = fs.createWriteStream(`img/${title}/${title}-${i}${extName}`)
  axios.get(url,{responseType: 'stream'}).then((res)=>{
    res.data.pipe(ws);
    console.log("写入完成")
    res.data.on('close', function(){
      ws.close()
    })
  })

}