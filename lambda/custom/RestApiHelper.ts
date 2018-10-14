'use strict';

import axios from 'axios';
import Utils from './Utils';

export default class RestApiHelper
{
    /**
     * doGet: Helper method to GET from the given URL with the given header & body
     * 
     */
    public doGet(url: string, postBody: {}, oauthAccessToken: string) : Promise<any>
    {
        return this.makeRestCall('get', url, postBody, oauthAccessToken);
    }

    /**
     * doPost: Helper method to POST to the given URL with the given header & body
     * 
     */
    public doPost(url: string, postBody: {}, oauthAccessToken?: string) : Promise<any>
    {
        return this.makeRestCall('post', url, postBody, oauthAccessToken);
    }

    /**
     * makeRestCall: Helper method call the URL with the given verb, OAuthToken & body
     * 
     */
    public makeRestCall(verb: string, restUrl: string, postBody: {}, oauthAccessToken?: string) : Promise<any>
    {
        return new Promise<any>((resolve, reject) =>
        {
            Utils.logInfo("Making REST call: " + verb + " " + restUrl);
            if(oauthAccessToken)
            {
                Utils.logInfo("Using OAuth Access Token: " + oauthAccessToken);
            }
            else
            {
                Utils.logInfo("Caller did not provide an OAuth Access Token");
            }

            // Put OAuth Access Token in the header if provided
            var restHeaders: any = {};
            restHeaders['Content-Type'] = 'application/json;charset=UTF-8';
            if(oauthAccessToken) {
                restHeaders['Authorization'] = 'Bearer ' + oauthAccessToken;
            };

            // Make REST call
            axios({
                method: verb,
                url: restUrl,
                headers: restHeaders,
                data: postBody
            })
            .then((response: any) => {
                // Success
                Utils.logInfo("Success");
                Utils.logInfo("Status: " + response.status);
                Utils.logInfo("Response data: " + Utils.prettyPrintJson(JSON.stringify(response.data)));

                resolve(response);
            })
            .catch((error: any) => {
                // Error
                // See: https://github.com/axios/axios#handling-errors
                //
                Utils.logError("ERROR");
                if (error.response)
                {
                    Utils.logError("Status: " + error.response.status);
                    Utils.logError("Data: " + Utils.prettyPrintJson(JSON.stringify(error.response.data)));
                }
                else if (error.request)
                {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  Utils.logError("Request: " + Utils.prettyPrintJson(JSON.stringify(error.request)));
                }
                else
                {
                  // Something happened in setting up the request that triggered an Error
                  Utils.logError("Error: " + Utils.prettyPrintJson(JSON.stringify(error.message)));
                }

                reject(error);
            });
        });
    }
}