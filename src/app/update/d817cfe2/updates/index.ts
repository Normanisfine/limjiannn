import Update20261027, { reportId as latestReportId } from './2026-10-04_2026-10-27';
import Update20260914, { reportId as previousReportId } from './2026-09-08_2026-09-14';
import Update20261003, { reportId } from './2026-09-15_2026-10-03';

// Add each new update at the beginning: newest first, oldest last.
export const updates = [
    { id: latestReportId, Component: Update20261027 },
    { id: reportId, Component: Update20261003 },
    { id: previousReportId, Component: Update20260914 },
];
