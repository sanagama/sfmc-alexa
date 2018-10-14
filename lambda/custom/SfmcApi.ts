'use strict';

import Utils from './Utils';
import SfmcOauth from './SfmcOauth'
import RestApiHelper from './RestApiHelper'
import * as shortid from "shortid";
import Constants from './Constants';

class SfmcApiSingleton
{
    private static _instance: SfmcApiSingleton;

    // Instance variables
    private _clientId = process.env.SFMC_API_CLIENTID;
    private _clientSecret = process.env.SFMC_API_CLIENTSECRET;
    private _sfmcOauth: SfmcOauth;
    private _sfmcRestApiHelper: RestApiHelper;

    /*
    * Singleton boilerplate
    *
    */
    private constructor()
    {
        if (!this._clientId || !this._clientSecret)
        {
            let errorMsg = "ClientID and ClientSecret not found in environment variables";
            Utils.logError(errorMsg);
            throw new Error(errorMsg);
        }

        this._sfmcRestApiHelper = new RestApiHelper();
        this._sfmcOauth = new SfmcOauth(this._clientId, this._clientSecret);
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this())
    }

    /*
    * connectToMarketingCloud: tests connection to Marketing Cloud
    * Uses SFMC_API_CLIENTID and SFMC_API_CLIENTSECRET to get an OAuth Access Token
    *
    */
    public connectToMarketingCloud() : Promise<boolean>
    {
        let self = this;
        return new Promise<boolean>((resolve, reject) =>
        {
            self._sfmcOauth.getOAuthAccessToken()
            .then((oauthAccessToken) => {
                // success
                Utils.logInfo("Connected to Marketing Cloud! OAuthToken: " + oauthAccessToken);
                resolve(true);
            })
            .catch(() => {
                // error
                Utils.logError("Error connecting to Marketing Cloud - check console logs");
                reject(false);
            });
        });
    }

    /*
    * createContact: creates a new Contact in Marketing Cloud
    * See: https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/createContacts.htm
    *
    */
    public createContact(firstName?: string, lastName?: string, email?: string) : Promise<boolean>
    {
        let self = this;

        // set defaults if missing
        if(!firstName) {
            firstName = 'firstName-' + shortid.generate();
        } 
        if(!lastName) {
            lastName = 'lastName-' + shortid.generate();
        }
        if(!email) {
            email = 'email-' + shortid.generate() + '@sanjay.com';
        } 

        // POST body
        let postBody = {
            "contactKey": 'key-' + shortid.generate(),
            "attributeSets":[{
                "name":"Email Addresses",
                "items":[{
                    "values": [{
                        "name":"Email Address",
                        "value": email
                    },
                    {
                        "name": "HTML Enabled",
                        "value": true
                    }]
                }]
            }]
        };
        
        // Make the async call
        return new Promise<boolean>((resolve, reject) =>
        {
            self._sfmcOauth.getOAuthAccessToken()
            .then((oauthAccessToken) => {
                Utils.logInfo("Creating new contact: " + firstName + " " + lastName + " " + email);

                // Make REST API call
                self._sfmcRestApiHelper.doPost(Constants.SfmcApiContactsUrl, postBody, oauthAccessToken)
                .then(() => {
                    // success
                    Utils.logInfo("Successfully created contact");
                    resolve(true);
                })
                .catch((error: any) => {
                    // error
                    reject(error);
                });
            })
        });
    }

    /*
    * getContactCount: gets the number of Contacts in this Marketing Cloud account
    * See: https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-apis.meta/mc-apis/searchSchema.htm
    *
    */
   public getContactCount() : Promise<number>
   {
       let self = this;

       // POST body
       let postBody = {
           // TBD
       };
     
       // Make the async call
       return new Promise<number>((resolve, reject) =>
       {
           self._sfmcOauth.getOAuthAccessToken()
           .then((oauthAccessToken) => {
   
               Utils.logInfo(`Getting count of Contacts`);

               // Make REST API call
               self._sfmcRestApiHelper.doPost(Constants.SfmcApiContactsUrl, postBody, oauthAccessToken)
               .then((response: any) => {
                    // success

                    // TBD: parse response to get count and return it
                    let contactCount = 10;
                    Utils.logInfo("Successfully got contact count: " + contactCount);
                    resolve(contactCount);
                })
                .catch((error: any) => {
                    // error
                    reject(error);
                });
           })
       });
   }    
}

/** Instantiate singleton */
export const SfmcApi = SfmcApiSingleton.Instance;