class List {

    constructor() {
        this.array = [];
    }

    getAll() {
        return this.array;
    }

    // Gets item from the array by id
    get(id) {
        return this.array.filter(item => item._id.toHexString() === id)[0];
    }

    // Adds `item` to the array, not included id generation
    add(item) {
        this.array.push(item);
        return item;
        // return this.array;
    }

    // Removes item from the array by id
    remove(id) {
        const removeItem = this.get(id);
        if (removeItem) {
            this.array = this.array.filter(item => item._id !== id);
            return removeItem;
        }
    }

    // Updates the item with the new item by id
    update(id, item) {
        for (let i  = 0; i < this.array.length; i++) {
            if (this.array[i]._id === id) {
                this.array[i] = item;
                // return item;
            }
        }
    }

}

module.exports = { List };