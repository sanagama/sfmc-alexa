'use strict';

import axios from 'axios';
import Utils from './Utils';
import RestResponse from './RestResponse';
import Constants from './Constants'

export default class RestApiHelper
{
    // Instance variables
    private _clientId = "";
    private _clientSecret = "";
    private _oAuthAccessToken = "";
    private _oAuthAccessTokenExpiry = new Date();

    public constructor(clientId: string, clientSecret: string)
    {
        if (!clientId || !clientSecret)
        {
            let errorMsg = "Please specify ClientID and ClientSecret";
            Utils.logError(errorMsg);
            throw new Error(errorMsg);
        }

        this._clientId = clientId;
        this._clientSecret = clientSecret;
    }

    /**
     * doGet: Perform GET on the given URL with the given header & body
     * 
     */
    public async doGet(url: string, postBody: {}) : Promise<RestResponse>
    {
        let self = this;
        let restResponse = new RestResponse();
        let oauthAccessToken = await self.getOauthAccessToken();
        if(oauthAccessToken)
        {
            // Got an OAuth Access Token, make GET call
            restResponse = await self.makeRestCall('GET', url, postBody, oauthAccessToken);
        }
        else
        {
            // Didn't get an OAuth Access Token
            // Fall through to return a 'RestResponse' in error state
        }
        return restResponse;
    }

    /**
     * doPost: Perform POST to the given URL with the given header & body
     * 
     */
    public async doPost(url: string, postBody: {}) : Promise<RestResponse>
    {
        let self = this;
        let restResponse = new RestResponse();
        let oauthAccessToken = await self.getOauthAccessToken();
        if(oauthAccessToken)
        {
            // Got an OAuth Access Token, make POST call
            restResponse = await self.makeRestCall('POST', url, postBody, oauthAccessToken);
        }
        else
        {
            // Didn't get an OAuth Access Token
            // Fall through to return a 'RestResponse' in error state
        }
        return restResponse;
    }

    /**
     * getOAuthAccessToken:
     * Gets a new OAuth access token or uses the existing token if within the refresh period
     * 
     */
    public async getOauthAccessToken() : Promise<string>
    {
        let self = this;
        if(self._oAuthAccessToken && (new Date() < self._oAuthAccessTokenExpiry))
        {
            Utils.logInfo("Using unexpired OAuth Access Token: " + self._oAuthAccessToken);
            return(self._oAuthAccessToken);
        }
        else
        {
            Utils.logInfo("Getting a New OAuth Access Token");
            return await self.getNewOauthAccessToken();
        }
    }
        
    /**
     * getNewOAuthAccessToken: Gets a new OAuth access token
     * POSTs to SFMC Auth URL to get a new OAuth access token with the given ClientId and ClientSecret
     * 
     * More info: https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-getting-started.meta/mc-getting-started/get-access-token.htm
     * 
     */
    private async getNewOauthAccessToken() : Promise<string>
    {
        let self = this;
        Utils.logInfo("getNewOAuthAccessToken called.");

        let postBody = {
            'clientId': self._clientId,
            'clientSecret': self._clientSecret
        };

        self._oAuthAccessToken = "";
        let response = await self.makeRestCall('POST', Constants.SfmcApiAuthServiceUrl, postBody);
        if(response.statusTxt == Constants.Success)
        {
            // success
            let tokenExpiry = new Date();
            tokenExpiry.setSeconds(tokenExpiry.getSeconds() + response.data.expiresIn);
            
            self._oAuthAccessToken = response.data.accessToken;
            self._oAuthAccessTokenExpiry = tokenExpiry;
            Utils.logInfo("Got New OAuth Access Token: " + self._oAuthAccessToken + ", expires = " +  self._oAuthAccessTokenExpiry);
            return self._oAuthAccessToken;
        }
        else
        {
            // error
            Utils.logError("Error getting OAuth Access Token - check console logs.");
            return "";
        }
    }

    /**
     * makeRestCall: Helper method call the URL with the given verb, OAuthToken & body
     * On success, returns a Promise<RestResponse>:
     *  {
     *      statusTxt: 'success'
     *      status: response.status,
     *      data: response.data
     *  });
     * 
     * On error, returns a Promise<RestResponse>:
     *  {
     *      statusTxt: 'error'
     *      status: error.response.status,
     *      data: error.response.data
     *  });
     * 
     */
    private async makeRestCall(verb: string, restUrl: string, postBody: {}, oauthAccessToken?: string) : Promise<RestResponse>
    {
        Utils.logInfo("Making REST call: " + verb + " " + restUrl);

        if(oauthAccessToken)
        {
            Utils.logInfo("Using OAuth Access Token: " + oauthAccessToken);
        }

        // Put OAuth Access Token in the header if provided
        var restHeaders: any = {};
        restHeaders['Content-Type'] = 'application/json;charset=UTF-8';
        if(oauthAccessToken)
        {
            restHeaders['Authorization'] = 'Bearer ' + oauthAccessToken;
        };

        // Make REST call and wait for it to complete
        let response = new RestResponse();
        try
        {
            let axiosResponse = await axios({
                method: verb,
                url: restUrl,
                headers: restHeaders,
                data: postBody
            })

            // Success
            // See: https://github.com/axios/axios#response-schema
            //
            response.statusTxt = Constants.Success;
            response.status = axiosResponse.status;
            response.data = axiosResponse.data;

            Utils.logInfo("StatusTxt: " + response.statusTxt);
            Utils.logInfo("Status: " + response.status);
            Utils.logInfo("Response Data: " + Utils.prettyPrintJson(JSON.stringify(response.data)));
        }
        catch(e)
        {
            // Error
            // See: https://github.com/axios/axios#handling-errors
            //
            response.statusTxt = Constants.Error;
            response.status = e.response.status;
            response.data = e.response.data;

            Utils.logError("StatusTxt: " + response.statusTxt);
            Utils.logError("Status: " + response.status);
            Utils.logError("Response Data: " + Utils.prettyPrintJson(JSON.stringify(response.data)));
        }

        return response;
    }
}