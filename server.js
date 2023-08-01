var express = require("express");
var fileuploader = require("express-fileupload");
var mysql = require("mysql");

var app = express();
app.use(express.urlencoded(true));
app.use(express.static("public"));
app.use(fileuploader());

app.listen(2004, function () {
  console.log("Server Connected");
})

app.get("/", function () {
  console.log("Index page");
})

app.get("/panel-users", function (req, resp) {
  resp.sendFile(process.cwd() + "/public/panel-users.html");
})

app.get("/panel-donor", function (req, resp) {
  resp.sendFile(process.cwd() + "/public/panel-donor.html");
})

app.get("/panel-needy", function (req, resp) {
  resp.sendFile(process.cwd() + "/public/panel-needy.html");
})

app.get("/profile-donor", function (req, resp) {
  resp.sendFile(process.cwd() + "/public/profile-donor.html");
})

app.get("/profile-needy", function (req, resp) {
  resp.sendFile(process.cwd() + "/public/profile-needy.html");
})

app.get("/avail-med", function (req, resp) {
  resp.sendFile(process.cwd() + "/public/avail-med.html");
})

app.get("/med-manager", function (req, resp) {
  resp.sendFile(process.cwd() + "/public/med-manager.html");
})

app.get("/finder-med", function (req, resp) {
  resp.sendFile(process.cwd() + "/public/finder-med.html");
})
// Database Connectivity
var dbConfig = {
  host: "localhost",
  user: "root",
  password: "Deevansh@20",
  database: "nodeproject",
  insecureAuth: true,
  dateStrings: true
}

var dbCon = mysql.createConnection(dbConfig);

dbCon.connect(function (err) {
  if (err == null) {
    console.log("Connected Successfully...");
  }
  else {
    console.log(err);
  }
})

//  Profile-donor.html operations
// Sybmit btn
app.post("/profile-donor-success", function (req, resp) {
  var fileName;

  if (req.files != null) {
    fileName = req.files.picUpload.name;
    var path = process.cwd() + "/public/uploads/" + fileName;
    req.files.picUpload.mv(path);
  }
  else {
    fileName = req.body.hdn;
  }
  console.log(req.body);
  console.log(fileName);
  var emailid = req.body.txtemail;
  var name = req.body.txtname;
  var contact = req.body.txtcontact;
  var address = req.body.txtaddress;
  var city = req.body.combocity;
  var dob = req.body.txtdob;
  var gender = req.body.combogender;
  var id = req.body.comboidproof;
  var hourto = req.body.timeto;
  var hourfrom = req.body.timefrom;

  dbCon.query("insert into donors(emailid,name,contact,address,city,dob,gender,id,idpicname,hourfrom,hourto) values(?,?,?,?,?,?,?,?,?,?,?)", [emailid, name, contact, address, city, dob, gender, id, fileName, hourfrom, hourto], function (err) {
    if (err == null) {
      resp.send("Record saved successfully.....");
    }
    else
      console.log(err);
  })

})
// Search Btn
app.get("/profile-donor-search-email", function (req, resp) {
  //fixed                             //same seq. as in table
  dbCon.query("select * from donors where emailid=?", [req.query.kuchEmail], function (err, resultTableJSON) {
    if (err == null) {
      if (resultTableJSON.length == 0)
        resp.send("Not Found")
      else
        resp.send(resultTableJSON);
    }

    else
      resp.send(err);
  })
})

// Update Btn

