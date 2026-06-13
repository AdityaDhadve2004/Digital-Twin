import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeStudentPerformance = async (studentData) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = buildAnalysisPrompt(studentData);
    
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        return {
            success: true,
            analysis: text
        };
    } catch (error) {
        console.error("Gemini API Error:", error);
        return {
            success: false,
            error: error.message
        };
    }
};
export const buildAnalysisPrompt = (studentData) => {
    const {
        code,
        semester,
        isa_total,
        mse_marks,
        mse_total,
        ese_total,
        lab_total,
        grade,
        prediction1,
        prediction2,
        marksRequired1,
        marksRequired2,
        meanMarksRequired
    } = studentData;

    return `
You are an academic advisor at Vidyalankar Institute of Technology.

SUBJECT: ${code} | SEMESTER: ${semester} | TARGET GRADE: ${grade}
════════════════════════════════════════════════════════════════

EXAM STRUCTURE:
├─ ISA: ${isa_total} marks (Max)
├─ MSE-1: ${mse_marks}/${mse_total}
├─ Lab: ${lab_total} marks (Max)
└─ ESE: ${ese_total} marks

SCENARIOS FOR GRADE ${grade}:

SCENARIO 1 (Best Case - Full marks MSE-2):
├─ Marks by MSE-2: ${marksRequired1}
├─ ESE needed: ${prediction1}%
└─ Status: ${parseFloat(prediction1) <= 100 ? '✅ Achievable' : '❌ Not possible'}

SCENARIO 2 (Realistic - Same MSE-2 as MSE-1):
├─ Marks by MSE-2: ${marksRequired2}
├─ ESE needed: ${prediction2}%
└─ Status: ${parseFloat(prediction2) <= 100 ? '✅ Achievable' : '❌ Not possible'}

PROVIDE:
1. How is student performing in MSE-1 (${mse_marks}/${mse_total})?
2. Which scenario is realistic for this student?
3. Improvement needed from Scenario 2 to Scenario 1
4. IA-2 preparation strategy for next 2 weeks
5. How to approach ESE (${prediction1}% vs ${prediction2}%)
6. Is grade ${grade} achievable? What's critical?

Be specific, honest, and actionable.`;
};
