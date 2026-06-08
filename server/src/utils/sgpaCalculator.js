const GRADE_POINTS = {
    'O': 10,
    'A': 9,
    'B': 8,
    'C': 7,
    'D': 6,
    'E': 5,
    'F': 0
}
export const calculateSGPA = (subjectsArr) => {
    if (!subjectsArr || subjectsArr.length === 0) {
        return 0
    }
    let totalCredits = 0;
    let totalSum = 0;
    subjectsArr.forEach(subject => {
        if (subject.grade === 'F') {
            return
        }
        totalSum = totalSum + (GRADE_POINTS[subject.grade] || 0) * subject.credits
        totalCredits = totalCredits + subject.credits
    });
    const sgpa = totalSum / totalCredits
    return parseFloat(sgpa.toFixed(2))
}