app.post("/profile-donor-update", function (req, resp) {
  //---------------File Uploading================
  var fileName;
  if (req.files != null) {
    //console.log(process.cwd());
    fileName = req.files.picUpload.name;
    var path = process.cwd() + "/public/uploads/" + fileName;
    req.files.picUpload.mv(path);
  }
  else {
    fileName = req.body.hdn;
  }
  console.log(req.body);
  //resp.send("File name="+fileName);

  //saving data in table
  var emailid = req.body.txtemail;
  var name = req.body.txtname;
  var contact = req.body.txtcontact;
  var address = req.body.txtaddress;
  var city = req.body.combocity;
  var dob = req.body.txtdob;
  var gender = req.body.combogender;
  var id = req.body.comboidproof;
  var hourto = req.body.timeto;
  var hourfrom = req.body.timefrom;
  console.log(req.body);
  dbCon.query("update donors set name=?,contact=?,address=?,city=?,dob=?,gender=?,id=?,idpicname=?,hourfrom=?,hourto=? where emailid=?", [name, contact, address, city, dob, gender, id, fileName, hourfrom, hourto, emailid], function (err) {
    if (err == null) {

      resp.send("Record Updated Successssfullllyyyyyyyyy!!!!!!!");
    }
    else
      resp.send(err);
  })
})
// delete btn
app.post("/profile-donor-delete", function (req, resp) {
  var email = req.body.txtemail;

  dbCon.query("delete from donors where emailid=?", [email], function (err, result) {
    if (err == null) {
      if (result.affectedRows == 1)
        resp.send("Account Removed Successssfullllyyyyyyyyyyyyyyyyyyyyyyyy!!!!!!!!!");
      else
        resp.send("Invalid Email id");
    }
    else
      resp.send(err);
  })
})
//  Profile-needy.html operations
// Sybmit btn
app.post("/profile-needy-success", function (req, resp) {
  var fileName;

  if (req.files != null) {
    fileName = req.files.picUpload.name;
    var path = process.cwd() + "/public/uploads/" + fileName;
    req.files.picUpload.mv(path);
  }
  else {
    fileName = req.body.hdn;
  }
  console.log(req.body);
  console.log(fileName);
  var emailid = req.body.txtemail;
  var name = req.body.txtname;
  var contact = req.body.txtcontact;
  var address = req.body.txtaddress;
  var city = req.body.combocity;
  var dob = req.body.txtdob;
  var gender = req.body.combogender;

  dbCon.query("insert into needy(emailid,name,contact,address,city,dob,gender,idpicname) values(?,?,?,?,?,?,?,?)", [emailid, name, contact, address, city, dob, gender, fileName], function (err) {
    if (err == null) {
      resp.send("Record saved successfully.....");
    }
    else
      console.log(err);
  })

})
// Search Btn
app.get("/profile-needy-search-email", function (req, resp) {
  console.log(req.query);
  //fixed                             //same seq. as in table
  dbCon.query("select * from needy where emailid=?", [req.query.kuchEmail], function (err, resultTableJSON) {
    if (err == null) {
      if (resultTableJSON.length == 0)
        resp.send("Not Found")
      else
        resp.send(resultTableJSON);
    }

    else
      resp.send(err);
  })
})

// Update Btn

app.post("/profile-needy-update", function (req, resp) {
  //---------------File Uploading================
  var fileName;
  if (req.files != null) {
    //console.log(process.cwd());
    fileName = req.files.picUpload.name;
    var path = process.cwd() + "/public/uploads/" + fileName;
    req.files.picUpload.mv(path);
  }
  else {
    fileName = req.body.hdn;
  }
  console.log(req.body);
  //resp.send("File name="+fileName);

  //saving data in table
  var emailid = req.body.txtemail;
  var name = req.body.txtname;
  var contact = req.body.txtcontact;
  var address = req.body.txtaddress;
  var city = req.body.combocity;
  var dob = req.body.txtdob;
  var gender = req.body.combogender;

  console.log(req.body);
  dbCon.query("update needy set name=?,contact=?,address=?,city=?,dob=?,gender=?,idpicname=? where emailid=?", [name, contact, address, city, dob, gender, fileName, emailid], function (err) {
    if (err == null) {

      resp.send("Record Updated Successssfullllyyyyyyyyy!!!!!!!");
    }
    else
      resp.send(err);
  })
})


