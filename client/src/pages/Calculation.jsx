import { useLoaderData, useRevalidator } from "react-router-dom"
import { getAllSemesterSGPAFromDatabase, getAllSemesterSubjectsFromDatabase } from "../api"
import SemesterModal from "../component/SemesterModal";
import { useState } from "react";
import { deleteSubjectFromDatabase } from "../api";
import { useNavigation } from "react-router-dom";
import { getCGPAFromDatabase } from "../api";

export async function loader() {
    const allSubjects = await getAllSemesterSubjectsFromDatabase();
    const allSemesterSGPA = await getAllSemesterSGPAFromDatabase();
    return { allSubjects, allSemesterSGPA }
}

export default function Calculation() {
    const { revalidate } = useRevalidator();
    async function handleCgpa() {
        const cgpaOfStudent = await getCGPAFromDatabase();
        console.log(cgpaOfStudent.data);
        setCGPA(cgpaOfStudent);
    }
    const handleDeleteSubject = async (subjectId) => {
        setSelectedSemester((prev) => ({
            ...prev,
            subjects: prev.subjects.filter((s) => s.id !== subjectId),
        }));
        await deleteSubjectFromDatabase(subjectId);
        revalidate();
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [cgpa, setCGPA] = useState(null);
    const onClose = () => setIsModalOpen(false);
    const data = useLoaderData();
    const allSemSGPAArr = data.allSemesterSGPA.data;
    const allSemSubjectsArr = data.allSubjects.data;
    const semesterData = {};

    allSemSGPAArr.forEach((sgpaObj) => {
        semesterData[sgpaObj.sem] = {
            sgpa: sgpaObj.pointer,
            subjects: []
        };
    });

    allSemSubjectsArr.forEach((subject) => {
        if (!semesterData[subject.semester]) {
            semesterData[subject.semester] = {
                sgpa: null,
                subjects: []
            };
        }

        semesterData[subject.semester].subjects.push({
            id: subject.id,
            name: subject.name,
            grade: subject.grade,
            credits: subject.credits,
            code: subject.code
        });
    });

    const semesterArray = Object.entries(semesterData).map(([semester, data]) => ({
        semester: Number(semester),
        sgpa: data.sgpa,
        subjects: data.subjects
    }));

    console.log(semesterArray);


    return (
        <>
            {/* Header */}

            <div className="mb-10">

                <div className="inline-flex rounded-full border border-[#35312C] bg-[#24211D] px-4 py-2 text-sm text-[#A79F95]">
                    🎓 Academic Planner
                </div>

                <h1 className="mt-6 text-5xl font-semibold tracking-tight text-[#ECE7DF]">
                    SGPA & CGPA Calculator
                </h1>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-[#A79F95]">
                    Select a semester to view subjects, calculate your SGPA and
                    keep track of your academic progress throughout your degree.
                </p>

            </div>

            {/* Semester Cards */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                {semesterArray.map((semester) => (

                    <div
                        key={semester.semester}
                        onClick={() => {
                            setSelectedSemester(semester);
                            setIsModalOpen(true);
                        }}
                        className="
                        group
                        cursor-pointer
                        rounded-3xl
                        border
                        border-[#35312C]
                        bg-[#24211D]
                        p-7
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-[#D97757]/40
                        hover:bg-[#2B2823]
                        shadow-[0_10px_30px_rgba(0,0,0,.18)]
                    "
                    >

                        {/* Semester Number */}

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm uppercase tracking-[0.2em] text-[#8A837A]">
                                    Semester
                                </p>

                                <h2 className="mt-2 text-3xl font-semibold text-[#ECE7DF]">
                                    {semester.semester}
                                </h2>

                            </div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#302C27] text-2xl">
                                🎓
                            </div>

                        </div>

                        {/* Divider */}

                        <div className="my-6 h-px bg-[#35312C]" />

                        {/* SGPA */}

                        <div>

                            <p className="text-sm text-[#8A837A]">
                                Current SGPA
                            </p>

                            <h3 className="mt-2 text-4xl font-semibold text-[#D97757]">
                                {semester.sgpa ?? "--"}
                            </h3>

                        </div>

                        {/* Bottom */}

                        <div className="mt-8 flex items-center justify-between">

                            <div>

                                <p className="text-sm text-[#8A837A]">
                                    Subjects
                                </p>

                                <p className="mt-1 text-lg font-medium text-[#ECE7DF]">
                                    {semester.subjects.length}
                                </p>

                            </div>

                            <div className="rounded-xl border border-[#35312C] bg-[#2F2B27] px-4 py-2 text-sm text-[#B7AFA6] transition group-hover:border-[#D97757]/30">
                                View Details →
                            </div>

                        </div>

                    </div>

                ))}

            </div>

            <SemesterModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                semester={selectedSemester}
                onDeleteSubject={handleDeleteSubject}
            />
            <div className="mt-10 rounded-3xl border border-[#35312C] bg-[#24211D] p-8 shadow-[0_10px_30px_rgba(0,0,0,.18)]">

    <div className="flex items-center justify-center gap-24">

        <div className="text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-[#8A837A]">
                Overall CGPA
            </p>

            <h2 className="mt-4 text-6xl font-semibold text-[#D97757]">
                {cgpa ? cgpa.data.cgpa : "--"}
            </h2>
        </div>

        <div className="text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-[#8A837A]">
                Completed Semesters
            </p>

            <h2 className="mt-4 text-6xl font-semibold text-[#D97757]">
                {cgpa ? cgpa.data.completedSemesters : "--"}
            </h2>
        </div>

    </div>

    <div className="mt-10 flex justify-center">

        <button
            onClick={handleCgpa}
            className="rounded-2xl bg-[#D97757] px-8 py-4 text-white transition hover:bg-[#C86645]"
        >
            {cgpa ? "Recalculate CGPA" : "Calculate CGPA"}
        </button>

    </div>

</div>
        </>
    );
}