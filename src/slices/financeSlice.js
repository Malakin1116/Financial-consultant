// src/slices/financeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const TOTAL_DAYS = 31;

const initialState = {
  dailyData: Array.from({ length: TOTAL_DAYS }, () => ({
    income: [],
    expense: [],
  })),
  selectedDay: new Date().getDate(),
  currentDate: new Date(),
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setDailyData: (state, action) => {
      state.dailyData = action.payload;
    },
    addRecord: (state, action) => {
      const { day, record } = action.payload;
      const dayData = state.dailyData[day - 1];
      if (record.amount >= 0) {
        dayData.income.push(record);
      } else {
        dayData.expense.push(record);
      }
    },
    updateRecord: (state, action) => {
      const { day, record } = action.payload;
      const dayData = state.dailyData[day - 1];
      const records = record.amount >= 0 ? dayData.income : dayData.expense;
      const index = records.findIndex((r) => r.id === record.id);
      if (index !== -1) records[index] = record;
    },
    deleteRecord: (state, action) => {
      const { day, recordId } = action.payload;
      const dayData = state.dailyData[day - 1];
      dayData.income = dayData.income.filter((r) => r.id !== recordId);
      dayData.expense = dayData.expense.filter((r) => r.id !== recordId);
    },
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
  },
});

export const {
  setDailyData,
  addRecord,
  updateRecord,
  deleteRecord,
  setSelectedDay,
  setCurrentDate,
} = financeSlice.actions;
export default financeSlice.reducer;
