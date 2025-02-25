function ListNode() {
  let _data = null;
  let _next = null;

  const getData = () => _data;
  const setData = (newData) => {
    _data = newData;
  };
  const getNext = () => _next;
  const setNext = (newNext) => {
    _next = newNext;
  };

  return { getData, setData, getNext, setNext };
}

function LinkedList() {
  let _head = null;

  function append(value) {
    const newNode = ListNode();
    newNode.setData(value);

    if (_head === null) {
      _head = newNode;
      return;
    } else {
      let current = _head;
      while (current.getNext() !== null) {
        current = current.getNext();
      }
      current.setNext(newNode);
    }
  }

  function prepend(value) {
    let newNode = ListNode();
    newNode.setData(value);
    newNode.setNext(_head);
    _head = newNode;
  }

  function size() {
    if (_head === null) return 0;

    let counter = 1;
    let current = _head;
    while (current.getNext() !== null) {
      current = current.getNext();
      counter += 1;
    }
    return counter;
  }

  const getHead = () => _head;

  function getTail() {
    if (_head === null) return null;
    let current = _head;
    while (current.getNext() !== null) {
      current = current.getNext();
    }
    return current;
  }

  function at(index) {
    let current = _head;
    for (let i = 0; i < index; i++) {
      current = current.getNext();
    }
    return current;
  }

  function pop() {
    if (_head === null) return null;
    if (_head.getNext() === null) {
      _head = null;
    }
    let current = _head;
    while (current.getNext().getNext() !== null) {
      current = current.getNext();
    }
    current.setNext(null);
  }

  function contains(value) {
    if (_head === null) return false;
    let current = _head;
    while (current !== null) {
      if (current.getData() === value) return true;
      current = current.getNext();
    }
    return false;
  }

  function find(value) {
    if (_head === null) return null;
    let counter = 0;
    let current = _head;
    while (current != null) {
      if (current.getData() === value) return counter;
      current = current.getNext();
      counter++;
    }
    return null;
  }

  function toString() {
    if (_head === null) return null;
    let string = "";
    let current = _head;
    while (current !== null) {
      string += `( ${current.getData()} ) -> `;
      current = current.getNext();
    }
    return string + "null";
  }

  function insertAt(value, index) {
    if (index < 0 || index > size()) return;
    const newNode = ListNode();
    newNode.setData(value);
    if (index === 0) {
      newNode.setNext(_head);
      _head = newNode;
      return;
    }
    let current = _head;
    for (let i = 0; i < index - 1; i++) {
      current = current.getNext();
    }
    if (current !== null) {
      newNode.setNext(current.getNext());
      current.setNext(newNode);
    }
  }

  function removeAt(index) {
    if (index < 0 || index > size()) return;
    if (index === 0) {
      _head = _head.getNext();
      return;
    }
    let current = _head;
    for (let i = 0; i < index - 1; i++) {
      current = current.getNext();
    }
    if (current !== null) {
      current.setNext(current.getNext().getNext());
    }
  }
  return {
    append,
    prepend,
    size,
    getHead,
    getTail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}