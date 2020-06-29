const HashMap = require('./Hashmaps');

function main() {
  let hTable = new HashMap();
  let names = [
    { Hobbit: 'Bilbo' },
    { Hobbit: 'Frodo' },
    { Wizard: 'Gandolf' },
    { Human: 'Aragon' },
    { Elf: 'Legolas' },
    { Maiar: 'The Necromancer' },
    { Maiar: 'Sauron' },
    { RingBearer: 'Gollum' },
    { LadyOfLight: 'Galadriel' },
    { HalfElven: 'Arwen' },
    { ShepherdOfTheTrees: 'Treebeard' },
  ];

  for (let i = 0; i < names.length; ++i) {
    for (let keys in names[i]) {
      hTable.set(keys, names[i][keys]);
    }
  }
  console.log(hTable);
}

main();

const WhatDoesThisDo = function () {
  let str1 = 'Hello World.';
  let str2 = 'Hello World.';
  let map1 = new HashMap();
  map1.set(str1, 10);
  map1.set(str2, 20);
  let map2 = new HashMap();
  let str3 = str1;
  let str4 = str2;
  map2.set(str3, 20);
  map2.set(str4, 10);

  console.log(map1.get(str1));
  console.log(map2.get(str3));
};

WhatDoesThisDo();

function RemoveDuplicates(str) {
  let map = new Map();
  let nonDupe = '';
  for (let i = 0; i < str.length; i++) {
    if (!map.has(str[i].toLowerCase())) {
      map.set(str[i]);
      nonDupe += str[i];
    }
  }
  return nonDupe;
}
console.log(RemoveDuplicates('google all that you think can think of'));

function coantainsKey(hTable, key) {
  for (let i = 0; i < hTable.hashTable.length; i++) {
    if (hTable.get(key)) {
      return true;
    }
  }
  return false;
}

function PermutationString(string) {
  let oddChar = false;
  let hm = new HashMap();
  for (let i = 0; i < string.length; i++) {
    if (coantainsKey(hm, string[i])) {
      let value = hm.get(string[i]);
      hm.insert(string[i], value + 1);
    } else {
      hm.insert(string[i], 1);
    }
  }
  for (let i = 0; i < hm.hashTable.length; i++) {
    for (let keys in hm.hashTable[i]) {
      if (hm.hashTable[i][keys] & 1) {
        if (oddChar) {
          return false;
        }
        oddChar = true;
      }
    }
  }

  displayHashMapKeys(hm);
  return true;
}

// YOu can also use JS Map() class
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/

function isItPalindrome(string) {
  let oddChar = false;
  let hm = new Map();
  let value;
  for (let i = 0; i < string.length; i++) {
    if (hm.has(string[i])) {
      let value = hm.get(string[i]);
      hm.set(string[i], value + 1);
    } else {
      hm.set(string[i], 1);
    }
  }
  const iterator = hm.values();
  if (Math.floor(iterator.next().value) % 2 !== 0) {
    oddChar = true;
  }
  if (oddChar) return false;
  return true;
}

function mainPalindromString() {
  //console.log(PermutationString('madam'));
  console.log(PermutationString('cllic'));
  //console.log(PermutationString('aaxxis'));
  //console.log(PermutationString('caabl'));
}

mainPalindromString();

function _sortword(word) {
  return word.split('').sort().join('');
}
function groupIntoAnagrams(words) {
  let anagrams = new Map(),
    ret = [];
  for (let word of words) {
    let key = _sortword(word);
    if (anagrams.has(key)) {
      anagrams.get(key).push(word);
    } else {
      ret.push(anagrams.set(key, [word]));
    }
  }
  return ret;
}

const sort = (word) => word.split('').sort().join('');

const anagrams = (words) => {
  const groups = new Map();
  words.forEach((word) => {
    const sorted = sort(word);
    const group = groups.get(sorted) || [];
    groups.set(sorted, [...group, word]);
  });
  return Array.from(groups.values());
};

console.log(anagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));
