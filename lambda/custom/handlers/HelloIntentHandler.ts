import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model"
import Constants from '../Constants'
import Utils from '../Utils';

export class HelloIntentHandler implements RequestHandler
{
    canHandle(handlerInput: HandlerInput): boolean
    {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && 
            request.intent.name === 'HelloIntent';
    }

    handle(handlerInput: HandlerInput): Response
    {
        Utils.logInfo('HelloIntentHandler called');

        const speechText = Constants.txtHello;
        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .speak(speechText)
            .withSimpleCard(Constants.txtCardTitle, speechText)
            .getResponse();
    }   
}