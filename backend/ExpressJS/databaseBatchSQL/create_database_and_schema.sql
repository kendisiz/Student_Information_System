CREATE DATABASE STUDENT_INFORMATION;
USE STUDENT_INFORMATION;
GO

CREATE TABLE Academic_Personnel (
	academic_personnel_id int IDENTITY(1, 1) PRIMARY KEY,
	department_id int,
	tcno varchar(11),
	name varchar(200),
	surname varchar(200),
	email varchar(250),
	P_TYPE varchar(1) NOT NULL
);

CREATE TABLE Professor (
	academic_personnel_id int PRIMARY KEY,
	office_id varchar(100),
	phone_number varchar(100),
	website_url varchar(200),
	research_area varchar(200)
);

CREATE TABLE Assistant (
	academic_personnel_id int PRIMARY KEY,
	professor_id int
);

CREATE TABLE Faculty (
	faculty_id int IDENTITY(1, 1) PRIMARY KEY,
	dean_id int,
	name varchar(200)
);

CREATE TABLE Department (
	department_id int IDENTITY(1, 1) PRIMARY KEY,
	chair_id int,
	faculty_id int,
	name varchar(200)
);

CREATE TABLE Building (
	building_id int IDENTITY(1, 1) PRIMARY KEY,
	department_id int,
	name varchar(200)
);

CREATE TABLE Classroom (
	classroom_id int IDENTITY(1, 1) PRIMARY KEY,
	building_id int,
	name varchar(200),
	capacity int
);

CREATE TABLE Course (
	course_id int IDENTITY(1, 1) PRIMARY KEY,
	department_id int,
	name varchar(200),
	credits int
);

CREATE TABLE Prerequisite (
	prerequisite_id int IDENTITY(1, 1) PRIMARY KEY,
	course_id int,
	prerequisite_course_id int
);

CREATE TABLE Semester (
	semester_id int IDENTITY(1, 1) PRIMARY KEY,
	year_ varchar(4),
	season varchar(10),
	is_active bit
);

CREATE TABLE Student (
	student_id int IDENTITY(1, 1) PRIMARY KEY,
	advisor_id int,
	department_id int,
	tcno varchar(11),
	name varchar(200),
	surname varchar(200),
	email varchar(200),
	GPA numeric(3, 2),
	total_credits int,
	last_update_time date
);

CREATE TABLE Section (
	section_id int IDENTITY(1, 1) PRIMARY KEY,
	academic_personnel_id int,
	classroom_id int,
	course_id int,
	semester_id int,
	section_number varchar(3),
	week_day varchar(10),
	start_time varchar(5),
	end_time varchar(5)
);

CREATE TABLE Section_Enrollment (
	section_enrollment_id int IDENTITY(1, 1) PRIMARY KEY,
	student_id int,
	section_id int,
	grade numeric(3, 2)
);

-----------------------------------------------
------ create foreign key constraints ---------
-----------------------------------------------

ALTER TABLE Academic_Personnel
	ADD CONSTRAINT FK_Academic_Personnel_Department FOREIGN KEY (department_id)
	REFERENCES Department(department_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
;

ALTER TABLE Professor
	ADD CONSTRAINT FK_Professor_Academic_Personnel FOREIGN KEY (academic_personnel_id)
	REFERENCES Academic_Personnel(academic_personnel_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
;

ALTER TABLE Assistant
	ADD CONSTRAINT FK_Assistant_Academic_Personnel FOREIGN KEY (academic_personnel_id)
	REFERENCES Academic_Personnel(academic_personnel_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
;

ALTER TABLE Assistant
	ADD CONSTRAINT FK_Assistant_Professor FOREIGN KEY (professor_id)
	REFERENCES Professor(academic_personnel_id)
	-- ON DELETE CASCADE -- It gives error:  may cause cycles or multiple cascade paths
	-- ON UPDATE CASCADE -- It gives error:  may cause cycles or multiple cascade paths
;

ALTER TABLE Department
	ADD CONSTRAINT FK_Department_Professor FOREIGN KEY (chair_id)
	REFERENCES Professor(academic_personnel_id)
	-- ON DELETE CASCADE -- It gives error:  may cause cycles or multiple cascade paths
	-- ON UPDATE CASCADE -- It gives error:  may cause cycles or multiple cascade paths
;

ALTER TABLE Department
	ADD CONSTRAINT FK_Department_Faculty FOREIGN KEY (faculty_id)
	REFERENCES Faculty(faculty_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
;

ALTER TABLE Faculty
	ADD CONSTRAINT FK_Faculty_Professor FOREIGN KEY (dean_id)
	REFERENCES Professor(academic_personnel_id)
	-- ON DELETE CASCADE -- It gives error:  may cause cycles or multiple cascade paths
	-- ON UPDATE CASCADE -- It gives error:  may cause cycles or multiple cascade paths
;

ALTER TABLE Building
	ADD CONSTRAINT FK_Building_Department FOREIGN KEY (department_id)
	REFERENCES Department(department_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
;

ALTER TABLE Classroom
	ADD CONSTRAINT FK_Classroom_Building FOREIGN KEY (building_id)
	REFERENCES Building(building_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
;

ALTER TABLE Course
	ADD CONSTRAINT FK_Course_Department FOREIGN KEY (department_id)
	REFERENCES Department(department_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
;

ALTER TABLE Prerequisite
	ADD CONSTRAINT FK_Prerequisite_Course FOREIGN KEY (course_id)
	REFERENCES Course(course_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
;

ALTER TABLE Prerequisite
	ADD CONSTRAINT FK_Prerequisite_Course_2 FOREIGN KEY (prerequisite_course_id)
	REFERENCES Course(course_id)
	-- ON DELETE CASCADE
	-- ON UPDATE CASCADE
;

ALTER TABLE Student
	ADD CONSTRAINT FK_Student_Professor FOREIGN KEY (advisor_id)
	REFERENCES Professor(academic_personnel_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
;

ALTER TABLE Student
	ADD CONSTRAINT FK_Student_Department FOREIGN KEY (department_id)
	REFERENCES Department(department_id)
	-- ON DELETE CASCADE
	-- ON UPDATE CASCADE
;

ALTER TABLE Section_Enrollment
	ADD CONSTRAINT FK_Section_Enrollment_Student FOREIGN KEY (student_id)
	REFERENCES Student(student_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
;

ALTER TABLE Section_Enrollment
	ADD CONSTRAINT FK_Section_Enrollment_Section FOREIGN KEY (section_id)
	REFERENCES Section(section_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
;

ALTER TABLE Section
	ADD CONSTRAINT FK_Section_Professor FOREIGN KEY (academic_personnel_id)
	REFERENCES Professor(academic_personnel_id)
	-- ON DELETE CASCADE
	-- ON UPDATE CASCADE
;

ALTER TABLE Section
	ADD CONSTRAINT FK_Section_Classroom FOREIGN KEY (classroom_id)
	REFERENCES Classroom(classroom_id)
	-- ON DELETE CASCADE
	-- ON UPDATE CASCADE
;

ALTER TABLE Section
	ADD CONSTRAINT FK_Section_Course FOREIGN KEY (course_id)
	REFERENCES Course(course_id)
	-- ON DELETE CASCADE
	-- ON UPDATE CASCADE
;

ALTER TABLE Section
	ADD CONSTRAINT FK_Section_Semester FOREIGN KEY (semester_id)
	REFERENCES Semester(semester_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
;