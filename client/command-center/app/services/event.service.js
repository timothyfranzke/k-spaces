commandCenterApp.factory('eventService', function(baseService) {
    return {
        create: function(data){
            return baseService.POST(EVENT, data);
        },
        get: function(id){
            return baseService.GET(EVENT, id);
        },
        list: function(){
            return baseService.LIST(EVENT);
        },
        update: function(data, id){
            return baseService.PUT(EVENT, data, id);
        },
        delete: function(id){
            return baseService.DELETE(EVENT, id);
        }
    }
});