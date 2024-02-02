const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware to parse JSON request body
app.use(bodyParser.json());

app.use(express.json());

app.use(cors());
// Configure the MySQL connection
const db = mysql.createConnection({
  host: 'localhost',       // Change to your MySQL server host
  user: 'root',            // Change to your MySQL username
  password: 'root123',   // Change to your MySQL password
  database: 'Anemia',     // Change to the name of your MySQL database
});


// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


// Define your API routes here
// Example route for saving user data to the MySQL database
app.get('/', (req, result)=>{
    result.status(200);
    result.send("Welcom to Niramay Server");

   
});


// //REGISTER TABLE
// app.post('/api/createaccount', (req, result, next) => {
//   const { userName, email, phone, user, password } = req.body;

//   //Insert user data into the MySQL database
//   const check =  'Select count(userName) from register WHERE userName=?';
//   db.query(check, [userName], (error,results) => {
//     if (error) {
//       console.error('Database query error:', error);
//       return results.status(500).json({ error: 'Error saving user data', details: error.message });
//     }
//     if(results[0]['count(userName)']<=0){
//       const query = 'INSERT INTO register (userName, email, phone, user, password) VALUES (?, ?, ?, ?, ?)';
//       db.query(query, [userName, email, phone, user, password], (dberror, dbresult) => {
//         if (dberror) {
//           console.error('AlreadyExist UserName', dberror);
//           //return result.status(500).json({ error: 'Error saving user data', details: dberror.message });
//         }
//         result.status(201).json({ message: 'User data saved successfully' });
//       });
//     }
//     else{
//       return results.status(500).json({ message: 'AlreadyExist UserName' });
    
//     }
//     result.status(201).json({ message: 'User data saved successfully' });
//   });

//});



app.get('/api/visits', (req, res) => {
  
  const query = 'SELECT * FROM systemic';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log(results)
      res.json(results);
    }
  });
});












app.post('/api/createaccount', (req, result) => {
  const { userName, email, phone, user, password } = req.body;

  const check = 'SELECT COUNT(userName) AS userCount FROM register WHERE userName = ?';
  db.query(check, [userName], (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      return result.status(500).json({ error: 'Error checking user data', details: error.message });
    }

    if (results[0].userCount <= 0) {
      const query = 'INSERT INTO register (userName, email, phone, user, password) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [userName, email, phone, user, password], (dberror, dbresult) => {
        if (dberror) {
          console.error('Database query error:', dberror);
          return result.status(500).json({ error: 'Error saving user data', details: dberror.message });
        }
        return result.status(201).json({ message: 'User data saved successfully' });
      });
    } else {
      return result.status(500).json({ message: 'AlreadyExist UserName' });
    }
  });
});



//LOGIN TABLE
app.post('/api/loginuser', (req, result, next) => {
  const { userName, password } = req.body;

  console.log("Received data: ", req.body);

  //Validate user data from the MySQL database
  const query = 'SELECT user FROM register WHERE userName = ? AND password = ?';
  db.query(query, [userName, password], (dberror, dbresult) =>{
    if(dberror){
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving user data', details: dberror.message });
    }

    if (dbresult.length === 0) {
      return result.status(401).json({ error: 'Invalid credentials' });
    }

    // Send role information back to the client
    const userRole = dbresult[0].user;
    result.status(201).json({ message: 'User logged in successfully', user: userRole });
  });

});


app.post('/api/Setemail', (req, result, next) => {
  const { email } = req.body;

  console.log("Received data: ", req.body);

  //Validate user data from the MySQL database
  const query = 'SELECT email FROM register WHERE email = ?';
  db.query(query, [email], (dberror, dbresult) =>{
    if(dberror){
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving user data', details: dberror.message });
    }

    // Check if user exists
    if (dbresult.length === 0) {
      return result.status(401).json({ error: 'Invalid credentials' });
    }
    result.status(201).json({ message: 'Email Validated' });
  });

});



app.post('/api/Setphone', (req, result, next) => {
  const { phone } = req.body;

  console.log("Received data: ", req.body);

  //Validate user data from the MySQL database
  const query = 'SELECT phone FROM register WHERE phone = ?';
  db.query(query, [phone], (dberror, dbresult) =>{
    if(dberror){
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving user data', details: dberror.message });
    }
    // result.status(201).json({ message: 'User loged in successfully' });
    // Check if user exists
    if (dbresult.length === 0) {
      return result.status(401).json({ error: 'Invalid credentials' });
    }
    result.status(201).json({ message: 'User logged in successfully' });
  });

});


app.post('/api/Setpass', (req, result, next) => {
  const { password,email } = req.body;

  console.log("Received data: ", req.body);

  //Validate user data from the MySQL database
  const query = 'Update register set password=? WHERE email = ? ';
  db.query(query, [password, email], (dberror, dbresult) =>{
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving user data', details: dberror.message });
    }
    result.status(201).json({ message: 'User data saved successfully' });
  });

});



app.post('/api/Setpassp', (req, result, next) => {
  const { password,phone } = req.body;

  console.log("Received data: ", req.body);

  //Validate user data from the MySQL database
  const query = 'Update register set password = ? WHERE phone = ?';
  db.query(query, [password, phone], (dberror, dbresult) =>{
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving user data', details: dberror.message });
    }
    result.status(201).json({ message: 'User data saved successfully' });
  });

});






//NGO




// //KVS create 
// app.post('/api/saveKVSData', (req, res) => {
//   const {
//     kvsFullName,
//     kishoriVarg,
//     phoneNumber,
//     selectedDate,
//     enteredAge,
//     aadharNumber,
//     maritalStatus,
//     religion,
//     caste,
//     flatNumber,
//     area,
//     landmark,
//     city,
//     district,
//     state,
//     pincode,
//     userName,
//   } = req.body;

  
//   // Perform other validations as needed

//   // Assuming you have a MySQL database connection (you can modify this based on your database)
//   const query = `INSERT INTO KVSPersonalInformation ( kvsFullName,kishoriVarg,phoneNumber,selectedDate,enteredAge,aadharNumber,maritalStatus,religion,caste,flatNumber,area,landmark,city,district,state,pincode, userName, timeStamp)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())`;

//   db.query(
//     query,
//     [
//       kvsFullName,
//     kishoriVarg,
//     phoneNumber,
//     selectedDate,
//     enteredAge,
//     aadharNumber,
//     maritalStatus,
//     religion,
//     caste,
//     flatNumber,
//     area,
//     landmark,
//     city,
//     district,
//     state,
//     pincode,
//     userName
//     ],
//     (err, result) => {
//       if (err) {
//         console.error('Database query error:', err);
//         return res.status(500).json({ error: 'Error saving doctor data', details: err.message });
//       }

//       res.status(201).json({ message: 'Kishori Sevika data saved successfully' });
//     }
//   );
// });


//KVS create
app.post('/api/saveKVSData', (req, res) => {
  const {
    kvsFullName,
    kishoriVarg,
    phoneNumber,
    selectedDate,
    enteredAge,
    aadharNumber,
    maritalStatus,
    religion,
    caste,
    flatNumber,
    area,
    landmark,
    city,
    district,
    state,
    pincode,
    userName,
  } = req.body;


 
  // Perform other validations as needed


  if (!kvsFullName || !kishoriVarg || !aadharNumber || !enteredAge || !phoneNumber || !maritalStatus || !area || !city || !state) {
    return result.status(400).json({ error: 'Validation error', details: 'Please fill in all the required fields.' });
  }


  // Assuming you have a MySQL database connection (you can modify this based on your database)
  const query = `INSERT INTO KVSPersonalInformation ( kvsFullName,kishoriVarg,phoneNumber,selectedDate,enteredAge,aadharNumber,maritalStatus,religion,caste,flatNumber,area,landmark,city,district,state,pincode, userName, timeStamp)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())`;


  db.query(
    query,
    [
      kvsFullName,
    kishoriVarg,
    phoneNumber,
    selectedDate,
    enteredAge,
    aadharNumber,
    maritalStatus,
    religion,
    caste,
    flatNumber,
    area,
    landmark,
    city,
    district,
    state,
    pincode,
    userName
    ],
    (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Error saving KVS data', details: err.message });
      }


      res.status(201).json({ message: 'Kishori Sevika data saved successfully' });
    }
  );
});



// CreateKVS Table
// app.post('/api/saveKVSData', (req, result,next) =>{
//   const{kvsFullName, kishoriVarg,phoneNumber,selectedDate,enteredAge,aadharNumber,maritalStatus,religion,caste,flatNumber,area,landmark,city,district,state,pincode}=req.body;


//   console.log(reg.body);


//   const query = 'INSERT INTO kvsdetails(kvsFullName, kishoriVarg,phoneNumber,selectedDate,enteredAge,aadharNumber,maritalStatus,religion,caste,flatNumber,area,landmark,city,district,state,pincode) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
//   db.query(query,[kvsFullName, kishoriVarg,phoneNumber,selectedDate,enteredAge,aadharNumber,maritalStatus,religion,caste,flatNumber,area,landmark,city,district,state,pincode],(dberror,dbresult) => {
//     if(dberror){
//       console.error('Database query error:',dberror);
//       return result.status(500).json({error:'Error saving  data',details: dberror.message});
//     }
//     result.status(201).json({message: 'Updated successfully'});
//   });
// });


