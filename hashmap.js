class _Node {
    constructor(key=null,value=null,next=null){
        this.key=key;
        this.value=value;
        this.next=next;
    }

}

class HashMap {
    constructor(initialCapacity=8) {
        this._length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        //this._deleted = 0;
    }
    //_findSlot(key, retrieve) {
    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const index = hash % this._capacity;
        //let slot = this._hashTable[index];
        //Fast path - no chain to follow.
        /*
        if (!slot) {
            return this._hashTable[index] = {key};
        }
        if (slot.key === key) 
            return slot;
        //Slow path - follow the chain.
        while (slot.next) {
            slot = slot.next;
            if (slot.key == key) 
                return slot;
        }
        */
        //We reached the end of the chain without finding the key.
        //Error out, or create a new slot at the end of the chain.
        //return slot.next = {key};
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i=0; i<string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        return hash >>> 0;
    }
     _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        //this._deleted = 0;
        this._hashTable = [];
        for (let i=0; i<oldSlots.length; i++)
            for (let slot = oldSlots[i]; slot; slot = slot.next) {
                if (!slot.deleted)
                    //copy to a new array
                    this.insert(slot.key, slot.value);
            }
                
    }
    insert(key, value){
        const loadRatio = (this._length + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        const hash = HashMap._hashString(key);
        const index = hash % this._capacity;
        console.log(this._hashTable[index])
        if(this._hashTable[index] === undefined){
            //this._hashTable[index] = new _Node(key, value, null);
            this._hashTable[index] = {}
            this._hashTable[index].next = new _Node(key, value, null);
            this._length++;
        }
        else{
            let node = this._hashTable[index];
            while(node.next !== null && node.key !== key){
                node = node.next;
            }
            if(node.key === key){
                node.value = value;
                this._length++;
            }
            else{
                node.next = new _Node(key,value, null);
                this._length++;
            }
        }
    }



    remove(key){
        const hash = HashMap._hashString(key);
        const index = hash % this._capacity;
        let previous= null;
        let current = this._hashTable[index];

        if(this._hashTable[index] !== undefined){ 
            while(current.next !== null && current.key !== key){
                previous = current;
                current = current.next;
            }
            if(current === null){
                console.log('Item not found');
                return;
            }
            if()
            if(current.key === key){
                previous.next = current.next;
                this._length--;
            }

        }
    
    }
    get(key) {
        const hash = HashMap._hashString(key);
        const index = hash % this._capacity;
        if (this._hashTable[index] === NULL){
            return -1;
        }
        else {
            let node = this._hashTable[index];
            while (node !== NULL && node.key !== key){
                node = node.next;
            }
            if (node === NULL)
                  return -1;
            else
                  return node.value;
    }

}

HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;


module.exports = HashMap;