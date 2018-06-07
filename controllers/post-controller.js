const Post = require('mongoose').model('Post');
const Notification = require('mongoose').model('Notification');
const Comment = require('mongoose').model('Comment');

/*create own post*/
exports.createPost = (req, res) => {
  const newPost = new Post(req.body);

  newPost.save((err, post) => {
    if (err) { 
      res.send({}); 
      res.status(505).send(err);
    }
    else {
      res.json(post);
    }
  });

  if(newPost.wallOwner !== null){
  	var newNotification = new Notification();
  	newNotification.actor = newPost.postAuthor;
  	newNotification.receiver = newPost.wallOwner;
  	newNotification.verb = "posted";
  	newNotification.postId = newPost._id;

  	newNotification.save((err, notif) => {
  		if (err) { res.send({}); }
  		else {
  			res.json(notif);
  		}
	});
  }
}

/*add likes*/
exports.addLike = (req, res) => {
	const postId = req.body._id;
	const likes = req.body.likes;
	const liker = req.body.liker;
	likes.push(liker);

	User.findOneAndUpdate({ postId }, { likes: likes }, (err, user) => {
    if(err) {
      console.log(err);
      res.status(404).send(err);
    }else{
      res.send(user)
    }
  })

	const author = req.body.postAuthor;

	var newNotification = new Notification();
  	newNotification.actor = author;
  	newNotification.receiver = liker;
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
  const postId = req.body._id;
  const likes = req.body.likes;
  const unliker = req.body.name;
  

  const newLikes = [];
  for(var i = 0; i < likes.length; ++i){
    if(likes[i] !== unliker){
      newLikes.push(likes[i]);
    }
  }

  Post.findOneAndUpdate({ postId }, { likes: newLikes }, (err, post) => {
    if(err) {
      console.log(err);
      res.status(404).send(err);
    }else{
      res.send(post)
    }
  })

  const verb = "liked";

  /*remove from notification*/
  Notification.remove({ postId, verb }, (err) => {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
}

/*view post*/
exports.viewPost = (req, res) => {
	const postId = req.params._id;

	Post.findOne({ postId }, (err, post) => {
	    if (err) {
	      console.log(err);
	      res.send({});
	    } else {
	      res.send(post);
	    }
	  });
}

/*view all posts*/
exports.viewAllPosts = (req, res) => {
  const author = req.body.postAuthor;

  Post.find({ author }, (err, posts) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      res.send(posts);
    }
  })
}

/*delete post*/
exports.deletePost = (req, res) => {
	const postId = req.body._id;

  //if the poster posted on its own wall, send null in this part
	const wallOwner = req.body.wallOwner;

	//kapag may wall owner, delete it from notif as well
	Post.remove({ postId }, (err) => {
	    if (err) {
	      res.send(false);
	    } else {
	      res.send(true);
	    }
	});

	if(wallOwner !== null){
		Notification.remove({ postId }, (err) => {
		    if (err) {
		      res.send(false);
		    } else {
		      res.send(true);
		    }
		});
	}

  /*delete the commments as well*/
  Comment.remove({ postId }, (err) => {
    if(err){
      res.send(false);
    } else {
      res.send(true);
    }
  })
}