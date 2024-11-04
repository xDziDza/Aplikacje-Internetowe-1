document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();

    document.getElementById("getLocation").addEventListener("click", function(){
        if(!navigator.geolocation){
            alert("Ni ma lokalizacji :c");
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            map.setView([position.coords.latitude, position.coords.longitude], 13);
            L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
                .bindPopup('A pretty CSS popup.<br> Easily customizable.')
                .openPopup();

        },(positionError)=>{
            console.error(positionError);
        });
    });

    document.getElementById("saveRaster").addEventListener("click", function (){
        alert();
        leafletImage(map, function(err, canvas) {
            // now you have canvas
            // example thing to do with that canvas:
            var img = document.createElement('img');
            var dimensions = map.getSize();
            img.width = dimensions.x;
            img.height = dimensions.y;
            img.src = canvas.toDataURL();
            //document.getElementById('image').innerHTML = '';

            const container = document.querySelector('.image-container');
            const rows = 4;
            const cols = 4;
            const imageUrl = img.src; // Zmień na odpowiednią ścieżkę
            const puzzleHeight = document.getElementById('map').height/4;
            const puzzleWidth = document.getElementById('map').width/4;

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const part = document.createElement('div');
                    part.classList.add('image-part');
                    part.style.backgroundImage = `url('${imageUrl}')`;
                    part.style.backgroundSize = `${puzzleHeight-5}px ${puzzleWidth-5}px`; // Dostosuj do wymiarów zdjęcia
                    part.style.backgroundPosition = `${-col * 100}% ${-row * 100}%`;
                    part.draggable = true;
                    container.appendChild(part);
                }
            }

            //document.getElementById('images').appendChild(img);
        });
    });
});




