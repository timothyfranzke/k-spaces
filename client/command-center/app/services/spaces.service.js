commandCenterApp.factory('spacesService', function(baseService) {
    return {
        list: function(id){
            return baseService.GET(SPACES);
        },
        create: function(data){
            return baseService.POST(SPACES, data);
        },
        get: function(id){
            return baseService.GET(SPACES, id);
        },
        update: function(data, id){
            return baseService.PUT(SPACES, data, id);
        },
        delete: function(id){
            return baseService.DELETE(SPACES, id);
        }
    }
});