//delete doctor
app.post('/api/deleteDoctor', (req, result,next) =>{
  const{registrationNumber}=req.body;


  console.log(req.body);


  const query = 'Update doctorPersonalInformation set leavingdate=CURDATE() where registrationNumber=? ';
  db.query(query,[registrationNumber],(dberror,dbresult) => {
    if(dberror){
      console.error('Database query error:',dberror);
      return result.status(500).json({error:'Error saving data',details: dberror.message});
    }
    result.status(201).json({message: 'Deleted Succesfully successfully'});
  });
});


//DELETE KVS
app.post('/api/deleteKVS', (req, result,next) =>{
  const{kvsFullName, kishoriVarg, phoneNumber}=req.body;

  console.log(req.body);

  const query = 'Update KVSPersonalInformation set leavingDate=CURDATE() WHERE kvsFullName = ? AND kishoriVarg = ? AND phoneNumber = ? ';
  db.query(query,[kvsFullName, kishoriVarg, phoneNumber],(dberror,dbresult) => {
    if(dberror){
      console.error('Database query error:',dberror);
      return result.status(500).json({error:'Error saving data',details: dberror.message});
    }
    result.status(201).json({message: 'Deleted successfully'});
  });
});



//update child family details
app.post('/api/updateChildPersonal/updatechildFamily', (req, result, next) => {
  const {
                  childFullName,
                  fatherFullName,
                  fatherPhoneNumber,
                  fatherAadharNumber,
                  fatherAge,
                  fatherEducation,
                  fatherOccupation,
                  fatherIllness,
                  fatherAddiction,
                  motherFullName,
                  motherPhoneNumber,
                  motherAadharNumber,
                  motherAge,
                  motherEducation,
                  motherOccupation,
                  motherIllness,
                  motherAddiction,
                  familyType,
                  numberOfSiblings,
                  familyIllness,
                  familyIncome,userName
  } = req.body;

  console.log(req.body);

  // Update user data in the MySQL database
  //const query = 'UPDATE childpersonaldetails SET childFullName = ?, kishoriVarg = ?, selectedDate = ?, enteredAge = ?, aadharNumber = ?, schoolOrCollege = ?, standard = ?, religion = ?, caste = ?, maritalStatus = ?, flatNumber = ?, area = ?, landmark = ?, city = ?, district = ?, state = ?, pincode = ?  WHERE childFullName = ?';
  const query = 'UPDATE FamilyHistory SET fatherFullName = ?, fatherPhoneNumber = ?, fatherAadharNumber = ?, fatherAge = ?, fatherEducation = ?, fatherOccupation = ?, fatherIllness = ?, fatherAddiction = ?, motherFullName = ?, motherPhoneNumber = ?, motherAadharNumber = ?, motherAge = ?, motherEducation = ?, motherOccupation = ?, motherIllness = ?, motherAddiction = ?, familyType = ?, numberOfSiblings =?,familyIllness = ?, familyIncome = ?, userName =?,UpdateTimeStamp=CURDATE() WHERE childFullName = ?';


  console.log("SQL Query:", query);

  db.query(query,
    [
                  
                  fatherFullName,
                  fatherPhoneNumber,
                  fatherAadharNumber,
                  fatherAge,
                  fatherEducation,
                  fatherOccupation,
                  fatherIllness,
                  fatherAddiction,
                  motherFullName,
                  motherPhoneNumber,
                  motherAadharNumber,
                  motherAge,
                  motherEducation,
                  motherOccupation,
                  motherIllness,
                  motherAddiction,
                  familyType,
                  numberOfSiblings,
                  familyIllness,
                  familyIncome,userName,childFullName,
    ], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error updating data', details: dberror.message });
    }
    result.status(200).json({ message: ' data updated successfully' });
  });
});

//update child family details
app.post('/api/createChildPersonalFamily', (req, result, next) => {
  const {
                  childFullName,
                  fatherFullName,
                  fatherPhoneNumber,
                  fatherAadharNumber,
                  fatherAge,
                  fatherEducation,
                  fatherOccupation,
                  fatherIllness,
                  fatherAddiction,
                  motherFullName,
                  motherPhoneNumber,
                  motherAadharNumber,
                  motherAge,
                  motherEducation,
                  motherOccupation,
                  motherIllness,
                  motherAddiction,
                  familyType,
                  numberOfSiblings,
                  familyIllness,
                  familyIncome,userName,
  } = req.body;

  console.log(req.body);

  // Update user data in the MySQL database
  //const query = 'UPDATE childpersonaldetails SET childFullName = ?, kishoriVarg = ?, selectedDate = ?, enteredAge = ?, aadharNumber = ?, schoolOrCollege = ?, standard = ?, religion = ?, caste = ?, maritalStatus = ?, flatNumber = ?, area = ?, landmark = ?, city = ?, district = ?, state = ?, pincode = ?  WHERE childFullName = ?';
  const query = 'insert into FamilyHistory (childFullName ,fatherFullName , fatherPhoneNumber , fatherAadharNumber , fatherAge , fatherEducation , fatherOccupation , fatherIllness , fatherAddiction , motherFullName , motherPhoneNumber , motherAadharNumber , motherAge , motherEducation , motherOccupation , motherIllness , motherAddiction , familyType , numberOfSiblings ,familyIllness , familyIncome ,userName, timeStamp ) Values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, CURDATE())';

  console.log("SQL Query:", query);

  db.query(query,
    [
                  childFullName,
                  fatherFullName,
                  fatherPhoneNumber,
                  fatherAadharNumber,
                  fatherAge,
                  fatherEducation,
                  fatherOccupation,
                  fatherIllness,
                  fatherAddiction,
                  motherFullName,
                  motherPhoneNumber,
                  motherAadharNumber,
                  motherAge,
                  motherEducation,
                  motherOccupation,
                  motherIllness,
                  motherAddiction,
                  familyType,
                  numberOfSiblings,
                  familyIllness,
                  familyIncome,userName
    ], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error updating data', details: dberror.message });
    }
    result.status(200).json({ message: ' data updated successfully' });
  });
});


app.get('/api/displayChildFamilyInformation/:name', (req, result, next) => {
  const name = req.params.name;
  console.log('Received Parameter:', name);
  const query = 'SELECT * FROM familyHistory WHERE childFullName = ?';
  console.log('SQL Query:', query);
  console.log('Parameter:', name);
 
  db.query(query, [name], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error fetching  data', details: dberror.message });
    }
   
    if (dbresult.length === 0) {
      return result.status(404).json({ error: ' data not found for the user' });
    }

    result.status(200).json({ data: dbresult[0] });
  });
});

// GET CHILD LIST TABLE
app.get('/api/students', (req, res) => {
  const { kishoriVarg } = req.query;
  console.log('Received request with Kishori Varg:', kishoriVarg);

  if (!kishoriVarg) {
    return res.status(400).json({ error: 'Kishori Varg is required' });
  }

  // GET QUERY
  const query = 'SELECT * FROM childpersonaldetails WHERE LOWER(TRIM(kishoriVarg)) = ?';
  db.query(query, [kishoriVarg], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return res.status(500).json({ error: 'Error retrieving child data', details: dberror.message });
    }

    console.log('Query executed successfully');
    console.log('Response from server:', dbresult);

    res.status(200).json({ message: 'Child data retrieved successfully', data: dbresult });
  });
});

// GET Doctor LIST TABLE
app.get('/api/doctor', (req, res) => {
  const { kishoriVarg } = req.query;
  console.log('Received request with Kishori Varg:', kishoriVarg);


  if (!kishoriVarg) {
    return res.status(400).json({ error: 'Kishori Varg is required' });
  }


  // GET QUERY
  const query = 'SELECT * FROM doctorPersonalInformation WHERE LOWER(TRIM(kishoriVarg)) = ? and leavingDate is Null';
  db.query(query, [kishoriVarg], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return res.status(500).json({ error: 'Error retrieving doctor data', details: dberror.message });
    }


    console.log('Query executed successfully');
    console.log('Response from server:', dbresult);


    res.status(200).json({ message: 'Doctor data retrieved successfully', data: dbresult });
  });
});

// GET CHILD LIST TABLE
app.get('/api/childMedicalFetch/:name', (req, res) => {
  const { childFullName } = req.query;
  console.log('Received request with Kishori Varg:', childFullName);

  // GET QUERY
  const query = 'SELECT * FROM childMedicalHistory WHERE LOWER(TRIM(childFullName)) = ?';
  db.query(query, [childFullName], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return res.status(500).json({ error: 'Error retrieving child data', details: dberror.message });
    }

    console.log('Query executed successfully');
    console.log('Response from server:', dbresult);

    res.status(200).json({ message: 'Child data retrieved successfully', data: dbresult });
  });
});

// GET kvs LIST TABLE
app.get('/api/kvs', (req, res) => {
  const { kishoriVarg } = req.query;
  console.log('Received request with Kishori Varg:', kishoriVarg);


  if (!kishoriVarg) {
    return res.status(400).json({ error: 'Kishori Varg is required' });
  }


  // GET QUERY
  const query = 'SELECT * FROM kvsPersonalInformation WHERE LOWER(TRIM(kishoriVarg)) = ? and leavingDate is Null';
  db.query(query, [kishoriVarg], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return res.status(500).json({ error: 'Error retrieving KVS data', details: dberror.message });
    }


    console.log('Query executed successfully');
    console.log('Response from server:', dbresult);


    res.status(200).json({ message: 'KVS data retrieved successfully', data: dbresult });
  });
});



