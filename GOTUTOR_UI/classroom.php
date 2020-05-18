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
                <li><a href="appointment.php">Appointment</a></li>
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
                Available tutor hours form
                <form>
                    <label>
                        Tutor preference
                    </label>
                    <select id="tutorPreferList">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                    <label>
                        Tutor name
                    </label>
                    <select id="tutorNameList">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                    <label>
                        Tutor hour
                    </label>
                    <select id="tutorHourList">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                    <button id="select">Select</button>
                </form>
            </div>
            <br/>
            <div class="tutor">
                Section for tutor:
                <button id="studentImport">Student import</button>
                <form id="addOfficeHour">
                    <label>Add office hour</label>
                    <select id="availableOfficeHour">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                    <button id="add">Add</button>
                </form>
                <form id="removeOfficeHour">
                    <label>Remove office hour</label>
                    <select id="currentOfficeHour">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                    <button id="add">Remve</button>
                </form>
                <table id="officeHourCalendar">
                    officeHourCalendar
                    <tr>
                        <th>Number</th>
                        <th>Tutor name</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>Smith</td>
                        <td>0407</td>
                        <td>1200</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>
</body>