const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let selectedQrCodes = new Set(); // Use a set to keep track of selected QR codes

const startNumber = 199;
const endNumber = 699;
const totalQrCodes = endNumber - startNumber + 1;

app.get('/available-qr-codes', (req, res) => {
    // Generate an array of QR codes from 199 to 699 and filter out the selected ones
    const availableQrCodes = Array.from({ length: totalQrCodes }, (_, i) => startNumber + i)
                                  .filter(num => !selectedQrCodes.has(num));
    res.json(availableQrCodes);
});

app.post('/select-qr-code', (req, res) => {
    const { number } = req.body;
    // Check if the number is within the valid range and hasn't been selected yet
    if (number && number >= startNumber && number <= endNumber && !selectedQrCodes.has(number)) {
        selectedQrCodes.add(number);
        res.json({ message: 'QR code selected successfully.' });
    } else {
        res.status(400).json({ message: 'QR code already selected or invalid.' });
    }
});

// New route to reset selected QR codes
app.post('/reset-qr-codes', (req, res) => {
    selectedQrCodes.clear();
    res.json({ message: 'All QR codes have been reset.' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