// GET CHILD LIST TABLE
app.get('/api/children', (req, res) => {
  const { kishoriVarg } = req.query;
  console.log('Received request with Kishori Varg:', kishoriVarg);

  if (!kishoriVarg) {
    return res.status(400).json({ error: 'Kishori Varg is required' });
  }

  // GET QUERY
  const query = 'SELECT * FROM childpersonaldetails WHERE LOWER(TRIM(kishoriVarg)) = ?';
  db.query(query, [kishoriVarg], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return res.status(500).json({ error: 'Error retrieving child data', details: dberror.message });
    }

    console.log('Query executed successfully');
    console.log('Response from server:', dbresult);

    res.status(200).json({ message: 'Child data retrieved successfully', data: dbresult });
  });
});


// Update child data
app.post('/api/updateChildPersonal/update', (req, result, next) => {
  const { 
    updatedChildFullName, 
    kishoriVarg,
    selectedDate,
    enteredAge,
    aadharNumber,
    schoolOrCollege,
    standard,
    religion,
    caste,
    maritalStatus,
    flatNumber,
    area,
    landmark,
    city,
    district,
    state,
    pincode, 
    oldChildFullName,
    userName
  } = req.body;

  console.log(req.body);

  if (!updatedChildFullName || !kishoriVarg || !enteredAge || !schoolOrCollege || !maritalStatus || !area ||!city ||!state) {
    return result.status(400).json({ error: 'Validation error', details: 'Please fill in all the required fields.' });
  }


  // Update user data in the MySQL database
  const query = 'UPDATE childpersonaldetails SET childFullName = ?, kishoriVarg = ?, selectedDate = ?, enteredAge = ?, aadharNumber = ?, schoolOrCollege = ?, standard = ?, religion = ?, caste = ?, maritalStatus = ?, flatNumber = ?, area = ?, landmark = ?, city = ?, district = ?, state = ?, pincode = ?, userName = ?, UpdateTimeStamp = CURDATE()  WHERE childFullName = ?';
  console.log("SQL Query:", query);

  db.query(query, 
    [
      updatedChildFullName,
      kishoriVarg,
      selectedDate,
      enteredAge,
      aadharNumber,
      schoolOrCollege,
      standard,
      religion,
      caste,
      maritalStatus,
      flatNumber,
      area,
      landmark,
      city,
      district,
      state,
      pincode,userName,
      oldChildFullName,
      
    ], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error updating child data', details: dberror.message });
    }
    result.status(200).json({ message: 'Child data updated successfully' });
  });
});

//doctor
app.post('/api/updateDoctorPersonal/update', (req, result, next) => {
  const {
    updatedDoctorFullName,
                    kishoriVarg,
                    phoneNumber,
                    selectedDate,
                    enteredAge,
                    aadharNumber,
                    registrationNumber,
                    gender,
                    maritalStatus,
                    religion,
                    caste,
                    flatNumber,
                    area,
                    landmark,
                    city,
                    district,
                    state,
                    pincode,
                    userName,
                    oldDoctorFullName,
  } = req.body;


  console.log(req.body);

  if (!updatedDoctorFullName || !kishoriVarg || !aadharNumber || !selectedDate || !enteredAge || !registrationNumber || !phoneNumber || !gender || !maritalStatus || !area || !city || !state) {
    return result.status(400).json({ error: 'Validation error', details: 'Please fill in all the required fields.' });
  }


  // Update user data in the MySQL database
  const query = 'UPDATE doctorPersonalInformation SET doctorFullName = ?, kishoriVarg = ?, phoneNumber = ?,  selectedDate = ?, enteredAge = ?, aadharNumber = ?, registrationNumber = ?, gender = ?, maritalStatus = ?, religion = ?, caste = ?, flatNumber = ?, area = ?, landmark = ?, city = ?, district = ?, state = ?, pincode = ?, userName = ?, UpdateTimeStamp = CURDATE()  WHERE doctorFullName = ?';
  console.log("SQL Query:", query);


  db.query(query,
    [
      updatedDoctorFullName,
                    kishoriVarg,
                    phoneNumber,
                    selectedDate,
                    enteredAge,
                    aadharNumber,
                    registrationNumber,
                    gender,
                    maritalStatus,
                    religion,
                    caste,
                    flatNumber,
                    area,
                    landmark,
                    city,
                    district,
                    state,
                    pincode,
                    userName,
                    oldDoctorFullName,
    ], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error updating doctor data', details: dberror.message });
    }
    result.status(200).json({ message: 'Doctor data updated successfully' });
  });
});




//KVS
//doctor
app.post('/api/updateKVSPersonal/update', (req, result, next) => {
  const {
    updatedKVSFullName,
                    kishoriVarg,
                    phoneNumber,
                    selectedDate,
                    enteredAge,
                    aadharNumber,
                    maritalStatus,
                    religion,
                    caste,
                    flatNumber,
                    area,
                    landmark,
                    city,
                    district,
                    state,
                    pincode,userName,
                    oldKVSFullName
  } = req.body;


  console.log(req.body);

  if (!updatedKVSFullName || !kishoriVarg || !aadharNumber || !enteredAge || !phoneNumber || !maritalStatus || !area || !city || !state) {
    return result.status(400).json({ error: 'Validation error', details: 'Please fill in all the required fields.' });
  }


  // Update user data in the MySQL database
  const query = 'UPDATE KVSPersonalInformation SET kvsFullName = ?, kishoriVarg = ?, phoneNumber = ?,  selectedDate = ?, enteredAge = ?, aadharNumber = ?, maritalStatus = ?, religion = ?, caste = ?, flatNumber = ?, area = ?, landmark = ?, city = ?, district = ?, state = ?, pincode = ?,userName=?,UpdateTimeStamp=CURDATE()  WHERE kvsFullName = ?';
  console.log("SQL Query:", query);


  db.query(query,
    [
      updatedKVSFullName,
                    kishoriVarg,
                    phoneNumber,
                    selectedDate,
                    enteredAge,
                    aadharNumber,
                    maritalStatus,
                    religion,
                    caste,
                    flatNumber,
                    area,
                    landmark,
                    city,
                    district,
                    state,
                    pincode,
                    userName,oldKVSFullName
    ], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error updating KVS data', details: dberror.message });
    }
    result.status(200).json({ message: 'KVS data updated successfully' });
  });
});



//FETCH DATA
// Add a new endpoint to fetch existing data
app.get('/api/displayChildInformation/:name', (req, result, next) => {
  const name = req.params.name;
  console.log('Received Parameter:', name);
  const query = 'SELECT * FROM childpersonaldetails WHERE childFullName = ?';
  console.log('SQL Query:', query);
  console.log('Parameter:', name);
  
  db.query(query, [name], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error fetching medical data', details: dberror.message });
    }
    
    if (dbresult.length === 0) {
      return result.status(404).json({ error: 'Medical data not found for the user' });
    }

    result.status(200).json({ data: dbresult[0] });
  });
});



//PhysicalExamination.js -- backend post and get.// change the name of tables and query names:
app.post('/api/childPhyExam', (req, result, next) => {
  const {   childFullName,
            Vaccination,
            Allergy,
            majorIllness,
            operativeIntervention,
            hb,
            MCV,
            upperCount,
            lowerCount,
            menstrualHistory,
            consciousness,
            look,
            nourishment,
            dietType,
            breakfast,
            lunch,
            evening,
            dinner,
            health,
            bodyBuilt,
            skinColor,
            skinTexture,
            weight,
            respiratory,
            height,
            pulse,
            bmi,
userName

  } = req.body;
  console.log(childFullName)
  const joinedVaccination = Array.isArray(Vaccination) ? Vaccination.join(',') : Vaccination;
  const joinedAllergy = Array.isArray(Allergy) ? Allergy.join(',') : Allergy;



  // Insert into  data into the MySQL database
  const query = 'INSERT INTO childPhysicalExam (childFullName,Vaccination, Allergy, majorIllness,operativeIntervention,hb, MCV,upperCount,lowerCount,mensturalHistory,consciousness,look,nourishment,dietType,breakfast,lunch,evening,dinner,health,bodyBuilt,skinColor,skinTexture,weight, respiratory, height,pulse,bmi, userName, timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?,?, CURDATE())';
  db.query(query, [childFullName,joinedVaccination, joinedAllergy, majorIllness,operativeIntervention,hb, MCV,upperCount,lowerCount,menstrualHistory,consciousness,look,nourishment,dietType,breakfast,lunch,evening,dinner,health,bodyBuilt,skinColor,skinTexture,weight, respiratory, height,pulse,bmi,userName], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving data', details: dberror.message });
    }
    result.status(201).json({ message: 'Saved successfully' });
  });
});



