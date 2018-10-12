import * as  Alexa from 'ask-sdk'
import Strings from '../strings'

export const LaunchRequestHandler: Alexa.RequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = Strings.Welcome;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(Strings.CardTitle, speechText)
            .getResponse();
    }
};

export const HelpIntentHandler: Alexa.RequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = Strings.Help;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(Strings.CardTitle, speechText)
            .getResponse();
    }
};

export const CancelAndStopIntentHandler: Alexa.RequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = Strings.GoodBye;

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(Strings.CardTitle, speechText)
            .getResponse();
    }
};

export const SessionEndedRequestHandler: Alexa.RequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

export const Default: Alexa.ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Sorry, I didn\'t understand that. Can you repeat?')
            .reprompt('Sorry, I didn\'t understand that. Can you repeat?')
            .getResponse();
    },
};