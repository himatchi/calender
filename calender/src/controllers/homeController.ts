/*!
 * Copyright (c) 2022 himatchi
 *
 * Released under the MIT license.
 * see https://opensource.org/licenses/MIT
 */
import Express from 'express';

export default {
    index: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        if(req.session.login == undefined){
            res.locals.redirect = '/user';
        }else{
            res.locals.redirect = '/calender';
        }
        next();
    },
    redirectView: (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>{
        const redirect = res.locals.redirect;
        if (redirect){
            res.redirect(redirect);
        }else{
            next();
        }
    }
}