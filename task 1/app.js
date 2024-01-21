const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

let validatedData = [];

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).send('All fields are required');
    }

    const formData = {
        name,
        email,
        subject,
        message,
    };
    validatedData.push(formData);

    const responseMessage = `Submitted: Name - ${name}, Email - ${email}, Subject - ${subject}, Message - ${message}`;
    res.send(responseMessage);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
