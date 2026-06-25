import { useLoaderData, useRevalidator } from "react-router-dom"
import { getAllSemesterSGPAFromDatabase, getAllSemesterSubjectsFromDatabase } from "../api"
import SemesterModal from "../component/SemesterModal";
import { useState } from "react";
import { deleteSubjectFromDatabase } from "../api";

export async function loader() {
    const allSubjects = await getAllSemesterSubjectsFromDatabase();
    const allSemesterSGPA = await getAllSemesterSGPAFromDatabase();
    return { allSubjects, allSemesterSGPA }
}
export default function Calculation() {
    const {revalidate} = useRevalidator();
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {semesterArray.map((semester) => (
                    <div
                        key={semester.semester}
                        onClick={() => {
                            setSelectedSemester(semester);
                            setIsModalOpen(true);
                        }}
                        className="cursor-pointer bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-gray-200"
                    >
                        <h2 className="text-2xl font-bold text-gray-800">
                            Semester {semester.semester}
                        </h2>

                        <p className="mt-4 text-lg text-gray-600">
                            SGPA :
                            <span className="font-bold text-orange-500 ml-2">
                                {semester.sgpa ?? "--"}
                            </span>
                        </p>

                        <p className="mt-2 text-gray-500">
                            Subjects : {semester.subjects.length}
                        </p>
                    </div>
                ))}

            </div>

            <SemesterModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                semester={selectedSemester}
                onDeleteSubject={handleDeleteSubject}
            />
        </>
    )
}