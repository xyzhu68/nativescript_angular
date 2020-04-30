export enum DayStatus { Open, Completed, Failed }

export interface Day {
    dayInMonth: number; // 1-31
    dayInWeek: number; // 0-6
    date: Date;
    status: DayStatus;
}
