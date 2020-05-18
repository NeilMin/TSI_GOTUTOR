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
                <li><a href="setting.php">Setting</a></li>
                <li><a href="help.php">Help</a></li>
                <li><a href="#">Log Out</a></li>
            </ul>
        </nav>
        <div class="content">
            <div class="student">
                Section for student:
                <form id="createTicket">
                    Create a Ticket
                    <label>
                        Question
                        <input/>
                    </label>
                    <button id="create">Create</button>
                </form>
                <form id="cancelTicket">
                    <label>Cancel a ticket</label>
                    <select id="currentTicketList">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                    </select>
                    <button id="cancel">Cancel</button>
                </form>
                <table id="pastTicket">
                    Past tickets
                    <tr>
                        <th>Number</th>
                        <th>Student name</th>
                        <th>Submission date</th>
                        <th>Submission time</th>
                        <th>Problem</th>
                        <th>Status</th>
                        <th>Tutor name</th>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>Smith</td>
                        <td>0514</td>
                        <td>1924</td>
                        <td>Installation problem</td>
                        <td>Pending/Solved/Unsolved</td>
                        <td>Smith</td>
                    </tr>
                </table>
            </div>
            <br/>
            <div class="tutor">
                Section for tutor:
                <br/>
                <table id="submittedTicket">
                    Submitted tickets
                    <tr>
                        <th>Number</th>
                        <th>Student name</th>
                        <th>Submission date</th>
                        <th>Submission time</th>
                        <th>Problem</th>
                        <th>Status</th>
                        <th>Tutor name</th>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>Smith</td>
                        <td>0514</td>
                        <td>1924</td>
                        <td>Installation problem</td>
                        <td>Pending/Solved/Unsolved</td>
                        <td>Smith</td>
                    </tr>
                </table>
                <form id="addressTicket">
                    <label>Address a ticket
                        <select id="currentTicketList">
                            <option value="1">one</option>
                            <option value="2">two</option>
                            <option value="3">three</option>
                            <option value="4">four</option>
                        </select>
                    </label>
                    <button id="address">Address</button>
                </form>
                <button id="closeTicket">Close ticket</button>
            </div>
        </div>
    </div>
</div>
</body>