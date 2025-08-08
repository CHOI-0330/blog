import React from "react";

interface MetricBadgeProps {
  label: string;
  value: string;
}

export default function MetricBadge({ label, value }: MetricBadgeProps) {
  return (
    <span className="inline-flex items-center rounded bg-gray-200 px-2 py-1 text-sm font-medium text-gray-800">
      {label}: {value}
    </span>
  );
}
