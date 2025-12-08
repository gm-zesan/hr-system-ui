"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, ChevronDown, MoreVertical, X } from "lucide-react";

export default function ManageSkillsPage({ params }) {
  const [skills, setSkills] = useState([]);
  const [groupBy, setGroupBy] = useState("-");
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [showSkillLevelDropdown, setShowSkillLevelDropdown] = useState(false);
  const groupDropdownRef = useRef(null);
  const skillDropdownRef = useRef(null);
  const skillLevelDropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    skillType: "Languages",
    skill: "",
    skillLevel: "",
  });

  const skillTypes = [
    "Languages",
    "Soft Skills",
    "Programming Languages",
    "IT",
    "Marketing",
    "Accounts",
    "Quality Analyst",
  ];

  const skillOptions = ["JavaScript", "Python", "React", "Node.js", "SQL"];
  const skillLevelOptions = ["Beginner", "Intermediate", "Advanced", "Expert"];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (groupDropdownRef.current && !groupDropdownRef.current.contains(event.target)) {
        setShowGroupDropdown(false);
      }
      if (skillDropdownRef.current && !skillDropdownRef.current.contains(event.target)) {
        setShowSkillDropdown(false);
      }
      if (skillLevelDropdownRef.current && !skillLevelDropdownRef.current.contains(event.target)) {
        setShowSkillLevelDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreate = () => {
    // Add skill creation logic here
    setIsClosing(true);
    setTimeout(() => {
      setShowAddModal(false);
      setIsClosing(false);
      setIsAnimating(false);
      setFormData({
        skillType: "Languages",
        skill: "",
        skillLevel: "",
      });
    }, 300);
  };

  const handleCreateAndAnother = () => {
    // Add skill creation logic here
    setFormData({
      skillType: "Languages",
      skill: "",
      skillLevel: "",
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

      {/* Group By Filter */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Group by</span>
          <div className="relative" ref={groupDropdownRef}>
            <button
              onClick={() => setShowGroupDropdown(!showGroupDropdown)}
              className="min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-900">{groupBy}</span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showGroupDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showGroupDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                <button
                  onClick={() => {
                    setGroupBy("-");
                    setShowGroupDropdown(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <button
                  onClick={() => {
                    setGroupBy("Skill Type");
                    setShowGroupDropdown(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  Skill Type
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700">
                  Skill Type
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700">
                  Skill
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-sm font-semibold text-gray-900">Skill Level</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-sm font-semibold text-gray-900">Level Percent</span>
              </th>
              <th className="px-6 py-3 text-left">
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700">
                  Created By
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </th>
              <th className="px-6 py-3 text-right">
                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {skills.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-32 text-center">
                  <div className="flex flex-col items-center justify-center">
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
                    <p className="text-sm text-gray-500">
                      Create a employee skill to get started.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className={`fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isAnimating && !isClosing ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${isAnimating && !isClosing ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create Employee Skill</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Skill Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Skill Type<span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {skillTypes.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="skillType"
                          value={type}
                          checked={formData.skillType === type}
                          onChange={(e) => setFormData({ ...formData, skillType: e.target.value })}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-900 group-hover:text-gray-700">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Right Column - Skill & Skill Level */}
                <div className="space-y-6">
                  {/* Skill Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Skill<span className="text-red-500">*</span>
                    </label>
                    <div className="relative" ref={skillDropdownRef}>
                      <button
                        onClick={() => setShowSkillDropdown(!showSkillDropdown)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className={`text-sm ${formData.skill ? 'text-gray-900' : 'text-gray-400'}`}>
                          {formData.skill || 'Select an option'}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showSkillDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showSkillDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                          {skillOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setFormData({ ...formData, skill: option });
                                setShowSkillDropdown(false);
                              }}
                              className="w-full px-4 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Skill Level Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Skill Level<span className="text-red-500">*</span>
                    </label>
                    <div className="relative" ref={skillLevelDropdownRef}>
                      <button
                        onClick={() => setShowSkillLevelDropdown(!showSkillLevelDropdown)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className={`text-sm ${formData.skillLevel ? 'text-gray-900' : 'text-gray-400'}`}>
                          {formData.skillLevel || 'Select an option'}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showSkillLevelDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showSkillLevelDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                          {skillLevelOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setFormData({ ...formData, skillLevel: option });
                                setShowSkillLevelDropdown(false);
                              }}
                              className="w-full px-4 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCreate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
              >
                Create
              </button>
              <button
                onClick={handleCreateAndAnother}
                className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-lg font-medium border border-gray-300 transition-colors"
              >
                Create & create another
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-lg font-medium border border-gray-300 transition-colors"
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