// Signup modals operations
// After email blur email is checked whether already exist or not 
app.get("/chk-email", function (req, resp) {
  var email = req.query.kuchEmail;
  dbCon.query("select * from users where email=?", [email], function (err, resultTable) {
    if (err == null) {
      if (resultTable.length == 1)
        resp.send("Already Taken...");
      else
        resp.send("Available....!!!!");
    }
    else
      resp.send(err);
  })
})
// Submit btn
app.get("/chk-submit", function (req, resp) {

  dbCon.query("insert into users(email,pwd,type,dos,status) values(?,?,?,current_date(),1)", [req.query.kuchemail, req.query.kuchpwd, req.query.kuchtype], function (err) {
    if (err == null) {
      resp.send("Record Saved successfully")
    }
    else {
      resp.send(err);
    }
  })

})

// Login modal operations
// after login btn account checked whether blocked or not and then dashboard is opened acc to the type 
app.get("/chk-login", function (req, resp) {

  dbCon.query("select type,status from users where email=? and pwd=?", [req.query.kuchemail, req.query.kuchpwd], function (err, result) {
    if (err == null) {
      if (result.length == 1) {
        if (result[0].status == 1)
          resp.send(result[0].type);
        else
          resp.send("U r blocked");
      }
      else
        resp.send("invalid email/pwd");
    }
    else {
      resp.send(err.toString());
    }
  })

})

app.get("/chk-admin", function (req, resp) {
console.log(req.query);
  dbCon.query("select type,status from users where email=? and pwd=?", [req.query.kuchemailA, req.query.kuchpwdA], function (err, result) {
    if (err == null) {
      if (result.length == 1) {
        if (result[0].status == 1)
          resp.send(result[0].type);
        else
          resp.send("U r blocked");
      }
      else
        resp.send("invalid email/pwd");
    }
    else {
      resp.send(err.toString());
    }
  })

})

// available medicines operations

app.get("/med-submit", function (req, resp) {
  console.log(req.query);
  dbCon.query("insert into medsavailable(srno,email,med,expdate,packing,qty) values(?,?,?,?,?,?)", [0, req.query.kuchemail, req.query.kuchmedname, req.query.kuchexdate, req.query.kuchpacking, req.query.kuchquantity], function (err) {
    if (err == null) {

      resp.send("Record Saved successfully")
    }
    else {
      resp.send(err);
    }
  })

})

// dash-donor.html
// Settings operation
app.get("/updatepwd-donor", function (req, resp) {

  console.log(req.query);
  if (req.query.setnewp == req.query.setcnfp && req.query.setoldp != req.query.setnewp) {
    dbCon.query("update users set pwd=? where email=? and type='Donor'", [req.query.setnewp, req.query.setemail], function (err) {
      if (err == null) {
        resp.send("Password Changed Successfully...");
      }
      else {
        resp.send(err);
      }
    })

  }
  else if (req.query.setoldp == req.query.setnewp) {
    resp.send("New passwword cannot be same as old password.")
  }
  else {
    resp.send("Confirmation pwd is not same.");
  }

})


// dash-needy.html
// Settings operation
app.get("/updatepwd-needy", function (req, resp) {


  if (req.query.setnewp == req.query.setcnfp && req.query.setoldp != req.query.setnewp) {
    dbCon.query("update users set pwd=? where email=? and type='Needy'", [req.query.setnewp, req.query.setemail], function (err) {

      if (err == null) {
        resp.send("Password Changed Successfully...");
      }
      else {
        resp.send(err);
      }
    })

  }
  else if (req.query.setoldp == req.query.setnewp) {
    resp.send("New passwword cannot be same as old password.")
  }
  else {
    resp.send("Confirmation pwd is not same.");
  }

})

