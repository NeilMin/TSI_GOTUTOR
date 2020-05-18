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
                <form id="selectTutor">
                    <label>Select a tutor</label>
                    <select id="tutorNametList">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                    <button id="select">Select</button>
                </form>
                <table id="tutorProfile">
                    Selected tutor profile
                    <tr>
                        <th>Tutor name</th>
                        <th>Tutor style</th>
                        <th>TO DO</th>
                        <th>TO DO</th>
                    </tr>
                    <tr>
                        <td>Smith</td>
                        <td>TO DO</td>
                        <td>TO DO</td>
                        <td>TO DO</td>
                    </tr>
                </table>
            </div>
            <br/>
            <div class="tutor">
                Section for tutor:
                <br/>
                <table id="tutorProfile">
                    Current tutor profile
                    <tr>
                        <th>Tutor name</th>
                        <th>Tutor style</th>
                        <th>TO DO</th>
                        <th>TO DO</th>
                    </tr>
                    <tr>
                        <td>Smith</td>
                        <td>TO DO</td>
                        <td>TO DO</td>
                        <td>TO DO</td>
                    </tr>
                </table>
                <form id="editTutorProfile">
                    <label>Edit tutor profile</label>
                    <br/>
                    <label>Select a characteristic</label>
                    <select id="characterList">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                    <label>Fill out information</label>
                    <input/>
                    <button id="save">Save</button>
                </form>
                <form id="selectTutor">
                    <label>Select a tutor</label>
                    <select id="tutorNametList">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                    <button id="select">Select</button>
                </form>
                <table id="tutorProfile">
                    Selected tutor profile
                    <tr>
                        <th>Tutor name</th>
                        <th>Tutor style</th>
                        <th>TO DO</th>
                        <th>TO DO</th>
                    </tr>
                    <tr>
                        <td>Smith</td>
                        <td>TO DO</td>
                        <td>TO DO</td>
                        <td>TO DO</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</body>