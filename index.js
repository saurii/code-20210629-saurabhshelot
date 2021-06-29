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
}, { "Gender": "Female", "HeightCm": 150, "WeightKg": 70 }, { "Gender": "Female", "HeightCm": 167, "WeightKg": 82 }, { "Gender": "Male", "HeightCm": 165, "WeightKg": 75 }, { "Gender": "Male", "HeightCm": 168, "WeightKg": 88 }, { "Gender": "Female", "HeightCm": 157, "WeightKg": 65 }]

function get_bmi_details(person_data) {
    try {
        if (person_data && person_data.length > 0) {
            person_data.map((personElement) => {
                let bmidata = get_bmi_risk_category(personElement.HeightCm / 100, personElement.WeightKg);
                personElement['Bmi'] = Number(bmidata.bmi);
                personElement['Category'] = bmidata.category;
                personElement["Risk"] = bmidata.risk;
            });
            return person_data
        } else {
            return 'provide valid json array';
        }
    } catch (err) {
        // need to add logging
        return false
    }
}

function get_bmi_risk_category(height, weight) {
    let bmi = (Number(weight) / Number(height)).toFixed(2);
    let risk_category = get_risk_category_data(Number(bmi));
    return { bmi: bmi, category: risk_category.category, risk: risk_category.risk }
}

let bmi_details = get_bmi_details(personjson);
if (bmi_details && bmi_details.length > 0 && !bmi_details === 'provide valid json array') {
    let totalcategorywisecount = get_categorywise_count(bmi_details);
} else if (!bmi_details) {
    console.error('Error occured')
} else {
    console.log('provide valid json array')
}