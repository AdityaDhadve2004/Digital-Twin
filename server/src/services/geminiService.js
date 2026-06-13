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
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeStudentPerformance = async (studentData) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = buildAnalysisPrompt(studentData);  // ✅ Single function
    
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

// ✅ SINGLE buildAnalysisPrompt with detection logic
export const buildAnalysisPrompt = (studentData) => {
    const isIA2 = studentData.mse2_marks !== null && studentData.mse2_marks !== undefined;
    const isIA1FirstTime = studentData.mse_marks && !studentData.mse2_marks;
    const isIA2FirstTime = !studentData.mse_marks && studentData.mse2_marks;
    
    if (isIA1FirstTime) {
        return buildIA1Prompt(studentData);
    }
    
    if (isIA2 && studentData.mse_marks) {
        return buildIA2ComparisonPrompt(studentData);
    }
    
    if (isIA2FirstTime) {
        return buildIA2FirstTimePrompt(studentData);
    }
};

// IA-1 Prompt
const buildIA1Prompt = (studentData) => {
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
        meanMarksRequired,
        eseMarksNeeded1,
        eseMarksNeeded2
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
├─ ESE needed: ${prediction1}% (${eseMarksNeeded1.toFixed(0)} marks)
└─ Status: ${parseFloat(prediction1) <= 100 ? '✅ Achievable' : '❌ Not possible'}

SCENARIO 2 (Realistic - Same MSE-2 as MSE-1):
├─ Marks by MSE-2: ${marksRequired2}
├─ ESE needed: ${prediction2}% (${eseMarksNeeded2.toFixed(0)} marks)
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

// IA-2 with MSE-1 & MSE-2 comparison
const buildIA2ComparisonPrompt = (studentData) => {
    const {
        code,
        semester,
        isa_total,
        mse_marks,
        mse_total,
        mse2_marks,
        ese_total,
        lab_total,
        grade,
        ia1_pred_scenario1_ese_percent,
        ia1_pred_scenario2_ese_percent,
        prediction1,
        marksObtained,
        meanMarksRequired,
        total_marks,
    } = studentData;

    const mse1Percentage = ((mse_marks / mse_total) * 100).toFixed(2);
    const mse2Percentage = ((mse2_marks / mse_total) * 100).toFixed(2);
    const improvement = (mse2Percentage - mse1Percentage).toFixed(2);
    const improvementStatus = improvement > 0 ? `📈 IMPROVED by ${improvement}%` : improvement < 0 ? `📉 DECLINED by ${Math.abs(improvement)}%` : '➡️ SAME PERFORMANCE';

    return `
You are an academic advisor at Vidyalankar Institute of Technology.

SUBJECT: ${code} | SEMESTER: ${semester} | TARGET GRADE: ${grade}
════════════════════════════════════════════════════════════════

PERFORMANCE JOURNEY:
├─ MSE-1: ${mse_marks}/${mse_total} = ${mse1Percentage}%
├─ MSE-2: ${mse2_marks}/${mse_total} = ${mse2Percentage}%
└─ Trend: ${improvementStatus}

MARKS ACCUMULATED:
├─ ISA: ${isa_total}
├─ MSE-1 + MSE-2: ${mse_marks + mse2_marks}
├─ Lab: ${lab_total}
├─ Total So Far: ${marksObtained}
├─ Target for Grade ${grade}: ${meanMarksRequired.toFixed(2)}/${total_marks}
└─ Still Need: ${(meanMarksRequired - marksObtained).toFixed(2)} marks

IA-1 vs IA-2 PREDICTIONS:

IA-1 (After MSE-1):
├─ Scenario 1: ${ia1_pred_scenario1_ese_percent}% ESE needed
└─ Scenario 2: ${ia1_pred_scenario2_ese_percent}% ESE needed

IA-2 (After MSE-2):
├─ ESE needed: ${prediction1}%
└─ Change: ${(parseFloat(prediction1) - parseFloat(ia1_pred_scenario1_ese_percent)).toFixed(2)}% ${parseFloat(prediction1) < parseFloat(ia1_pred_scenario1_ese_percent) ? '✅ EASIER' : '❌ HARDER'}

ANALYSIS:
1. Performance trend: ${improvement >= 0 ? 'Improving' : 'Declining'}
2. Prediction change: Is ESE now easier or harder?
3. What changed between MSE-1 and MSE-2?
4. Can you replicate MSE-2 performance in ESE?
5. Is grade ${grade} achievable?

Be specific, acknowledge progress/decline, and be honest but encouraging.`;
};

// IA-2 without IA-1 data
const buildIA2FirstTimePrompt = (studentData) => {
    const {
        code,
        semester,
        isa_total,
        mse2_marks,
        mse_total,
        ese_total,
        lab_total,
        grade,
        prediction1,
        marksObtained,
        meanMarksRequired
    } = studentData;

    const mse2Percentage = ((mse2_marks / mse_total) * 100).toFixed(2);

    return `
You are an academic advisor at Vidyalankar Institute of Technology.

SUBJECT: ${code} | SEMESTER: ${semester} | TARGET GRADE: ${grade}
════════════════════════════════════════════════════════════════

(Note: Student using IA-2 predictor without IA-1 data)

MSE-2 PERFORMANCE:
├─ MSE-2: ${mse2_marks}/${mse_total} = ${mse2Percentage}%

MARKS ACCUMULATED:
├─ ISA: ${isa_total}
├─ MSE-2: ${mse2_marks}
├─ Lab: ${lab_total}
├─ Total: ${marksObtained}
├─ Target for Grade ${grade}: ${meanMarksRequired.toFixed(2)}/125
└─ Still Need: ${(meanMarksRequired - marksObtained).toFixed(2)} marks

ESE REQUIREMENT:
├─ ESE needed: ${prediction1}%
├─ Out of: ${ese_total} marks = ${((parseFloat(prediction1) / 100) * ese_total).toFixed(0)} marks
└─ Status: ${parseFloat(prediction1) <= 100 ? '✅ Achievable' : '❌ Not possible'}

ANALYSIS:
1. Current performance: ${mse2Percentage}%
2. Can you achieve ${prediction1}% in ESE?
3. What topics need focus?
4. Study strategy for next 2 weeks?
5. Is grade ${grade} achievable?

Be specific and actionable.`;
};