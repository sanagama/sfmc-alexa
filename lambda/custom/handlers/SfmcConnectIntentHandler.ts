import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model"
import Constants from '../Constants'
import Utils from '../Utils';
import {SfmcApi} from '../SfmcApi';

export class SfmcConnectIntentHandler implements RequestHandler
{
    canHandle(handlerInput: HandlerInput): boolean
    {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && 
            request.intent.name === 'ConnectIntent';
    }

    async handle(handlerInput: HandlerInput): Promise<Response>
    {
        Utils.logInfo('SfmcConnectIntentHandler called');

        let speechText = "";
        let success = await SfmcApi.connectToMarketingCloud();
        if(success)
        {
            speechText = Constants.txtConnectSuccess;
        }
        else
        {
            speechText = Constants.txtConnectError;
        }

        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .speak(speechText)
            .withSimpleCard(Constants.txtCardTitle, speechText)
            .getResponse();
    }   
}