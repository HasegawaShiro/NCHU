class CalendarObj {
    #Year;
    #Month;
    #Week;
    #Dates = [];
    #Schedules = [];
    #Today = new Date();
    #SelectedDate = new Date();
    static CONSTANTS = {
        DAY_TEXT: ['一','二','三','四','五','六','日'],
    }

    constructor(year, month){
        if(year === undefined){
            this.#Year = this.#Today.getFullYear();
        }else if(year >= 1900 && year <= 275760){
            this.Year = year;
        }else{
            throw new Error("Invalid year. The year must in 1900~275760.");
        }

        if(month === undefined){
            this.#Month = this.#Today.getMonth();
        }else if(month >= 1 && month <= 12){
            this.Month = month;
        }else{
            throw new Error("Invalid month. The month must in 1~12.");
        }
        this.setDates();
    }

    setDates(){
        this.#Dates = [];
        const year = this.#Year;
        const month = this.#Month;
        const D = new Date(year, month);
        const today = new Date();
        let firstDay = D.getDay() == 0 ? 7 : D.getDay();
        let dp = D.getDate();
        today.setHours(0,0,0,0);
        for(let i = 0; i < 6; i++){
            const temp = new Date(year, month, dp);
            if(temp.getDay() != 1 && temp.getDay() <= firstDay){
                dp--;
            }else{
                break;
            }
        }
        // console.log(dp);
        for(let i = 0; i < 6; i++){
            const week = [];
            for(let j = 0; j < 7; j++){
                let putIn = {};
                const temp = new Date(year, month, dp);
                if(((temp.getFullYear() < year && temp.getMonth() == 11) || temp.getMonth() <= month) || ((temp.getMonth() == month+1 || (temp.getMonth() == 0 && month == 11)) && temp.getDay() != 1)){
                    putIn.id = DataUtil.uuidv4();
                    putIn.date = temp;
                    putIn.different = temp.getMonth() !== month;
                    putIn.holiday = temp.getDay() === 0 || temp.getDay() === 6
                    week.push(putIn);
                    dp++;
                }else{
                    break;
                }
                if(today.getTime() === temp.getTime()) this.#Week = i;
                // this.#Week = (today.getTime() === temp.getTime()) ? i : 0;
            }
            if(!DataUtil.isEmpty(week)) this.#Dates.push(week);
        }
        if(DataUtil.isEmpty(this.#Week)){
            this.#Week = 0;
            this.#SelectedDate = this.#Dates[0].date;
        };
    }
    setSchedules(){

    }

    get Year() {return this.#Year}
    set Year(y) {
        y = Number(y)
        if(isNaN(y) && y >= 1900 && y <= 275760){
            console.error("Invalid year. The year must in 1900~275760.");
        }else{
            this.#Year = y;
            this.setDates();
        }
    }

    get Month() {return this.#Month+1}
    set Month(m) {
        m = Number(m);
        if(isNaN(m) && m >= 1 && m <=12){
            console.error("Invalid month. The month must in 1~12.");
        }else{
            this.#Month = m-1;
            this.setDates();
        }
    }

    /* get Mode() {return this.Mode}
    set Mode(mode){
        const MODES = ["month", "week", "list"];
        if(MODES.includes(mode)){
            this.Mode = mode;
        }else{
            console.error("Invalid mode. The mode should be 'month', 'week', or 'list'");
        }
    } */

    get Dates() {return this.#Dates}
    set Dates(x) {
        console.error("Dates cannot be setted.");
    }

    get Schedules() {return this.#Schedules}
    set Schedules(x) {
        console.error("Schedules cannot be setted.");
    }

    get SelectedDate() {return this.#SelectedDate}
    set SelectedDate(date) {
        if(typeof date === "object" && date.constructor === Date){
            this.#SelectedDate = date;
        }else{
            console.error("SelectedDate must be a Date object.");
        }
    }

    getDatesOfWeek(){
        return this.#Dates[this.#Week];
    }
    getYearOfWeek(){
        let result = {};
        for(let date of this.getDatesOfWeek()){
            if(result[date.date.getFullYear()] === undefined){
                result[date.date.getFullYear()] = 1;
            }else{
                result[date.date.getFullYear()]++;
            }
        }
        return result;
    }

    getDateToString(date, delimiter = '-'){
        if(typeof date !== "object" && date.constructor !== Date){
            date = this.#SelectedDate;
        }else if(date.date !== undefined){
            return this.getDateToString(date.date);
        }

        return `${date.getFullYear()}${delimiter}${date.getMonth()+1}${delimiter}${date.getDate()}`
    }

    prevMonth() {
        let prevm = this.Month - 1;
        if(prevm < 1){
            prevm = 12;
            this.#Year--;
        }
        this.Month = prevm;
        console.log(this)
    }
    nextMonth() {
        let prevm = this.Month + 1;
        if(prevm > 12){
            prevm = 1;
            this.#Year++;
        }
        this.Month = prevm;
        console.log(this)
    }
}
