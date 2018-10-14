import * as  Alexa from 'ask-sdk'
import Constants from '../Constants'
import Utils from '../Utils';

export const LaunchRequestHandler: Alexa.RequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        Utils.logInfo('LaunchRequestHandler called');

        const speechText = Constants.txtWelcome;
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(Constants.txtCardTitle, speechText)
            .getResponse();
    }
};

export const HelpIntentHandler: Alexa.RequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        Utils.logInfo('HelpIntentHandler called');

        const speechText = Constants.txtHelp;
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(Constants.txtCardTitle, speechText)
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
        Utils.logInfo('CancelAndStopIntentHandler called');

        const speechText = Constants.txtGoodBye;
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(Constants.txtCardTitle, speechText)
            .getResponse();
    }
};

export const SessionEndedRequestHandler: Alexa.RequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        Utils.logInfo('SessionEndedRequestHandler called');
        return handlerInput.responseBuilder.getResponse();
    }
};

export const Default: Alexa.ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        Utils.logError("Error handled: " + error.message);

        return handlerInput.responseBuilder
            .speak(Constants.txtError)
            .reprompt(Constants.txtError)
            .getResponse();
    },
};