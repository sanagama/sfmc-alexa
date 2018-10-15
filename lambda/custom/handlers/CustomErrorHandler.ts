import { HandlerInput, ErrorHandler } from "ask-sdk";
import { Response } from "ask-sdk-model"
import Constants from '../Constants'
import Utils from '../Utils';

export class CustomErrorHandler implements ErrorHandler
{
    canHandle(handlerInput: HandlerInput): boolean
    {
        return true;
    }

    handle(handlerInput: HandlerInput, error: Error): Response
    {
        Utils.logError("Error handled: " + error.message);

        const request = handlerInput.requestEnvelope.request;
        Utils.logInfo("Original Request was: " + JSON.stringify(request, null, 2));

        return handlerInput.responseBuilder
            .speak(Constants.txtError)
            .reprompt(Constants.txtError)
            .getResponse();
    }   
}