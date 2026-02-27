"use client";

import { useCallback } from "react";

import { Box, Button, Column, Heading, Row, Text } from "@/shared/ui";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DashboardError({ reset }: Props) {
  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <Box centerScreen>
      <Column gap={16} align="center">
        <Heading level={2} fontWeight="bold" align="center">
          데이터를 불러오지 못했어요
        </Heading>
        <Text size={14} color="secondary">
          잠시 후 다시 시도해 주세요.
        </Text>
        <Row gap={8}>
          <Button variant="outline" width={96} height={40} onClick={reset}>
            다시 시도
          </Button>
          <Button width={96} height={40} onClick={handleReload}>
            새로고침
          </Button>
        </Row>
      </Column>
    </Box>
  );
}
