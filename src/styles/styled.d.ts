import "styled-components";

import type { AppTheme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: AppTheme["colors"];
    font: AppTheme["font"];
    fontWeight: AppTheme["fontWeight"];
    radius: AppTheme["radius"];
    bg: AppTheme["bg"];
    border: AppTheme["border"];
  }
}
