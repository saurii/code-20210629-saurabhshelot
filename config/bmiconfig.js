'use strict';
const config = require('./config');

module.exports.get_risk_category_data = (bmi) => {
    return bmi <= 18.4 ? {
        category: config.bmi_categories['underweight'],
        risk: config.bmi_risk['malnutrition_risk']
    } : bmi >= 18.5 && bmi <= 24.9 ? {
        category: config.bmi_categories['normalweight'],
        risk: config.bmi_risk['low_risk']
    } : bmi >= 25 && bmi <= 29.9 ? {
        category: config.bmi_categories['overweight'],
        risk: config.bmi_risk['enhanced_risk']
    } : bmi >= 30 && bmi <= 34.9 ? {
        category: config.bmi_categories['moderately_obese'],
        risk: config.bmi_risk['medium_risk']
    } : bmi >= 35 && bmi <= 39.9 ? {
        category: config.bmi_categories['severely_obese'],
        risk: config.bmi_risk['high_risk']
    } : bmi >= 40 ? {
        category: config.bmi_categories['very_severely_obese'],
        risk: config.bmi_risk['very_high_risk']
    } : null;
}

module.exports.get_categorywise_count = (person_data) => {
    let hashMap = {};
    Object.keys(config.bmi_categories).map((catElement) => {
        hashMap[config.bmi_categories[catElement]] = person_data.filter(x => x.Category === config.bmi_categories[catElement]).length
    })
    return hashMap
}