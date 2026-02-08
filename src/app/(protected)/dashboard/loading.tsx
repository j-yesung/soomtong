import { Column } from "@/shared/ui";

export default function DashboardLoading() {
  return (
    <Column gap={24} padding={20}>
      <div style={{ width: "100%", height: "150px", background: "#f2f2f2", borderRadius: "16px" }} />
      <div style={{ width: "100%", height: "300px", background: "#f2f2f2", borderRadius: "16px" }} />
    </Column>
  );
}
