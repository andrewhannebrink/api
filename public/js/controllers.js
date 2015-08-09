'use strict';

var pApp = angular.module('pApp', ['ngFileUpload']);

pApp.controller('PCtrl', ['$scope', '$http', 'Upload', function ($scope, $http, Upload) {
  $scope.sampleImg = "img/sample.png";
  $scope.elementsize = 40;
  $scope.scale = 50;
  $scope.browserChecked = false;
  $scope.mobileWrap = {};
  $scope.iconSets= {
    "win": {
      "elb": "img/win/shell32_16-0.png",
      "els": "img/win/nwnp32_1_WRKGRP_ICON-0.png",
      "icon": [
        "img/win/shell32_18-0.png",
        "img/win/mcm_3200.png",
        "img/win/isign32_ICO_APP-0.png",
        "img/win/inetcpl_1305-0.png",
        "img/win/telnet_TELNET-1.png"
      ],
      "iconify": "img/win/mspaint_2-0.png",
      "ps":"img/win/inetcpl_1313-3.png",
      "pb":"img/win/inetcpl_1313-5.png",
      "upload":"img/win/syncui_135-0.png"
    },
    "emoji": {
      "protractor": "img/emoji/1f4d0.png",
      "icon": [
        "img/emoji/1f525.png",
        "img/emoji/1f365.png",
        "img/emoji/1f602.png",
	"img/emoji/1f34a.png",
	"img/emoji/1f496.png"
      ]
    }
  };
  $scope.curIcon = $scope.iconSets.emoji.icon;
  $scope.curIconName = 'emoji';

  $scope.miniStyle = {
    width: '40px',
    height: '40px'
  };
  $scope.iconChange = function(set) {
    this.curIcon = this.iconSets[set].icon;
    this.curIconName = set;
  };


  // magical/mystical regex expression for detecting mobile devices
  $scope.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

  $scope.mobile = $scope.mobilecheck();

  //sets browser style depending on mobile / web browser detection
  $scope.browserfy = function(w, h) {
    var mobile = $scope.mobilecheck();
    if (mobile === true) {
      $scope.browserStyle = {
        'top': '0px',
        background: 'rgba(255, 255, 255, 0.85)',
        width: '280px',
        height: '350px',
        position: 'fixed'
      };
      $scope.mobileWrap = {
        position: 'absolute',
        overflow: 'scroll',
        height: '600px',
        width: '600px'
      };
      $scope.picStyle = {
        width: w + 'px',
        height: h + 'px'
      }
    } else {
      $scope.picStyle = {
        'top': '84px',
        left: '220px',
        width: w + 'px',
        height: h + 'px'
      }
      $scope.browserStyle = {
        '-webkit-box-shadow': '5px 5px 6px 5px rgba(48,48,48,0.61)',
        '-moz-box-shadow': '5px 5px 6px 5px rgba(48,48,48,0.61)',
        'box-shadow': '5px 5px 6px 5px rgba(48,48,48,0.61)',
        padding:'16px',
        'top': '160px',
        left: '32px',
        'border-width': '4px',
        'border-radius': '23px'
      };
    }
    $scope.browserChecked = true;
  };

  $scope.iconify = function() {
    var formData = {
      curWidth: this.curWidth,
      curHeight: this.curHeight,
      width: this.width,
      height: this.height,
      curIconName: this.curIconName,
      elementsize: this.elementsize
    };
    $http.post('/api/test',  formData)
      .success(function(data) {
        console.dir(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.$watch('files', function() {
    $scope.upload($scope.files);
  });
  
  $scope.upload = function (files) {
    if (files) {
      console.log('inside upload()');
      console.dir(files);
        var file = files;
        Upload.upload({
          url: '/api/photo',
          //fields: {'username': $scope.username},
          file: file
        }).progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
          console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
          console.dir(data);
        }).error(function (data, status, headers, config) {
          console.log('error status: ' + status);
        })
    }
  };
//<input type="file" name="file" onchange="angular.element(this).scope().uploadFile(this.files)" style="ww" />
/*  $scope.uploadFile = function(files) {
      var fd = new FormData();
      //Take the first selected file
      fd.append("file", files[0]);
      console.dir(files[0]);
      //TODO
  
      $http.post(uploadUrl, fd, {
          withCredentials: true,
          headers: {'Content-Type': undefined },
          transformRequest: angular.identity
      }).success(function(){console.log('success');}).error(function(){console.log('error');});
  };*/

  $scope.scaleChange = function() {
    if (this.maxMult > 1) {
      if (this.scale >= 50) {
        var steps = this.scale - 50
        var mult = 1 + steps*(this.maxMult - 1)/50;
      } else {
        var steps = this.scale
        var mult = this.minMult + steps*(1 - this.minMult)/50
      } 
      this.curWidth = Math.floor(this.width * mult);
      this.curHeight = Math.floor(this.height * mult);
      this.picStyle.width = this.curWidth + 'px';
      this.picStyle.height = this.curHeight + 'px';
      this.reGrid();
    } else { 
      if (this.scale >= 50) {
        var steps = this.scale - 50;
        var mult = this.maxMult + steps*(this.extMaxMult - this.maxMult)/50;
      } else {
        var steps = this.scale;
        var mult = this.minMult + steps*(this.maxMult - this.minMult)/50;
      }
      this.curWidth = Math.floor(this.width * mult);
      this.curHeight = Math.floor(this.height * mult);
      this.picStyle.width = this.curWidth + 'px';
      this.picStyle.height = this.curHeight + 'px';
      this.reGrid();
    }
  };

  $scope.elChange = function() {
    if (this.elementsize > 40) {
      this.reGrid();
      var buf = 0;
    } else {
      var buf = 40 - this.elementsize;
    }
    this.miniStyle = {
      width: this.elementsize + 'px',
      height: this.elementsize + 'px',
      'margin-top': buf + 'px',
      'margin-left': buf + 'px',
    };
  };
  
  $scope.reGrid = function() {
    this.sideXImgs = Math.floor(this.curWidth / this.elementsize) + 2;
    this.sideYImgs = Math.floor(this.curHeight / this.elementsize) + 2;
    this.matX = [];
    this.matY = [];
    for (var x = 0; x < this.sideXImgs; x++) {
      //this.matX[x] = Math.floor(Math.random()*10);
      this.matX[x] = x%10;
    }
    for (var y = 0; y < this.sideYImgs; y++) {
      //this.matY[y] = Math.floor(Math.random()*10);
      this.matY[y] = y%10;
    }
  };

  $scope.infoStyle = {
    'z-index': '150',
    width: '210px',
    height: '140px'
  };

  $scope.updateInfoStyle = function() {
    this.infoStyle['top'] = '50px';
    this.infoStyle['left'] = '50px';
  };

  $scope.defineNewPicStyle = function(w, h) {
    this.width = w;
    this.height = h;
    var b = w > h ? w : h;
    var s = w < h ? w : h;
    this.maxMult = 900 / b;
    if (this.maxMult < 1) {
      this.extMaxMult = 1000 / b;
    }   
    this.minMult = 32 / s;  
    this.curWidth = this.maxMult > 1 ? w : w*this.maxMult;
    this.curHeight = this.maxMult > 1 ? h : h*this.maxMult;
    this.reGrid();
    this.browserfy(this.curWidth, this.curHeight);
    this.updateInfoStyle();
  };
  
  $scope.defineNewPicStyle(1920, 1080);
}]);

