'use strict';
const config = require('./config');

module.exports.get_risk_category_data = (bmi) => {
    return bmi <= 18.4 ? {
        category: config.bmi_categories['underweight'],
        risk: 'Malnutrition risk'
    } : bmi >= 18.5 && bmi <= 24.9 ? {
        category: config.bmi_categories['normalweight'],
        risk: 'Low risk'
    } : bmi >= 25 && bmi <= 29.9 ? {
        category: config.bmi_categories['overweight'],
        risk: 'Enhanced risk'
    } : bmi >= 30 && bmi <= 34.9 ? {
        category: config.bmi_categories['moderately_obese'],
        risk: 'Medium risk'
    } : bmi >= 35 && bmi <= 39.9 ? {
        category: config.bmi_categories['severely_obese'],
        risk: 'High risk'
    } : bmi >= 40 ? {
        category: config.bmi_categories['very_severely_obese'],
        risk: 'Very high risk'
    } : null;
}

module.exports.get_categorywise_count = (person_data) => {
    let hashMap = {};
    Object.keys(config.bmi_categories).map((catElement) => {
        hashMap[config.bmi_categories[catElement]] = person_data.filter(x => x.Category === config.bmi_categories[catElement]).length
    })
    return hashMap
}