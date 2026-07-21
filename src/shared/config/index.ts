import type { BadgeTone } from "@/shared/styles/theme";

export type CategoryItem = {
  name: string;
  badgeTone?: BadgeTone;
};

export const FIXED_EXPENSE_CATEGORY_LIST: CategoryItem[] = [
  { name: "주거비", badgeTone: "indigo" },
  { name: "공과금", badgeTone: "amber" },
  { name: "교통비", badgeTone: "cyan" },
  { name: "식비", badgeTone: "orange" },
  { name: "통신비", badgeTone: "sky" },
  { name: "구독료", badgeTone: "purple" },
  { name: "보험료", badgeTone: "teal" },
  { name: "의료비", badgeTone: "rose" },
  { name: "교육비", badgeTone: "blue" },
  { name: "기타생활비", badgeTone: "slate" },
  { name: "저축/투자", badgeTone: "emerald" },
];

const FIXED_EXPENSE_CATEGORY_MAP = new Map(FIXED_EXPENSE_CATEGORY_LIST.map((category) => [category.name, category]));

export function getFixedExpenseBadgeTone(categoryName: string): BadgeTone {
  return FIXED_EXPENSE_CATEGORY_MAP.get(categoryName)?.badgeTone ?? "neutral";
}
