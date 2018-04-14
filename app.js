const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const request = require('request');
const cheerio = require('cheerio')
const db = require('./db')

const Xe = require('./xe.class')
// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.set('views', './views')
app.set('view engine', 'ejs')
// app.set("view options", { layout: "mylayout.ejs" });

app.get('/', (req, res) => {
    // Hiển thị xe
    db.toyota.find({}, (err, docs) => {
        console.log(docs)
    })
    res.render('index', { layout: 'trangchu', arrXe: 3 })
})

app.get('/dong-xe', (req, res) => {
    // Hiển thị dong xe
    res.render('./index', { layout: 'dongxe', arrDongXe: arrDongXe })
})
app.get('/dong-xe/:name', (req, res) => {
    // Hiển thị xe
    const dong_xe_name = req.params.name
    db.find({ dong_xe: dong_xe_name }, (err, docs) => {
        console.log(docs)
    })
    res.render('xe', { layout: 'xe', arrXe: xe })
})
app.get('/xe', (req, res) => {
    db.toyota.find({}, (err, arrXe) => {
        console.log(arrXe)
        res.render('./index', { layout: 'dongxe', arrXe: arrXe })
    })
})
app.get('/xe/:url_xe', (req, res) => {
    // db.toyota.find({ url: req.params.url_xe }, (err, docs) => {
    //     console.log(docs)
    //     res.render('./index', { layout: 'chitiet', chitiet: docs[0] })
    // })
    request('http://www.toyota.com.vn/' + req.params.url_xe, (err, respoonse, body) => {
        if (err) {
            console.log('Loi: ' + err)
        } else {
            let data = {}
            const $ = cheerio.load(body)
            let list_color = $(body).find("div.list-color")
            console.log(list_color)
            let arrTabs = []
            let thong_so_ky_thuat = $(body).find("div.thong_so_ky_thuat")
            let tabs = $(thong_so_ky_thuat).find("li.tab a")

            let dong_co_khung_xe = $(thong_so_ky_thuat).find("div #tab_dt_2")
            let ngoai_that = $(thong_so_ky_thuat).find("div #tab_dt_3")
            let noi_that = $(thong_so_ky_thuat).find("div #tab_dt_4")
            let ghe = $(thong_so_ky_thuat).find("div #tab_dt_203")
            let tien_nghi = $(thong_so_ky_thuat).find("div #tab_dt_5")
            let an_ninh = $(thong_so_ky_thuat).find("div #tab_dt_8")
            let an_toan_chu_dong = $(thong_so_ky_thuat).find("div #tab_dt_6")
            let an_toan_bi_dong = $(thong_so_ky_thuat).find("div #tab_dt_7")
            arrTabs.push({ name: 'Động cơ & Khung xe', content: dong_co_khung_xe })
            arrTabs.push({ name: 'Ngoại thất', content: ngoai_that })
            arrTabs.push({ name: 'Nội thất', content: noi_that })
            arrTabs.push({ name: 'Ghế', content: ghe })
            arrTabs.push({ name: 'Tiện nghi', content: tien_nghi })
            arrTabs.push({ name: 'An ninh', content: an_ninh })
            arrTabs.push({ name: 'An toàn chủ động', content: an_toan_chu_dong })
            arrTabs.push({ name: 'An toàn bị động', content: an_toan_bi_dong })
            data.list_color = list_color
            data.thong_so_ky_thuat = arrTabs
            res.render('./index', { layout: 'chitiet', chitiet: data })
        }
    })
})
app.get('/addxe', (req, res) => {
    res.render('./index', { layout: 'addxe' })
})
app.post('/addxe', (req, res) => {
    let xe = new Xe()
    xe.name = req.body.name
    xe.url = generateUrl(xe.name)
    // Price
    xe.price = req.body.price
    // Color
    for (var i = 1; i < req.body.colorValue.length; i++) {
        xe.colors.push({ name: req.body.colorName[i], value: req.body.colorValue[i] })
    }
    // Dòng xe
    xe.dongxe_name = req.body.category
    xe.dongxe_url = generateUrl(xe.dongxe_name)
    xe.thumbnail = req.body.thumbnail
    xe.images = req.body.images.split('\r\n')
    xe.description.push({ nhienLieu: req.body.nhienLieu })
    xe.description.push({ kieuDang: req.body.kieuDang })
    xe.description.push({ xuatXu: req.body.xuatXu })
    console.log(xe)

    // db.toyota.insert(xe)
    res.redirect('/addxe')
})

app.get('/test', (req, res) => {
    request('http://www.toyota.com.vn/vios-1-5e-mt', (err, respoonse, body) => {
        if (err) {
            console.log('Loi: ' + err)
        } else {
            const $ = cheerio.load(body)
            let arrTabs = []
            let thong_so_ky_thuat = $(body).find("div.thong_so_ky_thuat")
            let tabs = $(thong_so_ky_thuat).find("li.tab a")

            let dong_co_khung_xe = $(thong_so_ky_thuat).find("div #tab_dt_2")
            let ngoai_that = $(thong_so_ky_thuat).find("div #tab_dt_3")
            let noi_that = $(thong_so_ky_thuat).find("div #tab_dt_4")
            let ghe = $(thong_so_ky_thuat).find("div #tab_dt_203")
            let tien_nghi = $(thong_so_ky_thuat).find("div #tab_dt_5")
            let an_ninh = $(thong_so_ky_thuat).find("div #tab_dt_8")
            let an_toan_chu_dong = $(thong_so_ky_thuat).find("div #tab_dt_6")
            let an_toan_bi_dong = $(thong_so_ky_thuat).find("div #tab_dt_7")
            arrTabs.push({ name: 'Động cơ & Khung xe', content: dong_co_khung_xe })
            arrTabs.push({ name: 'Ngoại thất', content: ngoai_that })
            arrTabs.push({ name: 'Nội thất', content: noi_that })
            arrTabs.push({ name: 'Ghế', content: ghe })
            arrTabs.push({ name: 'Tiện nghi', content: tien_nghi })
            arrTabs.push({ name: 'An ninh', content: an_ninh })
            arrTabs.push({ name: 'An toàn chủ động', content: an_toan_chu_dong })
            arrTabs.push({ name: 'An toàn bị động', content: an_toan_bi_dong })
            res.render('./index', { layout: 'chitiet', chitiet: arrTabs })
        }
    })
})

function generateUrl(name) {
    name = name.split(' ').join('-')
    name = name.replace('(', '')
    name = name.replace(')', '')
    name = name.replace('.', '-')
    return name.toLowerCase()
}


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('running ....')
})