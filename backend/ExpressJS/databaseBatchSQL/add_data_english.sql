INSERT INTO Academic_Personnel(
	department_id,
	tcno,
	name,
	surname,
	email,
	P_TYPE)
VALUES
	(NULL, 12345678901, 'Orhan', 'Metin', 'orhanmetin@gmail.com', 'P'),
	(NULL, 12345678902, 'Ayşe', 'Sucu', 'aysesucu@gmail.com', 'A'),
	(NULL, 12345678903, 'Mehmet Furkan', 'Ceyhan', 'mfceyhan@yahoo.com', 'A'),
	(NULL, 12345678904, 'Berfin', 'Kaylan', 'berfinkaylan@gmail.com', 'P'),
	(NULL, 12345678905, 'Gülden', 'Sinem', 'guldensinem@gmail.com', 'A'),
	(NULL, 12345678906, 'Emir Murat', 'Çekiç', 'emirmuratcekic@live.com', 'A'),
	(NULL, 12345678907, 'Bulut', 'Susam', 'bulutsusam@hotmail.com', 'P'),
	(NULL, 12345678908, 'Mesut', 'Uçar', 'mesutucar@yahoo.com', 'A'),
	(NULL, 12345678909, 'Mustafa', 'Birdal', 'mustafabirdal@yahoo.com', 'P'),
	(NULL, 12345678910, 'Ada', 'Hacıoğlu', 'adahacioglu@live.com', 'A')
;

INSERT INTO Professor(
	academic_personnel_id,
	office_id,
	phone_number,
	website_url,
	research_area)
VALUES
	(1, 'A10', '3121011001', 'https://cs.hacettepe.edu.tr/orhanmetin', 'Veritabanları'),
	(4, 'B10', '3121011004', 'https://physics.hacettepe.edu.tr/berfinkaylan', 'Yüksek Enerji Fiziği'),
	(7, 'C10', '3121011007', 'https://math.hacettepe.edu.tr/bulutsusam', 'Analiz'),
	(9, 'A11', '3121011009', 'https://cs.hacettepe.edu.tr/mustafabirdal', 'Büyük Veri')
;

INSERT INTO Assistant(
	academic_personnel_id,
	professor_id)
VALUES
	(2, 1),
	(3, 1),
	(5, 4),
	(6, 4),
	(8, 7),
	(10, 7)
;

INSERT INTO Faculty(dean_id, name) VALUES
	(1, 'Mühendislik Fakültesi'),
	(4, 'Fen Fakültesi')
;

INSERT INTO Department(chair_id, faculty_id, name) VALUES
	(1, 1, 'Bilgisayar Mühendisliği'),
	(4, 2, 'Fizik'),
	(7, 2, 'Matematik')
;

UPDATE Academic_Personnel 
	SET department_id = 1 WHERE academic_personnel_id = 1;
UPDATE Academic_Personnel
	SET department_id = 1 WHERE academic_personnel_id = 2;
UPDATE Academic_Personnel
	SET department_id = 1 WHERE academic_personnel_id = 3;
UPDATE Academic_Personnel 
	SET department_id = 2 WHERE academic_personnel_id = 4;
UPDATE Academic_Personnel
	SET department_id = 2 WHERE academic_personnel_id = 5;
UPDATE Academic_Personnel
	SET department_id = 2 WHERE academic_personnel_id = 6;
UPDATE Academic_Personnel
	SET department_id = 3 WHERE academic_personnel_id = 7;
UPDATE Academic_Personnel
	SET department_id = 3 WHERE academic_personnel_id = 8;
UPDATE Academic_Personnel
	SET department_id = 1 WHERE academic_personnel_id = 9;
UPDATE Academic_Personnel
	SET department_id = 3 WHERE academic_personnel_id = 10;


INSERT INTO Building(name, department_id) VALUES
	('A Binası', 1),
	('B Binası', 2),
	('C Binası', 3)
;

INSERT INTO Classroom(building_id, name, capacity) VALUES
	(1, '101', 20),
	(1, '102', 30),
	(1, '201', 25),
	(2, '101', 30),
	(3, '101', 30),
	(3, '201', 20)
;

INSERT INTO Course(name, department_id, credits) VALUES
	('Nesne Yönelimli Programlamla I', 1, 4),
	('Nesne Yönelimli Programlamla II', 1, 4),
	('Veri Yapıları I', 1, 4),
	('Veri Yapıları II', 1, 3),
	('Algoritmalar I', 1, 4),
	('Algoritmalar II', 1, 3),
	('Temel Fizik I', 2, 4),
	('Temel Fizik II', 2, 4),
	('Kuantum Fiziğine Giriş I', 2, 4),
	('Kuantum Fiziği Giriş II', 2, 4),
	('Analiz I', 3, 4),
	('Analiz II', 3, 4),
	('Diferansiyel Denklemler I', 3, 4),
	('Diferansiyel Denklemler II', 3, 3),
	('Doğrusal Cebir', 3, 4),
	('İleri Doğrusal Cebir', 3, 4)
;

