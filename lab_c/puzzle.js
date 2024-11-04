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
            document.getElementById('images').innerHTML = '';
            document.getElementById('images').appendChild(img);
        });
    });
});




