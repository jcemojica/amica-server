const Comment = require('mongoose').model('Comment');
const Notification = require('mongoose').model('Notification');

/*create comment*/
exports.createComment = (req, res) => {
  var newComment = new Comment();
  newComment._id = req.body._id;
  newComment.commentAuthor = req.body.author;
  newComment.postId = req.body.post;
  newComment.content = req.body.content;
  var currentUser = req.body.currentUser;

  newComment.save((err, comment) => {
    if (err) { 
      res.send({}); 
      res.status(505).send(err);
    }
    else {
      res.json(comment);
    }
  });

  if(newComment.commentAuthor !== currentUser){
  	var newNotification = new Notification();
  	newNotification.actor = newComment.commentAuthor;
  	newNotification.receiver = currentUser;
  	newNotification.verb = "commented";
  	newNotification.postId = newComment.postId;
  	newNotification.commentId = newComment._id;

  	newNotification.save((err, notif) => {
  		if (err) { res.send({}); }
  		else {
  			res.json(notif);
  		}
	});
  }
}

/*see all comments in the post*/
exports.viewAllComments = (req, res) => {
	const postId = req.body._id; //find by post

	Comment.find({ postId }, (err, comments) => {
		if (err) {
			console.log(err);
			res.send({});
		} else {
			res.send(comments);
		}
	});
}

/*add like*/
exports.addLike = (req, res) => {
	const postId = req.body.postId;
	const commentId = req.body.commentId;
	const likes = req.body.likes;
	likes.push(req.body.liker);

	Comment.findOneAndUpdate( { commentId }, { likes }, (err, comment) => {
		if(err) {
			console.log(err);
			res.status(404).send(err);
		}else{
			res.send(comment)
		}
	});

	var newNotification = new Notification();
  	newNotification.actor = commentId;
  	newNotification.receiver = req.body.liker;
  	newNotification.verb = "liked";
  	newNotification.postid = postId;

  	newNotification.save((err, notif) => {
  		if (err) { res.send({}); }
  		else {
  			res.json(notif);
  		}
	});
}

/*remove like*/
exports.removeLike = (req, res) => {
  const commentId = req.body._id;
  const likes = req.body.likes;
  const unliker = req.body.name;

  const newLikes = [];
  for(var i = 0; i < likes.length; ++i){
    if(likes[i] !== unliker){
      newLikes.push(likes[i]);
    }
  }

  Comment.findOneAndUpdate({ commentId }, { likes: newLikes }, (err, comment) => {
    if(err) {
      console.log(err);
      res.status(404).send(err);
    }else{
      res.send(comment)
    }
  })

  const verb = "liked";

  /*remove from notification*/
  Notification.remove({ commentId, verb }, (err) => {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
}

/*delete comment*/
exports.deleteComment = (req, res) => {
	const commentId = req.body._id;

	Comment.remove({ commentId }, (err) => {
	    if (err) {
	      res.send(false);
	    } else {
	      res.send(true);
	    }
	});

	/*remove from notification*/
	 Notification.remove({ commentId }, (err) => {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
}