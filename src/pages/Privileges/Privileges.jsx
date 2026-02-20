import React, { useState, useEffect } from "react";
import API from "../../api";
import MainLayout from "../../layouts/MainLayout";
import "./Privileges.css";

const ROLES = ["admin", "teacher", "student", "parent"];

export default function Privileges() {
    const [selectedRole, setSelectedRole] = useState("teacher");
    const [modules, setModules] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [originalPermissions, setOriginalPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchModules();
    }, []);

    useEffect(() => {
        if (selectedRole) {
            fetchPermissions(selectedRole);
        }
    }, [selectedRole]);

    const fetchModules = async () => {
        try {
            const res = await API.get("/api/rbac/modules");
            if (res.data.success) {
                setModules(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch modules", err);
        }
    };

    const fetchPermissions = async (role) => {
        setLoading(true);
        try {
            const res = await API.get(`/api/rbac/permissions/${role}`);
            if (res.data.success) {
                setPermissions(res.data.data);
                setOriginalPermissions(
                    JSON.parse(JSON.stringify(res.data.data))
                );
            }
        } catch (err) {
            console.error("Failed to fetch permissions", err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ ONLY update local state (NO API CALL HERE)
    const handleCheckboxChange = (moduleName, field, value) => {
        setPermissions((prev) => {
            const index = prev.findIndex(
                (p) => p.moduleName === moduleName
            );

            if (index > -1) {
                const updated = [...prev];
                updated[index] = { ...updated[index], [field]: value };
                return updated;
            }

            return [
                ...prev,
                {
                    role: selectedRole,
                    moduleName,
                    can_create: false,
                    can_read: false,
                    can_update: false,
                    can_delete: false,
                    [field]: value,
                },
            ];
        });
    };

    const handleSubmit = async () => {
        const changedPermissions = permissions.filter((perm) => {
            const original = originalPermissions.find(
                (op) => op.moduleName === perm.moduleName
            );

            if (!original) return true;

            return (
                perm.can_create !== original.can_create ||
                perm.can_read !== original.can_read ||
                perm.can_update !== original.can_update ||
                perm.can_delete !== original.can_delete
            );
        });

        if (changedPermissions.length === 0) {
            alert("No changes detected");
            return;
        }

        try {
            await API.post("/api/rbac/permissions/bulk-update", {
                role: selectedRole,
                permissions: changedPermissions,
            });

            alert("Privileges updated successfully");
            setOriginalPermissions(
                JSON.parse(JSON.stringify(permissions))
            );
        } catch (err) {
            console.error("Failed to update permissions", err);
            alert("Error updating privileges");
        }
    };

    const getPermission = (moduleName) => {
        return (
            permissions.find((p) => p.moduleName === moduleName) || {
                can_create: false,
                can_read: false,
                can_update: false,
                can_delete: false,
            }
        );
    };

    return (
        <MainLayout>
            <div className="privileges-container">
                <div className="privileges-header">
                    <h1>Role Privileges Management</h1>

                    <div className="role-selector">
                        <label>Select Role: </label>
                        <select
                            value={selectedRole}
                            onChange={(e) =>
                                setSelectedRole(e.target.value)
                            }
                        >
                            {ROLES.map((role) => (
                                <option key={role} value={role}>
                                    {role.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <p>Loading permissions...</p>
                ) : (
                    <>
                        <table className="privileges-table">
                            <thead>
                                <tr>
                                    <th>Module</th>
                                    <th>Read</th>
                                    <th>Create</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modules.map((mod) => {
                                    const perm = getPermission(mod.name);
                                    const isAdmin =
                                        selectedRole === "admin";

                                    return (
                                        <tr key={mod.id}>
                                            <td>{mod.displayName}</td>

                                            {["can_read", "can_create", "can_update", "can_delete"].map(
                                                (field) => (
                                                    <td key={field}>
                                                        <input
                                                            type="checkbox"
                                                            checked={perm[field]}
                                                            disabled={isAdmin}
                                                            onChange={(e) =>
                                                                handleCheckboxChange(
                                                                    mod.name,
                                                                    field,
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {selectedRole !== "admin" && (
                            <button
                                className="
    bg-blue-600         /* Primary blue background */
    hover:bg-blue-700   /* Darker blue on hover */
    text-white           /* White text */
    font-semibold        /* Bold text */
    py-2 px-4           /* Padding top/bottom 2, left/right 4 */
    rounded-md          /* Rounded corners */
    shadow-md           /* Slight shadow */
    transition           /* Smooth transition */
    duration-200        /* Transition speed */
    ease-in-out         /* Transition easing */
    focus:outline-none   /* Remove default outline */
    focus:ring-2         /* Focus ring */
    focus:ring-blue-400  /* Focus ring color */
    disabled:bg-gray-400 /* Disabled state background */
    disabled:cursor-not-allowed /* Disabled cursor */
  "
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>

                        )}

                        {selectedRole === "admin" && (
                            <p className="admin-note">
                                * Admin role has full access and cannot be modified.
                            </p>
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    );
}
