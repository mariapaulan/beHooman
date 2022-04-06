const requiredTimeOptions = [
    [0, '0 min'],
    [5, '5 min'],
    [10, '10 min'],
    [30, '30 min'],
    [60, '60 min'],
    [90, '90 min'],
    [120, '120 min']
]

const requiredBudgetOptions = [
    [0, '0 €'],
    [5, '5 €'],
    [10, '10 €'],
    [20, '20 €'],
    [30, '30 €'],
    [50, '50 €'],
    [100, '100 €']
]

const repeatOptions = [
    ['once', 'Una vez'],
    ['daily', 'Diario'],
    ['weekly', 'Semanal'],
    ['biweekly', 'Quincenal'],
    ['monthly', 'Mensual']
]


module.exports = {
    requiredTimeOptions,
    requiredBudgetOptions,
    repeatOptions
}