(function (app) {
  'use strict';

  app.directive('psVideoUpload', ['WISTIA', 'toaster', function (WISTIA, toaster) {
    return {
      restrict: 'E',
      templateUrl: './ps-video-upload/ps-video-upload.html',
      scope: {
        add: '&',
        done: '='
      },
      link: function (scope, elem) {
        scope.fail = false;

        $(elem).fileupload({
          dataType: 'json',
          formData: {
            project_id: WISTIA.PROJECT_ID,
            api_password: WISTIA.API_TOKEN
          },
          add: function (e, data) {
            scope.progress = 0;
            scope.fail = false;
            data.url = WISTIA.UPLOAD_URL;
            data.submit();
          },
          done: function (e, data) {
            scope.$apply(function () {
              scope.done(data.result);
            })
          },
          fail: function (e, data) {
            scope.$apply(function () {
              var res = data.response();
              scope.progress = 0;
              scope.fail = true;
              toaster.pop({
                type: 'error',
                title: 'Error',
                body: res.jqXHR.responseJSON.error,
                timeout: 5000
              });
            })
          },
          progressall: function (e, data) {
            if (data.total > 0) {
              scope.$apply(function () {
                scope.progress = parseInt(data.loaded / data.total * 100, 10);
              });
            }
          }
        });
      }
    }
  }]);

})(angular.module('app'));