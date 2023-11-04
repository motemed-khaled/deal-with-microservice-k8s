import { Request } from "express";


export interface ExpressReq extends Request{
    user?: {
        email: string,
        id:string
    }
}