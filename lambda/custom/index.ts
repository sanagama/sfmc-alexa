import * as  Alexa from 'ask-sdk'

// Suppot for built-in Alexa handlers
import { LambdaHandler } from "ask-sdk-core/dist/skill/factory/BaseSkillFactory";
import { LaunchRequestHandler } from "./handlers/LaunchRequestHandler";
import { CancelAndStopIntentHandler } from "./handlers/CancelAndStopIntentHandler";
import { HelpIntentHandler } from "./handlers/HelpIntentHandler";
import { SessionEndedHandler } from "./handlers/SessionEndedHandler";
import { CustomErrorHandler } from "./handlers/CustomErrorHandler";

// Our custom handlers
import { HelloIntentHandler } from './handlers/HelloIntentHandler'
import { SfmcConnectIntentHandler } from './handlers/SfmcConnectIntentHandler'


function buildLambdaSkill(): LambdaHandler
{
    return Alexa.SkillBuilders.standard()
        .addRequestHandlers
        (
            new LaunchRequestHandler(),
            new CancelAndStopIntentHandler(),
            new HelpIntentHandler(),
            new SessionEndedHandler(),
            
            new HelloIntentHandler(),
            new SfmcConnectIntentHandler()

            //
            // TBD: Register more intent classed here
            //
        )
        .addErrorHandlers(new CustomErrorHandler())
        .lambda();
}
    
// Lambda handler - entry point for skill
export let handler = buildLambdaSkill();
