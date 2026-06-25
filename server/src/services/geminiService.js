import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export const analyzeStudentPerformance = async (studentData, type) => {
    try {
        console.log("TYPE RECEIVED:", type);
        const prompt = buildAnalysisPrompt(studentData, type);
        const completion = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 1000,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an engineering academic performance analyst. Answer only using the supplied student data."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        return {
            success: true,
            analysis: completion.choices[0].message.content
        };

    } catch (error) {

        console.error("Groq Error:", error);

        return {
            success: false,
            error: error.message
        };
    }
};
// ✅ SINGLE buildAnalysisPrompt with detection logic
export const buildAnalysisPrompt = (studentData, type) => {
    console.log("Prompt Type:", type);
    switch (type) {
        case "IA1":
            return buildIA1Prompt(studentData);

        case "IA2_COMPARISON":
            return buildIA2ComparisonPrompt(studentData);

        case "IA2_FIRST_TIME":
            return buildIA2FirstTimePrompt(studentData);

        default:
            throw new Error(`Unknown analysis type: ${type}`);
    }
};


// IA-1 Prompt
const buildIA1Prompt = (studentData) => {
    const {
        subject,
        code,
        semester,
        isa_total,
        mse_marks,
        mse_total,
        ese_total,
        lab_total,
        grade,
        ia1_pred_scenario1_ese_percent,
        ia1_pred_scenario2_ese_percent,
        ia1_marks_req_scenario1,
        ia1_marks_req_scenario2,
        meanMarksRequired,
        eseMarksNeeded1,
        eseMarksNeeded2
    } = studentData;

    return `
You are an engineering academic performance analyst.

Your job is NOT to motivate the student.

Your job is to analyze their current academic position using the supplied marks.

Rules:
- Never congratulate the student.
- Never say "keep working hard", "stay motivated", or similar phrases.
- Do not invent marks.
- Base every conclusion only on the supplied numbers.
- Maximum response length: 350 words.
- Use Markdown headings.
- Be concise.

Student Data

Subject: ${subject}
Subject Code: ${code}
Semester: ${semester}

Current Marks

ISA Total : ${isa_total}
MSE-1 : ${mse_marks}/${mse_total}
Lab : ${lab_total}
ESE Total : ${ese_total}

Target Grade : ${grade}
Average Marks Required : ${meanMarksRequired.toFixed(2)}

Prediction

Scenario 1 (Full marks in MSE-2)

Marks accumulated before ESE:
${ia1_marks_req_scenario1}

Required ESE:
${eseMarksNeeded1.toFixed(2)} marks

Required Percentage:
${ia1_pred_scenario1_ese_percent}%

Scenario 2 (Same MSE-2 performance as MSE-1)

Marks accumulated before ESE:
${ia1_marks_req_scenario2}

Required ESE:
${eseMarksNeeded2.toFixed(2)} marks

Required Percentage:
${ia1_pred_scenario2_ese_percent}%

Generate the response using exactly these sections.

## Current Performance

Briefly analyze the student's MSE-1 performance using only the marks.

Mention whether the score is below average, average, good or excellent.

Explain why.

---

## Target Grade Feasibility

Compare both prediction scenarios.

State which scenario is realistic.

Explain why.

Mention whether the target grade ${grade} is realistically achievable.

---

## IA-2 Strategy

Give 4-6 practical preparation points specifically for IA-2.

Focus on improving marks rather than generic study advice.

---

## Subject Focus (${subject})

Based on the engineering subject "${subject}", recommend:

- Most scoring topics
- High-weightage concepts
- Topics students commonly lose marks in
- Practical/Lab concepts to revise
- Important theory areas likely to appear in semester exams

Do not make up chapter names if uncertain.

---

## End Semester Outlook

Explain what the current prediction means.

State:

Current ESE requirement:
${ia1_pred_scenario1_ese_percent}% (Best Case)

Current realistic requirement:
${ia1_pred_scenario2_ese_percent}%

Explain whether this ESE target is easy, moderate or difficult.

Mention what score range in IA-2 would significantly reduce ESE pressure.

End the response immediately after this section.
`;
}

