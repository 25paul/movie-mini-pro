// 云函数入口文件
const cloud = require('wx-server-sdk')

var rp = require('request-promise');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return rp(`http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}`)
    .then(function (res) {
        return res
    })
    .catch(function (err) {
        return err
    });
}