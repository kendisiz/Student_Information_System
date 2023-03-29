interface StudentResponse {
    student_id: number,
    advisor_id: number,
    advisorName: string,
    advisorSurname: string,
    department_id: number,
    departmentName: string,
    tcno: string,
    name: string,
    surname: string,
    email: string,
    GPA: string,
    total_credits: number
}

interface ProfessorResponse {
    academicPersonnel_id: number,
    department_id: number,
    departmentName: string,
    tcno: string,
    name: string,
    surname: string,
    email: string,
    office_id: string,
    phoneNumber: string,
    websiteURL: string,
    researchArea: string
}

interface SemesterResponse {
    semester_id: number,
    year: number,
    season: string,
    isActive: boolean
}

interface StudentSectionResponse {
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
}

interface SectionResponse {
    section_id: number,
    academic_personnel_id: number,
    academic_personnel_name: string,
    academic_personnel_surname: string,
    classroom_id: number,
    classroom_name: string,
    course_id: number,
    course_name: string,
    course_credits: number,
    department_id: number,
    department_name: string,
    semester_id: number,
    semester_year: string,
    semester_season: string,
    section_number: number,
    week_day: string,
    start_time: string,
    end_time: string,
    capacity: number,
    numberOfEnrollment: number
}

interface professorSectionResponse {
    section_id: number,
    classroom_id: number,
    classroom_name: string,
    course_id: number,
    course_name: string,
    course_credits: number,
    department_id: number,
    department_name: string,
    semester_id: number,
    semester_year: string,
    semester_season: string,
    section_number: number,
    weekday: string,
    start_time: string,
    end_time: string,
}

interface professorSectionEnrollmentResponse {
    section_id: number,
    grade: string,
    course_id: number,
    course_name: string,
    course_credits: number,
    student_id: number,
    student_name: string,
    student_surname: string,
    student_email: string
}

interface CourseResponse {
    course_id: number,
    course_name: string,
    department_id: number,
    department_name: string,
    credits: number
}