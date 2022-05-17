import * as Express from "express";
import Schedule from "../models/Schedule";

export default{
    index: async (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>{
        //デフォルトは当日
        const today: Date = new Date();
        let year: number = today.getFullYear();
        let month: number = today.getMonth();
        let day: number = today.getDate();
        //もしyearとmonthの指定があれば代入
        if(req.query.year != undefined && req.query.month != undefined && req.query.day != undefined){
            const checkValueYear = req.query.year;
            //本当に数字か確認
            if(Number(checkValueYear) != Number.NaN){
                year = Number(checkValueYear);
            }
            const checkValueMonth = req.query.month;
            //本当に数字か確認
            if(Number(checkValueMonth) != Number.NaN){
                //Javascriptは月を0-11で表すため-1する。
                month = Number(checkValueMonth) - 1;
            }
            const checkValueDay = req.query.day;
            //本当に数字か確認
            if(Number(checkValueMonth) != Number.NaN){
                day = Number(checkValueDay);
            }
        }
        const matchOption = {date : {
            $gte : new Date(year, month, day).toISOString(),
            $lt : new Date(year, month, day + 1).toISOString()
        }};
        try {
            const schedules = await Schedule.find(matchOption).exec();
            res.locals.schedules = schedules;
            next();
        } catch (err) {
            next(err);
        }
    },
    indexView: (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>{
        //デフォルトは当日
        const today: Date = new Date();
        let year: number = today.getFullYear();
        let month: number = today.getMonth();
        let day: number = today.getDate();
        //カレンダー描画用文字列を初期化
        let retValue: string = "";
        //もしyearとmonthの指定があれば代入
        if(req.query.year != undefined && req.query.month != undefined && req.query.day != undefined){
            const checkValueYear = req.query.year;
            //本当に数字か確認
            if(Number(checkValueYear) != Number.NaN){
                year = Number(checkValueYear);
            }
            const checkValueMonth = req.query.month;
            //本当に数字か確認
            if(Number(checkValueMonth) != Number.NaN){
                //Javascriptは月を0-11で表すため-1する。
                month = Number(checkValueMonth) - 1;
            }
            const checkValueDay = req.query.day;
            //本当に数字か確認
            if(Number(checkValueMonth) != Number.NaN){
                day = Number(checkValueDay);
            }
        }
        let date: Date = new Date(year, month, day);
        let firstdate: Date = new Date(year, month, 1);
        //1日目の曜日を調べてoffset値にする
        const offset: number = firstdate.getDay();
        
        //月の最後の日を取得(翌月の0日目を指定)
        const lastDateOfMonth: number = new Date(year, month + 1, 0).getDate();

        //前月・次月を表す
        const prevMonth: number = firstdate.getMonth() == 0 ? 12 : firstdate.getMonth();
        const prevYear: number = (firstdate.getMonth() == 0 ? firstdate.getFullYear() - 1 : firstdate.getFullYear());
        const nextMonth: number = firstdate.getMonth() == 11 ? 1 : firstdate.getMonth() + 2;
        const nextYear: number = (firstdate.getMonth() == 11 ? firstdate.getFullYear() + 1 : firstdate.getFullYear());
        
        const schedules: typeof Schedule = res.locals.schedules;
        //viewへの値渡し用
        let data = {
        //    "calender": retValue,
            "title": "Calender",
            "year": year,
            "month": month + 1,
            "day": day,
            "user": "テストユーザー",
            "lastDateOfMonth": lastDateOfMonth,
            "offset": offset,
            "prevMonth": prevMonth,
            "prevYear": prevYear,
            "nextMonth": nextMonth,
            "nextYear": nextYear,
            "schedules": schedules
        }
        res.render("./calender.ejs", data);
    },
    add: (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>{
        const user = req.body.user;
        const year = req.body.year;
        const month = req.body.month;
        const date = req.body.date;
        let data = {
            title: "予定追加",
            user: user,
            year: year,
            month: month,
            date: date,
        }
        res.render("./schedule_add.ejs", data);
    },
    create: async (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>{
        const dt = new Date(Number(req.body.year), Number(req.body.month) - 1, Number(req.body.date));
        const user: string = req.body.user;
        const name: string = req.body.name;
        const text: string = req.body.text;
        const timeString : string = req.body.time;
        const hour : number = Number(timeString.substring(0,2));
        const minute : number = Number(timeString.substring(3,5));
        dt.setHours(hour);
        dt.setMinutes(minute);
        const scheduleParams = {
                name: name,
                user: user,
                date: dt,
                text: text
        }
        
        res.redirect("./calender");
    }
}