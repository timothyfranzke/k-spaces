commandCenterApp.controller('event-controller', function($scope, $stateParams, $state, $mdDialog, eventService, eventModel){
    $scope.isLoading = false;
    console.log($state.current);
    if($state.current.name === 'event.list')
    {
        $scope.isLoading = true;
        eventService.list()
            .then(function(res){
                console.log(res);
                eventModel.events = res.data;
                $scope.events = eventModel.events;
                console.log($scope.events);
            })
            .catch(function(){})
            .finally(function(){$scope.isLoading = false;})
    }
    else if($state.current.name === 'event.edit')
    {
        $scope.isLoading = true;
        eventService.get($stateParams.id)
            .then(function(res){
                if(res.status != 200)
                {
                    console.log("event not found");
                    $state.go('manage');
                }
                $scope.event = res.data[0];
            })
            .catch(function(err){})
            .finally(function(){$scope.isLoading=false;})
    }
    else
    {
        $scope.event = eventModel.event;
    }

    //methods
    $scope.create = function(user){
        $scope.isLoading = true;
        eventService.create(user)
            .then(function(res){
                $scope.event = eventModel.event;
                eventModel.events.push(res.data[0]);
                $state.go('event.list');
            })
            .catch(function(err){})
            .finally(function(){$scope.isLoading=false;})
    };

    $scope.update = function(user, index){
        $scope.isLoading = true;
        eventService.update(user, $stateParams.id)
            .then(function(res){
                eventModel.events[index] = res.data[0];
                $state.go('event.list');
            })
            .catch(function(err){})
            .finally(function(){$scope.isLoading=false;})
    };

    $scope.delete = function(id, index){
        $mdDialog.show({
            controller:'confirmController',
            templateUrl: 'app/dialogs/confirm.html',
            clickOutsideToClose: true,
            fullscreen : false
        })
        .then(function(){
            $scope.isLoading = true;
            eventService.delete(id)
                .then(function(res){
                    eventModel.events.splice(index, 1);
                })
                .catch(function(err){})
                .finally(function(){$scope.isLoading=false;})
        });
    };
});