//NEW CHILD PHYSICAL DETAILS 
app.post('/api/childPhyExamNew', (req, result, next) => {
  const {
    childFullName,
    Vaccination,
    Allergy,
    majorIllness,
    operativeIntervention,
    hb,
    MCV,
    upperCount,
    lowerCount,
    menstrualHistory,
    consciousness,
    look,
    nourishment,
    dietType,
    breakfast,
    lunch,
    evening,
    dinner,
    health,
    bodyBuilt,
    skinColor,
    skinTexture,
    weight,
    respiratory,
    height,
    pulse,
    bmi,
    userName,
  } = req.body;

  const joinedVaccination = Array.isArray(Vaccination) ? Vaccination.join(',') : Vaccination;
  const joinedAllergy = Array.isArray(Allergy) ? Allergy.join(',') : Allergy;

  // Insert into childPhysicalExam table
  const physicalExamQuery =
    'INSERT INTO childPhysicalExam (childFullName,Vaccination, Allergy, majorIllness,operativeIntervention,hb, MCV,upperCount,lowerCount,menstrualHistory,consciousness,look,nourishment,dietType,breakfast,lunch,evening,dinner,health,bodyBuilt,skinColor,skinTexture,weight, respiratory, height,pulse,bmi, userName, timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?,?, CURDATE())';

  db.query(
    physicalExamQuery,
    [
      childFullName,
      joinedVaccination,
      joinedAllergy,
      majorIllness,
      operativeIntervention,
      hb,
      MCV,
      upperCount,
      lowerCount,
      menstrualHistory,
      consciousness,
      look,
      nourishment,
      dietType,
      breakfast,
      lunch,
      evening,
      dinner,
      health,
      bodyBuilt,
      skinColor,
      skinTexture,
      weight,
      respiratory,
      height,
      pulse,
      bmi,
      userName,
    ],
    (dbPhysicalExamError, dbPhysicalExamResult) => {
      if (dbPhysicalExamError) {
        console.error('Physical Exam Database query error:', dbPhysicalExamError);
        return result.status(500).json({
          error: 'Error saving physical exam data',
          details: dbPhysicalExamError.message,
        });
      }

      // Assuming dbPhysicalExamResult.insertId contains the ID of the inserted row in childPhysicalExam table
      const childID = dbPhysicalExamResult.insertId;

      // Insert into childVisit table
      const visitQuery =
        'INSERT INTO childVisit (childID, visitID, KVarg, Date, Height, Weight, Anemic, HB, Nutirtional, SkinSign, BMI, childFullName, Age) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';

      // Assuming Age is available in the request body, adjust accordingly if not
      const age = req.body.age;

      // Set placeholder values for visitID, KVarg, Date, and Anemic
      const visitID = 'visitID-value';
      const KVarg = 'KVarg-value';
      const visitDate = 'Date-value';
      const anemic = 0; // Assuming a default value, replace with the actual value

      db.query(
        visitQuery,
        [childID, visitID, KVarg, visitDate, height, weight, anemic, hb, 'Nutritional-value', 'SkinSign-value', bmi, childFullName, age],
        (dbVisitError, dbVisitResult) => {
          if (dbVisitError) {
            console.error('Visit Database query error:', dbVisitError);
            return result.status(500).json({
              error: 'Error saving visit data',
              details: dbVisitError.message,
            });
          }

          // Insert into additionalTable
          const additionalTableQuery = 'INSERT INTO additionalTable (childID, additionalField) VALUES (?, ?)';
          const additionalFieldValue = 'ExampleAdditionalValue'; // Replace with the actual value

          db.query(additionalTableQuery, [childID, additionalFieldValue], (dbAdditionalTableError, dbAdditionalTableResult) => {
            if (dbAdditionalTableError) {
              console.error('Additional Table Database query error:', dbAdditionalTableError);
              return result.status(500).json({
                error: 'Error saving additional table data',
                details: dbAdditionalTableError.message,
              });
            }

            result.status(201).json({
              message: 'Child Physical Exam, Visit, and Additional Table data saved successfully',
            });
          });
        }
      );
    }
  );
});




//Married Reports
app.get('/api/MarriedAnalysis', (req, res) => {
  const { year, ...filters } = req.query;


  let query = `SELECT
  COUNT(DISTINCT CASE WHEN CAST(SUBSTRING(enteredAge, 1, 2) AS UNSIGNED) < 18 AND MaritalStatus = 'Married' THEN childFullName END) AS count_under18,
  COUNT(DISTINCT CASE WHEN CAST(SUBSTRING(enteredAge, 1, 2) AS UNSIGNED) > 18 AND MaritalStatus = 'Married' THEN childFullName END) AS count_over18,
  COUNT(DISTINCT CASE WHEN MaritalStatus = 'Unmarried' THEN childFullName END) AS count_unmarried
FROM childpersonaldetails `;
const conditions = [];
  const values = [];


  for (const key in filters) {
      conditions.push(`${key} = ?`);
      values.push(filters[key]);
  }


  if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
  }


  if (year) {
      const yearCondition = Object.keys(filters).length > 0 ? 'AND' : 'WHERE';
      query += ` ${yearCondition} YEAR(Date) = ?  `;
      values.push(year, year);
  }


  db.query(query, values, (error, results) => {
      if (error) {
          console.error('Error fetching data: ' + error.stack);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          res.status(200).json(results);
      }
  });
});



app.get('/fetchHeight/:childName', (req, res) => {
  const childName = req.params.childName.trim();
  console.log('Fetching height for child:', childName);

  db.query('SELECT height FROM childMedicalHistory WHERE childFullName = ?', [childName], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching height from the database' });
    } else {
      if (result.length > 0) {
        const storedHeight = result[0].height;
        res.json({ storedHeight });
      } else {
        res.status(404).json({ error: 'Child not found' });
      }
    }

    
  });
});

//Doctor
//FETCH DATA
app.get('/api/displayDoctorInformation/:name', (req, result, next) => {
  const name = req.params.name;
  console.log('Received Parameter:', name);
  const query = 'SELECT * FROM DoctorPersonalInformation WHERE doctorFullName = ?';
  console.log('SQL Query:', query);
  console.log('Parameter:', name);
 
  db.query(query, [name], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error fetching doctor data', details: dberror.message });
    }
   
    if (dbresult.length === 0) {
      return result.status(404).json({ error: 'Doctor data not found for the user' });
    }


    result.status(200).json({ data: dbresult[0] });
  });
});


//KVS
//FETCH DATA
app.get('/api/displayKVSInformation/:name', (req, result, next) => {
  const name = req.params.name;
  console.log('Received Parameter:', name);
  const query = 'SELECT * FROM KVSPersonalInformation WHERE kvsFullName = ?';
  console.log('SQL Query:', query);
  console.log('Parameter:', name);
 
  db.query(query, [name], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error fetching kvs data', details: dberror.message });
    }
   
    if (dbresult.length === 0) {
      return result.status(404).json({ error: 'KVS data not found for the user' });
    }


    result.status(200).json({ data: dbresult[0] });
  });
});


// //insert child details
// app.post('/api/saveChildData', (req, result, next) => {
//   const {
//     childFullName,
//     kishoriVarg,
//     selectedDate,
//     enteredAge,
//     aadharNumber,
//     schoolOrCollege,
//     standard,
//     religion,
//     caste,
//     maritalStatus,
//     flatNumber,
//     area,
//     landmark,
//     city,
//     district,
//     state,
//     pincode,
//     userName,
//   } = req.body;


//   // Insert doctor data into the MySQL database
//   const query = 'INSERT INTO childpersonaldetails (childFullName, kishoriVarg, selectedDate, enteredAge, aadharNumber, schoolOrCollege, standard, religion, caste, maritalStatus, flatNumber, area, landmark, city, district, state, pincode,userName,timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,CURDATE())';
//   db.query(query, [childFullName, kishoriVarg, selectedDate, enteredAge, aadharNumber, schoolOrCollege, standard, religion, caste, maritalStatus, flatNumber, area, landmark, city, district, state, pincode,userName], (dberror, dbresult) => {
//     if (dberror) {
//       console.error('Database query error:', dberror);
//       return result.status(500).json({ error: 'Error saving child data', details: dberror.message });
//     }
//     result.status(201).json({ message: 'Child data saved successfully' });
//   });
// });


//insert child details
app.post('/api/saveChildData', (req, result, next) => {
  const {
    childFullName,
    kishoriVarg,
    selectedDate,
    enteredAge,
    aadharNumber,
    schoolOrCollege,
    standard,
    religion,
    caste,
    maritalStatus,
    flatNumber,
    area,
    landmark,
    city,
    district,
    state,
    pincode,
    userName,
  } = req.body;


  if (!childFullName || !kishoriVarg || !enteredAge || !schoolOrCollege || !maritalStatus || !area || !city || !state) {
    return result.status(400).json({ error: 'Validation error', details: 'Please fill in all the required fields.' });
  }


  // Insert doctor data into the MySQL database
  const query = 'INSERT INTO childpersonaldetails (childFullName, kishoriVarg, selectedDate, enteredAge, aadharNumber, schoolOrCollege, standard, religion, caste, maritalStatus, flatNumber, area, landmark, city, district, state, pincode,userName,timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,CURDATE())';
  db.query(query, [childFullName, kishoriVarg, selectedDate, enteredAge, aadharNumber, schoolOrCollege, standard, religion, caste, maritalStatus, flatNumber, area, landmark, city, district, state, pincode,userName], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving child data', details: dberror.message });
    }
    result.status(201).json({ message: 'Child data saved successfully' });
  });
});




