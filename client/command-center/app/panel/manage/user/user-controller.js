commandCenterApp.controller('user-controller', function($scope, $stateParams, $state, commandCenterService, userService, userModel){
    $scope.isLoading = false;
    console.log($state.current);
    if($state.current.name === 'user.list')
    {
        commandCenterService.setTitle('Manage User');
        commandCenterService.setLoader(true);

        userService.list()
            .then(function(res){
                userModel.users = res.data;
                $scope.users = userModel.users;
            })
            .catch(function(){})
            .finally(function(){commandCenterService.setLoader(false);})
    }
    else if($state.current.name === 'user.edit')
    {
        commandCenterService.setTitle('Edit User');
        commandCenterService.setLoader(true);

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
            .finally(function(){commandCenterService.setLoader(false);})
    }
    else
    {
        commandCenterService.setTitle('Create User');
        $scope.user = userModel;
    }

    //methods
    $scope.create = function(user){
        commandCenterService.setLoader(true);

        userService.create(user)
            .then(function(res){
                $scope.user = userModel.user;
                userModel.users.push(res.data[0]);
                $state.go('user.list');
            })
            .catch(function(err){})
            .finally(function(){commandCenterService.setLoader(false);})
    };

    $scope.update = function(user, index){
        commandCenterService.setLoader(true);

        userService.update(user, $stateParams.id)
            .then(function(res){
                userModel.users[index] = res.data[0];
                $state.go('user.list')
            })
            .catch(function(err){})
            .finally(function(){commandCenterService.setLoader(false);})
    };

    $scope.delete = function(id, index){
        commandCenterService.setLoader(true);

        userService.delete(id)
            .then(function(res){
                userModel.users.splice(index, 1);
            })
            .catch(function(err){})
            .finally(function(){commandCenterService.setLoader(false);})
    };

    //search
    $scope.search = function(term){
        commandCenterService.search('user', term)
            .then(function(res){
                $scope.items = res.data;
            })
    };
    $scope.selectItem = function(item){
        $scope.user.spouse = item._id;
        $scope.selectedItem = item;
    }

});