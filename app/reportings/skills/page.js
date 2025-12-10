"use client";

import React, { useState } from "react";
import {
    ChevronRight,
    ListFilter,
    Zap,
    XCircle,
    Archive,
    MoreVertical,
    Search,
    ChevronDown,
    BarChart3,
} from "lucide-react";

// Mock data for skills
const MOCK_SKILLS = [
    {
        id: "1",
        employee: "Arjun Malhotra",
        skill: "Agile & Scrum Methodologies",
        level: "Expert",
        proficiency: 88.0,
        skillType: "Quality Analyst",
    },
    {
        id: "2",
        employee: "Arjun Malhotra",
        skill: "English",
        level: "C2",
        proficiency: 100,
        skillType: "Languages",
    },
    {
        id: "3",
        employee: "Arjun Malhotra",
        skill: "Software Testing Life Cycle (STLC)",
        level: "Professional",
        proficiency: 88.0,
        skillType: "Quality Analyst",
    },
    {
        id: "4",
        employee: "Arjun Malhotra",
        skill: "Manual Testing",
        level: "Professional",
        proficiency: 88.0,
        skillType: "Quality Analyst",
    },
];

// Tab Button Component
const TabButton = ({ active, label, icon: Icon, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
            active
                ? "border-blue-600 text-blue-600 bg-blue-50/50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        }`}
    >
        {Icon && <Icon className="w-4 h-4" />}
        {label}
    </button>
);

export default function SkillsPage() {
    const [activeTab, setActiveTab] = useState("Default");
    const [searchTerm, setSearchTerm] = useState("");
    const [groupBy, setGroupBy] = useState("Employee");
    const [sortBy, setSortBy] = useState("Ascending");
    const [expandedGroups, setExpandedGroups] = useState(["Arjun Malhotra"]);

    const toggleGroup = (employee) => {
        setExpandedGroups((prev) =>
            prev.includes(employee) ? prev.filter((e) => e !== employee) : [...prev, employee]
        );
    };

    const filteredSkills = MOCK_SKILLS.filter(
        (skill) =>
            skill.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
            skill.employee.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group skills by employee
    const groupedSkills = filteredSkills.reduce((acc, skill) => {
        if (!acc[skill.employee]) {
            acc[skill.employee] = [];
        }
        acc[skill.employee].push(skill);
        return acc;
    }, {});

    return (
        <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span className="hover:text-gray-700 cursor-pointer">Reportings</span>
                <ChevronRight className="w-4 h-4" />
                <span className="hover:text-gray-700 cursor-pointer">Skills</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">List</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Skills</h1>
            </div>

            {/* Main Card Container */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                {/* Tabs */}
                <div className="p-4 flex items-center border-b border-gray-200 overflow-x-auto">
                    <TabButton
                        label="Default"
                        icon={ListFilter}
                        active={activeTab === "Default"}
                        onClick={() => setActiveTab("Default")}
                    />
                    <TabButton
                        label="With Skill"
                        icon={Zap}
                        active={activeTab === "With Skill"}
                        onClick={() => setActiveTab("With Skill")}
                    />
                    <TabButton
                        label="Without Skill"
                        icon={XCircle}
                        active={activeTab === "Without Skill"}
                        onClick={() => setActiveTab("Without Skill")}
                    />
                    <TabButton
                        label="Archived"
                        icon={Archive}
                        active={activeTab === "Archived"}
                        onClick={() => setActiveTab("Archived")}
                    />
                    <button className="px-3 py-2 text-gray-400 hover:text-gray-600 ml-auto">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
                    {/* Left: Group By and Sort By */}
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-initial">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm font-medium">
                                Group by
                            </span>
                            <select
                                value={groupBy}
                                onChange={(e) => setGroupBy(e.target.value)}
                                className="pl-24 pr-8 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-1 w-full md:w-48 appearance-none"
                            >
                                <option>Employee</option>
                                <option>Skill Type</option>
                                <option>Level</option>
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        <div className="relative flex-1 md:flex-initial">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="pl-3 pr-8 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-1 w-full md:w-40 appearance-none"
                            >
                                <option>Ascending</option>
                                <option>Descending</option>
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Right: Search and Filters */}
                    <div className="flex flex-1 w-full md:w-auto items-center gap-3 justify-end">
                        <div className="relative md:w-80">
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
                            <ListFilter className="w-5 h-5" />
                        </button>

                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
                            <BarChart3 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        Employee
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        Skill
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Level
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Proficiency
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        Skill Type
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Object.entries(groupedSkills).map(([employee, skills]) => (
                                <React.Fragment key={employee}>
                                    {/* Group Header Row */}
                                    <tr className="bg-gray-50 hover:bg-gray-100 cursor-pointer">
                                        <td
                                            colSpan="6"
                                            className="px-6 py-3"
                                            onClick={() => toggleGroup(employee)}
                                        >
                                            <div className="flex items-center gap-2 font-medium text-gray-900">
                                                <ChevronRight
                                                    className={`w-4 h-4 transition-transform ${
                                                        expandedGroups.includes(employee)
                                                            ? "rotate-90"
                                                            : ""
                                                    }`}
                                                />
                                                Employee: {employee}
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Skill Rows */}
                                    {expandedGroups.includes(employee) &&
                                        skills.map((skill) => (
                                            <tr
                                                key={skill.id}
                                                className="hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {skill.employee}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {skill.skill}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-gray-300 text-gray-700">
                                                        {skill.level}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                                                            <div
                                                                className="bg-blue-600 h-2 rounded-full"
                                                                style={{
                                                                    width: `${skill.proficiency}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-blue-600 font-semibold min-w-[50px]">
                                                            {skill.proficiency}%
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-gray-300 text-gray-700">
                                                        {skill.skillType}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-right">
                                                    <button className="text-gray-400 hover:text-gray-600">
                                                        <MoreVertical className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

                    {filteredSkills.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No skills found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
