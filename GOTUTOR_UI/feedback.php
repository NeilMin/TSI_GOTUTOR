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
                <br/>
                <label>Select an appointment to send feedback</label>
                <select id="pastAppointmentList">
                    <option value="1">one</option>
                    <option value="2">two</option>
                    <option value="3">three</option>
                    <option value="4">four</option>
                </select>
                <button id="select">Select</button>
                <ul>
                    A list of single choice questions
                    <li id="Q1">Question1</li>
                    <select id="answerList">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                    <li id="Q2">Question2</li>
                    <select id="answerList">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                    <li id="Q3">Question3</li>
                    <select id="answerList">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                    <li id="Q4">Question4</li>
                    <select id="answerList">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                </ul>
                <button id="submit">Submit</button>
            </div>
        </div>
    </div>
</div>
</body>