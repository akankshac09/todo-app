const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');
const apiRoutes = require('./server/routes/api')
const models = require('./server/models');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json()); // convert request body to Json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(compression())
  app.use(enforce.HTTPS({ trustProtoHeader: true })); // redirect http traffic to https
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
apiRoutes(app, models);

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});