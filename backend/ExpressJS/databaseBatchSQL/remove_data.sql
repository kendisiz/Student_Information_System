--- Drop constraints
ALTER TABLE Academic_Personnel DROP CONSTRAINT FK_Academic_Personnel_Department; 
ALTER TABLE Assistant DROP CONSTRAINT FK_Assistant_Professor;
ALTER TABLE Assistant DROP CONSTRAINT FK_Assistant_Academic_Personnel;
ALTER TABLE Building DROP CONSTRAINT FK_Building_Department;
ALTER TABLE Department DROP CONSTRAINT FK_Department_Faculty;
ALTER TABLE Department DROP CONSTRAINT FK_Department_Professor;
ALTER TABLE Course DROP CONSTRAINT FK_Course_Department;
ALTER TABLE Prerequisite DROP CONSTRAINT FK_Prerequisite_Course;
ALTER TABLE Prerequisite DROP CONSTRAINT FK_Prerequisite_Course_2;
ALTER TABLE Classroom DROP CONSTRAINT FK_Classroom_Building;
ALTER TABLE Faculty DROP CONSTRAINT FK_Faculty_Professor;
ALTER TABLE Student DROP CONSTRAINT FK_Student_Professor;
ALTER TABLE Student DROP CONSTRAINT FK_Student_Department;
ALTER TABLE Section_Enrollment DROP CONSTRAINT FK_Section_Enrollment_Student;
ALTER TABLE Section_Enrollment DROP CONSTRAINT FK_Section_Enrollment_Section;
ALTER TABLE Professor DROP CONSTRAINT FK_Professor_Academic_Personnel;
ALTER TABLE Section DROP CONSTRAINT FK_Section_Course;
ALTER TABLE Section DROP CONSTRAINT FK_Section_Classroom;
ALTER TABLE Section DROP CONSTRAINT FK_Section_Professor;
ALTER TABLE Section DROP CONSTRAINT FK_Section_Semester;


--- Truncate Tables
--- Truncation resets identity seed.
--- Use truncate instead of deleting all rows

TRUNCATE TABLE Academic_Personnel;
TRUNCATE TABLE Assistant;
TRUNCATE TABLE Building;
TRUNCATE TABLE Department;
TRUNCATE TABLE Course;
TRUNCATE TABLE Prerequisite;
TRUNCATE TABLE Classroom;
TRUNCATE TABLE Faculty;
TRUNCATE TABLE Student;
TRUNCATE TABLE Section_Enrollment;
TRUNCATE TABLE Professor;
TRUNCATE TABLE Section;
TRUNCATE TABLE Semester;



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