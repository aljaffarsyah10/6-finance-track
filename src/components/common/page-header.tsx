import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 mb-2 border-b border-border/80">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-navy">
          {title}
        </h1>
        <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#FF6B5B] via-[#0D9488] to-transparent mt-1.5" />
        {description && (
          <p className="text-sm font-medium text-muted-foreground mt-2">
            {description}
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-2.5 flex-wrap">{children}</div>}
    </div>
  );
}
