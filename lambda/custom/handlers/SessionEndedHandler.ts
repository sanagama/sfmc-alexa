import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model"
import Utils from '../Utils';

export class SessionEndedHandler implements RequestHandler
{
    canHandle(handlerInput: HandlerInput): boolean
    {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'SessionEndedRequest'
    }

    handle(handlerInput: HandlerInput): Response
    {
        Utils.logInfo('SessionEndedHandler called');

        return handlerInput.responseBuilder.getResponse();
    }
}