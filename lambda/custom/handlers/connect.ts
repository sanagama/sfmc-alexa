import * as  Alexa from 'ask-sdk'
import Strings from '../strings'

// https://github.com/boobo94/alexa-skill-starter-pack-typescript

export const ConnectIntentHandler: Alexa.RequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ConnectIntent';
    },
    handle(handlerInput) {
        const speechText = 'I will connect to Marketing Cloud now. Thanks!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(Strings.CardTitle, speechText)
            .getResponse();
    }
};