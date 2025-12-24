import {
  BookOpen,
  Bus,
  Home,
  Lightbulb,
  PiggyBank,
  Shield,
  ShoppingBag,
  Stethoscope,
  Tv,
  Utensils,
  Wifi,
} from "lucide-react";

export type TagItem = {
  name: string;
  icon?: React.ReactNode;
};

export const DEFAULT_TAGS = [
  "주거비",
  "공과금",
  "교통비",
  "식비",
  "통신비",
  "구독료",
  "보험료",
  "의료비",
  "교육비",
  "기타생활비",
  "저축/투자",
];

export const DEFAULT_TAG_LIST: TagItem[] = [
  { name: "주거비", icon: <Home size={20} /> },
  { name: "공과금", icon: <Lightbulb size={20} /> },
  { name: "교통비", icon: <Bus size={20} /> },
  { name: "식비", icon: <Utensils size={20} /> },
  { name: "통신비", icon: <Wifi size={20} /> },
  { name: "구독료", icon: <Tv size={20} /> },
  { name: "보험료", icon: <Shield size={20} /> },
  { name: "의료비", icon: <Stethoscope size={20} /> },
  { name: "교육비", icon: <BookOpen size={20} /> },
  { name: "기타생활비", icon: <ShoppingBag size={20} /> },
  { name: "저축/투자", icon: <PiggyBank size={20} /> },
];

export const TAG_COLORS: Record<string, string> = {
  "저축/투자": "#E3F2FD",
};