app.get("/fetch-records-panel-users", function (req, resp) {
  //fixed                             //same seq. as in table
  dbCon.query("select * from users", function (err, resultTableJSON) {
    if (err == null)
      resp.send(resultTableJSON);
    else
      resp.send(err);
  })
})
app.get("/do-angular-block", function (req, resp) {
  var email = req.query.emailkuch;
  var type = req.query.type;

  dbCon.query("update users set status='0' where email=? and type=?", [email, type], function (err, result) {
    if (err == null) {
      if (result.affectedRows == 1)
        resp.send("Account blocked Successssfullllyyyyyyyyyyyyyyyyyyyyyyyy!!!!!!!!!");
      else
        resp.send("Inavlid Email id");
    }
    else
      resp.send(err);
  })
})

app.get("/do-angular-resume", function (req, resp) {

  var email = req.query.emailkuch;
  var typ = req.query.type;

  dbCon.query("update users set status='1' where email=? and type=?", [email, typ], function (err, result) {
    if (err == null) {
      if (result.affectedRows == 1)
        resp.send("Account Resumed Successssfullllyyyyyyyyyyyyyyyyyyyyyyyy!!!!!!!!!");
      else
        resp.send("Inavlid Email id");
    }
    else
      resp.send(err);
  })
})
app.get("/fetch-records-panel-donors", function (req, resp) {
  //fixed                             //same seq. as in table
  dbCon.query("select * from donors", function (err, resultTableJSON) {
    if (err == null)
      resp.send(resultTableJSON);
    else
      resp.send(err);
  })
})
app.get("/fetch-records-panel-needy", function (req, resp) {
  //fixed                             //same seq. as in table
  dbCon.query("select * from needy", function (err, resultTableJSON) {
    if (err == null)
      resp.send(resultTableJSON);
    else
      resp.send(err);
  })
})
app.get("/fetch-records-med-man", function (req, resp) {
  //fixed                             //same seq. as in table
  var email=req.query.emailkuch;
  dbCon.query("select * from medsavailable where email=?",[email],function (err, resultTableJSON) {
    if (err == null)
      resp.send(resultTableJSON);
    else
      resp.send(err);
  })
})
app.get("/do-angular-med-delete",function(req,resp)
{
     //saving data in table
    var srno=req.query.srkuch;
    

         //fixed                             //same seq. as in table
    dbCon.query("delete from medsavailable where srno=?",[srno],function(err,result)
    {
          if(err==null)
          {
            if(result.affectedRows==1)
              resp.send("Medicine Removed Successssfullllyyyyyyyyyyyyyyyyyyyyyyyy!!!!!!!!!");
            else
              resp.send("Inavlid Email id");
            }
              else
            resp.send(err);
    })
})
app.get("/get-cities",function(req,resp)
{
  console.log(req.query);
    dbCon.query("select distinct city from donors",function(err,resultTableJSON)
    {
          if(err==null)
            resp.send(resultTableJSON);
              else
            resp.send(err);
    })
})
app.get("/get-med",function(req,resp)
{
    dbCon.query("select distinct med from medsavailable",function(err,resultTableJSON)
    {
          if(err==null)
            resp.send(resultTableJSON);
              else
            resp.send(err);
    })
})

app.get("/fetch-donors",function(req,resp)
{
  console.log(req.query);
  var med=req.query.medKuch;
  var city=req.query.cityKuch;

  var query="select donors.name,donors.address,donors.idpicname,donors.city,donors.gender,donors.contact,donors.dob,donors.hourfrom,donors.hourto,medsavailable.med from donors inner join medsavailable on donors.emailid= medsavailable.email where medsavailable.med=? and donors.city=?";
  

  dbCon.query(query,[med,city],function(err,resultTable)
  {
    console.log(resultTable+"      "+err);
  if(err==null)
    resp.send(resultTable);
  else
    resp.send(err);
  })
})
app.get("/fetch-details-donors",function(req,resp){
  console.log(req,query);
  var email=req.query.emailkuch;

  dbCon.query("select * from donors where email=?",[email],function(err,result){
    if(err=null)
    {
      resp.send(result);
    }
    elseresp.send(err);
  })
})