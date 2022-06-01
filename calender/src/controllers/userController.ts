/*!
 * Copyright (c) 2022 himatchi
 *
 * Released under the MIT license.
 * see https://opensource.org/licenses/MIT
 */
import * as Express from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export default {
    index: (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>{
        let failed_login: boolean = false;
        let userId: string = ''
        if(req.query.failed_login != undefined){
            failed_login = Boolean(req.query.failed_login);
            userId = String(req.query.id);
        }
        const data = {
            failed_login : failed_login,
            userId : userId,
        };
        res.render('./user.ejs', data);
    },
    login: async (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>{
        const receiveId = req.body.id;
        const pass = req.body.password;
        let findedId :string = '';
        let userName :string = '';
        let isAvailable: boolean = false;

        const query = {
            id: receiveId,
        };
        try {
            const savedId = await User.find(query).exec();
            for (const obj of savedId){
                if(obj.id == receiveId){
                    isAvailable = true
                    const isMatch = await bcrypt.compare(pass, String(obj.hashedPassword));
                    if(isMatch == true){
                        findedId = String(obj.id);
                        userName = String(obj.name);
                        isAvailable = true;
                        break;
                    }
                }
            }
            if(isAvailable == true){
                req.session.login = findedId;
                req.session.name = userName;
                req.session.save();
                res.locals.redirect = '/';
            }else{
                res.locals.redirect = '/user?failed_login=true&id=' + receiveId;
            }
            next();
        } catch (err) {
            next(err);
        }
    },
    logout: (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>{
        req.session.destroy((err)=>{
            res.send(err);
            return;
        });
        res.redirect('../');
    },
    signup: (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>{
        res.render('./user_add.ejs');
    },
    create: async (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>{
        let pass = req.body.password;
        let hashedPassword = await bcrypt.hash(pass, 10);
        const id = req.body.id;
        const username = req.body.username;
        const userParams = {
            id: id,
            name: username,
            hashedPassword: hashedPassword,
        }
        try {
            await User.create(userParams);
            res.locals.redirect = '/';
            next();
        }catch(err){
            next(err);
        }
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