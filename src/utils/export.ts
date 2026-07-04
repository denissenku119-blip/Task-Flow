import { Task } from '@/types/task';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const exportToCSV = (tasks: Task[]) => {
  const data = tasks.map(t => ({
    Title: t.title,
    Description: t.description,
    Priority: t.priority,
    Category: t.category,
    DueDate: t.dueDate,
    Status: t.isCompleted ? 'Completed' : 'Pending'
  }));
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'taskflow_export.csv');
  link.click();
};

export const exportToPDF = (tasks: Task[]) => {
  const doc = new jsPDF() as any;
  doc.text('TaskFlow Productivity Report', 14, 15);
  
  const tableData = tasks.map(t => [
    t.title,
    t.priority,
    t.category,
    t.dueDate.split('T')[0],
    t.isCompleted ? 'Done' : 'Pending'
  ]);

  doc.autoTable({
    head: [['Title', 'Priority', 'Category', 'Due Date', 'Status']],
    body: tableData,
    startY: 20,
  });

  doc.save('taskflow_report.pdf');
};