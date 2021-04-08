const movieData = require('./dataSource');

// Trie and trienode structure, optimal data structure for an autocomplete functionality
class TrieNode {
    constructor(value) {
        this.value = value;
        this.children = {};
        this.end = false;
    }
}
class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }

    add(word) {
        let start = this.root;
        for (let char of word) {
            if (!start.children[char]) {
                start.children[char] = new TrieNode(char);
            }
            start = start.children[char];
        }
        start.end = true;
    }

    getWords(prefix, cap) {
        const result = [];
        let start = this.root;
        let trueCasePrefix = "";
        
        for (let char of prefix) {
            const lowerChar = char.toLowerCase();
            const upperChar = char.toUpperCase();
            if (start.children[lowerChar]) {
                start = start.children[lowerChar];
                trueCasePrefix += lowerChar;
            } else if(start.children[upperChar]) {
                start = start.children[upperChar];
                trueCasePrefix += upperChar;
            } else {
                return result;
            }
        }

        function traverseTrie(node, path, init) {
            if (!node) return;
            if (!init) path += node.value;
            if (node.end) result.push({title: trueCasePrefix + path});
            if (result.length >= cap) return;
            Object.keys(node.children).forEach(key => traverseTrie(node.children[key], path, false))
        }
        traverseTrie(start, "", true)
        return result;
    }
}

// primary source of data for autocomplete

const dataSource = new Trie();

// needed to initialize the data source with movies

const populateTrie = () => {
  top1000films.forEach(film => dataSource.add(film.title));
}

module.exports = { Trie, TrieNode, populateTrie, dataSource }

// data source to be ingested into trie at server start

const top1000films = movieData;