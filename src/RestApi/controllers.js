const db = require('./database');

//Methods for the "Roles"
const getAllRoles = (req, res) => {
  const query = 'SELECT * FROM Role';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const getRoleById = (req, res) => {
  const roleId = req.params.id;
  const query = `SELECT * FROM Role WHERE id = ${roleId}`;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

//Methods for the "Users"
const getAllUsers = (req, res) => {
  const query = 'SELECT * FROM User';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const getUserById = (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM User WHERE id = ${userId}`;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const createUser = (req, res) => {
  const newUser = req.body;
  const query = 'INSERT INTO User SET ?';
  db.query(query, newUser, (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, ...newUser });
  });
};

const deleteUser = (req, res) => {
  const userId = req.params.id;
  const query = `DELETE FROM User WHERE id = ${userId}`;
  db.query(query, (err) => {
    if (err) throw err;
    res.json({ id: userId, message: 'Користувач видалений успішно.' });
  });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const query = `UPDATE User SET ? WHERE id = ${id}`;
  db.query(query, updatedData, (err) => {
    if (err) throw err;
    res.json({ id: id, ...updatedData });
  });
};

//Methods for the "MentionReports"
const getAllMentionReports = (req, res) => {
  const query = 'SELECT * FROM MentionReport';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const getMentionReportById = (req, res) => {
  const mentionReportId = req.params.id;
  const query = `SELECT * FROM MentionReport WHERE id = ${mentionReportId}`;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const createMentionReport = (req, res) => {
  const newMenRep = req.body;
  const query = 'INSERT INTO MentionReport SET ?';
  db.query(query, newMenRep, (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, ...newMenRep });
  });
};

const deleteMentionReport = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM MentionReport WHERE id = ${id}`;
  db.query(query, (err) => {
    if (err) throw err;
    res.json({ id: id, message: 'Звіт видалено успішно.' });
  });
};

const updateMentionReport = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const query = `UPDATE MentionReport SET ? WHERE id = ${id}`;
  db.query(query, updatedData, (err) => {
    if (err) throw err;
    res.json({ id: id, ...updatedData });
  });
};

//Methods for the "PubRequests"
const getAllPubRequests = (req, res) => {
  const query = 'SELECT * FROM PubRequest';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const getPubRequestById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM PubRequest WHERE User_id = ${id}`;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const createPubRequst = (req, res) => {
  const newPubRequest = req.body;
  const query = 'INSERT INTO PubRequest SET ?';
  db.query(query, newPubRequest, (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, ...newPubRequest });
  });
};

const deletePubRequest = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM PubRequest WHERE User_id = ${id}`;
  db.query(query, (err) => {
    if (err) throw err;
    res.json({ id, message: 'PubRequest видалено успішно.' });
  });
};

//Methods for the "PubReviews"
const getAllPubReview = (req, res) => {
  const query = 'SELECT * FROM PubReview';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const getPubReviewById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM PubReview WHERE User_id = ${id}`;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const createPubReview = (req, res) => {
  const newPubReview = req.body;
  const query = 'INSERT INTO PubReview SET ?';
  db.query(query, newPubReview, (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, ...newPubReview });
  });
};

const deletePubReview = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM PubReview WHERE User_id = ${id}`;
  db.query(query, (err) => {
    if (err) throw err;
    res.json({ id, message: 'PubReview видалено успішно.' });
  });
};

const updatePubReview = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const query = `UPDATE PubReview SET ? WHERE id = ${id}`;
  db.query(query, updatedData, (err) => {
    if (err) throw err;
    res.json({ id: id, ...updatedData });
  });
};

//Methods for the "ResultData"
const getAllResultData = (req, res) => {
  const query = 'SELECT * FROM ResultData';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const getResultDataById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM ResultData WHERE id = ${id}`;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const createResultData = (req, res) => {
  const newResultData = req.body;
  const query = 'INSERT INTO ResultData SET ?';
  db.query(query, newResultData, (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, ...newResultData });
  });
};

const deleteResultData = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM ResultData WHERE id = ${id}`;
  db.query(query, (err) => {
    if (err) throw err;
    res.json({ id, message: 'ResultData видалено успішно.' });
  });
};

module.exports = {
  //Roles
  getAllRoles,
  getRoleById,
  //Users
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  //MentionReports
  getAllMentionReports,
  getMentionReportById,
  createMentionReport,
  deleteMentionReport,
  updateMentionReport,
  //PubRequests
  getAllPubRequests,
  getPubRequestById,
  createPubRequst,
  deletePubRequest,
  //PubReview
  getAllPubReview,
  getPubReviewById,
  createPubReview,
  deletePubReview,
  updatePubReview,
  //ResultData
  getAllResultData,
  getResultDataById,
  createResultData,
  deleteResultData
};
