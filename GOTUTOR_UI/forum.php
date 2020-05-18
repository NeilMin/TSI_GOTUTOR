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
                <li><a href="tutor.php">Tutor</a></li>
                <li><a href="ticket.php">Ticket</a></li>
                <li><a href="setting.php">Setting</a></li>
                <li><a href="help.php">Help</a></li>
                <li><a href="#">Log Out</a></li>
            </ul>
        </nav>
        <div class="content">
            <div class="both">
                <form id="postNewQuestion">
                    <label>Post a new question
                        <input/>
                    </label>
                    <button id="post">Post</button>
                </form>
                <ul>
                    <li id="QA1">
                        Question 1
                        <table id="question1">
                            <tr>
                                <th>Number</th>
                                <th>Sumbitter name</th>
                                <th>Submission date</th>
                                <th>Submission time</th>
                                <th>Problem</th>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>Smith</td>
                                <td>0514</td>
                                <td>1924</td>
                                <td>Installation problem</td>
                            </tr>
                        </table>
                        <table id="answer1">
                            <tr>
                                <th>Number</th>
                                <th>Sumbitter name</th>
                                <th>Submission date</th>
                                <th>Submission time</th>
                                <th>Answer</th>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>Smith</td>
                                <td>0514</td>
                                <td>1924</td>
                                <td>Installation answer</td>
                            </tr>
                        </table>
                        <form>
                            <label>
                                Enter an answer
                                <input/>
                            </label>
                            <button id="answer">Answer</button>
                        </form>
                    </li>
                    <li id="QA2">
                        Question 2
                        <table id="question2">
                            <tr>
                                <th>Number</th>
                                <th>Sumbitter name</th>
                                <th>Submission date</th>
                                <th>Submission time</th>
                                <th>Problem</th>
                            </tr>
                            <tr>
                                <td>02</td>
                                <td>Smith</td>
                                <td>0514</td>
                                <td>1924</td>
                                <td>Installation problem</td>
                            </tr>
                        </table>
                        <table id="answer2">
                            <tr>
                                <th>Number</th>
                                <th>Sumbitter name</th>
                                <th>Submission date</th>
                                <th>Submission time</th>
                                <th>Answer</th>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>Smith</td>
                                <td>0514</td>
                                <td>1924</td>
                                <td>Installation answer</td>
                            </tr>
                        </table>
                        <form>
                            <label>
                                Enter an answer
                                <input/>
                            </label>
                            <button id="answer">Answer</button>
                        </form>
                    </li>
                    <li id="QA3">
                        Question 3
                        <table id="question3">
                            <tr>
                                <th>Number</th>
                                <th>Sumbitter name</th>
                                <th>Submission date</th>
                                <th>Submission time</th>
                                <th>Problem</th>
                            </tr>
                            <tr>
                                <td>03</td>
                                <td>Smith</td>
                                <td>0514</td>
                                <td>1924</td>
                                <td>Installation problem</td>
                            </tr>
                        </table>
                        <table id="answer1">
                            <tr>
                                <th>Number</th>
                                <th>Sumbitter name</th>
                                <th>Submission date</th>
                                <th>Submission time</th>
                                <th>Answer</th>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>Smith</td>
                                <td>0514</td>
                                <td>1924</td>
                                <td>Installation answer</td>
                            </tr>
                        </table>
                        <form>
                            <label>
                                Enter an answer
                                <input/>
                            </label>
                            <button id="answer">Answer</button>
                        </form>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</body>