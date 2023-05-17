console.log(JSON.stringify(rectangle)[0]);
//самая глубокая копия объета, строки
const rectangle = JSON.parse(JSON.stringify(rectangle1)); 
const rectangle3 = {...rectangle1};
