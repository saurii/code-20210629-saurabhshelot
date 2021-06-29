'use strict';
const get_risk_category_data = require('./config/bmiconfig').get_risk_category_data;
const get_categorywise_count = require('./config/bmiconfig').get_categorywise_count;

let personjson = [{ "Gender": "Male", "HeightCm": 171, "WeightKg": 96 }, {
    "Gender": "Male",
    "HeightCm": 161,
    "WeightKg": 85
}, { "Gender": "Male", "HeightCm": 180, "WeightKg": 77 }, {
    "Gender": "Female",
    "HeightCm": 166,
    "WeightKg": 62
}, { "Gender": "Female", "HeightCm": 150, "WeightKg": 70 }, { "Gender": "Female", "HeightCm": 167, "WeightKg": 82 }]

function get_bmi_details(person_data) {
    person_data.map((personElement) => {
        let bmidata = get_bmi_risk_category(personElement.HeightCm / 100, personElement.WeightKg);
        personElement['Bmi'] = Number(bmidata.bmi);
        personElement['Category'] = bmidata.category;
        personElement["Risk"] = bmidata.risk;
    });
    return person_data
}

function get_bmi_risk_category(height, weight) {
    let bmi = (Number(weight) / Number(height)).toFixed(2);
    let risk_category = get_risk_category_data(Number(bmi));
    return { bmi: bmi, category: risk_category.category, risk: risk_category.risk }
}

let bmi_details = get_bmi_details(personjson);
let totalcategorywisecount = get_categorywise_count(bmi_details);