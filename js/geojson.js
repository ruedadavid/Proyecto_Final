/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function verCol(lon, lati, altura) {
    if (lon === undefined && lati === undefined && altura=== undefined){
        lon = -72;
        lati = -12;
        altura = 7500000; 
    }
    else if(lati === undefined && altura=== undefined){
        lati = -12;
        altura = 7500000; 
    }
    else if(altura=== undefined){
        altura = 7500000; 
    }
    visor.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(lon, lati, altura),
    orientation : {
        heading : Cesium.Math.toRadians(0.0),
        pitch : Cesium.Math.toRadians(-75.0),
        roll : 0.0
    }
});
}


//Seed the random number generator for repeatable results.
    Cesium.Math.setRandomNumberSeed(0);

    var promise = Cesium.GeoJsonDataSource.load('../../Taller05/js/depto.geojson');
    promise.then(function(dataSource) {
        viewer.dataSources.add(dataSource);

        //Get the array of entities
        var entities = dataSource.entities.values;

        var colorHash = {};
        for (var i = 0; i < entities.length; i++) {
            //For each entity, create a random color based on the state name.
            //Some states have multiple entities, so we store the color in a
            //hash so that we use the same color for the entire state.
            var entity = entities[i];
            var name = entity.name;
            var color = colorHash[name];
            if (!color) {
                color = Cesium.Color.fromRandom({
                    alpha : 1.0
                });
                colorHash[name] = color;
            }

            //Set the polygon material to our random color.
            entity.polygon.material = color;
            //Remove the outlines.
            entity.polygon.outline = false;

            //Extrude the polygon based on the state's population.  Each entity
            //stores the properties for the GeoJSON feature it was created from
            //Since the population is a huge number, we divide by 50.
            entity.polygon.extrudedHeight = entity.properties.HECTARES / 50.0;
        }
    }).otherwise(function(error){
        //Display any errrors encountered while loading.
        window.alert(error);
    });