// //insert doctor details
// app.post('/api/saveDoctorData', (req, result, next) => {
//   const {
//     doctorFullName,
//     kishoriVarg,
//     phoneNumber,
//     selectedDate,
//     enteredAge,
//     aadharNumber,
//     registrationNumber,
//     gender,
//     maritalStatus,
//     religion,
//     caste,
//     flatNumber,
//     area,
//     landmark,
//     city,
//     district,
//     state,
//     pincode,userName
//   } = req.body;


//   console.log(req.data);

//   // Insert doctor data into the MySQL database
//   const query = 'INSERT INTO DoctorPersonalInformation (doctorFullName, kishoriVarg, phoneNumber, selectedDate, enteredAge, aadharNumber, registrationNumber, gender, maritalStatus, religion, caste, flatNumber, area, landmark, city, district, state, pincode,userName,timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,CURDATE())';
//   db.query(query, [doctorFullName, kishoriVarg, phoneNumber, selectedDate, enteredAge, aadharNumber, registrationNumber, gender, maritalStatus, religion, caste, flatNumber, area, landmark, city, district, state, pincode,userName], (dberror, dbresult) => {
//     if (dberror) {
//       console.error('Database query error:', dberror);
//       return result.status(500).json({ error: 'Error saving doctor data', details: dberror.message });
//     }
//     result.status(201).json({ message: 'Doctor data saved successfully' });
//   });
// });



//insert doctor details
app.post('/api/saveDoctorData', (req, result, next) => {
  const {
    doctorFullName,
    kishoriVarg,
    phoneNumber,
    selectedDate,
    enteredAge,
    aadharNumber,
    registrationNumber,
    gender,
    maritalStatus,
    religion,
    caste,
    flatNumber,
    area,
    landmark,
    city,
    district,
    state,
    pincode,userName
  } = req.body;




  if (!doctorFullName || !kishoriVarg || !aadharNumber || !selectedDate || !enteredAge || !registrationNumber || !phoneNumber || !gender || !maritalStatus || !area ||!city || !state) {
    return result.status(400).json({ error: 'Validation error', details: 'Please fill in all the required fields.' });
  }


  // Insert doctor data into the MySQL database
  const query = 'INSERT INTO DoctorPersonalInformation (doctorFullName, kishoriVarg, phoneNumber, selectedDate, enteredAge, aadharNumber, registrationNumber, gender, maritalStatus, religion, caste, flatNumber, area, landmark, city, district, state, pincode,userName,timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,CURDATE())';
  db.query(query, [doctorFullName, kishoriVarg, phoneNumber, selectedDate, enteredAge, aadharNumber, registrationNumber, gender, maritalStatus, religion, caste, flatNumber, area, landmark, city, district, state, pincode,userName], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving doctor data', details: dberror.message });
    }
    result.status(201).json({ message: 'Doctor data saved successfully' });
  });
});






//MEDICAL TABLE
app.post('/api/generalmedical', (req, result, next) => {
  const { ChildID, Vaccination, Allergy, MajorIllness, OperativeIntervention } = req.body;

  console.log("Received childId: ", ChildID);
  console.log("Received vaccination: ", Vaccination);
  console.log("Received allergy: ", Allergy);
  console.log("Received majorillness: ", MajorIllness);
  console.log("Received operativeintervention: ", OperativeIntervention);

  //Insert user data into the MySQL database
  const query = 'INSERT INTO medical (ChildID, Vaccination, Allergy, MajorIllness, OperativeIntervention) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [ChildID, Vaccination, Allergy, MajorIllness, OperativeIntervention], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving medical data', details: dberror.message });
    }
    result.status(201).json({ message: 'Medical data saved successfully' });
  });
});



//GET CHILD DATA
app.get('/api/getMedicalChildData', (req, res) => {
  const {ID} = req.query;
  console.log('Received request with ID:', ID);
  if(!ID) {
    return res.status(400).json({ error: 'ID is required' });
  }

  const query =`SELECT PD.childFullName, 
  PD.selectedDate,
  PD.enteredAge, 
  PD.religion, 
  PD.caste,
  PD.flatNumber,
  PD.area,
  FD.motherFullName,
  FD.motherEducation,
  FD.motherOccupation,
  FD.motherIllness,
  FD.fatherFullName,
  FD.fatherEducation,
  FD.fatherOccupation,
  FD.fatherIllness,
  SE.*
FROM 
  childpersonaldetails PD
JOIN 
  familyhistory FD ON PD.childFullName = FD.childFullName
LEFT JOIN 
  childphysicalexam SE ON PD.childFullName = SE.childFullName
WHERE 
  PD.childFullName =?`;
  db.query(query, [ID], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return res.status(500).json({ error: 'Error retrieving student data', details: dberror.message });
    }
    console.log('Query executed successfully');
  console.log('Response from server:', dbresult);
    res.status(200).json({ message: 'Child data retrieved successfully', data: dbresult });
    console.log('Response from server:', dbresult);

  });
});


//SYSTEMIC EXAMINATION TABLE
app.post('/api/systemicexamination', (req, result, next) => {
  const { childFullName, gastrointestinal, liver, spleen, respiratory, centralNervous, urinogenital, musculoskeletal,userName } = req.body;

  console.log(req.body);

  //Insert user data into the MySQL database
  const query = 'INSERT INTO SystemicExam (childFullName, gastrointestinal, liver, spleen, urinogenital, centralNervous, musculoskeletal, respiratory,userName,timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,CURDATE())';
  db.query(query, [childFullName, gastrointestinal, liver, spleen, respiratory, centralNervous, urinogenital, musculoskeletal,userName], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving medical data', details: dberror.message });
    }
    result.status(201).json({ message: 'Medical data saved successfully' });
  });
});


//GET SYSTEMIC EXAMINATION DATA
app.get('/api/get-systematic-exam', (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Name parameter is required' });
  }

  const query = 'SELECT * FROM systematic_exam WHERE name = ?';

  db.query(query, [name], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return res.status(500).json({ error: 'Error retrieving systematic examination data', details: dberror.message });
    }

    console.log('Query executed successfully');
    console.log('Response from server:', dbresult);

    res.status(200).json({ message: 'Systematic examination data retrieved successfully', data: dbresult });
  });
});




//FOR BAR GRAPH REPORT
app.get('/api/avg', (req, res) => {
  const query = 'SELECT `KSP Varg`, AVG(Ht) as average_height FROM Anemia WHERE Ht != 0 GROUP BY `KSP Varg` HAVING AVG(Ht) != 0';
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data: ' + error.stack);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});


// FETCH VACCINE FROM DATABASE
app.get('/api/getVaccineList', (req, res) => {
  // Assuming you have a vaccine table with a vaccineName column
  const selectQuery = `SELECT vaccineName FROM vaccine`;

  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching vaccine list');
    } else {
      const vaccineList = result.map(item => item.vaccineName);
      res.status(200).json({ vaccineList });
    }
  });
});


app.get('/api/getSymptomList', (req, res) => {
  // Assuming you have a vaccine table with a vaccineName column
  const selectQuery = `SELECT symptoms FROM symptom`;

  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching symptom list');
    } else {
      const symptomList = result.map(item => item.symptoms);
      res.status(200).json({ symptomList });
    }
  });
});




// UPDATE VACCINE LIST IN DATABASE
app.put('/api/updateVaccineList', (req, res) => {
  const { vaccineList } = req.body;

  // Assuming you have a vaccine table with a vaccineName column
  const updateQuery = 'TRUNCATE TABLE vaccine;'; // Remove existing vaccines
  db.query(updateQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating vaccine list');
    } else {
      // Insert new vaccines into the table
      const insertQuery = 'INSERT INTO vaccine (vaccineName) VALUES ?';
      const values = vaccineList.map(vaccine => [vaccine]);

      db.query(insertQuery, [values], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error updating vaccine list');
        } else {
          res.status(200).send('Vaccine list updated successfully');
        }
      });
    }
  });
});


// FETCH ALLERGY FROM DATABASE
app.get('/api/getAllergyList', (req, res) => {
  // Assuming you have a allergy table with a allergyName column
  const selectQuery = `SELECT allergyName FROM allergy`;

  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching allergy list');
    } else {
      const allergyList = result.map(item => item.allergyName);
      res.status(200).json({ allergyList });
    }
  });
});


// UPDATE ALLERGY LIST IN DATABASE
app.put('/api/updateAllergyList', (req, res) => {
  const { allergyList } = req.body;

  // Assuming you have a allergy table with a allergyName column
  const updateQuery = 'TRUNCATE TABLE allergy;'; // Remove existing allergies
  db.query(updateQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating allergy list');
    } else {
      // Insert new allergies into the table
      const insertQuery = 'INSERT INTO allergy (allergyName) VALUES ?';
      const values = allergyList.map(allergy => [allergy]);

      db.query(insertQuery, [values], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error updating allergy list');
        } else {
          res.status(200).send('Allergy list updated successfully');
        }
      });
    }
  });
});



