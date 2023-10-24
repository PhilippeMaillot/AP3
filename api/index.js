const express = require('express');
const app = express();
app.get('/fields', (req,res) => {    res.send("Liste des complexe sportifs !!!")});
app.listen(8080, () => {  console.log('Serveur à l\'écoute') });
