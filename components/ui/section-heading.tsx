import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  id,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}>
      {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
      <Tag id={id} className={Tag === "h1" ? "t-h1" : "t-h2"}>
        {title}
      </Tag>
      {lead ? <p className="t-lead mt-5">{lead}</p> : null}
    </div>
  );
}
