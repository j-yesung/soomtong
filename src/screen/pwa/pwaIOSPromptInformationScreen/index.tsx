import { useRouter } from "next/navigation";

import { SingleArrowIcon } from "@/assets/svg/interface";

export default function PWAIOSPromptInformationScreen() {
  const router = useRouter();

  return (
    <>
      <button type="button" onClick={() => router.back()}>
        <SingleArrowIcon size={40} />
      </button>
      <div>pwa information 화면</div>
    </>
  );
}
