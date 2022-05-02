const canvas = new fabric.Canvas("canvas");
const ctx = canvas.getContext("2d");

const reader = new FileReader();
const img = new Image();

const imageLoader = document.getElementById("uploader");
var image;

imageLoader.addEventListener("change", function(e){
    reader.onload = function (event){
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
            image = new fabric.Image(imgObj);
            image.scaleToWidth(canvas.width);
            image.scaleToHeight(canvas.height);
            image.set({

            });
                        canvas.centerObject(image);
                        canvas.add(image);
                        canvas.renderAll();
        }
    }
    reader.readAsDataURL(e.target.files[0]);
});

canvas.on('mouse:wheel', function(opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 1) zoom = 1;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();

    var vpt = this.viewportTransform;
    if (zoom < 400 / 1000) {
      vpt[4] = 200 - 600 * zoom / 2;
      vpt[5] = 200 - 600 * zoom / 2;
    } else {
      if (vpt[4] >= 0) {
        vpt[4] = 0;
      } else if (vpt[4] < canvas.getWidth() - 600 * zoom) {
        vpt[4] = canvas.getWidth() - 600 * zoom;
      }
      if (vpt[5] >= 0) {
        vpt[5] = 0;
      } else if (vpt[5] < canvas.getHeight() - 600 * zoom) {
        vpt[5] = canvas.getHeight() - 600 * zoom;
      }
    }
});
        