app.get('/api/getMedicalChildData', (req, res) => {
  const {ID} = req.query;
  console.log('Received request with ID:', ID);
  if(!ID) {
    return res.status(400).json({ error: 'ID is required' });
  }

  const query =`SELECT PD.child_id, PD.child_first_name, 
  PD.child_middle_name,  
  PD.child_last_name,  
  PD.date_of_birth,
  PD.age, 
  PD.child_religion, 
  PD.child_caste,
  FD.house_address,
  FD.block_no_area_name,
  FD.family_type,
  FD.mother_first_name,
  FD.mother_last_name,
  FD.mother_education,
  FD.mother_occupation,
  FD.mother_illness,
  FD.father_first_name,
  FD.father_last_name,
  FD.father_education,
  FD.father_occupation,
  FD.father_illness,
  SE.*
FROM 
  ProfileData PD
JOIN 
  FamilyData FD ON PD.child_id = FD.child_id
LEFT JOIN 
  SystemicExam SE ON PD.child_id = SE.child_id
WHERE 
  PD.child_id =?`;
  db.query(query, [ID], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return res.status(500).json({ error: 'Error retrieving student data', details: dberror.message });
    }
    console.log('Query executed successfully');
  console.log('Response from server:', dbresult);
    res.status(200).json({ message: 'Child data retrieved successfully', data: dbresult });
    console.log('Response from server:', dbresult);

  });
});


//height difference
app.get('/api/htDifference', (req, res) => {
  const query = 'SELECT FirstName,FirstHt,SecondHt,(SecondHt - FirstHt) AS HeightDifference FROM child';
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data: ' + error.stack);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});

//display details for grahp
app.get('/api/getChildData', (req, res) => {
  const {ID} = req.query;
  console.log('Received request with ID:', ID);
  if(!ID) {
    return res.status(400).json({ error: 'ID is required' });
  }

  const query ='SELECT * FROM childpersonaldetails WHERE childFullName = ?';
  db.query(query, [ID], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return res.status(500).json({ error: 'Error retrieving student data', details: dberror.message });
    }
    console.log('Query executed successfully');
  console.log('Response from server:', dbresult);
    res.status(200).json({ message: 'Child data retrieved successfully', data: dbresult });
    console.log('Response from server:', dbresult);

  });
});

app.get('/api/wtDifferenceNew', (req, res) => {
  const { year, ...filters } = req.query;

  let query = 'SELECT FirstName, FirstWt, SecondWt, (SecondWt - FirstWt) AS WeightDifference FROM child';
  const conditions = [];
  const values = [];

  for (const key in filters) {
      conditions.push(`${key} = ?`);
      values.push(filters[key]);
  }

  if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
  }

  if (year) {
      const yearCondition = Object.keys(filters).length > 0 ? 'AND' : 'WHERE';
      query += ` ${yearCondition} YEAR(FirstVisitDate) = ? OR YEAR(SecondVisitDate) = ? `;
      values.push(year, year);
  }

  db.query(query, values, (error, results) => {
      if (error) {
          console.error('Error fetching data: ' + error.stack);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          res.status(200).json(results);
      }
  });
});


//MCV REPORT


//MCV Graph


app.get('/api/MCVGraph', (req, res) => {
  const {ID} = req.query;
  console.log('Received request with ID:', ID);
  if(!ID) {
    return res.status(400).json({ error: 'ID is required' });
  }


  const query =`select MCV,DATE_FORMAT(timestamp, '%Y-%m-%d') AS formatted_date,SUBSTRING_INDEX(childFullName, ' ', 1) AS FirstName from childphysicalexam where childFullName=?`;
  db.query(query, [ID], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return res.status(500).json({ error: 'Error retrieving student data', details: dberror.message });
    }
    console.log('Query executed successfully');
  console.log('Response from server:', dbresult);
    res.status(200).json({ message: 'Child data retrieved successfully', data: dbresult });
    console.log('Response from server:', dbresult);


  });
});




app.post('/api/generalmedical', (req, result, next) => {
  const { ChildID, Vaccination, Allergy, MajorIllness, OperativeIntervention } = req.body;


  console.log("Received childId: ", ChildID);
  console.log("Received vaccination: ", Vaccination);
  console.log("Received allergy: ", Allergy);
  console.log("Received majorillness: ", MajorIllness);
  console.log("Received operativeintervention: ", OperativeIntervention);


  const joinedVaccination = Array.isArray(Vaccination) ? Vaccination.join(',') : Vaccination;
  const joinedAllergy = Array.isArray(Allergy) ? Allergy.join(',') : Allergy;


  //Insert user data into the MySQL database
  const query = 'INSERT INTO medical (ChildID, Vaccination, Allergy, MajorIllness, OperativeIntervention) VALUES (?, ?, ?, ?, ?)';
  //const values = [ChildID, ...Vaccination, ...Allergy, MajorIllness, OperativeIntervention];
  db.query(query, [ChildID, joinedVaccination, joinedAllergy, MajorIllness, OperativeIntervention], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving medical data', details: dberror.message });
    }
    result.status(201).json({ message: 'Medical data saved successfully' });
  });
});


//FETCH VACCINE FOR NGO LIST
app.get('/api/getVaccineListNgo', (req, res) => {
  const selectQuery = `SELECT vaccineID, vaccineName FROM vaccine`;


  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching vaccine list');
    } else {
      res.status(200).json({ vaccineList: result });
    }
  });
});

//sysmptom ngo
//FETCH VACCINE FOR NGO LIST
app.get('/api/getSymptomistNgo', (req, res) => {
  const selectQuery = `SELECT * FROM symptom`;


  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching symptom list');
    } else {
      res.status(200).json({ symptomList: result });
    }
  });
});


//allergy list for MCQ
app.get('/api/getAllergyListNgo', (req, res) => {
  const selectQuery = `SELECT allergyID, allergyName FROM allergy`;


  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching allergy list');
    } else {
      res.status(200).json({ allergyList: result });
    }
  });
});


//SYSTEMIC EXAMINATION TABLE
app.post('/api/systemicexamination', (req, result, next) => {
  const { name, gastrointestinal, liver, spleen, respiratory, centralNervous, urinogenital, musculoskeletal } = req.body;


  console.log(req.body);


  //Insert user data into the MySQL database
  const query = 'INSERT INTO systemic (name, Gastrointestinal, liver, Spleen, urinogenital, centralNervous, musculoskeletal, respiratory) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, gastrointestinal, liver, spleen, respiratory, centralNervous, urinogenital, musculoskeletal], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving medical data', details: dberror.message });
    }
    result.status(201).json({ message: 'Medical data saved successfully' });
  });
});



// Get for details physical examination
app.get('/api/displayDetailPhyInformation/:name', (req, result, next) => {
  const name = req.query;
  const query = 'SELECT * FROM DETAILPHY WHERE childFullName = ?';
  console.log('SQL Query:', query);
 
  db.query(query, [name], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error fetching kvs data', details: dberror.message });
    }
   
    if (dbresult.length === 0) {
      return result.status(404).json({ error: 'KVS data not found for the user' });
    }


    result.status(200).json({ data: dbresult[0] });
  });
});

// Get for details physical examination
app.get('/api/fetchChildMedicalDetails/:name', (req, result, next) => {
  const name = req.params.name;
  console.log('Received Parameter:', name);


  const query = 'SELECT * FROM childMedicalHistory WHERE childFullName = ?';
  console.log('SQL Query:', query);
  console.log('Parameter:', name);
 
  db.query(query, [name], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error fetching kvs data', details: dberror.message });
    }
   
    if (dbresult.length === 0) {
      return result.status(404).json({ error: 'KVS data not found for the user' });
    }


    result.status(200).json({ data: dbresult[0] });
  });
});


// detilphysical examination.


app.post('/api/detailPhyExamination', (req, result, next) => {
  const {
    childFullName,
    pallor,
    heartCondition,
    eyeAcuity,
    colorBlindness,
    nailCondition,
    conjunctiveCondition,
    scalpCondition,
    lymphadenopathy,
    hernialSites,
    headNeckSpine,
    earsHearing,
    earsDischarge,
    noseCondition,
    throatCondition,
    speech,
    mouthCondition,
    gumsCondition,
    teethCondition,
  userName

  } = req.body;


  // Insert into remarks data into the MySQL database
  const query = 'INSERT INTO DETAILPHYSICAL (childFullName, pallor, heartCondition,eyeAcuity,colorBlindness, nailCondition,conjunctiveCondition,scalpCondition,lymphadenopathy,hernialSites,headNeckSpine,earsHearing,earsDischarge,noseCondition,throatCondition,speech,mouthCondition,gumsCondition,teethCondition,userName,timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURDATE())';
  db.query(query, [childFullName, pallor, heartCondition,eyeAcuity,colorBlindness, nailCondition,conjunctiveCondition,scalpCondition,lymphadenopathy,hernialSites,headNeckSpine,earsHearing,earsDischarge,noseCondition,throatCondition,speech,mouthCondition,gumsCondition,teethCondition,userName], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving data', details: dberror.message });
    }
    result.status(201).json({ message: 'Saved successfully' });
  });
});




