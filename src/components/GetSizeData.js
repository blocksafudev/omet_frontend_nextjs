function getSizeData(string) {
    // The length of a string in bytes is roughly equal to the number of characters
    // times 2 (since a string is a sequence of 16-bit characters in JavaScript).
    // We divide by 1024 to convert bytes to kilobytes.
    return (string.length * 2) / 1024;
}

export default getSizeData;