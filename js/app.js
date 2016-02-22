(function (){
    var app = angular.module('beat', ['ngCookies', 'pascalprecht.translate']);

    app.config(['$translateProvider', function ($translateProvider) {
      $translateProvider.useStaticFilesLoader({
          prefix: '/locale/',
          suffix: '.json'
      });

      $translateProvider.determinePreferredLanguage();
      $translateProvider.useLocalStorage();
    }]);

    app.controller('homeController', ['$translate', '$scope', function ($translate, $scope) {
        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };

        $scope.languages = [
            {
              key: 'en_US',
              text: 'English'
            },
            {
              key: 'zh',
              text: '中文(台灣)'
            },
            {
              key: 'pt_PT',
              text: 'Português'
            }
        ];

    }]);

})();
