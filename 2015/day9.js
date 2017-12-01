var R = require('ramda');

var formatRoute = (r) => r.cityList.join(' -> ') + ': ' + r.distance;

// [part1(input), part2(input)]
module.exports = [
    R.pipe(
        R.reduce(collectRoutes, {}),
        buildRoutes, 
        R.reduce(findShortest, undefined),
        formatRoute
    ),
    R.pipe(
        R.reduce(collectRoutes, {}), 
        buildRoutes, 
        R.reduce(findLongest, undefined), 
        formatRoute
    ),
];

/**
 * routes = { city: { city2: distance } }
 * line = "London to Dublin = 464"
 */
function collectRoutes(routes, line) {
    var tokens = line.split(' ');
    var origin = tokens[0],
        destination = tokens[2],
        distance = parseInt(tokens[4], 10);
        
    if (!routes[origin]) routes[origin] = {};
    if (!routes[destination]) routes[destination] = {};
    
    routes[origin][destination] = routes[destination][origin] = distance;
    return routes;
}

// String -> (a -> string) -> Boolean
var notCity = (city) => (v, k) => k !== city;

// { city: { city2: distance, … }, … } -> { cityList: [ String, … ], distance: Number }
function buildRoutes(routes) {
    var cities = R.keys(routes);
    if (1 === cities.length) return [{ cityList: [cities[0]], distance: 0 }];
    
    var out = [];
    return R.flatten(cities.map((city) => {
        var routesWithoutCity = R.pickBy(notCity(city), routes);
        return buildRoutes(routesWithoutCity)
            .map((route) => {
                return {
                    cityList: R.prepend(city, route.cityList),
                    distance: route.distance + routes[city][route.cityList[0]]
                };
            });
    }));
}

function findShortest(lowest, route) {
    if (!lowest) return route;
    return (route.distance < lowest.distance) ? route : lowest;
}

function findLongest(longest, route) {
    if (!longest) return route;
    return (route.distance > longest.distance) ? route : longest;
}