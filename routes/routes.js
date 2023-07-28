const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

app.get(`/favicon.ico`, controller.getFavicon);
app.get(`/`, controller.getIndex);
app.get(`/getCheckRefNo:refno`, controller.getCheckRefNo);
app.get(`/add:name:refno:amount`, controller.getAdd);
app.get(`/delete:refno`, controller.getDelete);

module.exports = app;
