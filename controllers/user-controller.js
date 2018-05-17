const User = require('mongoose').model('User');

/*create user by signup*/
exports.addUser = (req, res) => {
  const newUser = new User(req.body);

  newUser.save((err, user) => {
    if (err) { 
      res.send({}); 
      res.status(505).send(err);
    }
    else {
      res.json(user);
    }
  });
}

/*purpose: find duplicates*/
exports.findByEmail = (req, res) => {
  const email = req.body.email;

  User.findOne({ email }, (err, user) => {
    if(err){
      console.log(err);
      res.status(404).send(err);
    } else {
      res.send(user);
    }
  })
}

/*view the current user for login (temp)*/
exports.findCurrentUser = (req, res) => {
  const id = req.body._id;
  const email = req.body.email;
  const pw = req.body.password;

  User.findOne({ email, password }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.send(user);
    }
  });
}

/*update basic details: name, about, birthday*/
exports.updateBasicDetails = (req, res) => {
  const id = req.params._id;
  const newDetails = req.body;

  User.findByIdAndUpdate({id}, {newDetails}, (err, user) => {
    if(err) {
      console.log(err);
      res.status(404).send(err);
    }else{
      res.send(user)
    }
  })
}

/*edit isSearchable, canAcceptRequest*/
exports.changeSettings = (req, res) => {
  const id = req.params._id;
  const settings = req.body;

  User.findByIdAndUpdate({id}, {settings}, (err, user) =>{
    if(err){
      console.log(err);
      res.status(404).send(err);
    }else{
      res.send(user);
    }
  })
}

/*return friends*/
exports.getFriends = (req, res) => {
  const email = req.params.email;

  User.find({email}, (err, user) => {
    if(err){
      console.log(err);
      res.status(404).send(err);
    } else{
      res.send(user.friends)
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