const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

//Routes for "Roles"
router.get('/roles', controllers.getAllRoles);

router.get('/roles/:id', controllers.getRoleById);

//Routes for "User"
router.get('/users', controllers.getAllUsers);

router.get('/users/:id', controllers.getUserById);

router.post('/users', controllers.createUser);

router.delete('/users/:id', controllers.deleteUser);

router.patch('/users/:id', controllers.updateUser);

//Routes for "MetionReport"
router.get('/mention-reports', controllers.getAllMentionReports);

router.get('/mention-reports/:id', controllers.getMentionReportById);

router.post('/mention-reports', controllers.createMentionReport);

router.delete('/mention-reports/:id', controllers.deleteMentionReport);

router.patch('/mention-reports/:id', controllers.updateMentionReport);

//Routes for "PubRequests"
router.get('/pub-requests', controllers.getAllPubRequests);

router.get('/pub-requests/:id', controllers.getPubRequestById);

router.post('/pub-requests', controllers.createPubRequst);

router.delete('/pub-requests/:id', controllers.deletePubRequest);

//Routes for "PubReview"
router.get('/pub-reviews', controllers.getAllPubReview);

router.get('/pub-reviews/:id', controllers.getPubReviewById);

router.post('/pub-reviews', controllers.createPubReview);

router.delete('/pub-reviews/:id', controllers.deletePubReview);

router.patch('/pub-reviews/:id', controllers.updatePubReview);

//Routes for "ResultsData"
router.get('/result-data', controllers.getAllResultData);

router.get('/result-data/:id', controllers.getResultDataById);

router.post('/result-data', controllers.createResultData);

router.delete('/result-data/:id', controllers.deleteResultData);

module.exports = router;
