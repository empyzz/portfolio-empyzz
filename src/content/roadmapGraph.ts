// Columns and rows are one-based. A two-column span centers convergence nodes.
export const graphPlacement = [[2, 1], [2, 2], [3, 1], [3, 2], [2, 3, 2], [2, 4], [3, 4], [4, 3], [2, 5], [3, 5], [2, 6, 2], [2, 7, 2], [2, 8], [3, 8], [2, 9, 2], [2, 10, 2], [1, 2]]

// Zero-based stage indices; the third value marks a supporting (dashed) link.
// These are learning connections, not strict prerequisites.
export const graphEdges = [[0, 1], [2, 3], [1, 4], [3, 4], [4, 5], [4, 6], [5, 8], [6, 9], [8, 9, 1], [9, 10], [10, 11], [11, 12], [11, 13], [12, 14], [13, 14], [14, 15], [16, 1, 1], [16, 10, 1], [7, 4, 1]]
