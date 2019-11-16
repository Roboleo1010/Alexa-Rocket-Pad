var https = require('https');
var helpers = require('./helpers');
var response = require('./response');

exports.handler = (event, context) => {

    try {
        if (event.session.new) {
            console.log("NEW SESSION");
        }

        switch (event.request.type) {
            case "LaunchRequest":
                console.log("Launch request");
                context.succeed(
                    helpers.simpleResponse(response.launchRequest(), true)
                );
                break;

            case "IntentRequest":
            console.log("Intent request");
                switch (event.request.intent.name) {
                    case "GetNextSpaceXLaunch":
                    console.log("GetNextSpaceXLaunch Intent Called");
                        var endpoint = "https://api.spacexdata.com/v3/launches/next";
                        var body = "";
                        https.get(endpoint, (response) => {
                            response.on('data', (chunk) => {
                                body += chunk;
                            });
                            response.on('end', () => {
                                var json = JSON.parse(body);

                                context.succeed(
                                    helpers.simpleResponse(`Die nächste SpaceX Mission ist ${json.mission_name} am ${helpers.buildDateTimeFromString(json.launch_date_utc)}. Sie wird von einer ${json.rocket.rocket_name} von ${json.launch_site.site_name_long} durchgeführt.`, true)
                                );
                            });
                        });
                        break;
                    case "GetLastSpaceXLaunch":
                    console.log("GetLastSpaceXLaunch Intent Called");
                        var endpoint = "https://api.spacexdata.com/v3/launches/latest";
                        var body = "";
                        https.get(endpoint, (response) => {
                            response.on('data', (chunk) => {
                                body += chunk;
                            });
                            response.on('end', () => {
                                var json = JSON.parse(body);

                                var success = "";
                                if (json.launch_success)
                                    success = "Die Mission war Erfolgreich."
                                else
                                    success = "Die Mission war nicht Erfolgreich."

                                context.succeed(
                                    helpers.simpleResponse(`Die letzte SpaceX Mission war ${json.mission_name} am ${helpers.buildDateTimeFromString(json.launch_date_local)}. Sie wurde von einer ${json.rocket.rocket_name} von ${json.launch_site.site_name_long} durchgeführt. ${success}`, true)
                                );
                            });
                        });
                        break;
                    default:
                    console.log("Invalid Intent");
                        context.succeed(
                            helpers.simpleResponse(response.invalidIntend(), true)
                        );
                        break
                }
                break;
            case "SessionEndedRequest":
            console.log("Session Ended");
                context.succeed(
                    helpers.simpleResponse(response.sessionEndedRequest(), true)
                );
                break;
            default:
                context.succeed(
                    helpers.simpleResponse(response.invalidIntend(), true)
                );
                break;
        }
    } catch (error) {
        console.log(`Error ${error}`);
        context.succeed(
            helpers.simpleResponse(response.invalidIntend(), true)
        );
    }
}