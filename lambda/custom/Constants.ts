
export default class Constants
{
    // HTTP 500 = internal server error
    public static Success = "success";
    public static Error = "error";
    public static Http500 = 500;

    // SFMC REST API URLs
    public static SfmcApiBaseUrl = "https://www.exacttargetapis.com";
    public static SfmcApiAuthServiceUrl = "https://auth.exacttargetapis.com/v1/requestToken";
    public static SfmcMetricTestUrl = Constants.SfmcApiBaseUrl + "/platformservice-internal/v1/data/metrics/MOBILE_CONNECT_SEND_COUNTS/datasets/TotalCount";
    public static SfmcApiContactsUrl = Constants.SfmcApiBaseUrl + "/contacts/v1/contacts";

    // Strings
    public static txtCardTitle = "Marketing Cloud";
    public static txtHello = "Hello to you too!";
    public static txtWelcome = "Welcome to the Alexa Skill for Marketing Cloud";
    public static txtCancelAndStop = "Bye, talk to you soon!";
    public static txtHelp = "You can say open Marketing Cloud, history of Marketing Cloud, and create a Contact";    
    public static txtError = "Sorry, I didn't understand. Can you repeat?";
    public static txtConnectSuccess = "Connected successfully!";
    public static txtConnectError = "Sorry, there was an error connecting to Marketing Cloud";
    public static txtMetricTestSuccess = "metric success";
    public static txtMetricTestError = "metric fail";

}