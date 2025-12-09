import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Logo from "@/assets/images/soomtong.png";
import { Button, Card, Column, Text } from "@/components/ui";
import { getTodayString } from "@/utils/date";
import { isIOS, isInStandaloneMode } from "@/utils/mobile";

import * as S from "./style";

const HIDE_KEY = "soomtong_ios_addtohome_hide";
const HIDE_UNTIL_KEY = "soomtong_ios_addtohome_hide_until";

export default function PWAInstallPromptScreen() {
  const [showPrompt, setShowPrompt] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hidden = window.localStorage.getItem(HIDE_KEY) === "1";
    if (hidden) return;

    const hideUntil = window.localStorage.getItem(HIDE_UNTIL_KEY);
    const today = getTodayString();
    if (hideUntil === today) return;

    if (isIOS() && !isInStandaloneMode()) {
      setShowPrompt(true);
    }
  }, []);

  const hidePrompt = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
    }
  };

  const handleClosePrompt = () => {
    setShowPrompt(false);
    hidePrompt(HIDE_KEY, "1");
  };

  const handleAppOpenClick = () => {
    router.push("/prompt-information");
    handleClosePrompt();
  };

  const handleTodayClick = () => {
    setShowPrompt(false);
    hidePrompt(HIDE_UNTIL_KEY, getTodayString());
  };

  return (
    <>
      {showPrompt && (
        <S.Backdrop role="dialog" aria-modal="true" aria-label="PWA 설치 안내">
          <Card direction="column" radius="xl" position="relative">
            <S.CloseButton type="button" onClick={handleClosePrompt} aria-label="close prompt">
              ×
            </S.CloseButton>

            <Column align="center" justify="center" gap={12} mb={20}>
              <Image src={Logo} alt="app icon" width={120} height={120} />

              <Text align="center" size={16}>
                홈 화면에 <strong>숨통 앱</strong> 추가하고
                <br />더 편하게 생활비를 관리해보세요.
              </Text>
            </Column>

            <Column gap={12} pvh={[0, 20]} align="center" justify="center">
              <Button radius="pill" onClick={handleAppOpenClick}>
                <Text weight={700} color="inverseWhite" size={16}>
                  설치없이 앱으로 열기
                </Text>
              </Button>

              <S.TodayButton onClick={handleTodayClick}>오늘은 그냥 볼게요.</S.TodayButton>
            </Column>
          </Card>
        </S.Backdrop>
      )}
    </>
  );
}
