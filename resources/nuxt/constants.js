import API from './api.js';

export default {
    main:{
        TEXT: {
            menu: '選單',
            index: '首頁',
            opinion: '意見反饋',
            title: '中興大學創產學院場地借用系統',
            login: '登入',
            register: '註冊',
            greet: '您好',
            profile: '個人檔案',
            logout: '登出',
            username: '帳號',
            password: '密碼',
        },
    },
    schedule:{
        TEXT: {
            selected_date: '當前所選日期',
            today_event: '本日活動',
            year: '年',
            month: '月',
            day: '日',
        },
        FORM_TEXT: {
            title:{
                add: '新增行程',
                edit: '編輯行程',
                view: '查看行程'
            },
            schedule_title: '主題',
            schedule_date: '日期',
            schedule_from: '開始時間',
            schedule_to: '結束時間',
            fullday: '全天',
            schedule_repeat: '是否重複',
            repeat: '重複',
            schedule_repeat_method: '重複方式',
            keep: '持續',
            cycle: '週期',
            schedule_end: '結束日期',
            at: '於',
            times: '次',
            place_id: '使用地點',
            schedule_registrant: '登記人',
            schedule_type: '借用型態',
            schedule_content: '內容',
            user_id: '承辦人',
            util: '承辦單位',
            phone: '電話',
            mail: '電子信箱',
            schedule_contact: '聯絡人',
            schedule_url: '相關網址'
        },
        selects:{
            types: {
                conference: '會議',
                activity: '活動',
                lesson: '課程',
                exam: '考試',
                other: '其他'
            },
        },
    },
    calendar:{
        MODE_BUTTON: {
            'month': '月表',
            'week': '週表',
            'list': '列表'
        },
        HEADER_TEXT: {
            title: '場地使用查詢',
            date: '日期',
            place: '場地'
        },
        DAY_TEXT: ['一','二','三','四','五','六','日'],
        selects:{
            TEXT: {
                type: '借用型態',
                place: '場地',
                util: '承辦單位',
                user: '承辦人'
            },
        },
    },
    messages: {
        'login-success': '登入成功',
        'user-disabled': '此用戶已遭停用',
        'login-error': '帳號或密碼錯誤',
        'auth-expired': '登入狀態過期，請重新登入',
        'cancel-confirmation': '取消將不保留已輸入或修改之資料，確定取消嗎？',
        'save-success': '儲存成功',
        'unknown-error': '發生未知錯誤',
        'contact-maintenance': '，請洽維護人員',
        'delete-success': '刪除成功',
        'delete-permission-denied': '您沒有權限刪除此資料',
    },
    common: {
        TEXT: {
            save: '儲存',
            cancel: '取消',
        },
        selects: {
            type: {
                conference: '會議',
                activity: '活動',
                lesson: '課程',
                exam: '考試',
                other: '其他'
            },
            user: {},
            place: {},
            util: {},
        },
    }
}
