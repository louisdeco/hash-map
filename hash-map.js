function HashMap() {
    let _loadFactor = 0.75;
    let _capacity = 16;
    let _buckets = new Array(_capacity).fill(null);
    let _size = 0;

    function hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % _capacity;
        };

        return hashCode;
    }
    
    function set(key, value) {
        const index = hash(key);
        if (index < 0 || index >= _buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (_size + 1 > _loadFactor * _capacity) {
            console.log(`Need to resize, size is ${_size}, capacity is ${_capacity}, load factor = ${_size / _capacity} and will be ${(_size + 1) / _capacity} if we do not resize.`)
            resize()
            console.log(``)
        }
        
        if (_buckets[index] === null) {
            console.log(`Need to create a new linked list!`)
            _buckets[index] = LinkedList();
        }
            
        let current = _buckets[index].getHead();
        while (current !== null) {
            if (current.getData().key === key) {
                console.log(`Key already existing, we replace.`)
                current.setData({ key, value });
                return
            }
            current = current.getNext();
        }
        _buckets[index].append({ key, value })
        _size++;
        console.log(`New entry added at index ${index}, the size is now ${_size}, the capacity ${_capacity} and the load factor ${_size / _capacity}.`)
    }

    function resize() {
        const oldBuckets = _buckets
        _capacity *= 2
        _buckets = new Array(_capacity).fill(null);
        _size = 0;
        oldBuckets.forEach(linkedList => {
            if (linkedList) {
                let current = linkedList.getHead();
                while (current !== null) {
                    set(current.getData().key, current.getData().value);
                    current = current.getNext();
                }
            }
        })
    }

    function get(key) {
        const index = hash(key);
        if (index < 0 || index >= _buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (_buckets[index] === null) {
            return undefined;
        }

        let current = _buckets[index].getHead();
        while (current !== null) {
            if(current.getData().key === key) return current.getData().value;
            current = current.getNext();
        }
        return undefined;
    }

    function has(key) {
        const index = hash(key);
        if (index < 0 || index >= _buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (_buckets[index] === null) {
            return false;
        }

        let current = _buckets[index].getHead();
        while (current !== null) {
            if(current.getData().key === key) return true;
            current = current.getNext();
        }
        return false;
    }

    function remove(key) {
        const index = hash(key);
        if (index < 0 || index >= _buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (_buckets[index] === null) {
            return false;
        }

        let head = _buckets[index].getHead();
        if (head !== null && head.getData().key === key) {
            if (head.getNext() !== null) {
                _buckets[index] = LinkedList();
                let current = head.getNext();
                while (current !== null) {
                    _buckets[index].append(current.getData());
                    current = current.getNext();
                }
            } else { _buckets[index] = null };
            _size--;
            return true;
        }

        let current = head;
        while (current !== null && current.getNext() !== null) {
            if (current.getNext().getData().key === key) {
                current.setNext(current.getNext().getNext());
                _size--;
                return true;
            }
            current.getNext();
        }
    }

    function length() {
        let counter = 0;
        for (let i = 0; i < _buckets.length; i++) {
            if (_buckets[i] !== null) {
                counter += _buckets[i].size();
            }
        }
        return counter;
    }

    function clear() {
        for (let i = 0; i < _buckets.length; i++) {
            if (_buckets[i] !== null) {_buckets[i] = null};
        }
        _size = 0;
    }

    function keys() {
        let keys = [];
        for (let i = 0; i < _buckets.length; i++) {
            if (_buckets[i] !== null) {
                let current = _buckets[i].getHead();
                while (current !== null) {
                    keys.push(current.getData().key);
                    current = current.getNext();
                }
            }
        }
        return keys;
    }

    function values() {
        let values = [];
        for (let i = 0; i < _buckets.length; i++) {
            if (_buckets[i] !== null) {
                let current = _buckets[i].getHead();
                while (current !== null) {
                    values.push(current.getData().value);
                    current = current.getNext();
                }
            }
        }
        return values;
    }

    function entries() {
        let entries = [];
        for (let i = 0; i < _buckets.length; i++) {
            if (_buckets[i] !== null) {
                let current = _buckets[i].getHead();
                while (current !== null) {
                    entries.push([current.getData().key, current.getData().value]);
                    current = current.getNext();
                }
            }
        }
        return entries;

    }

    return { set, get, has, remove, length, clear, keys, values, entries}
}

const test = HashMap()

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')