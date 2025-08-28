import { create } from "zustand";

type SalaryState = {
  salary: string;
  setSalary: (salary: string) => void;
};

export const useSalaryStore = create<SalaryState>((set) => ({
  salary: "",
  setSalary: (salary) => set({ salary }),
}));
