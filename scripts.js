var cropper;
let scalex = 1;
let scaley = 1;
var croppedImage;
document.getElementById('file-upload').addEventListener('change', function(event) {
    const outputImage = document.getElementById('final-img');
    outputImage.src = '';
    outputImage.className='';

    const file = event.target.files[0]; 
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        const previewImg = document.getElementById('preview-img')
        previewImg.src = e.target.result;

        previewImg.onload = function() {
            addCropFunction();
        };
      };
      
      reader.readAsDataURL(file); 
      document.getElementById('processing-container').classList.remove('hide');
    }
});

function addCropFunction(event){
    const image = document.getElementById('preview-img');
    if (cropper) cropper.destroy();
    cropper = new Cropper(image,{
      aspectRatio:0,
    });
}

document.getElementById('crop-btn').addEventListener('click',function(){
    if (typeof cropper !== 'undefined') {
        croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");

        document.getElementById('edit-frame-img').className='';
        
        document.getElementById('edit-frame-img').src = croppedImage;
        document.getElementById('processing-container').classList.add('hide');
        document.getElementById('addframe').classList.remove('hide');
        document.getElementById('addframe').style.display='flex';
        
    } else {
        console.error('Cropper instance is not defined.');
    }
});

document.getElementById('rotate').addEventListener('click', function() {
    if(cropper){
        cropper.rotate(90);
    }
});

document.getElementById('flip').addEventListener('change',function(){
    let flipval = document.getElementById('flip').value;
    if(flipval == 'horizontally'){
        scalex = -scalex;
        cropper.scaleX(scalex);
    }
    else if(flipval == 'vertically'){
        scaley = -scaley;
        cropper.scaleY(scaley);
    }
});

document.getElementById('heart').addEventListener('click',function(){
    const imgFrame = document.getElementById('edit-frame-img')
    imgFrame.classList.remove('smask','cmask','rmask')
    imgFrame.classList.add('hmask');
});
document.getElementById('square').addEventListener('click',function(){
    const imgFrame = document.getElementById('edit-frame-img')
    imgFrame.classList.remove('hmask','cmask','rmask')
    imgFrame.classList.add('smask');
});
document.getElementById('circle').addEventListener('click',function(){
    const imgFrame = document.getElementById('edit-frame-img')
    imgFrame.classList.remove('hmask','smask','rmask')
    imgFrame.classList.add('cmask');
});
document.getElementById('rect').addEventListener('click',function(){
    const imgFrame = document.getElementById('edit-frame-img')
    imgFrame.classList.remove('hmask','cmask','smask')
    imgFrame.classList.add('rmask');
});

function changeOriginal(){
    document.getElementById('edit-frame-img').classList.remove('hmask','cmask','smask','rmask');
}

function displayImage(){
    const displayImg = document.getElementById('edit-frame-img');
    const outputImage = document.getElementById('final-img');

    outputImage.classList.add(displayImg.classList.item(0))

    outputImage.src = croppedImage;

    document.getElementById('addframe').classList.add('hide');
    document.getElementById('addframe').style.display='none';
}
document.getElementById('X-btn').addEventListener('click',function(){
    document.getElementById('addframe').classList.add('hide');
    document.getElementById('addframe').style.display='none';
})





