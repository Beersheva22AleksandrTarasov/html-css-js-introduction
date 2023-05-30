const names = {
    "maleNames": ["Vasya", "Josef", "Abraham", "Yakob", "Asaf", "Mosez", "Itschak", "David"],
    "femaleNames": ["Asya", "Sara", "Rivka", "Olya", "Klara", "Galya"]
};
export function getRandomInt(min, max) {
    if (min == max) {
        max++;
    } else if (min > max) {
        [mim, max] = [max, min]
    }
    return Math.trunc(min + Math.random() * (max - min))
}
export function getRandomElement(array) {
    return array[getRandomInt(0, array.length)]
}
export function getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments) {
    const gender = getRandomElement(['male', 'female']);
    const name = getRandomElement(gender == 'female' ? names.femaleNames : names.maleNames);
    const birthYear = getRandomInt(minYear, maxYear + 1);
    const salary = getRandomInt(minSalary, maxSalary) * 1000;
    const department = getRandomElement(departments);
    return {
        name, birthYear, gender,
        salary, department};
}