//MEDICAL TABLE for createChildPhysicalExamination
app.post('/api/phyExam', (req, result, next) => {
  const { name, Vaccination, Allergy, MajorIllness, OperativeIntervention, hemoglobin, MCV, upperCount, lowerCount, menstrualHistory, consciousness, look, nourishment, dietType, breakfast, lunch, evening, dinner, health, bodyBuilt, skinColor,skinTexture, weight, respiratory, height,pulse,bmi } = req.body;


  console.log("Received vaccination: ", Vaccination);
  console.log("Received allergy: ", Allergy);
  console.log("Received majorillness: ", MajorIllness);
  console.log("Received operativeintervention: ", OperativeIntervention);


  const joinedVaccination = Array.isArray(Vaccination) ? Vaccination.join(',') : Vaccination;
  const joinedAllergy = Array.isArray(Allergy) ? Allergy.join(',') : Allergy;


  //Insert user data into the MySQL database
  const query = 'INSERT INTO medical (name, Vaccination, Allergy, MajorIllness, OperativeIntervention, hemoglobin, MCV, upperCount, lowerCount, menstrualHistory, consciousness, look, nourishment, dietType, breakfast, lunch, evening, dinner, health, bodyBuilt, skinColor,skinTexture, weight, respiratory, height,pulse,bmi) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  //const values = [ChildID, ...Vaccination, ...Allergy, MajorIllness, OperativeIntervention];
  db.query(query, [name, joinedVaccination, joinedAllergy, MajorIllness, OperativeIntervention,  hemoglobin, MCV, upperCount, lowerCount, menstrualHistory, consciousness, look, nourishment, dietType, breakfast, lunch, evening, dinner, health, bodyBuilt, skinColor,skinTexture, weight, respiratory, height,pulse,bmi], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving medical data', details: dberror.message });
    }
    result.status(201).json({ message: 'Medical data saved successfully' });
  });
});



// backend of Remarks
app.post('/api/remarks', (req, result, next) => {
  const {
    childFullName,
    symptoms,
    sign,
    diagnosis,
    advice,
    treatment,
    cause,userName
  } = req.body;


  // Insert into remarks data into the MySQL database
  const query = 'INSERT INTO Remarks (childFullName, symptoms, sign, diagnosis, advice, treatment, cause,userName , timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?,?,CURDATE())';
  db.query(query, [childFullName, symptoms, sign, diagnosis, advice, treatment, cause,userName], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving data', details: dberror.message });
    }
    result.status(201).json({ message: 'Saved successfully' });
  });
});


// Child Medial Details
app.post('/api/childMedical', (req, result, next) => {
  const { childFullName, vaccination, allergy, majorIllness, operativeIntervention, hemoglobin, MCV,bmi, height, weight, menstrualHistory,userName } = req.body;


 
  const joinedVaccination = Array.isArray(vaccination) ? vaccination.join(',') : vaccination;
  const joinedAllergy = Array.isArray(allergy) ? allergy.join(',') : allergy;


  //Insert user data into the MySQL database
  const query = 'INSERT INTO childMedicalHistory (childFullName, vaccination,allergy, majorIllness, operativeIntervention, hemoglobin, MCV,bmi, height, weight, menstrualHistory,userName,timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,CURDATE())';
  db.query(query, [childFullName,joinedVaccination , joinedAllergy, majorIllness, operativeIntervention, hemoglobin, MCV,bmi, height, weight, menstrualHistory,userName], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving medical data', details: dberror.message });
    }
    result.status(201).json({ message: 'Child Medical data saved successfully' });
  });
});


//NEW CHILD MEDICAL
app.post('/api/childMedicalNew', (req, result, next) => {
  const {
    childFullName,
    vaccination,
    allergy,
    majorIllness,
    operativeIntervention,
    hemoglobin,
    MCV,
    bmi,
    height,
    weight,
    menstrualHistory,
    userName,
  } = req.body;

  const joinedVaccination = Array.isArray(vaccination) ? vaccination.join(',') : vaccination;
  const joinedAllergy = Array.isArray(allergy) ? allergy.join(',') : allergy;

  // Insert data into childMedicalHistory table
  const medicalHistoryQuery =
    'INSERT INTO childMedicalHistory (childFullName, vaccination,allergy, majorIllness, operativeIntervention, hemoglobin, MCV,bmi, height, weight, menstrualHistory,userName,timeStamp,UpdateTimeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,CURDATE(),CURDATE())';

  db.query(
    medicalHistoryQuery,
    [
      childFullName,
      joinedVaccination,
      joinedAllergy,
      majorIllness,
      operativeIntervention,
      hemoglobin,
      MCV,
      bmi,
      height,
      weight,
      menstrualHistory,
      userName,
      
    ],
    (dbMedicalHistoryError, dbMedicalHistoryResult) => {
      if (dbMedicalHistoryError) {
        console.error('Medical History Database query error:', dbMedicalHistoryError);
        return result.status(500).json({
          error: 'Error saving medical history data',
          details: dbMedicalHistoryError.message,
        });
      }

      // Assuming dbMedicalHistoryResult.insertId contains the ID of the inserted row in childMedicalHistory table
      const childID = dbMedicalHistoryResult.insertId;

      // Insert data into childPhysicalHistory table
      const physicalHistoryQuery =
        'INSERT INTO childvisit (childID, visitID, KVarg,  Height, Weight, Anemic, HB, Nutirtional, SkinSign, BMI, childFullName, Age,Date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,CURDATE())';

      // Assuming Age is available in the request body, adjust accordingly if not
      const age = req.body.age;

      db.query(
        physicalHistoryQuery,
        [childID, 'visitID', 'Bibewadi',  height, weight, 0, hemoglobin, 'underweight', 'pallor', bmi, childFullName, age],
        (dbPhysicalHistoryError, dbPhysicalHistoryResult) => {
          if (dbPhysicalHistoryError) {
            console.error('Physical History Database query error:', dbPhysicalHistoryError);
            return result.status(500).json({
              error: 'Error saving physical history data',
              details: dbPhysicalHistoryError.message,
            });
          }

          result.status(201).json({
            message: 'Child Medical and Physical data saved successfully',
          });
        }
      );
    }
  );
});

app.post('/api/updateChildMedicalDetails', (req, result, next) => {
  const { childFullName, vaccination, allergy, majorIllness, operativeIntervention, hemoglobin, MCV,bmi, height, weight, menstrualHistory,userName } = req.body;


 
  const joinedVaccination = Array.isArray(vaccination) ? vaccination.join(',') : vaccination;
  const joinedAllergy = Array.isArray(allergy) ? allergy.join(',') : allergy;


  //Insert user data into the MySQL database
  const query = 'update childMedicalHistory set  vaccination =?,allergy=?, majorIllness=?, operativeIntervention=?, hemoglobin=?, MCV=?,bmi=?, height=?, weight=?, menstrualHistory=?,userName=?,UpdateTimeStamp=CURDATE() where childFullName=?';
  db.query(query, [joinedVaccination , joinedAllergy, majorIllness, operativeIntervention, hemoglobin, MCV,bmi, height, weight, menstrualHistory,userName,childFullName], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return result.status(500).json({ error: 'Error saving medical data', details: dberror.message });
    }
    result.status(201).json({ message: 'Child Medical data saved successfully' });
  });
});






// app.get('/api/HeightDifference', (req, res) => {
//   const query = `SELECT 
//   RankedVisits.childID,
//   RankedVisits.childFullName,
//   ABS(RankedVisits.Height - SecondLastRankedVisits.Height) AS HeightDifference,
//   RankedVisits.Height AS LastVisitHeight,
//   SecondLastRankedVisits.Height AS SecondLastVisitHeight,
//   RankedVisits.anemic AS LastVisitAnemicStatus,
//   SecondLastRankedVisits.anemic AS SecondLastVisitAnemicStatus
// FROM (
//   SELECT 
//       cv1.childID,
//       cv1.childFullName,
//       cv1.Height,
//       cv1.anemic,
//       ROW_NUMBER() OVER (PARTITION BY cv1.childID ORDER BY cv1.visitID DESC) AS RowNum
//   FROM anaemia cv1
// ) AS RankedVisits
// JOIN (
//   SELECT 
//       cv2.childID,
//       cv2.Height,
//       cv2.anemic,
//       ROW_NUMBER() OVER (PARTITION BY cv2.childID ORDER BY cv2.visitID DESC) AS RowNum
//   FROM anaemia cv2
// ) AS SecondLastRankedVisits
// ON RankedVisits.childID = SecondLastRankedVisits.childID
//   AND SecondLastRankedVisits.RowNum = 2
// WHERE RankedVisits.RowNum = 1;
// `;
  
//   db.query(query, (error, results) => {
//     if (error) {
//       console.error('Error fetching data: ' + error.stack);
//       res.status(500).json({ error: 'Internal server error' });
//     } else {
//       res.status(200).json(results);
//     }
//   });
// });



