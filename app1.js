function displayOccurrences(strings) {
    let countMap = {};
    for (let i = 0; i < strings.length; i++) {
        const str = strings[i];
        if (countMap[str]) {
            countMap[str] += 1;
        }
        else {
            countMap[str] = 1;
        }
    }

    let sortedKeys = Object.keys(countMap).sort((a, b) => countMap[b] - countMap[a]);
    
    for (let key of sortedKeys) {
        console.log(key + " -> " + countMap[key]);
    }
}

displayOccurrences(["lmn", "ab", "lmn", "c", "d", "ab", "a", "a", "lmn"]);