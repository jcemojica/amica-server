const router = require('express').Router();
const UserController = require('../controllers/user-controller');

router.post('/add-user', UserController.addUser);
router.get('/find-by-email/:email', UserController.findByEmail);
router.post('/update-me', UserController.updateUser);
router.get('/find-by-name/:name', UserController.findByName);
router.get('/view-all', UserController.findAll);
router.get('/find-logged-in/', UserController.findLoggedIn);

const FriendRequestController = require('../controllers/fr-controller');

router.post('/send-request', FriendRequestController.sendRequest);
router.get('/view-request', FriendRequestController.viewRequest);
router.post('/delete-request', FriendRequestController.deleteRequest);
router.post('/accept-request', FriendRequestController.acceptFriend); //not sure
//delete friend


const PostController = require('../controllers/post-controller');

router.post('/create-post', PostController.createPost);
router.post('/like-post', PostController.addLike);
router.post('/unlike-post', PostController.removeLike);
router.get('/view-post/:id', PostController.viewPost);
router.get('/view-all-posts', PostController.viewAllPosts);
router.post('/delete-post', PostController.deletePost);


const CommentController = require('../controllers/comment-controller');

router.post('/add-comment', CommentController.createComment);
router.get('/view-all-comments', CommentController.viewAllComments);
router.post('/like-comment', CommentController.addLike);
router.post('/unlike-comment', CommentController.removeLike);
router.post('/delete-comment', CommentController.deleteComment);


const NotificationController = require('../controllers/notif-controller');

router.post('/mark-as-read', NotificationController.markAsRead);
router.get('/view-all-notifs', NotificationController.viewAllNotifs);
router.get('/view-unread-notifs', NotificationController.viewUnread);

module.exports = router;