import { HTMLAttributes } from "react";

import { cn } from "../utils/cn";

export function Badge({
  className,
  variant = "solid",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: "solid" | "outline" }) {
  return <span className={cn("badge", `badge-${variant}`, className)} {...props} />;
}
