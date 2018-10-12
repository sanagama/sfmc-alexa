import * as  Alexa from 'ask-sdk'
import * as Handlers from './handlers/default'
import { HelloWorldIntentHandler } from './handlers/helloWorld'
import { ConnectIntentHandler } from './handlers/connect'

export const handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        Handlers.LaunchRequestHandler,
        Handlers.HelpIntentHandler,
        Handlers.CancelAndStopIntentHandler,
        Handlers.SessionEndedRequestHandler,
        HelloWorldIntentHandler,
        ConnectIntentHandler
    )
    .addErrorHandlers(Handlers.Default)
    .lambda();
