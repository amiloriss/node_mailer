const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = 3001;

app.post('/api/form', (req, res) => {
  const data = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'tolpargepro@gmail.com',
      pass: 'LoveLife1997',
    },
  });

  const mailOptions = {
    from: data.email,
    to: 'tolpargepro@gmail.com',
    subject: `Message from ${data.email}`,
    html: `

    <h3>Informations</h3>
    <ul>
        <li style="list-style: none">Email was sent by ${data.email}</li>
        <li style="list-style: none">Name is ${data.name}</li>
        <li style="list-style: none">Subject is ${data.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${data.message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email has sent');
    }
  });
  console.log(data);
  transporter.close();
});

app.listen(PORT, () => {});
