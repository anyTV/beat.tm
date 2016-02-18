(function (){
    var app = angular.module('beat', ['ngCookies', 'pascalprecht.translate']);

    app.config(['$translateProvider', function ($translateProvider) {
      // // configures staticFilesLoader
      // $translateProvider.useStaticFilesLoader({
      //   prefix: 'data/locale-',
      //   suffix: '.json'
      // });
      // load 'en' table on startup
      // $translateProvider.useUrlLoader('foo/zh.json');
      $translateProvider.useStaticFilesLoader({
          prefix: '/locale/',
          suffix: '.json'
      });

      $translateProvider.determinePreferredLanguage();

      $translateProvider.useLocalStorage();
      // $translateProvider.preferredLanguage('zh');
      // $translateProvider.preferredLanguage('en');
    }]);

    app.controller('homeController', ['$translate', '$scope', function ($translate, $scope) {
        $scope.changeLanguage = function (langKey) {
            console.log("langKey", langKey);
            $translate.use(langKey);
        };

        console.log("$translate.use()", $translate.proposedLanguage());
    }]);

})();