export const calculateCGPA = (array) => {
    if (!array || array.length === 0 ) {
        return 0    
    }
    let totalValue = 0;
    array.forEach(arr => {
        totalValue = totalValue + arr.pointer;  
    });
    const CGPA = totalValue / array.length;
    return parseFloat(CGPA.toFixed(2))
}