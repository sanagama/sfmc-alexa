import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model"
import Constants from '../Constants'
import Utils from '../Utils';
import {SfmcApi} from '../SfmcApi';

export class SfmcMetricIntentHandler implements RequestHandler
{
    canHandle(handlerInput: HandlerInput): boolean
    {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && 
            request.intent.name === 'MetricIntent';
    }

    async handle(handlerInput: HandlerInput): Promise<Response>
    {
        Utils.logInfo('SfmcMetricIntentHandler called');

        let speechText = "";
        let success = await SfmcApi.getMetricTest();
        if(success)
        {
            speechText = Constants.txtMetricTestSuccess;
        }
        else
        {
            speechText = Constants.txtMetricTestError;
        }

        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .speak(speechText)
            .withSimpleCard(Constants.txtCardTitle, speechText)
            .getResponse();
    }   
}