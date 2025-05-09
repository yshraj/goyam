function initMap() {
    var map;
    var pin_items = [];
    var markers = [];
    var infowindow = new google.maps.InfoWindow({
        maxWidth: 300
    });
    var pinImage = {
        url: $(".pins-wrap").data("pin"),
        scaledSize: new google.maps.Size(35, 50),
        anchor: new google.maps.Point(17, 50),
        labelOrigin: new google.maps.Point(18, 20)
    }

    if ($('.pins-wrap .map-pin').length) {
        $('.pins-wrap .map-pin').each(function () {
            var _this = $(this);
            pin_items.push({
                lat: _this.data('lat'),
                lng: _this.data('lng'),
                name: _this.data('name'),
                address: _this.data('address'),
                link: _this.data('link')
            });
        });
    }

    map = new google.maps.Map(document.getElementById('logisticsMap'), {
        center: map_info.center,
        zoom: map_info.zoom,
        styles: [
            {
                elementType: "geometry",
                stylers: [{ color: "#F2F2F2" }],
            },
            {
                elementType: "labels.text.fill",
                stylers: [{ color: "#575757" }],
            },
            {
                featureType: "water",
                stylers: [{ color: "#A8A8A8" }],
            },
            {
                featureType: "administrative.country",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515151" }],
            },
            {
                featureType: "administrative.country",
                elementType: "geometry.stroke",
                stylers: [
                    {
                        color: "#7A7A7A",
                    },
                ],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#FC7A33" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{ color: "#FC7A33" }],
            },
            {
                featureType: "road",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
            },
            {
                featureType: "transit",
                stylers: [{ visibility: "off" }],
            },
            {
                featureType: "poi.government",
                stylers: [{ visibility: "off" }],
            },
            {
                featureType: "poi.medical",
                stylers: [{ visibility: "off" }],
            },
            {
                featureType: "poi.park",
                stylers: [{ visibility: "off" }],
            },
            {
                featureType: "poi.school",
                stylers: [{ visibility: "off" }],
            },
            {
                featureType: "poi.sports_complex",
                stylers: [{ visibility: "off" }],
            },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
    });
    
    if (pin_items.length) {
        for (var i = 0; i < pin_items.length; i++) {
            placeMarker(pin_items[i], i);
        };
        var clusterStyles = [{
            url: window.location.protocol + "//" + window.location.hostname + '/assets/img/map-markerclusterer.svg',
            height: 45,
            width: 45,
            textSize: 12,
            textColor: "#ffffff"
        }]
        var markerCluster = new MarkerClusterer(map, markers, {
            styles: clusterStyles,
            gridSize: 50,
            maxZoom: 15
        });

        $('.map-pin .pin-image, .map-pin .pin-title a').click(function (e) {
            if (!$('.logistics-map-box:visible').length) return false;
            var _this = $(this);
            var pin = parseInt(_this.closest('.map-pin').find('.pin-index').text());
            google.maps.event.trigger(markers[pin - 1], 'click');

            $('html, body').animate({ scrollTop: $('#logisticsMap').offset().top - $('#header').innerHeight() }, 300);
        });
    }
    
    function placeMarker(location, index) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.lat, location.lng),
            map: map,
            label: !noLabel ? { text: '' + (index + 1), color: '#ffffff' } : null,
            icon: pinImage
        });
        markers[index] = marker;

        (function (marker, index) {
            google.maps.event.addListener(marker, 'click', function () {
                if (!noLabel) {
                    infowindow.close(); // Close previously opened infowindow
                    infowindow.setContent('<div class="infowindow"><div class="title">' + location.name + '</div><div class="address">' + location.address + '</div></div>');
                    infowindow.open(map, marker);
                } else {
                    window.location.href = location.link;
                }
            });
        }(markers[index], index));
    }
}
