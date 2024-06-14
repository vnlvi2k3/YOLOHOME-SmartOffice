// Mapping of names to indices
const nameToIndex: Record<string, number> = {
    "Lan Vi": 0,
    "Khôi Tuấn": 1,
    "Chánh Trí": 2,
    "Văn Toàn": 3,
    "Tiến Vinh": 4,

    // Add more mappings as required
};

// Function to generate employee ID
export const getEmployeeId = (name: string): string => {
    const index = nameToIndex[name];
    if (index !== undefined) {
        return `MT${(index + 1).toString().padStart(4, '0')}`; // Formats the index, e.g., MT0001
    }
    return 'MT0000'; // Default or error ID if name is not found (or possibly for "background")
};
