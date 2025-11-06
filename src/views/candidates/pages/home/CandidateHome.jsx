import React, { useState } from "react";

export default function HomePage() {
    const [search, setSearch] = useState("");
    const jobs = [
        {
            id: 1,
            title: "Frontend Developer (ReactJS)",
            company: "FPT Software",
            location: "Hà Nội",
            salary: "20 - 30 triệu",
            type: "Toàn thời gian",
        },
        {
            id: 2,
            title: "Tester / QA Engineer",
            company: "VNG Corporation",
            location: "TP.HCM",
            salary: "15 - 25 triệu",
            type: "Hybrid",
        },
        {
            id: 3,
            title: "Data Analyst",
            company: "Shopee Vietnam",
            location: "TP.HCM",
            salary: "18 - 28 triệu",
            type: "Full-time",
        },
    ];

    const filtered = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Việc làm phù hợp với bạn</h1>

            <div className="mb-6 flex items-center gap-3">
                <input
                    type="text"
                    placeholder="Tìm kiếm việc làm..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 flex-1"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Tìm kiếm
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((job) => (
                    <div
                        key={job.id}
                        className="border rounded-xl p-4 shadow hover:shadow-lg transition"
                    >
                        <h2 className="font-semibold text-lg mb-1">{job.title}</h2>
                        <p className="text-gray-600 text-sm mb-1">{job.company}</p>
                        <p className="text-sm text-gray-500 mb-2">
                            📍 {job.location} • 💰 {job.salary}
                        </p>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            {job.type}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
