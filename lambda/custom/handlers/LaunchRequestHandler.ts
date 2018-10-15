import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model"
import Constants from '../Constants'
import Utils from '../Utils';

export class LaunchRequestHandler implements RequestHandler
{
    canHandle(handlerInput: HandlerInput): boolean
    {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    }

    handle(handlerInput: HandlerInput): Response
    {
        Utils.logInfo('LaunchRequestHandler called');

        const responseBuilder = handlerInput.responseBuilder;
        const speechText = Constants.txtWelcome;
        return responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(Constants.txtCardTitle, speechText)
            .getResponse();
    }   
}