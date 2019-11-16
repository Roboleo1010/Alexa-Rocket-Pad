var helpers = require('./helpers');

module.exports = {
    launchRequest: function () {
        var res = ["Willkommen zu Rocket Pad. Sage zum Beispiel: wann ist der nächste SpaceX Start",
            "Willkommen zu Rocket Pad. Sage zum Beispiel: Alexa, frage Rocket Pad nach dem letzten SpaceX Raketenstart"];

        return res[helpers.getRandom(0, res.length)];
    },
    invalidIntend: function () {
        var res = ["Das hat leider nicht geklappt. Sage stattdessen: wann war der letzte SpaceX Start?",
            "Das hat leider nicht geklappt. Sage stattdessen: Alexa, frage Rocket Pad nach dem nächsten SpaceX Launch"];

        return res[helpers.getRandom(0, res.length)];
    },
    sessionEndedRequest: function () {
        var res = ["Bis zum nächsten mal",
            "Flieg sicher"];

        return res[helpers.getRandom(0, res.length)];
    }

}