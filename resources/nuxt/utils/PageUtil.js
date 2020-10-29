import API from '../api.js';
import DataUtil from './DataUtil.js';

export default class PageUtil {
    static getPageData(page) {
        const classes = {
            user: User,
            schedule: Schedule,
        }

        page = page.toLowerCase();
        if(!DataUtil.isEmpty(classes[page])){
            return classes[page];
        }else{
            console.error("The page is not found.");
        }
    }
}

class User {}

class Schedule {
    static fields() {
        /* let places = [];
        API.getReferenceSelect("place").then(response => places = response).catch(e => {}); */

        return [
            (new Field(
                'schedule_date',
                '日期',
                'date',
                {
                    editable: false,
                    listOrder: 0,
                    formOrder: 0,
                }
            )),
            (new Field(
                'schedule_title',
                '主題',
                'text',
                {
                    editable: false,
                    listOrder: 0,
                    formOrder: 0,
                }
            )),
            (new Field(
                'schedule_from',
                '開始時間',
                'time',
                {
                    listOrder: 0,
                    formOrder: 0,
                }
            )),
            (new Field(
                'place_id',
                '使用地點',
                'select',
                {
                    selectOptions: 'place',
                    listOrder: 0,
                    formOrder: 0,
                }
            )),
            (new Field(
                'schedule_type',
                '借用型態',
                'select',
                {
                    selectOptions: {
                        conference: '會議',
                        activity: '活動',
                        lesson: '課程',
                        exam: '考試',
                        other: '其他'
                    },
                    listOrder: 0,
                    formOrder: 0,
                }
            )),
            (new Field(
                'place_disabled',
                '場地狀態',
                'boolean',
                {
                    trueText: '已停用',
                    falseText: '啟用中',
                    trueStyle: {
                        color: 'red'
                    },
                    falseStyle: {
                        color: 'green'
                    },
                    listOrder: 0,
                    formOrder: 0,
                }
            )),
            (new Field(
                'util_name',
                '承辦單位',
                'string',
                {
                    listOrder: 0,
                    formOrder: 0,
                }
            )),
            (new Field(
                'user_name',
                '承辦人',
                'string',
                {
                    listOrder: 0,
                    formOrder: 0,
                }
            )),
            /* (new Field(
                'schedule_to',
                '結束時間',
                'time',
                {}
            )),
            (new Field(
                'fullday',
                '全天',
                'boolean',
                {
                    onlyFrontend: true,
                    showOnList: false,
                }
            )),
            (new Field(
                'schedule_repeat',
                '是否重複',
                'boolean',
                {}
            )),
            (new Field(
                'repeat_details',
                '重複方式',
                'custom',
                {
                    onlyFrontend: true,
                    showOnList: false,
                }
            )),
            (new Field(
                'schedule_registrant',
                '登記人',
                'text',
                {
                    remarks: '校外申請者，請填寫主辦單位',
                }
            )),
            (new Field(
                'schedule_content',
                '內容',
                'textarea',
                {}
            )), */
        ];
    }
    static text() { return '行程' }
    static listData() {
        return {};
    }
}

class Form {
    #Name;
    #Text;
    #Fields = [];
    static classes() {
        return {
            'user': User,
            'schedule' : Schedule,
        }
    };

    constructor(name){
        if(Form.classes[name]){
            const page = Form.classes[name];
            this.#Name = name;
            this.#Text = page.text();
            this.#Fields = page.fields();
        }else{
            console.error('Page not found.');
        }
    }
}

class Field {
    #Name;
    #Text;
    #Type;
    #Options = {
        readOnly: false,    // 是否唯獨
        editable: true,     // 新增可以輸入，修改不能動
        showOnList: true,   // 是否出現在列表畫面
        showOnForm: true,   // 是否出現在表單畫面
        selectOptions: [],  // 下拉選項：如果是動態下拉，就直接寫table名稱'user', 若為固定下拉，則寫Array: [1,2, '字串']
        onlyFrontend: false,
        remarks: null,      // 顯示於欄位下方的備註文字
        sync: true,
        trueText: null,     // boolean型態，出現在列表時，若為True，則顯示的文字
        falseText: null,    // boolean型態，出現在列表時，若為False，則顯示的文字
        trueStyle: {},
        falseStyle: {},
        listOrder: 0,       // 列表欄位排序
        formOrder: 0,       // 表單欄位排序
    };
    static allowType = ['text', 'textarea', 'number', 'boolean', 'date', 'time', 'datetime', 'select', 'custom'];

    constructor(name, text = null, type = 'string', options = {}) {
        this.#Name = name;
        this.#Text = DataUtil.isEmpty(text) ? name : text;
        this.#Type = Field.allowType.includes(type) ? type : 'text';
        for(let key in options){
            if(key == 'selectOptions'){
                let o = options[key];
                // console.log(o);
                /* if(typeof o == 'string'){
                    this.#Options.selectOptions.push(o);
                } */
                this.#Options[key] = options[key];
            }else if(this.#Options[key] !== undefined){
                this.#Options[key] = options[key];
            }
        }
    }

    get Name() {return this.#Name}
    get Text() {return this.#Text}
    get Type() {return this.#Type}
    get Options() {return this.#Options}
}
