import * as  Alexa from 'ask-sdk'
import Constants from '../Constants'
import Utils from '../Utils';

export const HelloWorldIntentHandler: Alexa.RequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        Utils.logInfo('HelloWorldIntentHandler called');

        const speechText = Constants.txtHelloWorld;
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(Constants.txtCardTitle, speechText)
            .getResponse();
    }
};