
import Constants from './Constants'

export default class RestResponse
{
    public statusTxt : string;
    public status : number;
    public data : any;

    public constructor(statusTxt?: string, status?: number, data?: any)
    {
        if(statusTxt)
        {
            this.statusTxt = statusTxt;
        }
        else
        {
            this.statusTxt = Constants.Error
        }

        if(status)
        {
            this.status = status;
        }
        else
        {
            this.status = Constants.Http500;
        }

        if(data)
        {
            this.data = data;
        }
        else
        {
            this.data = undefined;
        }
    }
}