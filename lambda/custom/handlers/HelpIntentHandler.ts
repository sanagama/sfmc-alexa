import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model"
import Constants from '../Constants'
import Utils from '../Utils';

export class HelpIntentHandler implements RequestHandler
{
    canHandle(handlerInput: HandlerInput): boolean
    {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' &&
                request.intent.name === 'AMAZON.HelpIntent';
    }

    handle(handlerInput: HandlerInput): Response
    {
        Utils.logInfo('HelpIntentHandler called');

        const speechText = Constants.txtHelp;
        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(Constants.txtCardTitle, speechText)
            .getResponse();
    }   
}