app.get('/api/HeightDifference', (req, res) => {
  const query = `
    SELECT 
      RankedVisits.childID,
      RankedVisits.childFullName,
      ABS(RankedVisits.Height - SecondLastRankedVisits.Height) AS HeightDifference,
      RankedVisits.Height AS LastVisitHeight,
      SecondLastRankedVisits.Height AS SecondLastVisitHeight,
      RankedVisits.anemic AS LastVisitAnemicStatus,
      SecondLastRankedVisits.anemic AS SecondLastVisitAnemicStatus
    FROM (
      SELECT 
        cv1.childID,
        cv1.childFullName,
        cv1.Height,
        cv1.anemic,
        ROW_NUMBER() OVER (PARTITION BY cv1.childID ORDER BY cv1.visitID DESC) AS RowNum
      FROM anaemia cv1
    ) AS RankedVisits
    JOIN (
      SELECT 
        cv2.childID,
        cv2.Height,
        cv2.anemic,
        ROW_NUMBER() OVER (PARTITION BY cv2.childID ORDER BY cv2.visitID DESC) AS RowNum
      FROM anaemia cv2
    ) AS SecondLastRankedVisits
    ON RankedVisits.childID = SecondLastRankedVisits.childID
      AND SecondLastRankedVisits.RowNum = 2
    WHERE RankedVisits.RowNum = 1;
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});

//Height Personal analysis
app.get('/api/personalGraph', (req, res) => {
  const {ID} = req.query;
  console.log('Received request with ID:', ID);
  if(!ID) {
    return res.status(400).json({ error: 'ID is required' });
  }


  const query =`select weight,DATE_FORMAT(timestamp, '%Y-%m-%d') AS formatted_date from childphysicalexam where childFullName=?`;
  db.query(query, [ID], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return res.status(500).json({ error: 'Error retrieving student data', details: dberror.message });
    }
    console.log('Query executed successfully');
  console.log('Response from server:', dbresult);
    res.status(200).json({ message: 'Child data retrieved successfully', data: dbresult });
    console.log('Response from server:', dbresult);


  });
});


//Height Personal analysis
app.get('/api/personalHeightGraph', (req, res) => {
  const {ID} = req.query;
  console.log('Received request with ID:', ID);
  if(!ID) {
    return res.status(400).json({ error: 'ID is required' });
  }


  const query =`select *,DATE_FORMAT(timestamp, '%Y-%m-%d') AS formatted_date from childphysicalexam where childFullName=?`;
  db.query(query, [ID], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return res.status(500).json({ error: 'Error retrieving student data', details: dberror.message });
    }
    console.log('Query executed successfully');
  console.log('Response from server:', dbresult);
    res.status(200).json({ message: 'Child data retrieved successfully', data: dbresult });
    console.log('Response from server:', dbresult);


  });
});


//Age Analysis
app.get('/api/ageAnalysis', (req, res) => {
  const { year, ...filters } = req.query;

  let query = `SELECT
  COUNT(DISTINCT CASE WHEN CAST(SUBSTRING(enteredAge, 1, 2) AS SIGNED) < 10 THEN childFullName END) AS count_10,
  COUNT(DISTINCT CASE WHEN CAST(SUBSTRING(enteredAge, 1, 2) AS SIGNED) BETWEEN 10 AND 12 THEN childFullName END) AS count_10_12,
  COUNT(DISTINCT CASE WHEN CAST(SUBSTRING(enteredAge, 1, 2) AS SIGNED) BETWEEN 13 AND 15 THEN childFullName END) AS count_13_15,
  COUNT(DISTINCT CASE WHEN CAST(SUBSTRING(enteredAge, 1, 2) AS SIGNED) BETWEEN 16 AND 18 THEN childFullName END) AS count_16_18,
  COUNT(DISTINCT CASE WHEN CAST(SUBSTRING(enteredAge, 1, 2) AS SIGNED) > 18 THEN childFullName END) AS count_18
FROM childpersonaldetails`;
  const conditions = [];
  const values = [];

  for (const key in filters) {
      conditions.push(`${key} = ?`);
      values.push(filters[key]);
  }

  if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
  }

  if (year) {
      const yearCondition = Object.keys(filters).length > 0 ? 'AND' : 'WHERE';
      query += ` ${yearCondition} YEAR(timeStamp) = ?  `;
      values.push(year, year);
  }

  db.query(query, values, (error, results) => {
      if (error) {
          console.error('Error fetching data: ' + error.stack);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          res.status(200).json(results);
      }
  });
});

//NUTRI ANALYSIS 
app.get('/api/nutriAnalysis', (req, res) => {
  const { year, ...filters } = req.query;


  let query = `SELECT
  COUNT(DISTINCT CASE WHEN Nutirtional = 'underweight' THEN childfullname END) AS count_under,
  COUNT(DISTINCT CASE WHEN Nutirtional = 'normal' THEN childfullname END) AS count_normal,
  COUNT(DISTINCT CASE WHEN Nutirtional = 'overweight' THEN childfullname END) AS count_overWeight
FROM childvisit`;
  const conditions = [];
  const values = [];


  for (const key in filters) {
      conditions.push(`${key} = ?`);
      values.push(filters[key]);
  }


  if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
  }


  if (year) {
      const yearCondition = Object.keys(filters).length > 0 ? 'AND' : 'WHERE';
      query += ` ${yearCondition} YEAR(Date) = ?  `;
      values.push(year, year);
  }


  db.query(query, values, (error, results) => {
      if (error) {
          console.error('Error fetching data: ' + error.stack);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          res.status(200).json(results);
      }
  });
});



//Recovery new 
app.get('/api/recoveryAnalysis', (req, res) => {
  const { year, ...filters } = req.query;


  let query = `SELECT
  SUBSTRING_INDEX(childFullName, ' ', 1) AS FirstName,
  MAX(Date) AS LastVisit,
  COUNT(childID) AS RecoveryVisits
FROM childvisit
GROUP BY childFullName`;
  const conditions = [];
  const values = [];


  for (const key in filters) {
      conditions.push(`${key} = ?`);
      values.push(filters[key]);
  }


  if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
  }


  if (year) {
      const yearCondition = Object.keys(filters).length > 0 ? 'AND' : 'WHERE';
      query += ` ${yearCondition} YEAR(Date) = ?  `;
      values.push(year, year);
  }


  db.query(query, values, (error, results) => {
      if (error) {
          console.error('Error fetching data: ' + error.stack);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          res.status(200).json(results);
      }
  });
});



//Recovery graph
app.get('/api/recovery', (req, res) => {
  const query = `SELECT
  SUBSTRING_INDEX(childFullName, ' ', 1) AS FirstName,
  MAX(Date) AS LastVisit,
  COUNT(childID) AS RecoveryVisits
FROM childvisit
GROUP BY childFullName`;
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data: ' + error.stack);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});

//ANEMIC STATUS 
app.get('/api/anemicAnalysis', (req, res) => {
  const { year, ...filters } = req.query;


  let query = `SELECT
  COUNT(DISTINCT CASE WHEN Anemic = 1 THEN childfullname END) AS count_anemic,
  COUNT(DISTINCT CASE WHEN Anemic = 0 THEN childfullname END) AS count_normal
FROM childvisit`;
  const conditions = [];
  const values = [];


  for (const key in filters) {
      conditions.push(`${key} = ?`);
      values.push(filters[key]);
  }


  if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
  }


  if (year) {
      const yearCondition = Object.keys(filters).length > 0 ? 'AND' : 'WHERE';
      query += ` ${yearCondition} YEAR(Date) = ?  `;
      values.push(year, year);
  }


  db.query(query, values, (error, results) => {
      if (error) {
          console.error('Error fetching data: ' + error.stack);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          res.status(200).json(results);
      }
  });
});

//BMI Reports
app.get('/api/BMIGraph', (req, res) => {
  const {ID} = req.query;
  console.log('Received request with ID:', ID);
  if(!ID) {
    return res.status(400).json({ error: 'ID is required' });
  }


  const query =`select BMI,DATE_FORMAT(timestamp, '%Y-%m-%d') AS formatted_date,SUBSTRING_INDEX(childFullName, ' ', 1) AS FirstName from childphysicalexam where childFullName=?`;
  db.query(query, [ID], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return res.status(500).json({ error: 'Error retrieving student data', details: dberror.message });
    }
    console.log('Query executed successfully');
  console.log('Response from server:', dbresult);
    res.status(200).json({ message: 'Child data retrieved successfully', data: dbresult });
    console.log('Response from server:', dbresult);


  });
});

//HB REPORT
app.get('/api/hemoGraph', (req, res) => {
  const {ID} = req.query;
  console.log('Received request with ID:', ID);
  if(!ID) {
    return res.status(400).json({ error: 'ID is required' });
  }


  const query =`select HB,DATE_FORMAT(timestamp, '%Y-%m-%d') AS formatted_date,SUBSTRING_INDEX(childFullName, ' ', 1) AS FirstName from childphysicalexam where childFullName=?`;
  db.query(query, [ID], (dberror, dbresult) => {
    if (dberror) {
      console.error('Database query error:', dberror);
      return res.status(500).json({ error: 'Error retrieving student data', details: dberror.message });
    }
    console.log('Query executed successfully');
  console.log('Response from server:', dbresult);
    res.status(200).json({ message: 'Child data retrieved successfully', data: dbresult });
    console.log('Response from server:', dbresult);


  });
});







// Start the Express server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




  
//  const userName = req.body.get('userName');
//  const email = req.body.get('email');
//  const password = req.body.get('password');
//app.use(bodyParser.urlencoded({ extended: true }));