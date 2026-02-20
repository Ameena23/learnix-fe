import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import {
    BookOpen,
    Eye,
    Edit,
    Filter,
    Search,
    Calendar,
    GraduationCap,
    Users,
    FileText,
    X,
    ChevronRight,
    Award
} from "lucide-react";
import MainLayout from "../../layouts/MainLayout";

export default function ExamMarkEntriesPage() {
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);
    const [selected, setSelected] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterClass, setFilterClass] = useState("All");
    const [filterTerm, setFilterTerm] = useState("All");
    const [availableClasses, setAvailableClasses] = useState([]);
    const [availableTerms, setAvailableTerms] = useState(["Term 1", "Term 2", "Term 3"]);

    useEffect(() => {
        API.get("/api/students/exams/entries").then(res => {
            const sorted = [...(res.data || [])].sort((a, b) => a.id - b.id);
            setEntries(sorted);

            // Extract unique classes for filter
            const classes = ["All", ...new Set(sorted.map(e => e.class))];
            setAvailableClasses(classes);
        });
    }, []);

    const filteredEntries = entries.filter(entry => {
        const matchesSearch =
            entry.exam_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.class?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.division?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.subject?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesClass = filterClass === "All" || entry.class === filterClass;
        const matchesTerm = filterTerm === "All" || entry.term === filterTerm;

        return matchesSearch && matchesClass && matchesTerm;
    });

    const getStatusColor = (entry) => {
        if (entry.status === "completed") return "bg-green-100 text-green-800";
        if (entry.status === "pending") return "bg-yellow-100 text-yellow-800";
        if (entry.status === "draft") return "bg-blue-100 text-blue-800";
        return "bg-gray-100 text-gray-800";
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                {/* HEADER */}
                <div className="bg-gradient-to-r from-purple-700 to-indigo-700 shadow-lg">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <FileText className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-white">Exam Mark Entries</h1>
                                    <p className="text-purple-200 text-sm">
                                        View and manage all exam mark entries
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                    <FileText className="w-5 h-5 text-white" />
                                    <span className="text-white font-medium">
                                        {filteredEntries.length} Entries
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <main className="pt-6 max-w-7xl mx-auto px-4 sm:px-6 pb-12">
                    {/* FILTERS */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="flex items-center gap-2 mb-6">
                            <Filter className="w-5 h-5 text-purple-600" />
                            <h2 className="text-lg font-semibold text-gray-800">Filters & Search</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search entries..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                />
                            </div>

                            <div className="relative">
                                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <select
                                    value={filterClass}
                                    onChange={(e) => setFilterClass(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition appearance-none"
                                >
                                    {availableClasses.map(cls => (
                                        <option key={cls} value={cls}>{cls}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <select
                                    value={filterTerm}
                                    onChange={(e) => setFilterTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition appearance-none"
                                >
                                    <option value="All">All Terms</option>
                                    {availableTerms.map(term => (
                                        <option key={term} value={term}>{term}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setFilterClass("All");
                                    setFilterTerm("All");
                                }}
                                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Entries</p>
                                    <p className="text-2xl font-bold text-gray-800">{entries.length}</p>
                                </div>
                                <div className="p-3 bg-white rounded-xl shadow-sm">
                                    <FileText className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-2xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Completed</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {entries.filter(e => e.status === "completed").length}
                                    </p>
                                </div>
                                <div className="p-3 bg-white rounded-xl shadow-sm">
                                    <Award className="w-6 h-6 text-emerald-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100 rounded-2xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Pending</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {entries.filter(e => e.status === "pending").length}
                                    </p>
                                </div>
                                <div className="p-3 bg-white rounded-xl shadow-sm">
                                    <Calendar className="w-6 h-6 text-amber-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Classes</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {new Set(entries.map(e => e.class)).size}
                                    </p>
                                </div>
                                <div className="p-3 bg-white rounded-xl shadow-sm">
                                    <GraduationCap className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ENTRIES GRID */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <FileText className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Exam Entries</h2>
                                    <p className="text-gray-500 text-sm">
                                        Showing {filteredEntries.length} of {entries.length} entries
                                    </p>
                                </div>
                            </div>

                            <div className="text-sm text-gray-500">
                                Last updated: Today
                            </div>
                        </div>

                        {filteredEntries.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-2xl shadow">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">No entries found</h3>
                                <p className="text-gray-500">
                                    {searchTerm || filterClass !== "All" || filterTerm !== "All"
                                        ? "Try adjusting your filters"
                                        : "No exam entries have been created yet"}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredEntries.map((entry) => (
                                    <div
                                        key={entry.id}
                                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100 hover:border-purple-200 group cursor-pointer"
                                        onClick={() => setSelected(entry)}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold">
                                                        ID: {entry.id}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getStatusColor(entry)}`}>
                                                        {entry.status || "Active"}
                                                    </span>
                                                </div>
                                                <h3 className="text-base font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
                                                    {entry.exam_name}
                                                </h3>
                                            </div>
                                            <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-purple-50 transition-colors">
                                                <FileText className="w-5 h-5 text-gray-500 group-hover:text-purple-600 transition-colors" />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <GraduationCap className="w-4 h-4 text-gray-400" />
                                                <span>{entry.class} - {entry.division}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <BookOpen className="w-4 h-4 text-gray-400" />
                                                <span>{entry.subject}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span>{entry.term}</span>
                                            </div>

                                            {entry.academic_year && (
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span className="font-medium">Year:</span>
                                                    <span>{entry.academic_year}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <div className="text-xs text-gray-500">
                                                Created: {new Date(entry.created_at || Date.now()).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-2 text-purple-600 text-sm font-medium">
                                                View Details
                                                <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>

                {/* MODAL */}
                {selected && (
                    <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                        onClick={() => setSelected(null)}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-scale-in"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <FileText className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">Entry Details</h3>
                                            <p className="text-sm text-gray-500">ID: {selected.id}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelected(null)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                                    >
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
                                        <h4 className="text-base font-semibold text-purple-700 mb-2">{selected.exam_name}</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-1 bg-white text-purple-600 rounded-lg text-xs font-semibold">
                                                {selected.class} - {selected.division}
                                            </span>
                                            <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getStatusColor(selected)}`}>
                                                {selected.status || "Active"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Subject</p>
                                            <p className="font-medium text-gray-800">{selected.subject}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Term</p>
                                            <p className="font-medium text-gray-800">{selected.term}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Academic Year</p>
                                            <p className="font-medium text-gray-800">{selected.academic_year || "2024-25"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Max Marks</p>
                                            <p className="font-medium text-gray-800">{selected.max_mark || "N/A"}</p>
                                        </div>
                                    </div>

                                    {selected.school_name && (
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">School Name</p>
                                            <p className="font-medium text-gray-800">{selected.school_name}</p>
                                        </div>
                                    )}

                                    {selected.created_at && (
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Created On</p>
                                            <p className="font-medium text-gray-800">
                                                {new Date(selected.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-3 mt-8">
                                    <button
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium"
                                        onClick={() =>
                                            navigate("/studentss", {
                                                state: {
                                                    entryId: selected.id,
                                                    mode: "view",
                                                },
                                            })
                                        }
                                    >
                                        <Eye className="w-4 h-4" />
                                        View
                                    </button>

                                    <button
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition font-medium"
                                        onClick={() =>
                                            navigate("/studentss", {
                                                state: {
                                                    entryId: selected.id,
                                                    mode: "edit",
                                                },
                                            })
                                        }
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}