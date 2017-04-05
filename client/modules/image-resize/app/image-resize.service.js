imageResizeApp.factory('imageResizeService', function(){
    return {
        resizeImage: function(image){
                var images = {};

                var deferred = $q.defer();

                var img = document.createElement("img");
                var reader = new FileReader();
                var i = new Image();
                reader.onload = function(e) {
                    // resize the picture
                    i.src = e.target.result;
                };
                i.onload = function(){
                    var canvas = document.createElement("canvas");
                    var thumbCanvas = document.createElement("canvas");

                    var MAX_WIDTH = 300;
                    var MAX_HEIGHT = 300;
                    var width = i.width;
                    var height = i.height;

                    var THUMB_MAX_WIDTH = 150;
                    var THUMB_MAX_HEIGHT = 150;
                    var thumbWidth = i.width;
                    var thumbHeight = i.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    if (thumbWidth > thumbHeight) {
                        if (thumbWidth > THUMB_MAX_WIDTH) {
                            thumbHeight *= THUMB_MAX_WIDTH / thumbWidth;
                            thumbWidth = THUMB_MAX_WIDTH;
                        }
                    } else {
                        if (thumbHeight > THUMB_MAX_HEIGHT) {
                            thumbWidth *= THUMB_MAX_HEIGHT / thumbHeight;
                            thumbHeight = THUMB_MAX_HEIGHT;
                        }
                    }
                    canvas.width = i.width;
                    canvas.height = i.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(i, 0, 0, i.width, i.height);

                    thumbCanvas.width = thumbWidth;
                    thumbCanvas.height = thumbHeight;
                    var thumbCtx = thumbCanvas.getContext("2d");
                    thumbCtx.drawImage(i, 0, 0, thumbWidth, thumbHeight);

                    images.base64 = {};
                    images.base64.full = canvas.toDataURL("image/jpeg");
                    images.base64.thumb = thumbCanvas.toDataURL("image/jpeg");

                    deferred.resolve(images);
                };
                reader.readAsDataURL(file, "UTF-8");

                return deferred.promise;

            }
        }
});
