'use strict';

import Utils from './Utils';
import RestApiHelper from './RestApiHelper'
import Constants from './Constants'

export default class SfmcOauth
{
    // Instance variables
    private _clientId = "";
    private _clientSecret = "";
    private _oAuthAccessToken = "";
    private _oAuthAccessTokenExpiry = new Date();
    private _restApiHelper = new RestApiHelper();

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
     * getOAuthAccessToken:
     * Gets a new OAuth access token or uses the existing token if within the refresh period
     * 
     */
    public getOAuthAccessToken() : Promise<string>
    {
        let self = this;
        return new Promise<string>((resolve, reject) =>
        {
            Utils.logInfo("getOAuthAccessToken called");

            if(self._oAuthAccessToken && (new Date() < self._oAuthAccessTokenExpiry))
            {
                Utils.logInfo("Using existing OAuth Access Token: " + self._oAuthAccessToken);
                resolve(self._oAuthAccessToken);
            }
            else
            {
                Utils.logInfo("Getting a New OAuth Access Token");
                self.getNewOAuthAccessToken()
                .then((postResponse) => {
                    // success
                    self._oAuthAccessToken = postResponse.oauthAccessToken;
                    self._oAuthAccessTokenExpiry = postResponse.oauthAccessTokenExpiry;
                    Utils.logInfo("Got OAuth Access Token: " + self._oAuthAccessToken + ", expires = " +  self._oAuthAccessTokenExpiry);
                    resolve(self._oAuthAccessToken);
                })
                .catch((error) => {
                    // error
                    Utils.logError("Error getting OAuth Access Token.");
                    reject(error);
                });
            }
        });
    }

    /**
     * getNewOAuthAccessToken: Gets a new OAuth access token
     * POSTs to SFMC Auth URL to get an OAuth access token with the given ClientId and ClientSecret
     * 
     * More info: https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-getting-started.meta/mc-getting-started/get-access-token.htm
     * 
     */
    private getNewOAuthAccessToken() : Promise<any>
    {
        let self = this;
        return new Promise<any>((resolve, reject) =>
        {
            Utils.logInfo("getNewOAuthAccessToken called.");

            let postBody = {
                'clientId': self._clientId,
                'clientSecret': self._clientSecret
            };

            // POST to Marketing Cloud REST Auth service and get back an OAuth access token.
            self._restApiHelper.doPost(Constants.SfmcApiAuthServiceUrl, postBody)
            .then((response: any) => {
                // success
                let accessToken = response.data.accessToken;
                let tokenExpiry = new Date();
                tokenExpiry.setSeconds(tokenExpiry.getSeconds() + response.data.expiresIn);

                resolve(
                {
                    oauthAccessToken: accessToken,
                    oauthAccessTokenExpiry: tokenExpiry,
                    status: response.status,
                    statusText: response.statusText + "\n" + Utils.prettyPrintJson(JSON.stringify(response.data))
                });
            })
            .catch((error: any) => {
                // error
                reject(error);
            });
        });
    }
}