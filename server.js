const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const checkIfAdmin =(req, res, next) => {
    if (req.body.name === 'toto')
    {
        next();
    }
    else 
    {
        res.status(401).send("tu n'est pas autorisé");
    };
};

const helloWorld = (req, res) => {
    res.send('Hello World!');
};

app.get('/test', checkIfAdmin, helloWorld);

app.get('/api/demo', (request, response) => {
    console.log('request => ', request);
    // 1ER CAS : SUCCESS
        // response.sendStatus(200);
    // 2EME CAS : FAIL
        response.send("Vous n'avez pas les droits pour ça");
    // res.send('Hello World!')
  })

  app.post('/create/user', (req, res) => {
    console.log("req body => ", req.body)
    const { name, age } = req.body;
    console.log('name => ', name, 'age => ', age);
    res.send('create user');
    // res.send('Hello World!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})