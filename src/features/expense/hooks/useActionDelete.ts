import { MotionValue, useSpring, useTransform } from "framer-motion";

import { ACTION_SPRING } from "../../../constants";

export function useActionDelete(x: MotionValue<number>) {
  const rawScale = useTransform(x, [40, 0, -12, -80, -140], [0, 0, 0.6, 1.06, 1.0]);
  const scale = useSpring(rawScale, ACTION_SPRING);
  const opacity = useTransform(x, [-24, -40], [0, 1]);

  return { scale, opacity };
}
