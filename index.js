var Report = require('plumber').Report;

var mapEachResource = require('plumber').mapEachResource;

var jshint = require('jshint').JSHINT;


function createReport(params) {
    return new Report(params);
}


module.exports = function() {
    return mapEachResource(function(resource) {
        // TODO: if necessary, expose as operation parameters
        var options = {};
        var globals;

        var success = jshint(resource.data(), options, globals);
        return createReport({
            resource: resource,
            type: 'test',
            success: success,
            errors: jshint.errors
        });
    });
};
