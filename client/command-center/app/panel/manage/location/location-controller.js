commandCenterApp.controller('location-controller', function($scope, $stateParams, $state, locationService, locationModel){
    $scope.isLoading = false;
    console.log($state.current);
    if($state.current.name === 'location.list')
    {
        $scope.isLoading = true;
        locationService.list()
            .then(function(res){
                locationModel.locations = res.data;
                $scope.locations = locationModel.locations;
            })
            .catch(function(){})
            .finally(function(){$scope.isLoading = false;})
    }
    else if($state.current.name === 'location.edit')
    {
        $scope.isLoading = true;
        locationService.get($stateParams.id)
            .then(function(res){
                if(res.status != 200)
                {
                    console.log("location not found");
                    $state.go('manage');
                }
                $scope.location = res.data[0];
                console.log($scope.location);
            })
            .catch(function(err){})
            .finally(function(){$scope.isLoading=false;})
    }
    else
    {
        $scope.location = locationModel.location;
    }

    //methods
    $scope.create = function(location){
        $scope.isLoading = true;
        locationService.create(location)
            .then(function(res){
                $scope.location = locationModel.location;
                locationModel.locations.push(res.data[0]);
                $state.go('location.list');
            })
            .catch(function(err){})
            .finally(function(){$scope.isLoading=false;})
    };

    $scope.update = function(location, index){
        $scope.isLoading = true;
        locationService.update(location, location._id)
            .then(function(data){
                locationModel.locations[index] = data;
                $state.go('location.list');
            })
            .catch(function(err){})
            .finally(function(){$scope.isLoading=false;})
    };

    $scope.delete = function(id, index){
        $scope.isLoading = true;
        locationService.delete(id)
            .then(function(res){
                locationModel.locations.splice(index, 1);
            })
            .catch(function(err){console.log(err)})
            .finally(function(){$scope.isLoading=false;})
    };
});