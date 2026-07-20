import FixedExpenseFormScreen from "@/widgets/fixedExpenseFormScreen";

type Props = {
  params: Promise<{ createdAt: string }>;
};

export default async function EditFixedExpensePage({ params }: Props) {
  const { createdAt } = await params;

  return <FixedExpenseFormScreen mode="edit" createdAt={Number(createdAt)} />;
}
