import * as  Alexa from 'ask-sdk'
import * as Handlers from './handlers/default'
import { HelloWorldIntentHandler } from './handlers/helloWorld'
import { MCConnectIntentHandler } from './handlers/mcconnect'

export const handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        Handlers.LaunchRequestHandler,
        Handlers.HelpIntentHandler,
        Handlers.CancelAndStopIntentHandler,
        Handlers.SessionEndedRequestHandler,
        HelloWorldIntentHandler,
        MCConnectIntentHandler
    )
    .addErrorHandlers(Handlers.Default)
    .lambda();
