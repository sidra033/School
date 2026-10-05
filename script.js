// ==========================================
// SCHOOL MANAGEMENT SYSTEM - JAVASCRIPT
// ==========================================


// ==========================================
// DATA
// ==========================================

let students = JSON.parse(localStorage.getItem("students")) || [];
let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
let attendance = JSON.parse(localStorage.getItem("attendance")) || [];
let fees = JSON.parse(localStorage.getItem("fees")) || [];
let results = JSON.parse(localStorage.getItem("results")) || [];


// ==========================================
// SAVE DATA
// ==========================================

function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("teachers", JSON.stringify(teachers));
    localStorage.setItem("attendance", JSON.stringify(attendance));
    localStorage.setItem("fees", JSON.stringify(fees));
    localStorage.setItem("results", JSON.stringify(results));
}


// ==========================================
// SHOW SECTION
// ==========================================

function showSection(sectionId, button) {

    document.querySelectorAll(".section").forEach(function(section) {
        section.classList.remove("active");
    });

    const section = document.getElementById(sectionId);

    if (section) {
        section.classList.add("active");
    }

    document.querySelectorAll(".nav-btn").forEach(function(btn) {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }
}


// ==========================================
// STUDENTS
// ==========================================

function displayStudents(list = students) {

    const table = document.getElementById("studentTable");

    if (!table) return;

    table.innerHTML = "";

    if (list.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="5">No students found.</td>
            </tr>
        `;
        updateDashboard();
        return;
    }

    list.forEach(function(student, index) {

        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.studentClass}</td>
                <td>${student.roll}</td>
                <td>
                    <button
                        onclick="deleteStudent('${student.id}')"
                        style="
                            background:#dc2626;
                            color:white;
                            border:none;
                            padding:8px 14px;
                            border-radius:6px;
                            cursor:pointer;
                        "
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

    updateDashboard();
}


// ADD STUDENT

function addStudent() {

    const name = document.getElementById("studentName").value.trim();
    const studentClass = document.getElementById("studentClass").value.trim();
    const roll = document.getElementById("studentRoll").value.trim();

    if (!name || !studentClass || !roll) {
        alert("Please fill all student fields.");
        return;
    }

    students.push({
        id: Date.now().toString(),
        name: name,
        studentClass: studentClass,
        roll: roll
    });

    saveData();
    displayStudents();

    document.getElementById("studentName").value = "";
    document.getElementById("studentClass").value = "";
    document.getElementById("studentRoll").value = "";

    closeStudentForm();

    alert("Student added successfully!");
}


// DELETE STUDENT

function deleteStudent(id) {

    if (!confirm("Delete this student?")) {
        return;
    }

    students = students.filter(function(student) {
        return String(student.id) !== String(id);
    });

    saveData();
    displayStudents();
    updateDashboard();
}


// SEARCH STUDENTS

function searchStudents() {

    const search =
        document.getElementById("studentSearch").value
        .toLowerCase()
        .trim();

    const filtered = students.filter(function(student) {

        return (
            String(student.name)
                .toLowerCase()
                .includes(search)

            ||

            String(student.studentClass)
                .toLowerCase()
                .includes(search)

            ||

            String(student.roll)
                .toLowerCase()
                .includes(search)
        );
    });

    displayStudents(filtered);
}


// ==========================================
// TEACHERS
// ==========================================

function displayTeachers(list = teachers) {

    const table = document.getElementById("teacherTable");

    if (!table) return;

    table.innerHTML = "";

    if (list.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5">No teachers found.</td>
            </tr>
        `;

        return;
    }

    list.forEach(function(teacher, index) {

        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${teacher.name}</td>
                <td>${teacher.subject}</td>
                <td>${teacher.phone}</td>
                <td>
                    <button
                        onclick="deleteTeacher('${teacher.id}')"
                        style="
                            background:#dc2626;
                            color:white;
                            border:none;
                            padding:8px 14px;
                            border-radius:6px;
                            cursor:pointer;
                        "
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}


// ADD TEACHER

function addTeacher() {

    const name =
        document.getElementById("teacherName").value.trim();

    const subject =
        document.getElementById("teacherSubject").value.trim();

    const phone =
        document.getElementById("teacherPhone").value.trim();

    if (!name || !subject || !phone) {

        alert("Please fill all teacher fields.");
        return;
    }

    teachers.push({

        id: Date.now().toString(),

        name: name,

        subject: subject,

        phone: phone
    });

    saveData();

    displayTeachers();

    updateDashboard();

    document.getElementById("teacherName").value = "";
    document.getElementById("teacherSubject").value = "";
    document.getElementById("teacherPhone").value = "";

    closeTeacherForm();

    alert("Teacher added successfully!");
}


// DELETE TEACHER

function deleteTeacher(id) {

    if (!confirm("Delete this teacher?")) {
        return;
    }

    teachers = teachers.filter(function(teacher) {

        return String(teacher.id) !== String(id);

    });

    saveData();

    displayTeachers();

    updateDashboard();
}


// ==========================================
// ATTENDANCE
// ==========================================

function displayAttendance() {

    const table =
        document.getElementById("attendanceTable");

    if (!table) return;

    table.innerHTML = "";

    attendance.forEach(function(item) {

        table.innerHTML += `
            <tr>
                <td>${item.student}</td>
                <td>${item.status}</td>
                <td>${item.date}</td>
            </tr>
        `;
    });
}


// MARK ATTENDANCE
// HTML uses attendanceName

function markAttendance() {

    const student =
        document.getElementById("attendanceName").value.trim();

    const status =
        document.getElementById("attendanceStatus").value;

    if (!student) {

        alert("Please enter student name.");
        return;
    }

    attendance.push({

        id: Date.now().toString(),

        student: student,

        status: status,

        date: new Date().toLocaleDateString()
    });

    saveData();

    displayAttendance();

    updateDashboard();

    document.getElementById("attendanceName").value = "";

    alert("Attendance marked successfully!");
}


// ==========================================
// FEES
// ==========================================

function displayFees() {

    const table =
        document.getElementById("feeTable");

    if (!table) return;

    table.innerHTML = "";

    fees.forEach(function(fee) {

        table.innerHTML += `
            <tr>
                <td>${fee.student}</td>
                <td>Rs. ${fee.amount}</td>
                <td>${fee.status}</td>
                <td>${fee.date}</td>
            </tr>
        `;
    });
}


// ADD FEE
// HTML has NO feeDate field.
// Therefore JavaScript automatically creates today's date.

function addFee() {

    const student =
        document.getElementById("feeStudent").value.trim();

    const amount =
        Number(document.getElementById("feeAmount").value);

    const status =
        document.getElementById("feeStatus").value;

    if (!student || !amount || amount <= 0) {

        alert("Please enter student name and valid amount.");
        return;
    }

    fees.push({

        id: Date.now().toString(),

        student: student,

        amount: amount,

        status: status,

        date: new Date().toLocaleDateString()
    });

    saveData();

    displayFees();

    updateDashboard();

    document.getElementById("feeStudent").value = "";
    document.getElementById("feeAmount").value = "";

    alert("Fee added successfully!");
}


// ==========================================
// RESULTS
// ==========================================

function calculateGrade(marks) {

    marks = Number(marks);

    if (marks >= 80) return "A+";
    if (marks >= 70) return "A";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    if (marks >= 40) return "D";

    return "F";
}


// DISPLAY RESULTS

function displayResults() {

    const table =
        document.getElementById("resultTable");

    if (!table) return;

    table.innerHTML = "";

    results.forEach(function(item) {

        table.innerHTML += `
            <tr>
                <td>${item.student}</td>
                <td>${item.subject}</td>
                <td>${item.marks}</td>
                <td>${item.grade}</td>
            </tr>
        `;
    });
}


// ADD RESULT

function addResult() {

    const student =
        document.getElementById("resultStudent").value.trim();

    const subject =
        document.getElementById("resultSubject").value.trim();

    const marks =
        Number(document.getElementById("resultMarks").value);

    if (!student || !subject || isNaN(marks)) {

        alert("Please enter all result information.");
        return;
    }

    if (marks < 0 || marks > 100) {

        alert("Marks must be between 0 and 100.");
        return;
    }

    results.push({

        id: Date.now().toString(),

        student: student,

        subject: subject,

        marks: marks,

        grade: calculateGrade(marks)
    });

    saveData();

    displayResults();

    document.getElementById("resultStudent").value = "";
    document.getElementById("resultSubject").value = "";
    document.getElementById("resultMarks").value = "";

    alert("Result added successfully!");
}


// ==========================================
// DASHBOARD
// ==========================================

function updateDashboard() {

    const studentCount =
        document.getElementById("studentCount");

    const teacherCount =
        document.getElementById("teacherCount");

    const feeTotal =
        document.getElementById("feeTotal");

    const attendanceCount =
        document.getElementById("attendanceCount");


    if (studentCount) {
        studentCount.textContent = students.length;
    }


    if (teacherCount) {
        teacherCount.textContent = teachers.length;
    }


    const totalFees = fees
        .filter(function(fee) {
            return fee.status === "Paid";
        })
        .reduce(function(total, fee) {
            return total + Number(fee.amount || 0);
        }, 0);

    if (feeTotal) {
        feeTotal.textContent =
            totalFees.toLocaleString();
    }


    if (attendanceCount) {

        if (attendance.length === 0) {

            attendanceCount.textContent = "0%";

        } else {

            const present =
                attendance.filter(function(item) {
                    return item.status === "Present";
                }).length;

            const percentage =
                Math.round(
                    (present / attendance.length) * 100
                );

            attendanceCount.textContent =
                percentage + "%";
        }
    }
}


// ==========================================
// FORM FUNCTIONS
// ==========================================

function openStudentForm() {

    const form =
        document.getElementById("studentForm");

    if (form) {
        form.style.display = "block";
    }
}


function closeStudentForm() {

    const form =
        document.getElementById("studentForm");

    if (form) {
        form.style.display = "none";
    }
}


function openTeacherForm() {

    const form =
        document.getElementById("teacherForm");

    if (form) {
        form.style.display = "block";
    }
}


function closeTeacherForm() {

    const form =
        document.getElementById("teacherForm");

    if (form) {
        form.style.display = "none";
    }
}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayStudents();

        displayTeachers();

        displayAttendance();

        displayFees();

        displayResults();

        updateDashboard();

    }
);