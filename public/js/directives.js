'use strict';

/* Directives */
console.log('directive stuff yay');

pApp.directive('imageonload', function() {
  return {
//    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('load', function() {
        //TODO if w or h > 1080 then make pic smaller with picStyle
        var w = element[0].width;
        var h = element[0].height;
        scope.defineNewPicStyle(w, h);
        scope.$apply();
      });
    }
  };
});
