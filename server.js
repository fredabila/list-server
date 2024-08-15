const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let selectedQrCodes = new Set(); // Use a set to keep track of selected QR codes

app.get('/available-qr-codes', (req, res) => {
    const availableQrCodes = Array.from({ length: 500 }, (_, i) => i + 1).filter(num => !selectedQrCodes.has(num));
    res.json(availableQrCodes);
});

app.post('/select-qr-code', (req, res) => {
    const { number } = req.body;
    if (number && !selectedQrCodes.has(number)) {
        selectedQrCodes.add(number);
        res.json({ message: 'QR code selected successfully.' });
    } else {
        res.status(400).json({ message: 'QR code already selected or invalid.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
