"use client";

import { use, useState, useRef, useEffect, useTransition } from "react";
import { Plus, ChevronDown, MoreVertical, X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { attachSkill, removeSkill } from "@/api/employees/employeeSkills";
import { getEmployee } from "@/api/employees/getEmployee";
import { getSkills } from "@/api/skills/getSkills";

export default function ManageSkillsPage({ params }) {
    const unwrappedParams = use(params);
    const [skills, setSkills] = useState([]);
    const [availableSkills, setAvailableSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [groupBy, setGroupBy] = useState("-");
    const [showGroupDropdown, setShowGroupDropdown] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [showSkillDropdown, setShowSkillDropdown] = useState(false);
    const [isPending, startTransition] = useTransition();
    const groupDropdownRef = useRef(null);
    const skillDropdownRef = useRef(null);

    const [formData, setFormData] = useState({
        skill: ""
    });

    // Fetch all available skills first, then employee skills
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch all skills first (with high limit to get all)
                const skillsData = await getSkills(1, 1000);
                setAvailableSkills(skillsData.items || []);

                // Then fetch employee data
                const employee = await getEmployee(unwrappedParams.id);
                setSkills(employee.skills || []);
            } catch (error) {
                toast.error("Failed to load data");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [unwrappedParams.id]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (groupDropdownRef.current && !groupDropdownRef.current.contains(event.target)) {
                setShowGroupDropdown(false);
            }
            if (skillDropdownRef.current && !skillDropdownRef.current.contains(event.target)) {
                setShowSkillDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCreate = async () => {
        if (!formData.skill) {
            toast.error("Please select a skill");
            return;
        }

        startTransition(async () => {
            try {
                await attachSkill(unwrappedParams.id, formData.skill);
                const employee = await getEmployee(unwrappedParams.id);
                setSkills(employee.skills || []);
                toast.success("Skill attached successfully");

                setIsClosing(true);
                setTimeout(() => {
                    setShowAddModal(false);
                    setIsClosing(false);
                    setIsAnimating(false);
                    setFormData({ skill: "" });
                }, 300);
            } catch (error) {
                toast.error(error.message || "Failed to attach skill");
            }
        });
    };

    const handleCreateAndAnother = async () => {
        if (!formData.skill) {
            toast.error("Please select a skill");
            return;
        }

        startTransition(async () => {
            try {
                await attachSkill(unwrappedParams.id, formData.skill);
                const employee = await getEmployee(unwrappedParams.id);
                setSkills(employee.skills || []);
                toast.success("Skill attached successfully");
                setFormData({ skill: "" });
            } catch (error) {
                toast.error(error.message || "Failed to attach skill");
            }
        });
    };

    const [confirmRemove, setConfirmRemove] = useState({ open: false, skillId: null });
    const handleRemoveSkill = (skillId) => {
        setConfirmRemove({ open: true, skillId });
    };

    const confirmRemoveSkill = async () => {
        if (!confirmRemove.skillId) return;
        setConfirmRemove({ open: false, skillId: null });
        startTransition(async () => {
            try {
                await removeSkill(unwrappedParams.id, confirmRemove.skillId);
                const employee = await getEmployee(unwrappedParams.id);
                setSkills(employee.skills || []);
                toast.success("Skill removed successfully");
            } catch (error) {
                toast.error(error.message || "Failed to remove skill");
            }
        });
    };

    const handleCloseModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowAddModal(false);
            setIsClosing(false);
            setIsAnimating(false);
        }, 300);
    };

    const handleOpenModal = () => {
        setShowAddModal(true);
        setTimeout(() => {
            setIsAnimating(true);
        }, 10);
    };

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                {/* Header with Add Skill Button */}
                <div className="p-6 flex items-center justify-end border-b border-gray-200">
                    <button
                        onClick={handleOpenModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Skill
                    </button>
                </div>

                {/* Skills Pills */}
                <div className="p-6 relative min-h-[120px]">
                    {/* Overlay for whitespace click, but not pills */}
                    {!loading && skills.length > 0 && (
                        <div
                            className="absolute inset-0 z-0 cursor-pointer pointer-events-auto"
                            onClick={handleOpenModal}
                            aria-label="Add Skill Overlay"
                        />
                    )}
                    {loading ? (
                        <div className="text-center py-12 text-gray-500">Loading skills...</div>
                    ) : skills.length === 0 ? (
                        <div
                            className="flex flex-col items-center justify-center py-16 cursor-pointer"
                            onClick={handleOpenModal}
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <svg
                                    className="w-6 h-6 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 mb-1">
                                No employee skills
                            </h3>
                            <p className="text-sm text-gray-500">Add a skill to get started.</p>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-3 w-full relative z-10 select-none pointer-events-none">
                            {skills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="relative group inline-flex items-center px-4 py-2 pr-8 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors cursor-default pointer-events-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span>{skill.name}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveSkill(skill.id);
                                        }}
                                        disabled={isPending}
                                        className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Remove skill"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                    {/* Remove Skill Confirmation Modal */}
                                    {confirmRemove.open && (
                                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                                            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
                                                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                                                    Remove Skill
                                                </h3>
                                                <p className="mb-6 text-gray-700">
                                                    Are you sure you want to remove this skill?
                                                </p>
                                                <div className="flex justify-end gap-3">
                                                    <button
                                                        className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium"
                                                        onClick={() =>
                                                            setConfirmRemove({
                                                                open: false,
                                                                skillId: null
                                                            })
                                                        }
                                                        disabled={isPending}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium disabled:opacity-50"
                                                        onClick={confirmRemoveSkill}
                                                        disabled={isPending}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Add Skill Modal */}
            {showAddModal && (
                <div
                    className={`fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isAnimating && !isClosing ? "opacity-100" : "opacity-0"}`}
                >
                    <div
                        className={`bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${isAnimating && !isClosing ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Create Employee Skill
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="max-w-md">
                                {/* Skill Dropdown */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Select Skill<span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative" ref={skillDropdownRef}>
                                        <button
                                            onClick={() => setShowSkillDropdown(!showSkillDropdown)}
                                            disabled={isPending}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50 transition-colors disabled:opacity-50"
                                        >
                                            <span
                                                className={`text-sm ${
                                                    formData.skill
                                                        ? "text-gray-900"
                                                        : "text-gray-400"
                                                }`}
                                            >
                                                {formData.skill
                                                    ? availableSkills.find(
                                                          (s) => s.id.toString() === formData.skill
                                                      )?.name
                                                    : "Choose a skill..."}
                                            </span>
                                            <ChevronDown
                                                className={`w-5 h-5 text-gray-400 transition-transform ${
                                                    showSkillDropdown ? "rotate-180" : ""
                                                }`}
                                            />
                                        </button>

                                        {showSkillDropdown && (
                                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                                {availableSkills.length === 0 ? (
                                                    <div className="px-4 py-8 text-center text-sm text-gray-500">
                                                        No skills available
                                                    </div>
                                                ) : (
                                                    availableSkills.map((skill) => (
                                                        <button
                                                            key={skill.id}
                                                            onClick={() => {
                                                                setFormData({
                                                                    skill: skill.id.toString()
                                                                });
                                                                setShowSkillDropdown(false);
                                                            }}
                                                            className="w-full px-4 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                                                        >
                                                            {skill.name}
                                                        </button>
                                                    ))
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center gap-3 p-6 border-t border-gray-200">
                            <button
                                onClick={handleCreate}
                                disabled={isPending || !formData.skill}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
                            >
                                {isPending ? "Adding..." : "Add Skill"}
                            </button>
                            <button
                                onClick={handleCreateAndAnother}
                                disabled={isPending || !formData.skill}
                                className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-lg font-medium border border-gray-300 transition-colors disabled:opacity-50"
                            >
                                Add & add another
                            </button>
                            <button
                                onClick={handleCloseModal}
                                disabled={isPending}
                                className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-lg font-medium border border-gray-300 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
