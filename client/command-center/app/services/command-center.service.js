commandCenterApp.factory('commandCenterService', function(baseService) {
    var title = '';
    return {
        title:title,
        getEntity: function(){

        },
        createEntity: function(){

        },
        createUser: function(user){
            return baseService.POST(USER, user);
        },
        getUser: function(id){
            return baseService.GET(USER, id);
        },
        updateUser: function(data, id){
            return baseService.PUT(USER, data, id);
        }
    }
});