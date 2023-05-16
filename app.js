// const person = {name: 'Vasya', id: 123, birthYear: 1990, 
// address: {country: 'Israel', city: 'Rehovot'}};
function createPerson(id, name, birthYear, country, city){
    return {id, name, birthYear, 
        address: {country, city}};
}
const person1 = createPerson(123, 'Vasya', 1999, 'Israel', 'Rehovot');
const person2 = createPerson(123, 'Vasya', 1999, 'Israel', 'Rehovot');
// console.log(`person1 == person2 is ${person1 == person2}`);
// first method
// console.log(person1.name); 
// second method
// console.log(person1["id"]);
function displayKeyValue(person, key1, key2){
    if(key2){
        console.log(`key1 ${key1}, key2 ${key2}, value is ${person[key1][key2]}`);
    }else{
        console.log(`key ${key1} is ${person[key1]}`);
    }  
}
displayKeyValue(person1, 'address', 'city');
// Method keys of Object returns array of key values
console.log("keys", Object.keys(person1));
// Method values of Object returns array of values
console.log("values", Object.values(person1));
// Method entries of Object returns array of arrays with key as first element and value second element
console.log("entries", Object.entries(person1));
const x = {};
x["ab"] = 10;
x["ab"]++;
console.log(x["ab"]);
function displayOccurrences(array){
    const occurrences = getOccurrences(array);
    Object.entries(occurrences).sort((e1, e2) => e1[1] == e2[1] ? e1[0].localeCompare(e2[0]) : e2[1] - e1[1])
    .forEach(e => console.log(`${e[0]} -> ${e[1]}`))
    // array of strings
    // display strings with their coccurency counts in the descending order of the counts
    // if counts are equaled then in ascending string values order
}
displayOccurrences(["lmn", "ab", "lmn", "c", "d", "ab", "a", "a", "lmn"]);

function getOccurrences(array) {
    return array.reduce((obj, s) => ({ ...obj, [s]: obj[s] ? obj[s] + 1 : 1 }), {});
}

/* lmn -> 3
   a -> 2
   ab -> 2
   c -> 1
   d -> 1 */

function isAnagram(word, anagram){
    let res = false;
    if(word.length === anagram.length){
        word = word.toLowerCase();
        anagram = anagram.toLowerCase();
        const occurrences = getOccurrences(Array.from(word));
        res = Array.from(anagram).every(s => occurrences[s]-- > 0);
    }
    return res;
}





