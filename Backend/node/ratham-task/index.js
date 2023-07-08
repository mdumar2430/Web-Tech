const e = require('express')
var express = require('express')
var jwt = require('jsonwebtoken')
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database: "mydb"
})
var currentUser = {}
connection.connect((err)=>{
    if(err){
        console.error("MYSQL Error in Connecting")
    }
    else{
        console.log("MYSQL Connected!")
    }
})
const currentTimeStamp = new Date().toISOString()
const app = express()

app.use(express.json())

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    const [authType, token] = authHeader.split(' ');
  
    if (authType !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    try {
      const decoded = jwt.verify(token, 'hacker');
  
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
}

app.get('/api/getSessions', verifyToken, function (req, res) {
    //User is Authenticated by verifyToken function
    if(currentUser.Role === 'Student'){
        const query = `SELECT s.SessionId,
                                s.DeanId,
                                u.Name AS DeanName,
                                s.StartTime,
                                s.EndTime
                            FROM
                                sessionlist s
                            JOIN
                                users u ON s.DeanId = u.UniversityId
                            WHERE
                                u.Role = 'Dean' And s.StartTime > ?;`;
        connection.query(query, [currentTimeStamp],(err, rows)=>{
            if(err){
                res.json({
                    error: err
                })
            }
            if(rows.length === 0){
                res.json({
                    message:"No Sessions Available"
                })
            }
            rows.forEach(element => {
                const date = new Date(element.StartTime)
                const date1 = new Date(element.EndTime)
                const indianTime = date.toLocaleString('en-IN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZone: 'Asia/Kolkata', 
                  });
                  const indianTime1 = date1.toLocaleString('en-IN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZone: 'Asia/Kolkata',
                  });
                element.StartTime = indianTime
                element.EndTime = indianTime1
            });
            res.json({
                sessions:rows
            })
        })
    }
    else{
        res.json({
            message:"Only for Students!"
        })
    }
})

app.get('/api/getToken', (req, res) => {
    const query = "Select * from users where universityId = "+req.body.univId+" and password = '"+req.body.pass+"'";
    connection.query(query, (err, rows)=>{
        if(err){
            res.json({
                error: err
            })
        }
        if(rows.length === 0){
            res.json({
                message:"Invalid Credentials"
            })
        }
        currentUser = rows[0]
        const userToken = jwt.sign(req.body, "hacker")
        res.json({
            message: "Login Successful",
            token: userToken,
            currentUsers:  currentUser
        })
    })
})

app.post('/api/bookSlots',verifyToken, (req, res, next)=>{
    if(currentUser.Role === 'Student'){
        // Prepare the SQL query with placeholders
        const query = `
        INSERT INTO slotbookings (BookingId, SessionId, StudentId)
        SELECT ?, ?, ?
        FROM sessionList
        WHERE SessionId = ? AND StartTime > ?
        `;

        // Specify the values for the placeholders
        const values = ['NULL', req.body.sessId, req.user.univId, req.body.sessId, currentTimeStamp];
        connection.query(query, values,(err, result) => {
            if(err){
                if(err.code === 'ER_DUP_ENTRY'){
                    res.json({
                        message: "You have Already booked for this Session!"
                    })
                }else{
                    res.json({
                        error: err
                    }) 
                }
            }
            else{
                res.json({
                    message:"Slot booked successfully!"
                })
            }
        })
    }
    else{
        res.json({
            message:"Only for Students!"
        })
    }
})

app.get('/api/getPendingSessions', verifyToken, (req,res, next) =>{
    if(currentUser.Role === 'Dean'){
        const query = `
                        SELECT
                            s.SessionId,
                            u.Name AS StudentName,
                            s.StartTime,
                            s.EndTime
                        FROM
                            sessionlist s
                        JOIN
                            slotbookings b ON s.SessionId = b.SessionId
                        JOIN
                            users u ON b.StudentId = u.UniversityId
                        WHERE
                            s.DeanId = ? AND s.StartTime > ?
                        `;
        connection.query(query,[req.user.univId, currentTimeStamp],(err, rows)=>{
            if(err){
                res.json({
                    error: err
                })
            }
            if(rows.length === 0){
                res.json({
                    message:"No Pending Sessions Available"
                })
            }
            rows.forEach(element => {
                const date = new Date(element.StartTime)
                const date1 = new Date(element.EndTime)
                const indianTime = date.toLocaleString('en-IN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZone: 'Asia/Kolkata', 
                  });
                  const indianTime1 = date1.toLocaleString('en-IN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZone: 'Asia/Kolkata',
                  });
                element.StartTime = indianTime
                element.EndTime = indianTime1
            })
            res.json({
                pendingSessions: rows
            })
        })
    }
    else{
        res.json({
            error:"You are not authorized to this section!"
        })
    }
})




app.listen(3000, function () {
    console.log("APP running at port 3000")
})