module.exports = [
	// USERS TABLE
	`CREATE TABLE IF NOT EXISTS TBL_USER
	(
		ID INT NOT NULL AUTO_INCREMENT,
		FIRST_NAME VARCHAR(256) NOT NULL,
		LAST_NAME VARCHAR(256) NOT NULL,
		EMAIL VARCHAR(256) NOT NULL UNIQUE,
		PASSWORD VARCHAR(1000) NOT NULL,
		IMAGE VARCHAR(1000) NULL DEFAULT NULL,
		GENDER VARCHAR(15) NULL DEFAULT NULL,
		DOB DATE NULL DEFAULT NULL,
		CONSTRAINT TBL_TEACHER_PK PRIMARY KEY (ID)
	);`,

	// IS_TEACHER BOOLEAN NOT NULL,

	// CLASSROOM TABLE
	`CREATE TABLE IF NOT EXISTS TBL_CLASSROOM
	(
		ID INT NOT NULL AUTO_INCREMENT,
		TEACHER_ID INT NOT NULL,
		TITLE VARCHAR(256) NOT NULL,
		DESCRIPTION VARCHAR(1000) NULL DEFAULT NULL,
		CLASS_CODE VARCHAR(7) NOT NULL UNIQUE,
		LAST_UPDATE DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
		CONSTRAINT TBL_CLASSROOM_PK PRIMARY KEY (ID),
		CONSTRAINT TBL_CLASSROOM_TEACHER_FK FOREIGN KEY(TEACHER_ID)
		REFERENCES TBL_USER(ID) ON UPDATE CASCADE ON DELETE CASCADE
	);`,

	// QUIZ TABLE
	`CREATE TABLE IF NOT EXISTS TBL_QUIZ
	(
		ID INT NOT NULL AUTO_INCREMENT,
		CLASS_ID INT NOT NULL,
		TITLE VARCHAR(256) NOT NULL,
		DESCRIPTION VARCHAR(1000) NULL DEFAULT NULL,
		NO_OF_QUESTIONS INT NOT NULL DEFAULT 0,
		DURATION INT NOT NULL,
		MAX_MARKS INT NOT NULL,
		START_TIME DATETIME NOT NULL,
		END_TIME DATETIME NOT NULL,
		LAST_UPDATE DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
		CONSTRAINT TBL_QUIZ_PK PRIMARY KEY (ID),
		CONSTRAINT TBL_QUIZ_CLASSROOM_FK FOREIGN KEY(CLASS_ID)
		REFERENCES TBL_CLASSROOM(ID) ON UPDATE CASCADE ON DELETE CASCADE
	);`,

	// QUESTION TABLE
	`CREATE TABLE IF NOT EXISTS TBL_QUESTION
	(
		ID INT NOT NULL AUTO_INCREMENT,
		QUIZ_ID INT NOT NULL,
		QUESTION VARCHAR(1000) NOT NULL,
		NO_OF_CORRECT_ANS INT NOT NULL,
		MARK INT NOT NULL,
		CONSTRAINT TBL_QUESTION_PK PRIMARY KEY (ID),
		CONSTRAINT TBL_QUESTION_QUIZ_FK FOREIGN KEY(QUIZ_ID)
		REFERENCES TBL_QUIZ(ID) ON UPDATE CASCADE ON DELETE CASCADE
	);`,

	// OPTION TABLE
	`CREATE TABLE IF NOT EXISTS TBL_OPTION
	(
		ID INT NOT NULL AUTO_INCREMENT,
		QUESTION_ID INT NOT NULL,
		CHOICE VARCHAR(1000) NOT NULL,
		IS_CORRECT BOOLEAN NOT NULL,
		CONSTRAINT TBL_OPTION_PK PRIMARY KEY (ID),
		CONSTRAINT TBL_OPTION_QUESTION_FK FOREIGN KEY(QUESTION_ID)
		REFERENCES TBL_QUESTION(ID) ON UPDATE CASCADE ON DELETE CASCADE
	);`,

	// SCORE TABLE
	`CREATE TABLE IF NOT EXISTS TBL_SCORE
	(
		ID INT NOT NULL AUTO_INCREMENT,
		STUDENT_ID INT NOT NULL,
		QUIZ_ID INT NOT NULL,
		MARKS INT NOT NULL,
		CONSTRAINT TBL_SCORE_PK PRIMARY KEY (ID),
		CONSTRAINT TBL_SCORE_STUDENT_FK FOREIGN KEY(STUDENT_ID)
		REFERENCES TBL_USER(ID) ON UPDATE CASCADE ON DELETE CASCADE,
		CONSTRAINT TBL_SCORE_QUIZ_FK FOREIGN KEY(QUIZ_ID)
		REFERENCES TBL_QUIZ(ID) ON UPDATE CASCADE ON DELETE CASCADE
	);`,

	// STUDENT_CLASSROOM TABLE
	`CREATE TABLE IF NOT EXISTS TBL_STUDENT_CLASSROOM
	(
		STUDENT_ID INT NOT NULL,
		CLASS_ID INT NOT NULL,
		CONSTRAINT TBL_STUDENT_CLASSROOM_PK PRIMARY KEY(STUDENT_ID, CLASS_ID),
		CONSTRAINT TBL_STUDENT_CLASSROOM_STUDENT_FK FOREIGN KEY(STUDENT_ID)
		REFERENCES TBL_USER(ID) ON UPDATE CASCADE ON DELETE CASCADE,
		CONSTRAINT TBL_STUDENT_CLASSROOM_CLASSROOM_FK FOREIGN KEY(CLASS_ID)
		REFERENCES TBL_CLASSROOM(ID) ON UPDATE CASCADE ON DELETE CASCADE
	);`,

	// INC_COUNT_QUEST TRIGGER
	// `CREATE TRIGGER IF NOT EXISTS INC_COUNT_QUEST
	// AFTER INSERT ON TBL_QUESTION FOR EACH ROW
	// UPDATE TBL_QUIZ Q SET NO_OF_QUESTIONS = (
	// 	SELECT COUNT(*) FROM TBL_QUESTION
	// 	WHERE Q.ID = TBL_QUESTION.QUIZ_ID
	// );`,

	// DEC_COUNT_QUEST TRIGGER
	// `CREATE TRIGGER IF NOT EXISTS DEC_COUNT_QUEST
	// AFTER DELETE ON TBL_QUESTION FOR EACH ROW
	// UPDATE TBL_QUIZ Q SET NO_OF_QUESTIONS = (
	// 	SELECT COUNT(*) FROM TBL_QUESTION
	// 	WHERE Q.ID = TBL_QUESTION.QUIZ_ID
	// );`

	// USER_AUTH TABLE
	`CREATE TABLE IF NOT EXISTS TBL_USER_AUTH
	(
		AUTH_ID INT NOT NULL AUTO_INCREMENT,
		USER_ID INT NOT NULL,
		VALIDITY DATETIME NOT NULL,
		CONSTRAINT TBL_USER_AUTH_PK PRIMARY KEY (AUTH_ID),
		CONSTRAINT TBL_USER_AUTH_USER_FK FOREIGN KEY(USER_ID)
		REFERENCES TBL_USER(ID) ON UPDATE CASCADE ON DELETE CASCADE
	);`
];