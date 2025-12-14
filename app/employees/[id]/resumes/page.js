"use client";

import { use, useState, useRef, useEffect, useCallback, useTransition } from "react";
import {
    Plus,
    ChevronDown,
    MoreVertical,
    Search,
    X,
    Upload,
    File,
    Check,
    Download
} from "lucide-react";
import toast from "react-hot-toast";
import { uploadResume, getEmployeeResumes } from "@/api/employees/uploadResume";

export default function ManageResumesPage({ params }) {
    const unwrappedParams = use(params);
    const [resumes, setResumes] = useState([]);
    const [groupBy, setGroupBy] = useState("-");
    const [searchQuery, setSearchQuery] = useState("");
    const [showGroupDropdown, setShowGroupDropdown] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const groupDropdownRef = useRef(null);
    const typeDropdownRef = useRef(null);
    const fileInputRef = useRef(null);
    const [isPending, startTransition] = useTransition();

    const [formData, setFormData] = useState({
        title: "",
        type: "",
        file: null
    });

    const typeOptions = ["Resume", "Cover Letter", "Certificate", "Other"];

    // File validation
    const acceptedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const validateFile = (selectedFile) => {
        if (!acceptedTypes.includes(selectedFile.type)) {
            toast.error("Only PDF and Word documents are allowed");
            return false;
        }
        if (selectedFile.size > maxSize) {
            toast.error("File size should not exceed 5MB");
            return false;
        }
        return true;
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
    };

    // Drag and drop handlers
    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && validateFile(droppedFile)) {
            setFormData((prev) => ({ ...prev, file: droppedFile }));
        }
    }, []);

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && validateFile(selectedFile)) {
            setFormData((prev) => ({ ...prev, file: selectedFile }));
        }
    };

    const handleRemoveFile = () => {
        setFormData((prev) => ({ ...prev, file: null }));
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Fetch resumes on mount
    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const data = await getEmployeeResumes(unwrappedParams.id);
                setResumes(data || []);
            } catch (error) {
                toast.error("Failed to load resumes");
                console.error(error);
            }
        };
        fetchResumes();
    }, [unwrappedParams.id]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (groupDropdownRef.current && !groupDropdownRef.current.contains(event.target)) {
                setShowGroupDropdown(false);
            }
            if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target)) {
                setShowTypeDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCreate = async () => {
        if (!formData.title) {
            toast.error("Please enter a title");
            return;
        }
        if (!formData.type) {
            toast.error("Please select a type");
            return;
        }
        if (!formData.file) {
            toast.error("Please upload a file");
            return;
        }

        startTransition(async () => {
            try {
                await uploadResume(
                    unwrappedParams.id,
                    formData.file,
                    formData.title,
                    formData.type
                );
                toast.success("Resume uploaded successfully!");

                // Refresh resumes list
                const updatedResumes = await getEmployeeResumes(unwrappedParams.id);
                setResumes(updatedResumes);

                setIsClosing(true);
                setTimeout(() => {
                    setShowAddModal(false);
                    setIsClosing(false);
                    setIsAnimating(false);
                    setFormData({
                        title: "",
                        type: "",
                        file: null
                    });
                }, 300);
            } catch (error) {
                toast.error(error.message || "Failed to upload resume");
            }
        });
    };

    const handleCreateAndAnother = async () => {
        if (!formData.title) {
            toast.error("Please enter a title");
            return;
        }
        if (!formData.type) {
            toast.error("Please select a type");
            return;
        }
        if (!formData.file) {
            toast.error("Please upload a file");
            return;
        }

        startTransition(async () => {
            try {
                await uploadResume(
                    unwrappedParams.id,
                    formData.file,
                    formData.title,
                    formData.type
                );
                toast.success("Resume uploaded successfully!");

                // Refresh resumes list
                const updatedResumes = await getEmployeeResumes(unwrappedParams.id);
                setResumes(updatedResumes);

                setFormData({
                    title: "",
                    type: "",
                    file: null
                });
            } catch (error) {
                toast.error(error.message || "Failed to upload resume");
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

    const handleDownload = async (fileUrl, fileName) => {
        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("Failed to download file");
            console.error("Download error:", error);
        }
    };

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                {/* Header with Add Resume Button */}
                <div className="p-6 flex items-center justify-end border-b border-gray-200">
                    <button
                        onClick={handleOpenModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Resume
                    </button>
                </div>

                {/* Filters Bar */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between gap-4">
                        {/* Group By Filter */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700">Group by</span>
                            <div className="relative" ref={groupDropdownRef}>
                                <button
                                    onClick={() => setShowGroupDropdown(!showGroupDropdown)}
                                    className="min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-sm text-gray-900">{groupBy}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-400 transition-transform ${showGroupDropdown ? "rotate-180" : ""}`}
                                    />
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
                                                setGroupBy("Display Type");
                                                setShowGroupDropdown(false);
                                            }}
                                            className="w-full px-4 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                                        >
                                            Display Type
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Search and Filter Icons */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search"
                                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                                <svg
                                    className="w-5 h-5 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                    />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-gray-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    0
                                </span>
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <MoreVertical className="w-5 h-5 text-gray-600" />
                            </button>
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
                                        Title
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left">
                                    <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700">
                                        Type
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left">
                                    <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700">
                                        File Name
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left">
                                    <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700">
                                        Action
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {resumes.length === 0 ? (
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
                                                No employee resumes
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Add a resume to get started.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                resumes.map((resume) => {
                                    // Extract file name from file_path
                                    const fileName = resume.file_path
                                        ? resume.file_path.split("/").pop()
                                        : "N/A";
                                    const fileUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resume.file_path}`;

                                    return (
                                        <tr
                                            key={resume.id}
                                            className="border-b border-gray-200 hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {resume.title}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {resume.type}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                <div className="flex items-center gap-2">
                                                    <File className="w-4 h-4 text-gray-400" />
                                                    <span
                                                        className="truncate max-w-xs"
                                                        title={fileName}
                                                    >
                                                        {fileName}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <button
                                                    onClick={() =>
                                                        handleDownload(fileUrl, fileName)
                                                    }
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                                                    title="Download file"
                                                >
                                                    <Download className="w-4 h-4" />
                                                    <span>Download</span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Resume Modal */}
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
                                Create Employee Resume
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Title<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter resume title"
                                />
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Type<span className="text-red-500">*</span>
                                </label>
                                <div className="relative" ref={typeDropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                                        className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <span
                                            className={`text-sm ${formData.type ? "text-gray-900" : "text-gray-400"}`}
                                        >
                                            {formData.type || "Select type"}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-gray-400 transition-transform ${showTypeDropdown ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {showTypeDropdown && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                            {typeOptions.map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData({
                                                            ...formData,
                                                            type: option
                                                        });
                                                        setShowTypeDropdown(false);
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

                            {/* File Upload with Drag & Drop */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Upload File<span className="text-red-500">*</span>
                                </label>
                                <div
                                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                                        isDragging
                                            ? "border-blue-500 bg-blue-50"
                                            : formData.file
                                              ? "border-green-500 bg-green-50"
                                              : "border-gray-300 bg-gray-50 hover:border-gray-400"
                                    }`}
                                    onDragEnter={handleDragEnter}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    {!formData.file ? (
                                        <>
                                            <div className="flex flex-col items-center">
                                                <div
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                                                        isDragging ? "bg-blue-100" : "bg-gray-200"
                                                    }`}
                                                >
                                                    <Upload
                                                        className={`w-6 h-6 ${isDragging ? "text-blue-600" : "text-gray-500"}`}
                                                    />
                                                </div>
                                                <h3 className="text-sm font-medium text-gray-900 mb-1">
                                                    {isDragging
                                                        ? "Drop file here"
                                                        : "Drag and drop file here"}
                                                </h3>
                                                <p className="text-xs text-gray-500 mb-3">or</p>
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                                >
                                                    Browse Files
                                                </button>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={handleFileSelect}
                                                    className="hidden"
                                                />
                                                <p className="text-xs text-gray-500 mt-3">
                                                    PDF, DOC, DOCX (Max 5MB)
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-start justify-between bg-white rounded-lg p-3 border border-green-300">
                                                <div className="flex items-start gap-3 flex-1">
                                                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                                                        <File className="w-5 h-5 text-green-600" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                {formData.file.name}
                                                            </p>
                                                            <div className="flex items-center gap-1 text-green-600">
                                                                <Check className="w-3.5 h-3.5" />
                                                                <span className="text-xs font-medium">
                                                                    Ready
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-gray-500">
                                                            {formatFileSize(formData.file.size)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveFile}
                                                    className="p-1 hover:bg-red-100 rounded transition-colors ml-2"
                                                >
                                                    <X className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium"
                                            >
                                                Choose a different file
                                            </button>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileSelect}
                                                className="hidden"
                                            />
                                        </>
                                    )}
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
