
require('normalize.css/normalize.css');
require('./styles/index.scss');
const locations = require('./assets/locations.json');

let MAP, INFO;

const initialize = () => {
  INFO = new google.maps.InfoWindow();
  MAP = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 37.1843433,
      lng: -123.7965432,
    },
    zoom: 6.5,
    styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#00b188"},{"visibility":"on"}]}],
  });

  locations.forEach(addMarker)
}

const addMarker = (location) => {
  const iconUrl = location.street.length > 2 ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png" : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
  
  const marker = new google.maps.Marker({
    position: new google.maps.LatLng(location.lat, location.long),
    map: MAP,
    icon: {                             
      url: iconUrl
    },
  })

  google.maps.event.addListener(marker, 'click', (function (marker, location) {
    return function () {

      var content = location.companyName;
      content += '<br/>';
      content += location.street;
      content += '<br/>';
      content += location.city;
      content += ', ';
      content += location.state;

      INFO.setContent(content);
      INFO.open(map, marker);
      // map.panTo(this.getPosition());

    }
  })(marker, location));

}

window.onload = initialize