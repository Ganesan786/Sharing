angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope, $ionicTabsDelegate, UsersInfo) {
        $scope.users = UsersInfo.all();
        $scope.goForward = function() {
            var selected = $ionicTabsDelegate.selectedIndex();
            if (selected != -1) {
                $ionicTabsDelegate.select(selected + 1);
            }
        }

        $scope.goBack = function() {
            var selected = $ionicTabsDelegate.selectedIndex();
            if (selected != -1 && selected != 0) {
                $ionicTabsDelegate.select(selected - 1);
            }
        }
    })
    .controller('addForm', function($scope, $ionicTabsDelegate, $state, UsersInfo, $filter) {
        //$ionicTabsDelegate.showBar(false);
        $scope.user = {};
        $scope.$on("$ionicView.beforeEnter", function() {
            $ionicTabsDelegate.showBar(false);
        });
        $scope.$on("$ionicView.beforeLeave", function() {
            $ionicTabsDelegate.showBar(true);
        });
        $scope.goForward = function() {
            var selected = $ionicTabsDelegate.selectedIndex();
            if (selected != -1) {
                $ionicTabsDelegate.select(selected + 1);
            }
        }
        $scope.goBack = function() {
            var selected = $ionicTabsDelegate.selectedIndex();
            if (selected != -1 && selected != 0) {
                $ionicTabsDelegate.select(selected - 1);
            }
        }
        $scope.$watch('user.myDate', function(newValue) {
            $scope.date = $filter('date')(newValue, 'dd-MM-yyyy');
        });
               $scope.formSubmission = function() {
            var obj = {
                "name": $scope.user.name,
                "rs": $scope.user.money,
                "description": $scope.user.description,
                "date": $scope.date,
                "result": []
            };
            UsersInfo.all().push(obj);
            $scope.resultObj = UsersInfo.all();
            $scope.calc();
            $state.go("tab.dash");
        }
    })
    /*
    .controller('ChatsCtrl', function($scope, Chats,$ionicTabsDelegate) {
      $scope.chats = Chats.all();
      $scope.remove = function(chat) {
        Chats.remove(chat);
      };
       $scope.goForward = function () {
            var selected = $ionicTabsDelegate.selectedIndex();
            if (selected != -1) {
                $ionicTabsDelegate.select(selected + 1);
            }
        }

        $scope.goBack = function () {
            var selected = $ionicTabsDelegate.selectedIndex();
            if (selected != -1 && selected != 0) {
                $ionicTabsDelegate.select(selected - 1);
            }
        }
    })

    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats,$ionicTabsDelegate) {
      $scope.chat = Chats.get($stateParams.chatId);
       $scope.goForward = function () {
            var selected = $ionicTabsDelegate.selectedIndex();
            if (selected != -1) {
                $ionicTabsDelegate.select(selected + 1);
            }
        }

        $scope.goBack = function () {
            var selected = $ionicTabsDelegate.selectedIndex();
            if (selected != -1 && selected != 0) {
                $ionicTabsDelegate.select(selected - 1);
            }
        }
    })*/

    .controller('AccountCtrl', function($scope, $ionicTabsDelegate, UsersInfo) {
        // $scope.users = UsersInfo.all();
         $scope.calc = function() {
            /*  var obj = [
  {name:obj.name,rs:obj.money,result:[]},
  {name:obj.name1,rs:obj.money1,result:[]},
  {name:obj.name2,rs:obj.money2,result:[]},
  {name:obj.name3,rs:obj.money3,result:[]},
  //{name:"Jay",rs:1500,result:[]},
];*/
            var obj = $scope.resultObj;
            debugger;
            console.log(obj);
            var avg = 0;
            var neutral = [];

            _.each(obj, function(item) {
                avg += item.rs
            }); // Total 

            var newVal = _.each(obj, function(item) {
                item.rs = item.rs - (avg / obj.length)
            }); // Average with json assign

            neutral.push(_.findWhere(newVal, {
                'rs': 0
            })); // Talley user

            newVal = _.without(newVal, _.findWhere(newVal, {
                rs: 0
            })); // Remove Talley user from json

            var finalVal = _.each(newVal, function(item) {

                var credited = multiplemax(newVal, 'rs')[0].rs;
                var minObj = multiplemin(newVal, 'rs')[0];
                var maxObj = multiplemax(newVal, 'rs')[0];

                if (maxObj.rs <= Math.abs(minObj.rs)) {
                    minObj.rs = -(Math.abs(maxObj.rs - Math.abs(minObj.rs)));
                    maxObj.result.push({
                        'give': minObj.name,
                        'money': maxObj.rs
                    });
                    maxObj.rs = "null";
                } else {
                    maxObj.rs = (Math.abs(maxObj.rs - Math.abs(minObj.rs)));
                    maxObj.result.push({
                        'give': minObj.name,
                        'money': Math.abs(minObj.rs)
                    });
                    minObj.rs = "null";
                }
            });

            function multiplemin(arr, compare) {
                var min = _.min(arr, function(v) {
                    return v[compare]
                });
                return _.filter(arr, function(v) {
                    return v[compare] == min[compare]
                });
            }

            function multiplemax(arr, compare) {
                var max = _.max(arr, function(v) {
                    return v[compare]
                });
                return _.filter(arr, function(v) {
                    return v[compare] == max[compare]
                });
            }
            finalVal = _.each(finalVal, function(item) {
                item.result = _.without(item.result, _.findWhere(item.result, {
                    money: -0
                }))
            });
            //console.log(finalVal);
          
            //$scope.lists = finalVal;
            UsersInfo.result().push(finalVal);

        };

        $scope.goForward = function() {
            var selected = $ionicTabsDelegate.selectedIndex();
            if (selected != -1) {
                $ionicTabsDelegate.select(selected + 1);
            }
        }

        $scope.goBack = function() {
            var selected = $ionicTabsDelegate.selectedIndex();
            if (selected != -1 && selected != 0) {
                $ionicTabsDelegate.select(selected - 1);
            }
        }
        $scope.lists = UsersInfo.result();

    });