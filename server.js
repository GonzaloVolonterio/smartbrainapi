const express = require('express'); // SE USA PARA COMUNICAR TOOD 
const bodyParser = require('body-parser'); // HACE MIDDLEWARE PARA EXPRES
const bcrypt = require('bcrypt-nodejs'); // PARA CIFRAR CONTRASEÑAS, HHTP Y POST USAR SIEMPRE
const cors = require('cors');  //ES PARA TNER ACCESO Y SABER QUE NO SOY UN HACKER SINO TIRA ERROR                                       
const knex = require('knex'); //PARA CONECTAR BASE DE DATOS CON EL SERVIDOR


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');




const db = knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : '',
    password : '12345 ',
    database : 'smartbrain'
  }
});

//db.select('*').from('users').then(data => {
//console.log(data);
//});


const app = express();


app.use(bodyParser.json());
app.use(cors())


//const database = {
//users: [ {
//id: '123',
//name: 'john',
//email: 'john@gmail.com',
//password: 'cookies',
//entries: 0,
//joined: new Date()
//},
//{
//id: '124',
//name: 'sally',
//email: 'sally@gmail.com',
//password: 'bananas',
//entries: 0,
//joined: new Date()
//}
//]	
//}



//COMPROBAR QUE FUNCIONA ENVINADO A POSNET
app.get('/', (req, res) => {
res.send(database.users);	
})



//PARA SOLUCITAR INFORMACION DE LOGEO DE USUARIO AL SERVIDRO
//app.post('/signin', (req, res) => {
  //db.select('email', 'hash').from('login')
    //.where('email', '=', req.body.email)
    //.then(data => {
      //const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      //if (isValid) {
        //return db.select('*').from('users')
          //.where('email', '=', req.body.email)
          //.then(user => {
            //res.json(user[0])
          //})
          //.catch(err => res.status(400).json('unable to get user'))
      //} else {
        //res.status(400).json('wrong credentials')
      //}
    //})
    //.catch(err => res.status(400).json('wrong credentials'))
//})


app.post('/signin', (req, res) => {signin.handleSignin, req, res, db, bcrypt})



//PARA AGREGAR UN REGISTRO A LA BASE DE DATOS
//  database.users.push({
    //id: '124',
    //name: req.body.name,
    //email: req.body.email,
    //entries: 0,
    //joined: new Date()
  //})
  //res.json(database.users[database.users.length - 1])
//})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)}
}
 


//PERFIL DEL USUARIO Y EL ID DEL MISMO
app.get('/profile/:id', (req, res) => {register.handleProfileGet(req, res, db)}




//PARA SABER LAS ENTRADAS OSEA BUSQUEDA DE IMAGENES HACER EL USUARIO XQ ES UN JUEGO DE RECONOCOCIMIENTO FACIAL
//app.put('/image', (req, res) => {
  //const { id } = req.body;
  //db('users').where('id', '=', id)
  //.increment('entries', 1)
  //.returning('entries')
  //.then(entries => {
    //res.json(entries[0]);
  //})
  //.catch(err => res.status(400).json('unable to get entries'))
//})


app.put('/image', (req, res) => {image.handleImage(req, res, db)}}

app.put('/imageUrl', (req, res) => {image.handleApiCall(req, res, db)}}


//COMPRAR QUE FUNCIONA
app.listen(process.env.PORT || 3001, () => {
console.log('app is running on port ${process.env.PORT} ');	
})

/*
/ --> res = this is working
/signin --> solictud POST para publicar datos success/fail
/register --> POST = data a la base de datos = ej user 
/profile/:userId ---> GET = user (para obtener informacion) 
/image ---> PUT (actulizacion del perfil xq es una competencia) --> user
*/

