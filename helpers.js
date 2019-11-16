module.exports = {
    //Alexa specific
    buildSpeechletResponse: function (outputText, shouldEndSession) {
        return {
            outputSpeech: {
                type: "PlainText",
                text: outputText
            },
            shouldEndSession: shouldEndSession
        };
    },
    generateResponse: function (speechletResponse, sessionAttributes) {
        return {
            version: "1.0",
            sessionAttributes: sessionAttributes,
            response: speechletResponse
        };
    },
    simpleResponse: function (message, shouldEndSession) {
        return module.exports.generateResponse(module.exports.buildSpeechletResponse(message, shouldEndSession), {});
    },
    //general Helpers
    buildDateTimeFromString: function (dateString) {
        var date = new Date(dateString);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} um ${(date.getHours() + "").length == 1 ? "0" + date.getHours() : date.getHours() + ""}:${(date.getMinutes() + "").length == 1 ? "0" + date.getMinutes() : date.getMinutes() + ""}`;
    },
    getRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
}