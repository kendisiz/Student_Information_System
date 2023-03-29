const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')


const indexRouter = require('./routes/index');
const studentsRouter = require('./routes/Students');
const professorsRouter = require('./routes/Professors');
const semestersRouter = require('./routes/Semesters');
const sectionsRouter = require('./routes/Sections');
const coursesRouter = require('./routes/Courses');
const studentsSectionsRouter = require('./routes/StudentsSections');
const professorsSectionsRouter = require('./routes/ProfessorsSections');
const professorsSectionEnrollmentsRouter = require('./routes/ProfessorsSectionEnrollments');
const databaseBatchOperationsRouter = require('./routes/DatabaseBatchOperations');

const app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/students', studentsRouter);
app.use('/professors', professorsRouter);
app.use('/semesters', semestersRouter);
app.use('/sections', sectionsRouter);
app.use('/courses', coursesRouter);
app.use('/students/:id/sections', (req, res, next) => {
    // add student_id parameter so that studentsSectionsRouter can access it
    req.student_id = req.params.id;
    next();
}, studentsSectionsRouter);
app.use('/professors/:id/sections', (req, res, next) => {
    // add academic_personnel_id parameter so that professorsSectionRouter can access it
    req.academic_personnel_id = req.params.id;
    next();
}, professorsSectionsRouter);
app.use('/professors/:id/sectionEnrollments', (req, res, next) => {
    // add academic_personnel_id parameter so that professorsSectionEnrollmentsRouter can access it
    req.academic_personnel_id = req.params.id;
    next();
}, professorsSectionEnrollmentsRouter);

app.use('/databaseBatchOperations', databaseBatchOperationsRouter);

module.exports = app;
