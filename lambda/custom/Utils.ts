'use strict';

import * as winston from "winston";

// Configure logging
winston.configure({
    level: process.env.LOG_LEVEL || "debug",
    transports: [ new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    })
  ]
});

export default class Utils
{
    /**
     * logInfo: Helper to log Info messages
     * 
     */
    public static logInfo(msg: any)
    {
        winston.info(msg);
    }

    /**
     * logError: Helper to log Error messages
     * 
     */
    public static logError(msg: any)
    {
        winston.error(msg);
    }

    /**
     * prettyPrintJson: helper to pretty print a flat JSON string
     * 
     */
    public static prettyPrintJson(jsonString: string)
    {
        return JSON.stringify(JSON.parse(jsonString), null, 2);
    }
}