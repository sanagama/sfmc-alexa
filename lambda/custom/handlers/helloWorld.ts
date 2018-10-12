import * as  Alexa from 'ask-sdk'
import Strings from '../strings'

export const HelloWorldIntentHandler: Alexa.RequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speechText = Strings.HelloWorld;

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(Strings.CardTitle, speechText)
            .getResponse();
    }
};