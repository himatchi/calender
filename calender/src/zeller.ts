export default function zeller(year: number, month: number, date: number){
    if(month == 1 || month == 2){
        year--;
        month += 12;
    }
    const hy = Math.floor(year / 100);
    const ly = year % 100;
    const mm = month;
    const dd = date;
    const weekday = (ly + Math.floor(ly/4) + Math.floor(hy/4) - 2 * hy + Math.floor(13 * (mm + 1) / 5) + dd) % 7;
}