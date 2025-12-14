"use client";
import React, { useState, useCallback, useRef } from "react";
import { ChevronRight, Upload, File, X, Check, AlertCircle } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UploadResumeClient({ employee, onSubmit }) {
    const router = useRouter();
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const fullName = `${employee.first_name} ${employee.last_name}`;

    // Accepted file types
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
            setFile(droppedFile);
        }
    }, []);

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && validateFile(selectedFile)) {
            setFile(selectedFile);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error("Please select a file to upload");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setIsUploading(true);

        try {
            await onSubmit(formData);
            toast.success("Resume uploaded successfully!");
        } catch (error) {
            if (error.message && error.message.includes("NEXT_REDIRECT")) {
                return;
            }
            toast.error(error.message || "Failed to upload resume");
        } finally {
            setIsUploading(false);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
    };

    return (
        <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link href="/employees" className="hover:text-gray-700 cursor-pointer">
                    Employees
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link
                    href={`/employees/${employee.id}`}
                    className="hover:text-gray-700 cursor-pointer"
                >
                    {fullName}
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">Upload Resume</span>
            </div>

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Upload Resume</h1>
                <p className="text-gray-600 mt-2">Upload resume for {fullName}</p>
            </div>

            {/* Upload Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
                    {/* Drag & Drop Area */}
                    <div
                        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                            isDragging
                                ? "border-blue-500 bg-blue-50"
                                : file
                                  ? "border-green-500 bg-green-50"
                                  : "border-gray-300 bg-gray-50 hover:border-gray-400"
                        }`}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {!file ? (
                            <>
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                                            isDragging ? "bg-blue-100" : "bg-gray-200"
                                        }`}
                                    >
                                        <Upload
                                            className={`w-8 h-8 ${isDragging ? "text-blue-600" : "text-gray-500"}`}
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {isDragging ? "Drop file here" : "Drag and drop file here"}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">or</p>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
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
                                    <p className="text-xs text-gray-500 mt-4">
                                        Supported formats: PDF, DOC, DOCX (Max 5MB)
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* File Preview */}
                                <div className="flex items-start justify-between bg-white rounded-lg p-4 border border-green-300">
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <File className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {file.name}
                                                </p>
                                                <div className="flex items-center gap-1 text-green-600">
                                                    <Check className="w-4 h-4" />
                                                    <span className="text-xs font-medium">
                                                        Ready
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {formatFileSize(file.size)}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleRemoveFile}
                                        className="p-1 hover:bg-red-100 rounded transition-colors ml-2"
                                    >
                                        <X className="w-5 h-5 text-red-600" />
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
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

                    {/* Info Section */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-blue-900 mb-1">
                                    Upload Guidelines
                                </h4>
                                <ul className="text-xs text-blue-800 space-y-1">
                                    <li>• File must be in PDF, DOC, or DOCX format</li>
                                    <li>• Maximum file size is 5MB</li>
                                    <li>• Ensure the file is not password protected</li>
                                    <li>• File name should not contain special characters</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <button
                        type="submit"
                        disabled={!file || isUploading}
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isUploading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4" />
                                Upload Resume
                            </>
                        )}
                    </button>
                    <Link
                        href={`/employees/${employee.id}`}
                        className="px-6 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium border border-gray-300"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </>
    );
}
