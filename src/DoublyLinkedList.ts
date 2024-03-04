class DoublyLinkedList<T> {
    constructor(
        public head?: DoublyLinkedListNode<T>,
        public tail?: DoublyLinkedListNode<T>
    ) {}

    public setHeadTo(node: DoublyLinkedListNode<T>) {
        if (node == this.head) return;

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else if (this.head === this.tail) {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        } else {
            if (node === this.tail) {
                this.removeTail();
            }

            node.removeBindings();
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
    }

    public removeTail() {
        if (this.head === this.tail) {
            this.head = undefined;
            this.tail = undefined;
            return;
        }

        const prev = this.tail.prev;
        this.tail.removeBindings();
        this.tail = prev;
    }
}

class DoublyLinkedListNode<T> {

    public prev?: DoublyLinkedListNode<T>;
    public next?: DoublyLinkedListNode<T>;

    constructor(
        public key: string,
        public value: T
    ) {}

    public removeBindings() {
        if (this.prev) {
            this.prev.next = this.next;
        }

        if (this.next) {
            this.next.prev = this.prev;
        }

        this.prev = undefined;
        this.next = undefined;
    }
}

export {
    DoublyLinkedListNode,
    DoublyLinkedList
};
