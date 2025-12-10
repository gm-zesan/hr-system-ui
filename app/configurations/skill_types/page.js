"use client";

import React, { useState } from "react";
import { ChevronRight, Plus, Search, Filter, ChevronDown, MoreVertical } from "lucide-react";

// Mock data for skill types
const MOCK_SKILL_TYPES = [
    {
        id: "1",
        skillType: "Languages",
        color: "#DC2626", // Red
        skills: [
            "French",
            "Spanish",
            "English",
            "German",
            "Filipino",
            "Arabic",
            "Bengali",
            "Mandarin Chinese",
            "Wu Chinese",
            "Hindi",
            "Russian",
            "Portuguese",
        ],
    },
    {
        id: "2",
        skillType: "Soft Skills",
        color: "#059669", // Green
        skills: [
            "Communication",
            "Teamwork",
            "Problem-Solving",
            "Time Management",
            "Critical Thinking",
            "Decision-Making",
            "Organizational",
            "Stress Management",
        ],
    },
    {
        id: "3",
        skillType: "Programming Languages",
        color: "#D97706", // Orange
        skills: [
            "Python",
            "C/C++",
            "Android",
            "Hadoop",
            "Spark",
            "ReactJS",
            "Django",
            "RDMS",
            "NoSQL",
            "Go",
            "Java",
            "Kotlin",
            "PHP",
            "C#",
            "Swift",
        ],
    },
    {
        id: "4",
        skillType: "IT",
        color: "#2563EB", // Blue
        skills: [
            "Web Development",
            "Database Management",
            "Cloud Computing",
            "Network Administration",
            "Cyber Security",
            "DevOps",
            "Machine Learning",
        ],
    },
    {
        id: "5",
        skillType: "Marketing",
        color: "#6B7280", // Gray
        skills: [
            "Communication",
            "Analytics",
            "Digital advertising",
            "Public Speaking",
            "CMS",
            "Email Marketing",
        ],
    },
];

// Tab Component
const TabButton = ({ active, label, count, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2.5 text-sm font-medium transition-colors rounded-lg ${
            active
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
    >
        {label}{" "}
        {count !== undefined && (
            <span
                className={`ml-1.5 px-2 py-0.5 rounded-full text-xs ${
                    active ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                }`}
            >
                {count}
            </span>
        )}
    </button>
);

export default function SkillTypesPage() {
    const [activeTab, setActiveTab] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);

    const toggleSelection = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedItems.length === MOCK_SKILL_TYPES.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(MOCK_SKILL_TYPES.map((item) => item.id));
        }
    };

    const filteredSkillTypes = MOCK_SKILL_TYPES.filter((skillType) =>
        skillType.skillType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span className="hover:text-gray-700 cursor-pointer">Configurations</span>
                <ChevronRight className="w-4 h-4" />
                <span className="hover:text-gray-700 cursor-pointer">Skill Types</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">List</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Skill Types</h1>
                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-lg font-medium transition-colors shadow-sm">
                    <Plus className="w-5 h-5" />
                    New Skill Type
                </button>
            </div>

            {/* Main Card Container */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                {/* Tabs */}
                <div className="px-4 pt-4 pb-2 border-b border-gray-200">
                    <div className="flex items-center gap-2 flex-wrap">
                        <TabButton
                            label="All"
                            count={7}
                            active={activeTab === "All"}
                            onClick={() => setActiveTab("All")}
                        />
                        <TabButton
                            label="Archived"
                            count={0}
                            active={activeTab === "Archived"}
                            onClick={() => setActiveTab("Archived")}
                        />
                    </div>
                </div>

                {/* Toolbar */}
                <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
                    {/* Left: Group By */}
                    <div className="w-full md:w-auto">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm font-medium">
                                Group by
                            </span>
                            <select className="pl-24 pr-8 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-1 w-full md:w-48 appearance-none">
                                <option>-</option>
                                <option>Color</option>
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Right: Search and Filters */}
                    <div className="flex flex-1 w-full md:w-auto items-center gap-3 justify-end">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
                            <Filter className="w-5 h-5" />
                        </button>

                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left w-12">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedItems.length === MOCK_SKILL_TYPES.length &&
                                            MOCK_SKILL_TYPES.length > 0
                                        }
                                        onChange={toggleAll}
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/5">
                                    <div className="flex items-center gap-2">
                                        Skill Type
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                                    <div className="flex items-center gap-2">
                                        Color
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Skills
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredSkillTypes.map((skillType) => (
                                <tr
                                    key={skillType.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(skillType.id)}
                                            onChange={() => toggleSelection(skillType.id)}
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {skillType.skillType}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div
                                            className="w-8 h-8 rounded-lg shadow-sm"
                                            style={{ backgroundColor: skillType.color }}
                                        ></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            {skillType.skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
                                                    style={{
                                                        color: skillType.color,
                                                        borderColor: skillType.color,
                                                        backgroundColor: `${skillType.color}10`,
                                                    }}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredSkillTypes.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No skill types found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
