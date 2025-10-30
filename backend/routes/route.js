const router = require('express').Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const { adminRegister, adminLogIn, getAdminDetail} = require('../controllers/admin-controller.js');

const { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents } = require('../controllers/class-controller.js');
const { complainCreate, complainList } = require('../controllers/complain-controller.js');
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.js');
const {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance } = require('../controllers/student_controller.js');
const { subjectCreate, classSubjects, deleteSubjectsByClass, getSubjectDetail, deleteSubject, freeSubjectList, allSubjects, deleteSubjects } = require('../controllers/subject-controller.js');
const { teacherRegister, teacherLogIn, getTeachers, getTeacherDetail, deleteTeachers, deleteTeachersByClass, deleteTeacher, updateTeacherSubject, teacherAttendance } = require('../controllers/teacher-controller.js');
const { admissionCreate, admissionList, getAdmissionDetail, updateAdmission, deleteAdmission, deleteAdmissions } = require('../controllers/admission-controller.js');
const { feeCreate, feeList, getStudentFees, getFeeDetail, updateFee, payFee, deleteFee, deleteFees } = require('../controllers/fee-controller.js');
const { hostelCreate, hostelList, getHostelDetail, updateHostel, addRoom, allocateRoom, deallocateRoom, deleteHostel, deleteHostels } = require('../controllers/hostel-controller.js');
const { examCreate, examList, getClassExams, getExamDetail, updateExam, addSchedule, deleteExam, deleteExams } = require('../controllers/exam-controller.js');

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);

router.get("/Admin/:id", getAdminDetail)
// router.delete("/Admin/:id", deleteAdmin)

// router.put("/Admin/:id", updateAdmin)

// Student

router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn)

// Student Applications (registration requests)
const { createApplication, listPendingApplications, approveApplication, rejectApplication } = require('../controllers/student_application_controller.js');
router.post('/StudentApplication', createApplication);
router.get('/StudentApplications', listPendingApplications);
router.put('/StudentApplication/approve/:id', approveApplication);
router.put('/StudentApplication/reject/:id', rejectApplication);

router.get("/Students/:id", getStudents)
router.get("/Student/:id", getStudentDetail)

router.delete("/Students/:id", deleteStudents)
router.delete("/StudentsClass/:id", deleteStudentsByClass)
router.delete("/Student/:id", deleteStudent)

router.put("/Student/:id", updateStudent)

router.put('/UpdateExamResult/:id', updateExamResult)

// Attendance disabled
// router.put('/StudentAttendance/:id', studentAttendance)

// Attendance disabled
// router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
// router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);

// Attendance disabled
// router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
// router.put('/RemoveStudentAtten/:id', removeStudentAttendance)

// Teacher

router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn)

router.get("/Teachers/:id", getTeachers)
router.get("/Teacher/:id", getTeacherDetail)

router.delete("/Teachers/:id", deleteTeachers)
router.delete("/TeachersClass/:id", deleteTeachersByClass)
router.delete("/Teacher/:id", deleteTeacher)

router.put("/TeacherSubject", updateTeacherSubject)

// Attendance disabled
// router.post('/TeacherAttendance/:id', teacherAttendance)

// Notice





router.post('/NoticeCreate', noticeCreate);

router.get('/NoticeList/:id', noticeList);

router.delete("/Notices/:id", deleteNotices)
router.delete("/Notice/:id", deleteNotice)

router.put("/Notice/:id", updateNotice)

// Complain

router.post('/ComplainCreate', complainCreate);

router.get('/ComplainList/:id', complainList);

// Sclass

router.post('/SclassCreate', sclassCreate);

router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail)

router.get("/Sclass/Students/:id", getSclassStudents)

router.delete("/Sclasses/:id", deleteSclasses)
router.delete("/Sclass/:id", deleteSclass)

// Subject

router.post('/SubjectCreate', subjectCreate);

router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail)

router.delete("/Subject/:id", deleteSubject)
router.delete("/Subjects/:id", deleteSubjects)
router.delete("/SubjectsClass/:id", deleteSubjectsByClass)

// Admission

router.post('/AdmissionCreate', admissionCreate);

router.get('/AdmissionList/:id', admissionList);
router.get('/Admission/:id', getAdmissionDetail);

router.put('/Admission/:id', updateAdmission);

router.delete('/Admission/:id', deleteAdmission);
router.delete('/Admissions/:id', deleteAdmissions);

// Fee Management

router.post('/FeeCreate', feeCreate);

router.get('/FeeList/:id', feeList);
router.get('/StudentFees/:id', getStudentFees);
router.get('/Fee/:id', getFeeDetail);

router.put('/Fee/:id', updateFee);
router.put('/PayFee/:id', payFee);

router.delete('/Fee/:id', deleteFee);
router.delete('/Fees/:id', deleteFees);

// Hostel

router.post('/HostelCreate', hostelCreate);

router.get('/HostelList/:id', hostelList);
router.get('/Hostel/:id', getHostelDetail);

router.put('/Hostel/:id', updateHostel);
router.put('/AddRoom/:id', addRoom);
router.put('/AllocateRoom/:id', allocateRoom);
router.put('/DeallocateRoom/:id', deallocateRoom);

router.delete('/Hostel/:id', deleteHostel);
router.delete('/Hostels/:id', deleteHostels);

// Exam

router.post('/ExamCreate', examCreate);

router.get('/ExamList/:id', examList);
router.get('/ClassExams/:id', getClassExams);
router.get('/Exam/:id', getExamDetail);

router.put('/Exam/:id', updateExam);
router.put('/AddSchedule/:id', addSchedule);

router.delete('/Exam/:id', deleteExam);
router.delete('/Exams/:id', deleteExams);

router.get('/FeePending/:studentId',)

router.post("/Fee", feeCreate);
router.get("/FeeList/:id", feeList);
router.get("/StudentFees/:id", getStudentFees);
router.get("/Fee/:id", getFeeDetail);
router.put("/Fee/:id", updateFee);
router.post("/FeePay/:id", payFee);
router.delete("/Fee/:id", deleteFee);
router.delete("/Fees/:id", deleteFees);
router.get("/fees/:studentId", getStudentFees);
module.exports = router;
