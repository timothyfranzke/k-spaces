commandCenterApp.controller('user-controller', function($scope, $stateParams, $state, commandCenterService, userService, userModel){
    $scope.isLoading = false;
    console.log($state.current);
    if($state.current.name === 'user.list')
    {
        commandCenterService.title = 'Manage User';
        $scope.isLoading = true;
        userService.list()
            .then(function(res){
                userModel.users = res.data;
                $scope.users = userModel.users;
            })
            .catch(function(){})
            .finally(function(){$scope.isLoading = false;})
    }
    else if($state.current.name === 'user.edit')
    {
        commandCenterService.title = 'Edit User';
        $scope.isLoading = true;
        userService.get($stateParams.id)
            .then(function(res){
                if(res.status != 200)
                {
                    console.log("user not found");
                    $state.go('manage');
                }
                $scope.user = res.data[0];
                console.log($scope.user);
            })
            .catch(function(err){})
            .finally(function(){$scope.isLoading=false;})
    }
    else
    {
        commandCenterService.title = 'Create User';
        $scope.user = userModel;
    }

    //methods
    $scope.create = function(user){
        $scope.isLoading = true;
        userService.create(user)
            .then(function(res){
                $scope.user = userModel.user;
                userModel.users.push(res.data[0]);
                $state.go('user.list');
            })
            .catch(function(err){})
            .finally(function(){$scope.isLoading=false;})
    };

    $scope.update = function(user, index){
        $scope.isLoading = true;
        userService.update(user, $stateParams.id)
            .then(function(res){
                userModel.users[index] = res.data[0];
                $state.go('user.list')
            })
            .catch(function(err){})
            .finally(function(){$scope.isLoading=false;})
    };

    $scope.delete = function(id, index){
        $scope.isLoading = true;
        userService.delete(id)
            .then(function(res){
                userModel.users.splice(index, 1);
            })
            .catch(function(err){})
            .finally(function(){$scope.isLoading=false;})
    };
});