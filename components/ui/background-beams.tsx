"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export function BackgroundBeams({
  className,
  ...props
}: {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const beamsRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (beamsRef.current) {
      const { x, y } = mousePosition;
      const rect = beamsRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = (x - centerX) * 0.05;
      const distanceY = (y - centerY) * 0.05;
      
      beamsRef.current.style.setProperty("--x-offset", `${distanceX}px`);
      beamsRef.current.style.setProperty("--y-offset", `${distanceY}px`);
    }
  }, [mousePosition]);

  return (
    <div
      className={cn(
        "h-full w-full absolute inset-0 overflow-hidden pointer-events-none -z-10",
        className
      )}
      {...props}
    >
      <div
        ref={beamsRef}
        className="absolute inset-0 opacity-50"
        style={{
          background: 
            "radial-gradient(circle at calc(50% + var(--x-offset, 0px)) calc(50% + var(--y-offset, 0px)), rgba(145, 71, 255, 0.1) 0%, rgba(220, 31, 255, 0.075) 25%, rgba(25, 25, 25, 0) 80%)",
        }}
      >
        <div className="absolute inset-0 bg-[rgba(145,71,255,0.12)] mix-blend-overlay filter blur-[120px]" />
      </div>
    </div>
  );
} 