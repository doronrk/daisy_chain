////////////////////////////////////////////////////////////////////////
// Product Listing String buffer used to improve performance of string
// processing within the ProductList class
//
function StringBuffer() {
    this.buffer = [];
}
StringBuffer.prototype.append = function append(string) {
    this.buffer.push(string);
    return this;
};
StringBuffer.prototype.appendWithTrim = function appendWithTrim(string, length) {
    if (string.length > length) {
        this.buffer.push(string.substring(0, length - 3) + "...");
        return this;
    }
    this.buffer.push(string);
    return this;
};
StringBuffer.prototype.reset = function reset() {
    this.buffer = [];
    return this;
};
StringBuffer.prototype.toString = function toString() {
    return this.buffer.join("");
};
