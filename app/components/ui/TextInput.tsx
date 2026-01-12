"use client";

import * as React from "react";
import { cn } from "../../utils/cn";

type TextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  rightSlot?: React.ReactNode;
};

export function TextInput({
  value,
  onValueChange,
  error,
  rightSlot,
  className,
  ...props
}: TextInputProps) {
  const hasError = Boolean(error);

  return (
    <div className="space-y-1">
      <div className="relative" suppressHydrationWarning>
        <input
          {...props}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          aria-invalid={hasError || undefined}
          className={cn(
            "control",
            rightSlot ? "pr-24" : "",
            hasError && "control-error",
            className
          )}
          suppressHydrationWarning
        />
        {rightSlot && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightSlot}
          </div>
        )}
      </div>

      {hasError && <p className="error-text">{error}</p>}
    </div>
  );
}