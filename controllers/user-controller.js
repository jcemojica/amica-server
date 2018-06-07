const User = require('mongoose').model('User');

/*create user by signup*/
exports.addUser = (req, res) => {
  const newUser = new User(req.body);

  newUser.save((err, user) => {
    if (err) { 
      res.send({}); 
    }
    else {
      res.json(user);
    }
  });
}

/*purpose: find duplicates*/
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  User.findOne({ email }, (err, user) => {
    if(err){
      console.log(err);
      res.status(404).send(err);
    } else {
      res.send(user);
    }
  })
}

/*update user attributes*/
exports.updateUser = (req, res) => {
  const id = req.body._id;
  const newDetails = req.body;

  User.findOneAndUpdate({ id }, { newDetails }, {}, (err, user) => {
    if(err) {
      console.log(err);
      res.status(404).send(err);
    }else{
      res.send(user)
    }
  })
}

/*search users by name*/
exports.findByName = (req, res) => {
  const name = req.params.name;

  User.find({ name }, (err, users) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      const searchable = [];
      for(var i = 0; i < users.length; ++i){
        if(users[i].isSearchable === true){
          searchable.push(users[i]);
        }
      }
      res.send(searchable);
    }
  });
}

exports.findLoggedIn = (req, res) => {

  User.findOne({ isLoggedIn: true }, (err, user) => {
    if(err){
      console.log(err);
      res.send({});
    }else{
      res.send(user);
    }
  })
}

/*tester*/
exports.findAll = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log();
      res.send();
    } else {
      res.send(users);
    }
  });
}