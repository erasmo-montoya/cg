var eruptions = [];
var tmp = [];
var years = [];

function work() {
    leer("Eruptions", ["Year", "Country", "DEATHS", "Latitude", "Longitude", "Elevation"], processData);
}

function processData() {
    //se llena el objeto years con keys igual a todos los años registrados
    years = leerResult.map(y => {
        return y.Year
    }).sort(function(a, b){
        return a - b
    });

    if(years.length == 0) return; //no data

    var min = years[0];
    var max = years[years.length - 1];
    console.log(min);
    console.log(max);
    years = {};
    for (var i = min; i <= max; i++) {
        years[i] = {};
    }

    console.log(years);

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

    test = years[1815];

    googleData = [['Country',   'Deaths']];
    for(var country in test) {
        googleData.push([country, test[country].TotalDeaths]);
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