export const getFirstLetterOfLastName = (name) =>{
    const words = name.trim().split(' ');
    const lastTwo = words.slice(-2); // Lấy 2 từ cuối
    return lastTwo.map(word => word.charAt(0).toUpperCase()).join('');
}