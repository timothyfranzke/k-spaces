commandCenterApp.factory('commandCenterService', function(baseService) {
    var title = '';
    var loader = false;
    var titleObservers = [];
    var loadObservers = [];
    return {
        setTitle: function(name){
            title = name;
            titleObservers.forEach(function(callback){
                callback(title);
            });
        },
        setTitleObserver: function(callback){
            titleObservers.push(callback);
        },
        setLoader: function(isLoading){
            loader = isLoading;
            loadObservers.forEach(function(callback){
                callback(loader);
            });
        },
        setLoadObserver: function(callback){
            loadObservers.push(callback);
        },
        getTitle: function(){
            return title;
        },
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
        },
        search:function(state, term){
            return baseService.GET(SEARCH, term);
        }
    }
});