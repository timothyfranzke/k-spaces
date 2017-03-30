commandCenterApp.factory('userService', function(baseService) {
    return {
        create: function(data){
            return baseService.POST(USER, data);
        },
        get: function(id){
            return baseService.GET(USER, id);
        },
        list: function(){
            return baseService.LIST(USER);
        },
        update: function(data, id){
            return baseService.PUT(USER, data, id);
        },
        delete: function(id){
            return baseService.DELETE(USER, id);
        }
    }
});