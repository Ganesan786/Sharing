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
                "money":$scope.user.money,
                "rs": $scope.user.money,
                "description": $scope.user.description,
                "date": $scope.date,
                "result": []
            };
            UsersInfo.all().push(obj);
            $state.go("tab.dash");
        }
    })


    .controller('AccountCtrl', function($scope, $ionicTabsDelegate,$state, UsersInfo) {
         $scope.lists = [];
         $scope.resultObj = [];
         $scope.calc = function() {
            var obj = $scope.resultObj;
            var avg = 0;
            var neutral = [];

            _.each(obj, function(item) {
                avg += item.money
            }); // Total 
            $scope.sumofresult = avg;
            $scope.average = Math.round((avg / obj.length) * 100) / 100;
            var newVal = _.each(obj, function(item) {
                item.rs = item.money - (avg / obj.length)
            }); // Average with json assign
             
             _.each(obj, function(item) {
                item.result=[]
            }); // Total
             
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
                        'money': Math.round(maxObj.rs * 100) / 100
                    });
                    maxObj.rs = "null";
                } else {
                    maxObj.rs = (Math.abs(maxObj.rs - Math.abs(minObj.rs)));
                    maxObj.result.push({
                        'give': minObj.name,
                        'money': Math.round(Math.abs(minObj.rs) * 100) / 100
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
            $scope.lists = finalVal;

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
       
        $scope.resultObj = UsersInfo.all();
        $scope.calc();
        $scope.parentDiv = function(result,_index) {
           // $scope._index+"_list"= true;
        }
    });