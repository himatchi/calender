import * as Express from "express";
export default function calenderController(req: Express.Request, res: Express.Response, next: Express.NextFunction){
    //デフォルトは当日
    const today: Date = new Date();
    let year: number = today.getFullYear();
    let month: number = today.getMonth();
    //カレンダー描画用文字列を初期化
    let retValue: string = "";
    //もしyearとmonthの指定があれば代入
    if(req.query.year != undefined && req.query.month != undefined){
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
    }
    let date: Date = new Date(year, month, 1);
    //曜日を調べてoffset値にする
    const weekday: number = date.getDay();
    let offset: number = weekday;
    
    //Tableタグ用
    retValue += "<tr align=\"center\">";
    //1日になるまでカレンダーのスペースを開ける
    for(;offset > 0; offset--){
        retValue+="<td></td>";
    }
    //月の最後の日を取得(翌月の0日目を指定)
    const lastDateOfMonth: number = new Date(year, month + 1, 0).getDate();
    //月の最後までカレンダーを描画
    for(let i : number = 1; i < lastDateOfMonth; i++){
        //日曜日の場合は改行して赤くする
        if(new Date(year,month,i).getDay() == 0){
            retValue += ("</tr><tr align=\"center\"><td style=\"color:red\">" + i + "</td>");
        }else{ //それ以外は黒で普通に
            retValue += ("<td>" + i + "</td>");
        }
    }
    //月の最後が終わったら土曜日までスペースを開ける。
    for(let i = lastDateOfMonth; new Date(year, month, i).getDay() != 1; i++){
        retValue += "<td></td>";
    }
    //テーブルタグ用
    retValue += "</tr>";

    //前月・次月を表す
    const prevMonth: number = date.getMonth() == 0 ? 12 : date.getMonth();
    const prevYear: number = (date.getMonth() == 0 ? date.getFullYear() - 1 : date.getFullYear());
    const nextMonth: number = date.getMonth() == 11 ? 1 : date.getMonth() + 2;
    const nextYear: number = (date.getMonth() == 11 ? date.getFullYear() + 1 : date.getFullYear());
    //viewへの値渡し用
    let data = {
        "date": retValue,
        "title": "Calender",
        "year": year,
        "month": month + 1,
        "prevMonth": prevMonth,
        "prevYear": prevYear,
        "nextMonth": nextMonth,
        "nextYear": nextYear
    }
    res.render("./calender.ejs", data);
}