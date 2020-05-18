<!DOCTYPE HTML>
<html lang="en">
<head>
    <link href="styles.css" rel="stylesheet">
    <title>GoTutor!</title>
</head>

<body>
<div class="bg-main">
    <div class="container">
        <nav>
            <img src="images/GoTutor.png" alt="logo" class="logo">
            <ul>
                <li class="classrooms">Classrooms
                <li>
                    <button>Classroom1</button>
                </li>
                <li>
                    <button>Classroom2</button>
                </li>
                <li>
                    <button>Classroom3</button>
                </li>
                <li>
                    <button>Classroom4</button>
                </li>
                </li>
                <li><a href="writeup.php">Writeup</a></li>
                <li><a href="classroom.php">Classroom</a></li>
                <li><a href="forum.php">Forum</a></li>
                <li><a href="tutor.php">Tutor</a></li>
                <li><a href="ticket.php">Ticket</a></li>
                <li><a href="setting.php">Setting</a></li>
                <li><a href="help.php">Help</a></li>
                <li><a href="#">Log Out</a></li>
            </ul>
        </nav>
        <div class="content">
            <div class="student">
                Section for student:
                <br/>
                <table id="submittedAppoitment">
                    Upcoming appointments submitted
                    <tr>
                        <th>Number</th>
                        <th>Tutor name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Problem</th>
                        <th>Submission date</th>
                        <th>Submission time</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>Smith</td>
                        <td>0407</td>
                        <td>1200</td>
                        <td>Installation problem</td>
                        <td>0514</td>
                        <td>0707</td>
                        <td>Pending</td>
                    </tr>
                </table>
                <form id="createAppointment">
                    Create an appointment
                    <br/>
                    <label>Tutor name</label>
                    <select id="tutorNameList">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                    <label>Date</label>
                    <select id="appointmentDate">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                    <label>Time</label>
                    <select id="appointmentTime">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                    <label>
                        Problem
                        <input/>
                    </label>
                    <button id="add">Create</button>
                </form>
                <table id="pastAppointment">
                    Past appointments
                    <tr>
                        <th>Number</th>
                        <th>Tutor name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Problem</th>
                        <th>Submission date</th>
                        <th>Submission time</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>Smith</td>
                        <td>0407</td>
                        <td>1200</td>
                        <td>Installation problem</td>
                        <td>0514</td>
                        <td>1925</td>
                        <td>Declined/Apporved</td>
                    </tr>
                </table>
            </div>
            <br/>
            <div class="tutor">
                Section for tutor:
                <br/>
                <table id="acceptedAppointment">
                    Accepted appointments
                    <tr>
                        <th>Number</th>
                        <th>Studnet name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Problem</th>
                        <th>Submission date</th>
                        <th>Submission time</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>Smith</td>
                        <td>0407</td>
                        <td>1200</td>
                        <td>Installation problem</td>
                        <td>0514</td>
                        <td>1924</td>
                        <td>Apporved</td>
                    </tr>
                </table>
                <form id="cancelAppointment">
                    <label>Cancel appointments</label>
                    <select id="acceptedAppointmentList">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                    <button id="cancel">Cancel</button>
                </form>
                <table id="futureAppointment">
                    Future appointments
                    <tr>
                        <th>Number</th>
                        <th>Student name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Problem</th>
                        <th>Submission date</th>
                        <th>Submission time</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>Smith</td>
                        <td>0407</td>
                        <td>1200</td>
                        <td>Installation problem</td>
                        <td>0514</td>
                        <td>1924</td>
                        <td>Pending</td>
                    </tr>
                </table>
                <label>Select an appointment</label>
                <select id="futureAppointmentList">
                    <option value="1">one</option>
                    <option value="2">two</option>
                    <option value="3">three</option>
                    <option value="4">four</option>
                </select>
                <button id="Apporve">Apporve</button>
                <button id="Decline">Decline</button>
                <br/>
                <table id="pastAppointment">
                    Past appointments
                    <tr>
                        <th>Number</th>
                        <th>Student name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Problem</th>
                        <th>Submission date</th>
                        <th>Submission time</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>Smith</td>
                        <td>0407</td>
                        <td>1200</td>
                        <td>Installation problem</td>
                        <td>0514</td>
                        <td>1925</td>
                        <td>Declined/Apporved</td>
                    </tr>
                </table>
                <label>Select an appointment</label>
                <select id="pastAppointmentList">
                    <option value="1">one</option>
                    <option value="2">two</option>
                    <option value="3">three</option>
                    <option value="4">four</option>
                </select>
                <button id="requestFeedback">Request feedback</button>
            </div>
        </div>
    </div>
</div>
</body>