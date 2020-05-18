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
            <div class="both">
                <p id="writeupText">
                    writeupText, a PDF file will be displayed here.
                </p>
                <button id="view">View writeup in pdf</button>
                <button id="download">Download write up</button>
            </div>
            <br/>
            <div class="student">
                Section for student:
                <form>
                    a form to create a ticket
                    <br/>
                    <label>
                        TO DO
                        <input/>
                    </label>
                </form>
                <button id="reference">Select reference</button>
                <button id="createTicket">Create ticket</button>
            </div>
            <br/>
            <div class="tutor">
                Section for tutor:
                <button id="upload">Upload writeup</button>
            </div>
        </div>
    </div>
</body>
</html>