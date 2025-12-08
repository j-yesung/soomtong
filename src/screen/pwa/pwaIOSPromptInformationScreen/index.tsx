import Image from "next/image";
import { useRouter } from "next/navigation";

import { SingleArrowIcon } from "@/assets/svg/interface";
import { Card, Column, Row, Text } from "@/components/ui";

import * as S from "./style";

export default function PWAIOSPromptInformationScreen() {
  const router = useRouter();

  return (
    <Column gap={20}>
      <button type="button" onClick={() => router.back()}>
        <SingleArrowIcon size={40} />
      </button>
      <Column gap={12} pvh={[0, 15]}>
        <Text size={24} weight={700}>
          홈화면에 앱을 추가하세요!
        </Text>

        <Card direction="column" gap={12}>
          <Row gap={8} pvh={[0, 12]} align="center">
            <S.CircleNumberIcon>1</S.CircleNumberIcon>
            <Text color="secondary" size={14}>
              브라우저 하단{" "}
              <Text weight={700} size={14}>
                ••• 버튼
              </Text>{" "}
              탭
            </Text>
          </Row>
          <S.ImgWrapper>
            <Image src="/pwa-ios-depth1.png" alt="info-depth1" width={100} height={60} priority />
          </S.ImgWrapper>
        </Card>

        <Card direction="column" gap={12}>
          <Row gap={8} pvh={[0, 12]} align="center">
            <S.CircleNumberIcon>2</S.CircleNumberIcon>
            <Text color="secondary" size={14}>
              <Text weight={700} size={14}>
                공유 버튼
              </Text>{" "}
              탭
            </Text>
          </Row>
          <S.ImgWrapper>
            <Image src="/pwa-ios-depth2.png" alt="info-depth2" width={100} height={60} priority />
          </S.ImgWrapper>
        </Card>

        <Card direction="column" gap={12}>
          <Row gap={8} pvh={[0, 12]} align="center">
            <S.CircleNumberIcon>3</S.CircleNumberIcon>
            <Text color="secondary" size={14}>
              <Text weight={700} size={14}>
                더 보기
              </Text>{" "}
              탭 하고{" "}
              <Text weight={700} size={14}>
                홈 화면에 추가
              </Text>{" "}
              선택
            </Text>
          </Row>
          <S.ImgWrapper>
            <Image src="/pwa-ios-depth3.png" alt="info-depth3" width={100} height={60} priority />
            <Image src="/pwa-ios-depth4.png" alt="info-depth4" width={100} height={60} priority />
          </S.ImgWrapper>
        </Card>

        <Card direction="column" gap={12}>
          <Row gap={8} pvh={[0, 12]} align="center">
            <S.CircleNumberIcon>4</S.CircleNumberIcon>
            <Text color="secondary" size={14}>
              추가된{" "}
              <Text weight={700} size={14}>
                앱 실행
              </Text>
            </Text>
          </Row>
          <S.ImgWrapper>
            <Image src="/pwa-ios-depth5.png" alt="info-depth5" width={100} height={30} priority />
          </S.ImgWrapper>
        </Card>
      </Column>
    </Column>
  );
}
