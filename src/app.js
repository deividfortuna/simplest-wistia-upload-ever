(function (angular) {
  'use strict';

  var app = angular.module('app', ['toaster']);
  
  app.controller('main', ['$sce', function ($sce) {
    var that = this;
    this.done = function (result) {
      var url = 'http://fast.wistia.net/embed/iframe/' + result.hashed_id;
      that.loaded = true;
      that.url = $sce.trustAsResourceUrl(url);
    }
  }]);
  
  app.constant('WISTIA', {
    UPLOAD_URL: 'https://upload.wistia.com',
    API_TOKEN: '514076e19ee07cd1433f1aafdb760180f4ab6bc0121132c0f9ae2cc70a8381e2',
    PROJECT_ID: 'td2k8ccn48'
  });
})(window.angular);