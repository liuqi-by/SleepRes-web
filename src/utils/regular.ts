// 正则
export const REGULAR = {
    // 手机号
    mobile: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
    // 邮箱
    email: /^[A-Za-z0-9\u4E00-\u9FA5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
};

// input 长度限制
export const inputLength = {
    address: 100,
    name: 18,
    remarkName: 20,
    password: 16,
    sn: 12,
    mobile: 12,
    email: 50,
    height: 3,
    weight: 3,
    remark: 225,
    zipCode: 5,
    note: 1000,
    account_num: 10,
    account_id: 20,
    account_name: 40,
    npi: 15,
    first_name: 15,
    last_name: 15,
    dme_name: 40,
    office_name: 30,
    city: 15,
    patientID: 20,
};
