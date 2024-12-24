# Implementation of information and software

It is being developed as part of the project:

- SQL script to create the initial database content
- RESTfull service for data management

## SQL

```sql

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mcanalyzer
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mcanalyzer` ;

-- -----------------------------------------------------
-- Schema mcanalyzer
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mcanalyzer` DEFAULT CHARACTER SET utf8mb3 ;
USE `mcanalyzer` ;

-- -----------------------------------------------------
-- Table `mcanalyzer`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcanalyzer`.`Role` ;

CREATE TABLE IF NOT EXISTS `mcanalyzer`.`Role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mcanalyzer`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcanalyzer`.`User` ;

CREATE TABLE IF NOT EXISTS `mcanalyzer`.`User` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(255) NOT NULL,
  `nickname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `Role_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Role_id`),
  INDEX `fk_User_Role1_idx` (`Role_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_Role1`
    FOREIGN KEY (`Role_id`)
    REFERENCES `mcanalyzer`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mcanalyzer`.`MentionReport`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcanalyzer`.`MentionReport` ;

CREATE TABLE IF NOT EXISTS `mcanalyzer`.`MentionReport` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  `creationDate` DATETIME NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `User_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `User_id`),
  INDEX `fk_MentionReport_User1_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_MentionReport_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `mcanalyzer`.`User` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mcanalyzer`.`PubRequest`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcanalyzer`.`PubRequest` ;

CREATE TABLE IF NOT EXISTS `mcanalyzer`.`PubRequest` (
  `User_id` INT UNSIGNED NOT NULL,
  `date` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`User_id`),
  INDEX `fk_PubRequest_User1_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_PubRequest_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `mcanalyzer`.`User` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mcanalyzer`.`PubReview`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcanalyzer`.`PubReview` ;

CREATE TABLE IF NOT EXISTS `mcanalyzer`.`PubReview` (
  `status` VARCHAR(45) NOT NULL,
  `User_id` INT UNSIGNED NOT NULL,
  `PubRequest_User_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`User_id`, `PubRequest_User_id`),
  INDEX `fk_PubReview_PubRequest1_idx` (`PubRequest_User_id` ASC) VISIBLE,
  CONSTRAINT `fk_PubReview_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `mcanalyzer`.`User` (`id`),
  CONSTRAINT `fk_PubReview_PubRequest1`
    FOREIGN KEY (`PubRequest_User_id`)
    REFERENCES `mcanalyzer`.`PubRequest` (`User_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mcanalyzer`.`ResultData`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcanalyzer`.`ResultData` ;

CREATE TABLE IF NOT EXISTS `mcanalyzer`.`ResultData` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sourse` VARCHAR(255) NOT NULL,
  `body` VARCHAR(255) NOT NULL,
  `mentionedAt` DATETIME NOT NULL,
  `mentions` INT NOT NULL,
  `MentionReport_id` INT UNSIGNED NOT NULL,
  `MentionReport_User_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `MentionReport_id`, `MentionReport_User_id`),
  INDEX `fk_ResultData_MentionReport1_idx` (`MentionReport_id` ASC, `MentionReport_User_id` ASC) VISIBLE,
  CONSTRAINT `fk_ResultData_MentionReport1`
    FOREIGN KEY (`MentionReport_id` , `MentionReport_User_id`)
    REFERENCES `mcanalyzer`.`MentionReport` (`id` , `User_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `mcanalyzer`.`Role`
-- -----------------------------------------------------
START TRANSACTION;
USE `mcanalyzer`;
INSERT INTO `mcanalyzer`.`Role` (`id`, `name`, `description`) VALUES (1, 'User', 'Registered user, can get info about mentions');
INSERT INTO `mcanalyzer`.`Role` (`id`, `name`, `description`) VALUES (2, 'Editor', 'Can do the same as the user, can edit data');
INSERT INTO `mcanalyzer`.`Role` (`id`, `name`, `description`) VALUES (3, 'Admin', 'Can do the same as other, can give roles and can block users.');

COMMIT;
```

## RESTfull service

### app.js
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = require('./database');

const router = require('./router');

app.use('/api', router);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Сторінка не знайдена' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Помилка на сервері' });
});

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});
```
### database.js
```javascript
const mysql2 = require('mysql2');

const db = mysql2.createConnection({
host: 'localhost',
user: 'root',
password: '987654321',
database: 'mcanalyzer',
insecureAuth: true
});

db.connect((err) => {
if (err) {
console.error('Помилка підключення до бази даних: ' + err.stack);
return;
}
console.log('Підключено до бази даних з id ' + db.threadId);
});

module.exports = db;
```
### router.js
```javascript
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
```

### controller.js
```javascript
const db = require('./database');
const bodyParser = require('body-parser');

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
```
