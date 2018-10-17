'use strict';

import Utils from './Utils';
import RestApiHelper from './RestApiHelper'
import * as shortid from "shortid";
import Constants from './Constants';

class SfmcApiSingleton
{
    private static _instance: SfmcApiSingleton;

    // Instance variables
    private _clientId = process.env.SFMC_API_CLIENTID;
    private _clientSecret = process.env.SFMC_API_CLIENTSECRET;
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

        this._sfmcRestApiHelper = new RestApiHelper(this._clientId, this._clientSecret);
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
    public async connectToMarketingCloud() : Promise<boolean>
    {
        let self = this;
        let oauthAccessToken = await self._sfmcRestApiHelper.getOauthAccessToken();
        if(oauthAccessToken)
        {
            Utils.logInfo("Connected to Marketing Cloud! OAuthToken: " + oauthAccessToken);
            return true;
        }
        else
        {
            Utils.logError("Error getting OAuth Access Token - check console logs");
            return false;
        }
    }

    /*
    * createContact: creates a new Contact in Marketing Cloud
    * See: https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/createContacts.htm
    *
    */
    public async createContact(firstName?: string, lastName?: string, email?: string) : Promise<boolean>
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

        // POST body to create new Contact
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


        // Create new Contact
        Utils.logInfo("Creating new contact: " + firstName + " " + lastName + " " + email);
        let response = await self._sfmcRestApiHelper.doPost(Constants.SfmcApiContactsUrl, postBody);
        if(response.statusTxt == Constants.Success)
        {
            Utils.logInfo("Successfully created new contact");
            return true;
        }
        else
        {
            Utils.logError("Error creating new Contact - check console logs");
            return false;
        }
    }

    /*
    * getContactCount: gets the number of Contacts in this Marketing Cloud account
    * See: https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-apis.meta/mc-apis/searchSchema.htm
    *
    */
   public async getContactCount() : Promise<number>
   {
       let self = this;
       let contactCount = 0;

        // POST body to get Contact count
        let postBody = {
           // TBD
       };
     
        // Get Contact Ccount
        Utils.logInfo(`Getting count of Contacts`);
        let response = await self._sfmcRestApiHelper.doPost(Constants.SfmcApiContactsUrl, postBody);
        if(response.statusTxt == Constants.Success)
        {
            // TBD: parse 'response.data' to get count and return it
            contactCount = 10;
            Utils.logInfo("Successfully got Contact count: " + contactCount);
            return contactCount;
        }
        else
        {
            Utils.logError("Error getting Contact count - check console logs");
            return 0;
        }
   }    
}

/** Instantiate singleton */
export const SfmcApi = SfmcApiSingleton.Instance;