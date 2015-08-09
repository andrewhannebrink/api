// server.js
(function () {
  // set up ========================
  var express  = require('express');
  var app = express();                               // create our app w/ express
  var multer = require('multer');
  var exec = require('child_process').exec;
  var childProc;
  var mongoose = require('mongoose');                     // mongoose for mongodb
  var morgan = require('morgan');             // log requests to the console (express4)
  var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
  var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
  var gm = require('gm');  //graphics magick lib

  // configuration =================

  mongoose.connect('mongodb://node:nodeuser@localhost:27017/icondb');     // connect to mongoDB database on modulus.io

  app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
  app.use(morgan('dev'));                                         // log every request to the console
  app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                                     // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
  app.use(methodOverride());

  var fileTooLarge = false; //TODO block large files from working

  app.use(multer( { 
    dest: './public/uploads/',
    limits: {
      fileSize: 1500000
    },
//    onFileSizeLimit: function (file) {
//      fileTooLarge = true;
      /*res.json({
        uploadError: 'Upload failed. File must be less than 1.5 MB'
      });*/
//    },
    rename: function(fieldname, filename) {
      return filename+Date.now();
    },
    onFileUploadStart: function(file) {
      console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function(file) {
      console.log(file.fieldname + ' uploaded to ' + file.path);
      if (file.mimetype.substr(0, 5) !== 'image') {
        //res.json({success: 'false', msg: 'File must be an image'});
        return
      } else { 
      //if (file.
        if (file.mimetype !== 'image/png') {
          childProc = exec('convert ' + file.path + ' ' + file.path + '.png');
        }
        //res.json({success: 'false', msg: 'File uploaded'});
      }

        
      /*for (var a in file) {
        if (file.hasOwnProperty(a)) {
          console.log('file.' + a + ': ' + file[a]);
        }
      }*/
    }
  }));

  // ROUTES
  app.post('/api/test', function(req, res) {
    res.json({success: 'true', oreq: req.body});
  });
  
  app.post('/api/photo', function(req, res) {
    console.log('/api/photo/ req: ');
    for (var a in req.files.file) {
      if (req.files.file.hasOwnProperty(a)) {
        console.log('req.files.file.' + a + ': ' + req.files.file[a]);
      }
    }
    if (req.files.file.mimetype.substr(0, 5) !== 'image') {
      res.json({success: 'false', msg: 'File must be an image'});
    } else if (req.files.file.truncated === true) {
      res.json({success: 'false', msg: 'File must be < 1.5MB'});
    } else {
      gm(req.files.file.path).size(function (err, size) {
        if (!err) {
          var odim = [size.width, size.height];
          if (req.files.file.mimetype === 'image/png') {
            res.json({success: 'true', imgNames: [req.files.file.name, req.files.file.name], odim: odim });
          } else {
            res.json({success: 'true', imgNames: [req.files.file.name, req.files.file.name + '.png'], odim: odim });
          }
        } else {
          console.log('gm err: ' + err);
        }
      });
      
    }
  });
 

  app.get('/', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });

  // listen (start app with node server.js) ======================================
  app.listen(8000);
  console.log("App listening on port 8000");
})();