INSERT INTO Prerequisite(course_id, prerequisite_course_id) VALUES
	(2, 1),
	(3, 2),
	(4, 3),
	(5, 4),
	(6, 5),
	(8, 7),
	(9, 8),
	(10, 9),
	(12, 11),
	(13, 12),
	(14, 13),
	(16, 15)
;

INSERT INTO Semester VALUES
	(2020, 'Fall', 0),
	(2020, 'Spring', 0),
	(2020, 'Summer', 0),
	(2021, 'Fall', 0),
	(2021, 'Spring', 0),
	(2021, 'Summer', 0),
	(2022, 'Fall', 0),
	(2022, 'Spring', 1)
;


INSERT INTO Student(advisor_id, department_id, tcno, name, surname, email, GPA, total_credits, last_update_time) VALUES
	(1, 1, '12345678901', 'Özde', 'Acarkan', 'ozdeacarkan@gmail.com', 2.12, 38, '20200910'),
	(1, 1, '12345678902', 'Bahadır', 'Kula', 'bahadirkula@gmail.com', 2.69, 103, '20200911'),
	(4, 2, '12345678903', 'Evrim', 'Akmehmet', 'evrimakmehmet@yahoo.com', 3.19, 55, '20210913'),
	(4, 2, '12345678904', 'Selçuk', 'Şekerli', 'selcuksekerli@gmail.com', 1.93, 63, '20200911'),
	(7, 3, '12345678905', 'Fatih', 'Teksin', 'fatihteksin@gmail.com', 2.92, 44, '20210915'),
	(9, 1, '12345678906', 'Halenur', 'Gözaçan', 'halenurgozacan@gmail.com', 3.02, 74, '20200915')
;

INSERT INTO Section(academic_personnel_id, classroom_id, course_id, semester_id, section_number, week_day, start_time, end_time) VALUES
	(1, 1, 1, 1, 1, 'Monday', '10:00', '12:00'),
	(1, 2, 2, 2, 1, 'Wednesday', '9:00', '12:00'),
	(9, 1, 3, 1, 1, 'Tuesday', '13:00', '16:00'),
	(9, 1, 3, 1, 2, 'Thursday', '13:00', '16:00'),
	(4, 4, 7, 1, 1, 'Friday', '8:00', '11:00'),
	(4, 4, 9, 1, 1, 'Monday', '10:00', '13:00'),
	(4, 4, 10, 2, 1, 'Monday', '10:00', '12:00'),
	(7, 5, 11, 1, 1, 'Monday', '13:00', '16:00'),
	(7, 5, 12, 2, 1, 'Monday', '13:00', '16:00'),
	(7, 6, 12, 2, 2, 'Thursday', '13:00', '16:00'),
	(7, 5, 13, 4, 1, 'Tuesday', '9:00', '12:00')
;

INSERT INTO Section_Enrollment(student_id, section_id, grade) VALUES
	(1, 1, 3.00),
	(1, 2, 2.50),
	(1, 3, 2.75),
	(1, 4, 2.25),
	(2, 1, 3.25),
	(2, 2, 3.50),
	(2, 5, 3.25),
	(2, 6, 3.75),
	(6, 1, 2.00),
	(6, 2, 2.50),
	(6, 3, 2.25),
	(6, 4, 2.50),
	(3, 5, 3.00),
	(3, 7, 3.00),
	(4, 5, 3.25),
	(4, 6, 2.50),
	(5, 8, 2.00),
	(5, 9, 2.50),
	(5, 10, 2.50),
	(5, 11, 3.00)
;


------------------------------
------ SELECT Commands -------
------------------------------

SELECT * FROM Academic_Personnel;
SELECT * FROM Professor;
SELECT * FROM Assistant;
SELECT * FROM Faculty;
SELECT * FROM Department;
SELECT * FROM Building;
SELECT * FROM Classroom;
SELECT * FROM Course;
SELECT * FROM Prerequisite;
SELECT * FROM Student;
SELECT * FROM Section;
SELECT * FROM Semester;
SELECT * FROM Section_Enrollment;


-- Bölümler, fakülteleri, binaları ve akademik personelleri
SELECT * FROM Department AS dep
	FULL JOIN Faculty AS fa
		ON dep.faculty_id= fa.faculty_id
	FULL JOIN Building AS bu
		ON bu.department_id= dep.department_id
	FULL JOIN Academic_Personnel AS ap
		ON ap.department_id = dep.department_id

-- Ders önşartları
SELECT c.course_id, c.name, pr.prerequisite_course_id, c2.name FROM Course AS c
	FULL JOIN Prerequisite AS pr
		ON c.course_id = pr.course_id
	FULL JOIN Course AS c2
		ON pr.prerequisite_course_id= c2.course_id

-- Tüm Akademik Personelin bilgisi
SELECT * FROM Academic_Personnel AS ap
	LEFT JOIN Professor AS p
		ON ap.academic_personnel_id = p.academic_personnel_id
	LEFT JOIN Assistant AS asis
		ON ap.academic_personnel_id = asis.academic_personnel_id
;

-- Öğretim Üyelerinin bilgisi
SELECT * FROM Professor
	INNER JOIN Academic_Personnel
		ON Professor.academic_personnel_id= Academic_Personnel.academic_personnel_id
;