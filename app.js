const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');
const https = require('https');

const privateKey  = fs.readFileSync('server/selfsigned.key', 'utf8');
const certificate = fs.readFileSync('server/selfsigned.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/set-cookie', (req, res) => {
  const { value, cookieName, domain } = req.body;
  console.log('setting cookie', cookieName, value, domain);
  res.cookie(cookieName, value, {
      domain,
      secure: true,
      sameSite: 'None',
      partitioned: true,
  });
  res.json(req.cookies);
});

app.get('/get-cookies', (req, res) => {
    console.log('Cookies: ', req.cookies)
    res.json(req.cookies);
});

const httpsServer = https.createServer(credentials, app);

httpsServer.onError = function(err) {
    console.log('httpsServer error', err);
}
httpsServer.listen(8443);
