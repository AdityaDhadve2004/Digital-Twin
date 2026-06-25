import { Form, useActionData } from 'react-router-dom';
import { addSubjectToDatabase } from '../api';
import { useRef, useEffect, useState } from "react";


export async function actionSubject({ request }) {
    const formData = await request.formData();
    const jsonData = Object.fromEntries(formData);
    const response = await addSubjectToDatabase(jsonData);
    return response
}
export default function AddSubjectForm() {
    const [showMessage, setShowMessage] = useState(false);
    const data = useActionData();
    const formRef = useRef(null);
    useEffect(() => {
        if (data?.success) {
            formRef.current?.reset();
        }
    }, [data]);
    useEffect(() => {
        if (data) {
            setShowMessage(true);

            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [data]);

    return (
        <div className="bg-white rounded-lg shadow-md p-8 mb-10 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Subject</h2>

            <Form method="POST" ref={formRef}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-2">Subject Name *</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g., Data Structures"
                            required
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>


                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-2">Credits *</label>
                        <input
                            type="number"
                            name="credits"
                            placeholder="e.g., 4"
                            min="1"
                            max="8"
                            required
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>


                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-2">Semester *</label>
                        <select
                            name="semester"
                            required
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        >
                            <option value="">Select Semester</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                <option key={sem} value={sem}>Semester {sem}</option>
                            ))}
                        </select>
                    </div>


                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-2">Grade (Optional)</label>
                        <select
                            name="grade"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        >
                            <option value="">Select Grade</option>
                            <option value="O">O (10)</option>
                            <option value="A">A (9)</option>
                            <option value="B">B (8)</option>
                            <option value="C">C (7)</option>
                            <option value="D">D (6)</option>
                            <option value="E">E (5)</option>
                            <option value="P">P (4)</option>
                            <option value="F">F (0)</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-2">Subject Code *</label>
                        <input
                            type="text"
                            name="code"
                            placeholder="e.g., CS201"
                            required
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition transform hover:scale-105 active:scale-95"
                        >
                            Add Subject
                        </button>
                    </div>
                </div>
            </Form>
            <div>
                {
                    showMessage && (
                        <div className="mt-4 rounded-lg bg-green-100 border border-green-300 text-green-700 px-4 py-2">
                            Subject added successfully!
                        </div>
                    )
                }
            </div>
        </div>
    );

}