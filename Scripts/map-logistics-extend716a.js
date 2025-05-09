function mapConnection() {
    var googleMapKey = $(".logistics-map-box").data("google-map");
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=0,0&key=' + googleMapKey;
    $.ajax({
        type: "GET",
        url: url,
        timeout: 2000,
        success: function (response) {
            initMap();
        },
        error: function (error) {
            //baiduMap_init();
            $(".logistics-map").hide();
            $(".map-error").css("display", "flex");
        }
    });
}


function baiduMap_init() {
    var baiduMap = new BMap.Map("logisticsMap");
    var baiduMapCenter;
    var mapZoom = 11;
    if (baiduMap_info != undefined) {
        baiduMapCenter = new BMap.Point(baiduMap_info.center.lng, baiduMap_info.center.lat);
        mapZoom = baiduMap_info.zoom;
    }
    
    var count = 1;
    var pins = $(".pins-wrap .map-pin");
    var data = [];
    var markerPositionData = [];
    var baiduMarkers = [];
    var baidu_icon = new BMap.Icon(window.location.protocol + "//" + window.location.hostname + ':57972/assets/img/map-pin.svg', new BMap.Size(35, 48), {
        anchor: new BMap.Size(14.5, 36),
        infoWindowAnchor: new BMap.Size(20, 50)
    });

    pins.each(function (i) {
        data[i] = ["" + $(this).data("lat") + "", "" + $(this).data("lng") + ""];

        //1st as map center
        if (i == 0) {
            baiduMapCenter = new BMap.Point($(this).data("lng"), $(this).data("lat"));
        }
    });

    //baiduMap.enableScrollWheelZoom(true);
    baiduMap.centerAndZoom(baiduMapCenter, mapZoom);

    //add scale controls
    var top_right_navigation = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL });
    baiduMap.addControl(top_right_navigation);

    //convert google map coordinates into baidu map coordinates
    var total = 0; //总记录数
    var groupCount = 0; //每次转十条
    if (data.length % 10 > 0) {
        groupCount = (data.length / 10) + 1;
    }
    else {
        groupCount = (data.length / 10);
    }

    if (data.length > 10) {
        groupCount = groupCount - 1;
    }

    for (let k = 0; k < groupCount; k++) { //外层循环，有多少组十条
        setTimeout(function () {
            points = new Array();
            for (let j = 0; j < 10; j++) { //内层循环，每组十条
                if (total < data.length) { //不超过总记录数结束
                    //markerPositionData.push([data[(k * 10) + j][0], data[(k * 10) + j][1]]);
                    points.push(new BMap.Point(data[(k * 10) + j][1], data[(k * 10) + j][0]));
                }
                baidu_single = false;
                total++;

            }

            var convertor = new BMap.Convertor();

            convertor.translate(points, 3, 5, translateCallback);
        }, k * 100);
    }

    translateCallback = function (data) {
        if (data.status === 0) {
            var label_style = {
                color: "#ffffff",
                backgroundColor: "transparent",
                fontSize: "14px",
                border: "0",
                width: "30px",
                "text-align": "center",
                "z-index": "1"
            }
            for (let i = 0; i < data.points.length; i++) {
                markerPositionData.push(data.points[i]);

                //add marker to map
                var marker = new BMap.Marker(data.points[i], { icon: baidu_icon });
                baiduMarkers.push(marker);
                baiduMap.addOverlay(marker);
                if (!noLabel) {
                    console.log(count + ": " + data.points[i].lat +", "+data.points[i].lng);
                    var bmap_label = new BMap.Label(count, { position: data.points[i], offset: new BMap.Size(3, 10) });
                    bmap_label.setStyle(label_style);
                    marker.setLabel(bmap_label);
                }
                count++;

                //infowindow
                marker.addEventListener("click", function (e) {
                    var p = e.target;
                    var index = findDataIndex(p.getPosition().lat, p.getPosition().lng);
                    var loc = pins.eq(index);
                    var opts = {
                        width: 350,     // 信息窗口宽度
                        height: 100,     // 信息窗口高度
                        title: loc.data("name"), // 信息窗口标题
                    };

                    if (!noLabel) {
                        var point = new BMap.Point(markerPositionData[index].lng, markerPositionData[index].lat);
                        var infoWindow = new BMap.InfoWindow(loc.data("address"), opts);  // 创建信息窗口对象 
                        baiduMap.openInfoWindow(infoWindow, point);
                    } else {
                        window.location.href = loc.data("link");
                    }
                }
                );
            }
        }
    }

    findDataIndex = function (lat, lng) {
        for (var i = 0; i < markerPositionData.length; i++) {
            if (markerPositionData[i].lat == lat && markerPositionData[i].lng == lng) {
                return i;
            }
        }
    }

    if (pins.length) {
        $('.map-pin .pin-image, .map-pin .pin-title a').click(function (e) {
            var pinIndex = parseInt($(this).closest(".map-pin").find(".pin-index").text());
            if (pinIndex != NaN) {
                $(".BMap_Marker").eq(pinIndex - 1).click();
                $('html, body').animate({ scrollTop: $('#logisticsMap').offset().top - $('#header').innerHeight() }, 300);
            }
        });
    }
}