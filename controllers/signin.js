const Clarifai = require('Clarifai');

const app = new Clarifai.App({
 apiKey: '6141b9a8de48432189526c1eedfa76de'
});

const handleApiCall = (req, res) => {
app.models
    .predict(
     Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => {
     res.json(data); 
    })
    .catch(err => res.status(400).json('unable to work with Api'))
}

const handleSignin = (db, bcrypt) => (req, res) => {
 const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }
  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
handleSignin,
handleApiCall
};

