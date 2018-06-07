const FriendRequest = require('mongoose').model('FriendRequest');
const Notification = require('mongoose').model('Notification');
const User = require('mongoose').model('User');

/*create friend request*/
exports.sendRequest = (req, res) => {
  const newRequest = new FriendRequest(req.body);
  newRequest.isAccepted = false;

  newRequest.save((err, request) => {
    if (err) { 
      res.send({}); 
      res.status(505).send(err);
    }
    else {
      res.json(request);
    }
  });

  /*add notif*/
  var newNotification = new Notification();
    newNotification.actor = newRequest.requester;
    newNotification.receiver = newPost.user;
    newNotification.verb = "requested";
    newNotification.requestId = newRequest._id;

    newNotification.save((err, notif) => {
      if (err) { res.send({}); }
      else {
        res.json(notif);
    }
  });
}

/*view friend requests*/
exports.viewRequest = (req, res) => {
  const userid = req.body._id;

  FriendRequest.find({ userid }, (err, frs) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      res.send(frs);
    }
  });
}

/*accept friend request*/
/*1. add friend to list*/
/*2. delete*/
exports.acceptFriend = (req, res) => {
  const freq = req.body;
  var requester = {}, receiver = {};


  // User.findOne({ freq.requester }, (err, user) => {
  //   if(err){
  //     console.log(err);
  //     res.status(404).send(err);
  //   } else {
  //     requester = user;
  //   }
  // });

  // User.findOne({ freq.receiver }, (err, user) => {
  //   if(err){
  //     console.log(err);
  //     res.status(404).send(err);
  //   } else {
  //     receiver = user;
  //   }
  // })

  // requester.friends.push(receiver);
  // receiver.friends.push(requester);

}

/*delete friend request*/
exports.deleteRequest = (req, res) => {
  const requestid = req.body._id;

  FriendRequest.remove({ requestid }, (err) => {
     if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });

  /*delete sa notif*/
  Notification.remove({ requestid }, (err) => {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
}