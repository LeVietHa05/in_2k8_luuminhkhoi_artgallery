const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

require('dotenv').config();
const PORT  = process.env.PORT
if (!PORT) {
    console.error('PORT is not defined in .env file');
    process.exit(1);
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get("/paintingData", async (req, res) => {
    let paintingData = fs.readFileSync('./paintingData.json');
    res.json(JSON.parse(paintingData));
})

let soldPainting = [];

app.post("/", async (req, res, next) => {
    console.log(req.body);

    if (!req.body.name || !req.body.email || !req.body.phone || !req.body.paintingID) {
        return res.json({ mess: 'Vui lòng nhập đầy đủ thông tin', status: 'error' });
    }

    if (!parseInt(req.body.price)) {
        return res.json({ mess: 'Giá không hợp lệ. Ví dụ hợp lệ: 5000000', status: 'error' });
    }

    let paintingData = fs.readFileSync('./paintingData.json');
    paintingData = JSON.parse(paintingData);
    let painting = paintingData[req.body.paintingID - 1];
    //check if painting is bought
    if (painting.info.isBought) {
        return res.json({ mess: 'Bức tranh đã bán cho người khác. Rất xin lỗi bạn. Bạn vui lòng tải lại trang để cập nhật thông tin mới nhất nhé', status: 'error' });
    }
    //check if price is lower than the current price
    if (+req.body.price < +painting.info.price) {
        return res.json({ mess: 'Giá bạn đưa ra không hợp lý', status: 'error' });
    }
    //update bought status
    paintingData[req.body.paintingID - 1].info.isBought = true;
    fs.writeFileSync('./paintingData.json', JSON.stringify(paintingData));

    res.json({ test: "oke" })
})

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})
