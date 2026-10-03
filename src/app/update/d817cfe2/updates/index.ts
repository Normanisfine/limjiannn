import Update20260914, { reportId as previousReportId } from './2026-09-08_2026-09-14';
import Update20261003, { reportId } from './2026-09-15_2026-10-03';

// Add each new update at the beginning: newest first, oldest last.
export const updates = [
    { id: reportId, Component: Update20261003 },
    { id: previousReportId, Component: Update20260914 },
];
