import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// NODE MODULES...
import {
  formatRelative,
  isSameYear,
  format,
  isBefore,
  isToday,
  isTomorrow,
  startOfToday,
} from 'date-fns';
import { redirect } from 'react-router';

// CAPTURE THE FIRST LATTER OF STRING...
export function toTitle(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

// DATE FUNCTION AND UTILS...
export function formateCustomDate(date: string | Date | number) {
  const today = new Date();

  // GET THE RELATIVE DAY STRING...
  const relativeDay = toTitle(formatRelative(date, today).split(' at ')[0]);

  // LIST OF RELATIVE KEYWORDS TO CHECK...
  const relativeDays = [
    'Today',
    'Tomorrow',
    'Yesterday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  // RETURN THE RELATIVE DAYS IF IT MATCHES...
  if (relativeDays.includes(relativeDay)) return relativeDay;

  if (isSameYear(date, today)) {
    return format(date, 'dd MMM');
  } else {
    return format(date, 'dd MMM yyyy');
  }
}

// RETURN A COLOR CLASS BASED ON THE DUE DATE OF A TASK...
export function getTaskDueDateColorClass(
  dueDate: Date | null,
  completed?: boolean,
): string | undefined {
  if (dueDate === null || completed === undefined) return;

  if (isBefore(dueDate, startOfToday()) && !completed) return 'text-red-500';

  if (isToday(dueDate)) return 'text-emerald-500';
  if (isTomorrow(dueDate) && !completed) return 'text-amber-500';
}

// GENRATE A UNIQUE ID FOR STORE DATA IN APPWRITE DATABASE...
export function generateID() {
  return Math.random().toString(36).slice(8) + Date.now().toString(36);
}

// GET USERID BY LOCALSTORAGE...
export function getUserId(): string {
  const clerkUserId = localStorage.getItem('clerkUserId');

  if (!clerkUserId) {
    redirect('/auth-sync');
    return '';
  }

  return clerkUserId;
}

// TRUNCATES A STRING TO A SPECIFIED LENGTH AND APPENDS AND ELLIPSIS...
export function truncateString(str: string, maxLength: number): string {
  if (str.length > maxLength) {
    console.log(maxLength - 1);

    return str.slice(0, maxLength - 1) + '...';
  }

  return str;
}
