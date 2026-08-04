"use client";

import { useEffect, useState } from "react";

import { CheckCircle2, ChevronRight, Download, Monitor, Moon, Sun, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useResetFinancialDataMutation } from "@/features/dashboard/settings/queries";
import { ColorScheme, applyColorScheme, getStoredColorScheme, saveColorScheme } from "@/shared/lib/colorScheme";
import { Alert, Column, Text } from "@/shared/ui";
import { isInStandaloneMode } from "@/shared/utils/mobile";

import * as S from "./style";

const COLOR_SCHEME_OPTIONS = [
  { value: "light", label: "라이트", icon: Sun },
  { value: "dark", label: "다크", icon: Moon },
  { value: "system", label: "시스템", icon: Monitor },
] as const;

export default function SettingsScreen() {
  const router = useRouter();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("system");
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [isResetAlertOpen, setIsResetAlertOpen] = useState(false);

  const resetMutation = useResetFinancialDataMutation();

  useEffect(() => {
    const storedColorScheme = getStoredColorScheme();
    setColorScheme(storedColorScheme);
    applyColorScheme(storedColorScheme);
    setIsAppInstalled(isInStandaloneMode());
  }, []);

  const handleColorSchemeChange = (nextColorScheme: ColorScheme) => {
    setColorScheme(nextColorScheme);
    saveColorScheme(nextColorScheme);
  };

  const handleInstallGuideClick = () => {
    router.push("/prompt-information");
  };

  const handleResetClick = () => {
    setIsResetAlertOpen(true);
  };

  const handleResetCancel = () => {
    if (resetMutation.isPending) return;
    setIsResetAlertOpen(false);
  };

  const handleResetConfirm = () => {
    resetMutation.mutate(undefined, { onSuccess: () => setIsResetAlertOpen(false) });
  };

  return (
    <>
      <S.ScreenContent>
        <Column gap={22}>
          <Text size={24} weight={700}>
            설정
          </Text>

          <Column as="section" gap={8}>
            <Text as="h3" size={13} weight={700} color="secondary">
              화면 모드
            </Text>
            <S.ThemeOptions>
              {COLOR_SCHEME_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isSelected = colorScheme === option.value;

                return (
                  <S.ThemeOption key={option.value}>
                    <S.ThemeRadio
                      type="radio"
                      name="color-scheme"
                      value={option.value}
                      checked={isSelected}
                      onChange={() => handleColorSchemeChange(option.value)}
                    />
                    <S.ThemeChoice $isSelected={isSelected}>
                      <Icon size={21} strokeWidth={1.9} aria-hidden />
                      {option.label}
                    </S.ThemeChoice>
                  </S.ThemeOption>
                );
              })}
            </S.ThemeOptions>
          </Column>

          <Column as="section" gap={8}>
            <Text as="h3" size={13} weight={700} color="secondary">
              앱
            </Text>
            <S.ActionList>
              <S.ActionButton type="button" onClick={handleInstallGuideClick} disabled={isAppInstalled}>
                <S.ActionIcon $isDisabled={isAppInstalled}>
                  {isAppInstalled ? <CheckCircle2 size={19} aria-hidden /> : <Download size={19} aria-hidden />}
                </S.ActionIcon>
                <Column as="span" gap={2} minWidth={0} flex={1}>
                  <S.ActionTitle>{isAppInstalled ? "홈 화면에 추가됨" : "홈 화면에 앱 설치"}</S.ActionTitle>
                  <S.ActionDescription>
                    {isAppInstalled ? "이미 홈 화면에 추가했어요" : "설치 방법을 단계별로 확인해요"}
                  </S.ActionDescription>
                </Column>
                {!isAppInstalled && <ChevronRight size={18} aria-hidden />}
              </S.ActionButton>
            </S.ActionList>
          </Column>

          <Column as="section" gap={8}>
            <Text as="h3" size={13} weight={700} color="secondary">
              데이터
            </Text>
            <S.ActionList>
              <S.ActionButton type="button" $isDanger onClick={handleResetClick} disabled={resetMutation.isPending}>
                <S.ActionIcon $isDanger>
                  <Trash2 size={19} aria-hidden />
                </S.ActionIcon>
                <Column as="span" gap={2} minWidth={0} flex={1}>
                  <S.ActionTitle>가계부 데이터 초기화</S.ActionTitle>
                  <S.ActionDescription>월수입과 고정지출 기록을 모두 삭제해요</S.ActionDescription>
                </Column>
              </S.ActionButton>
            </S.ActionList>
          </Column>
        </Column>
      </S.ScreenContent>

      <Alert
        isOpen={isResetAlertOpen}
        title="가계부 데이터를 초기화할까요?"
        description="월수입, 월급일, 고정지출과 납부 기록이 모두 삭제되며 되돌릴 수 없어요."
        confirmText={resetMutation.isPending ? "초기화 중" : "초기화"}
        cancelText="취소"
        confirmColor="danger"
        isConfirmDisabled={resetMutation.isPending}
        onConfirm={handleResetConfirm}
        onCancel={handleResetCancel}
      />
    </>
  );
}