// IA-2 with MSE-1 & MSE-2 comparison
const buildIA2ComparisonPrompt = (studentData) => {
    const {
        subject,
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
        ia2_pred_ese_percent,
        ia2_marks_obtained,
        meanMarksRequired,
        total_marks
    } = studentData;

    const mse1Percentage = ((mse_marks / mse_total) * 100).toFixed(2);
    const mse2Percentage = ((mse2_marks / mse_total) * 100).toFixed(2);

    const improvement = (mse2Percentage - mse1Percentage).toFixed(2);

    const predictionDifference = (
        parseFloat(ia2_pred_ese_percent) -
        parseFloat(ia1_pred_scenario1_ese_percent)
    ).toFixed(2);

    return `
You are an engineering academic performance analyst.

Your job is NOT to motivate the student.

Your job is to analyse how the student's academic position changed between IA-1 and IA-2 using only the supplied data.

Rules:

- Never congratulate the student.
- Never use motivational language.
- Never invent marks.
- Never invent syllabus topics.
- Base every conclusion only on the supplied data.
- Maximum response length: 400 words.
- Use Markdown headings.
- Be concise.
- If subject knowledge is uncertain, mention only commonly tested engineering concepts.

-------------------------------------------------

Student Details

Subject : ${subject}
Code : ${code}
Semester : ${semester}

Target Grade : ${grade}

-------------------------------------------------

Assessment Summary

ISA :
${isa_total}

MSE-1 :
${mse_marks}/${mse_total}
(${mse1Percentage}%)

MSE-2 :
${mse2_marks}/${mse_total}
(${mse2Percentage}%)

Lab :
${lab_total}

Marks accumulated before ESE :
${ia2_marks_obtained}/${total_marks}

Average marks required for Grade ${grade} :
${meanMarksRequired.toFixed(2)}

Remaining marks required :
${(meanMarksRequired - ia2_marks_obtained).toFixed(2)}

-------------------------------------------------

Prediction History

After IA-1

Best Case:
${ia1_pred_scenario1_ese_percent}% in ESE

Realistic Case:
${ia1_pred_scenario2_ese_percent}% in ESE

After IA-2

Required ESE:
${ia2_pred_ese_percent}%

Prediction Difference:
${predictionDifference}%

-------------------------------------------------

Generate your response using EXACTLY the following sections.

# Performance Comparison

Compare MSE-1 and MSE-2.

Explain whether the student improved, remained consistent or declined.

Identify possible academic reasons for the change based only on the marks.

-------------------------------------------------

# Prediction Analysis

Compare the IA-1 prediction with the IA-2 prediction.

Explain:

- why the prediction changed
- whether the ESE target became easier or harder
- how significant the change is

Avoid repeating the numbers.

-------------------------------------------------

# Grade Feasibility

Evaluate whether Grade ${grade} is still realistically achievable.

Mention:

- current academic position
- biggest risk
- safest strategy to secure the target grade

-------------------------------------------------

# Subject Focus (${subject})

Recommend:

• High-weightage topics

• Topics requiring conceptual clarity

• Topics students usually lose marks in

• Important numerical/problem-solving areas

• Lab or practical concepts worth revising

Only recommend commonly tested topics for ${subject}.

-------------------------------------------------

# Final Exam Strategy

Provide 5 concrete actions before the End Semester Examination.

The advice must be specific to the student's current academic position.

Do not include generic advice like
"study regularly"
"stay motivated"
"practice more"

Each point must explain exactly what the student should do.

-------------------------------------------------

# Final Verdict

Summarize the student's current standing in 3-5 sentences.

State whether the target grade is:

- Comfortable
- Achievable with effort
- Difficult
- Unrealistic

End the response after this section.
`;
};

// IA-2 without IA-1 data
const buildIA2FirstTimePrompt = (studentData) => {
    const {
        subject,
        code,
        semester,
        isa_total,
        mse2_marks,
        mse_total,
        ese_total,
        lab_total,
        grade,
        ia2_pred_ese_percent,
        ia2_marks_obtained,
        meanMarksRequired,
        total_marks
    } = studentData;

    const mse2Percentage = ((mse2_marks / mse_total) * 100).toFixed(2);

    return `
You are an engineering academic performance analyst.

Your job is NOT to motivate the student.

Your job is to analyse the student's current academic position using the available IA-2 data only.

The student has NOT used the IA-1 predictor, therefore do NOT mention IA-1 or compare with previous performance.

Rules:

- Never congratulate the student.
- Never use motivational language.
- Never invent marks.
- Never invent syllabus topics.
- Base every conclusion only on the supplied data.
- Maximum response length: 400 words.
- Use Markdown headings.
- Keep every section concise.
- If subject knowledge is uncertain, recommend only commonly tested engineering concepts.

-------------------------------------------------

Student Details

Subject : ${subject}

Code : ${code}

Semester : ${semester}

Target Grade : ${grade}

-------------------------------------------------

Current Assessment

ISA :
${isa_total}

MSE-2 :
${mse2_marks}/${mse_total}
(${mse2Percentage}%)

Lab :
${lab_total}

Marks accumulated :
${ia2_marks_obtained}/${total_marks}

Average marks required for Grade ${grade} :
${meanMarksRequired.toFixed(2)}

Remaining marks required :
${(meanMarksRequired - ia2_marks_obtained).toFixed(2)}

-------------------------------------------------

End Semester Requirement

Required ESE Percentage :
${ia2_pred_ese_percent}%

Equivalent Marks :
${((parseFloat(ia2_pred_ese_percent) / 100) * ese_total).toFixed(0)}
out of ${ese_total}

-------------------------------------------------

Generate your response using EXACTLY the following sections.

# Current Academic Position

Analyse the student's current standing.

Mention:

- strengths
- weaknesses
- what the marks indicate

Do not repeat the numerical values.

-------------------------------------------------

# End Semester Requirement

Explain whether the required ESE percentage is

- Comfortable
- Challenging
- Difficult
- Nearly impossible

Explain why using the supplied data.

-------------------------------------------------

# Grade Feasibility

Evaluate whether Grade ${grade} is realistically achievable.

Mention:

- current position
- biggest academic risk
- safest path to reach the target

-------------------------------------------------

# Subject Focus (${subject})

Recommend:

• High-weightage topics

• Important theory concepts

• Numerical/problem-solving topics

• Common mistakes students make

• Practical/Lab concepts worth revising

Only recommend topics commonly tested in ${subject}.

-------------------------------------------------

# Two-Week Preparation Plan

Create a concise day-by-day preparation strategy.

Include:

- revision priority
- problem-solving priority
- mock test timing
- weak-topic revision
- final revision

Keep it practical.

-------------------------------------------------

# Final Verdict

Summarize the student's current academic position in 3–5 sentences.

Clearly state whether the target grade is:

- Comfortable
- Achievable with focused preparation
- Difficult
- Unrealistic

End the response after this section.
`;
};