const Notification = require('mongoose').model('Notification');

/*mark as read the notification*/
exports.markAsRead = (req, res) => {
	const id = req.body._id;

  Notification.findOneAndUpdate({id}, { isRead: true }, (err, notif) =>{
    if(err){
      console.log(err);
      res.status(404).send(err);
    }else{
      res.send(notif);
    }
  });
}

/*view all notifications*/
exports.viewAllNotifs = (req, res) => {
  const receiver = req.body.receiver;

  Notification.find({ receiver }, (err, notifs) => {
    if (err){
      console.log(err);
      res.status(404).send(err);
    } else {
      res.send(notifs);
    }
  });
}

/*view unread notifications*/
exports.viewUnread = (req, res) => {
  const receiver = req.body.receiver;

  Notification.find( { receiver, isRead: false }, (err, notifs) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.send(notifs);
    }
  });
}