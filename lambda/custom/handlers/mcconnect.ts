import * as  Alexa from 'ask-sdk'
import Constants from '../Constants'
import Utils from '../Utils';
import {SfmcApi} from '../SfmcApi';

export const MCConnectIntentHandler: Alexa.RequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ConnectIntent';
    },

    handle(handlerInput) {
        Utils.logInfo('MCConnectIntentHandler called');

        let speechText = "";
        SfmcApi.connectToMarketingCloud()
        .then(() => {
            // success
            Utils.logInfo("Connected to Marketing Cloud!");
            speechText = Constants.txtConnectSuccess;
        })
        .catch(() => {
            // error
            Utils.logError("Error connecting to Marketing Cloud - check console logs");
            speechText = Constants.txtConnectError;
        });

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(Constants.txtCardTitle, speechText)
            .getResponse();
    }
};