commandCenterApp.factory('locationService', function(baseService) {
    return {
        list: function(){
            return baseService.LIST(LOCATION);
        },
        create: function(data){
            return baseService.POST(LOCATION, data);
        },
        get: function(id){
            return baseService.GET(LOCATION, id);
        },
        update: function(data, id){
            return baseService.PUT(LOCATION, data, id);
        },
        delete: function(id){
            return baseService.DELETE(LOCATION, id);
        }
    }
});