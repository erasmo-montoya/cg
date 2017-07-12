var eruptions = [];
var tmp = [];
var years = [];
var arrYears = [];

function work() {
    leer("Eruptions", ["Year", "Country", "DEATHS", "Latitude", "Longitude", "Elevation"], processData);
}

function processData() {
    //se llena el objeto years con keys igual a todos los años registrados
    var tmpYears = leerResult.map(y => {
        return y.Year
    }).sort(function(a, b){
        return a - b
    });

    if(tmpYears.length == 0) return; //no data

    var min = tmpYears[0];
    var max = tmpYears[tmpYears.length - 1];
    years = {};
    for (var i = 0; i <= tmpYears.length - 1; i++) {
        years[tmpYears[i]] = {};
    }

    for(k in years) {
        arrYears.push(parseInt(k));
    }
    arrYears = arrYears.sort(function(a, b){
        return a - b
    });

    leerResult.map(y => {
        if (!(y.Country in years[y.Year])) {
            years[y.Year][y.Country] = {
                TotalDeaths : 0,
                EventDetail : []
            };
        }
        
        years[y.Year][y.Country].TotalDeaths += y.DEATHS;
        years[y.Year][y.Country].EventDetail.push({
            Deaths : y.DEATHS,
            Lat : y.Latitude,
            Lng : y.Longitude,
            Ele : y.Elevation
        });
    });

    current = years[min];

    googleData = [['Country', 'Deaths']];
    for(var country in current) {
        googleData.push([country, current[country].TotalDeaths]);
    }

    var data = google.visualization.arrayToDataTable(googleData);

    var options = {
        region: 'world', // global
        colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
        backgroundColor: '#81d4fa',
        datalessRegionColor: '#f8bbd0',
        defaultColor: '#f5f5f5',
    };

    var chart = new google.visualization.GeoChart(document.getElementById('geochart-colors'));
    chart.draw(data, options);

    $("#slider").slider({
        min: 0,
        max: arrYears.length - 1,
        value: 0,
        change: function() {
            var value = $("#slider").slider("option","value");
            $("#slider").find(".ui-slider-handle").text(arrYears[value]);

        },
        slide: function() {
            var value = $("#slider").slider("option","value");
            $("#slider").find(".ui-slider-handle").text(arrYears[value]);

            current = years[arrYears[value]];
            googleData = [['Country', 'Deaths']];
            
            for(var country in current) {
                googleData.push([country, current[country].TotalDeaths]);
            }

            var data = google.visualization.arrayToDataTable(googleData);

            var options = {
                region: 'world', // global
                colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
                backgroundColor: '#81d4fa',
                datalessRegionColor: '#f8bbd0',
                defaultColor: '#f5f5f5',
            };

            var chart = new google.visualization.GeoChart(document.getElementById('geochart-colors'));
            chart.draw(data, options);

        }
    });
}