import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model"
import Constants from '../Constants'
import Utils from '../Utils';

export class CancelAndStopIntentHandler implements RequestHandler
{
    canHandle(handlerInput: HandlerInput): boolean
    {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && 
                (request.intent.name === 'AMAZON.CancelIntent' ||
                    request.intent.name === 'AMAZON.StopIntent');
    }

    handle(handlerInput: HandlerInput): Response
    {
        Utils.logInfo('CancelAndStopIntent called');

        const speechText = Constants.txtCancelAndStop;
        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .speak(speechText)
            .withSimpleCard(Constants.txtCardTitle, speechText)
            .withShouldEndSession(true)
            .getResponse();           
    }
}