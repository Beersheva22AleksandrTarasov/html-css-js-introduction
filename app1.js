function displayOccurrences(array) {
    const occurrences = array.reduce((obj, s) => ({...obj, [s] : obj[s] ? obj[s] + 1 : 1}), {})
    Object.entries(occurrences).sort((e1, e2) => e1[1] == e2[1] ? e1[0].localeCompare(e2[0]) : e2[1] - e1[1])
    .forEach(e => console.log(`${e[0]} -> ${e[1]}`))
}

displayOccurrences(["lmn", "ab", "lmn", "c", "d", "ab", "a", "a", "lmn"]);