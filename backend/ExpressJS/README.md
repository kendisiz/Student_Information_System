# Use Cases

## Users

- A specific student
- A specific professor
- Admin

There will be a fake login for these users.

## Main Page Use Cases

In the main page, a specific student, professor or admin account should be selected. (fake account without password)

1. Get all students:

   - REST Endpoint:

   ```
    GET Students/

    Response.body: {
        student_id: number,
        advisor_id: number,
        advisor_name: string,
        advisor_surname: string,
        department_id: number,
        department_name: string,
        tcno: number,
        name: string,
        surname: string,
        email: string,
        GPA: number,
        total_credits: number
    }
   ```

   - SQL:

   ```sql
    SELECT * FROM Student;
   ```

2. Get all professors:

   - REST Endpoint:

   ```
   GET Professors/

   Response.body: {
    ...
   }
   ```

   - SQL:

   ```sql
   SELECT * FROM Professor;
   ```

3. Get all semesters
   - REST Endpoint:
   ```
   GET Semesters/
   ```
   - SQL:
   ```sql
   SELECT * FROM Semester;
   ```

## Student Use Cases

Common Parameter: **@student_id**  
Common prerequisite: student should exist

1. List my courses in a semester.

   - parameters: **@semester_id**
   - REST Endpoint:

   ```
   GET Students/:id/sections?semester_id=...

   Response.body: {
       sections: [
           {
               section_id: number,
               grade: number,
               academic_personnel_id: number,
               academic_personnel_name: string,
               academic_personnel_surname: string,
               classroom_id: number,
               classroom_name: string,
               course_id: number,
               course_name: string,
               semester_id: number,
               semester_year: string,
               semester_season: string,
               section_number: number,
               week_day: string,
               start_time: string,
               end_time: string
           },
           { ... },
           { ... },
           ...
       ]
   }
   ```

   - SQL:

   ```sql
   SELECT
    sen.section_id, sen.grade, sec.academic_personnel_id, sec.classroom_id, sec.course_id, sec.semester_id, sec.section_number, sec.week_day, sec.start_time, sec.end_time
   FROM Student AS st
   JOIN Section_Enrollment AS sen
    ON st.student_id = sen.student_id
   JOIN Section AS sec
    ON sen.section_id = sec.section_id `;
   ```

2. Display capacity and current number of enrolled students in a section.

   - parameters: **@section_id**
   - REST Endpoint:

   ```
    GET sections/:id
        Response.body: {
            section: [
               section_id: number,
               capacity: number,
               current_number_of_students: number
            ]
        }
   ```

   - SQL:

   ```sql

   ```

3. Add new course section in the active semester.

   - parameters: **@section_id**
   - preconditions:
     - section should exist
     - section semester should be active
     - section's current_number_of_students should be less than capacity
   - REST Endpoint:

   ```
   POST Students/:id/sections
   Request.body: {
      section_id: number
   }
   ```

   - SQL:

   ```sql
    -- Check if section is in the active semester
    SELECT
        Semester.is_active
    FROM
        Section JOIN Semester
            ON Section.semester_id = Semester.semester_id
    WHERE
        Section.section_id = @section_id

    -- Compute current number of students in the given section and the capacity of the section(capacity of classroom related to that section)
    SELECT
        Count(*) AS current_number_of_students,
        MIN(cl.capacity) AS capacity
    FROM Section AS sec
    JOIN Section_Enrollment AS se
        ON se.section_id = sec.section_id
    JOIN Classroom AS cl
        ON sec.classroom_id = cl.classroom_id
    WHERE
        sec.section_id = @section_id

    -- If current_number_of_students is less than capacity, insert new record
   INSERT INTO Section_Enrollment VALUES
   (@student_id, @section_id)
   ```

4. Drop an existing course in the active semester.

   - parameters: **@section_id**
   - preconditions:
     - section should exist
     - semester of section should be active
   - REST Endpoint:

   ```
   DELETE Students/:id/sections

   Request.body: {
      section_id: number
   }
   ```

   - SQL:

   ```sql
   -- Firstly, check that section is active
    DELETE FROM Section_Enrollment
    WHERE
        student_id = @student_id
        AND
        section_id = @section_id
   ```

5. Change section number of a course in the active semester.

   - parameters: **@old_section_id**, **@new_section_id**
   - preconditions:
     - student should already have old section
     - semester of section should be active
   - REST Endpoint:

   ```
    PUT Students/:id/sections

    Request.body: {
        old_section_id: number,
        new_section_id: number
    }
   ```

   - SQL:

   ```sql
    UPDATE Section_Enrollment
        SET section_id = @new_section_id
    WHERE
        student_id = @student_id
        AND
        section_id = @old_section_id
   ```

## Professor Use Cases

Common Parameter: **@academic_personnel_id**  
Common preconditions: professor should exist

1. List all sections given by the professor in a specific semester

   - parameter: **@semester_id**
   - REST Endpoint:

   ```
    GET Professors/:id/sections?semester_id=@semester_id

    Response.body = {
        section_id: number,
        classroom_id: number,
        course_id: number,
        semester_id: number,
        section_number: number,
        start_time: string,
        end_time: string,
        department_id: number,
        course_name: string,
        credits: number,
        year: number,
        season: string,
        is_active: boolean
    }

   ```

   - SQL:

   ```sql
    SELECT
        Section.*
    FROM
        Section AS sec
    WHERE
        sec.academic_personnel_id = @academic_personnel_id
        AND
        sec.semester_id = @semester_id
   ```

2. Display students of a section.

   - parameters: **@section_id**
   - REST Endpoint:

   ```
   GET Professors/:id/sectionEnrollments?section_id:...

   ```

3. Give grade to a student who takes section from that professor

   - parameters: **@student_id**, **@section_id**, **@grade**
   - preconditions:
     - semester of section should be active
     - professor of the given section should be same as @professor_id
   - REST Endpoint:

   ```
    PUT Professors/:id/sectionEnrollments

    Request.body: {
        student_id: number,
        section_id: number,
        grade: number
    }
   ```

   - SQL:

   ```sql
    UPDATE Section_Enrollment
    SET grade = @grade
    WHERE
        student_id = @student_id
        AND
        section_id = @section_id
   ```

## Admin Use Cases

1. List all students.

   - REST Endpoints:

   ```
    GET Students/
   ```

2. Create a new student related to a department.

   - parameters: **@department_id**
   - REST Endpoints:

   ```
    POST Students

    Request.body: {
        advisor_id: number,
        department_id: number,
        tcno: number,
        name: number,
        surname: number,
        email: number,
        GPA: null,
        total_credits: 0,
        last_update_time: currentTime()
    }
   ```

3. List all courses.

   - REST Endpoints:

   ```
    GET Courses
   ```

4. Create a new course related to a department.

   - parameters: **@department_id**
   - REST Endpoints:

   ```
    POST Course/:id

    Request.body: {
        chair_id: number,
        faculty_id: number,
        name: string
    }
   ```

5. List all sections.

   - REST Endpoints:

   ```
    GET Sections
   ```

6. Create a new section related to a professor, classroom, course, active semester and other fields.

   - parameters: **@academic_personel_id**, **@classroom_id**, **@course_id**, ...
   - REST Endpoints:

   ```
    POST Section/:id

    Request.body: {
        academic_personnel_id: number,
        classroom_id: number,
        course_id: string,
        ...
    }
   ```
