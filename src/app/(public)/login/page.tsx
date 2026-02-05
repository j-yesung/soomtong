import { Box } from "@/shared/ui";
import GoogleLoginButton from "@/features/auth/components/googleLoginButton";

export default function LoginPage() {
  return (
    <Box centerScreen>
      <GoogleLoginButton />
    </Box>
  );
}
