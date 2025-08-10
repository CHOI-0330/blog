"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import AnimatedTitle from "./AnimatedTitle";

type Props = {
  title: string;
  isReady: boolean; // 데이터 로딩 완료 신호
  minDuration?: number; // 최소 노출 시간(ms)
  onlyFirstVisit?: boolean; // 세션당 1회 노출
};

export default function SplashIntro({
  title,
  isReady,
  minDuration = 900,
  onlyFirstVisit = false,
}: Props) {
  const [show, setShow] = useState(true);
  const mountedAt = useMemo(() => Date.now(), []);

  // 세션당 1회 옵션
  useEffect(() => {
    if (!onlyFirstVisit) return;
    const seen = sessionStorage.getItem("splash_seen");
    if (seen) setShow(false);
    else sessionStorage.setItem("splash_seen", "1");
  }, [onlyFirstVisit]);

  // 준비 완료 후 일정 시간 보장하고 닫기
  useEffect(() => {
    if (!isReady || !show) return;
    const elapsed = Date.now() - mountedAt;
    const rest = Math.max(minDuration - elapsed, 0);
    const t = setTimeout(() => setShow(false), rest + 150);
    return () => clearTimeout(t);
  }, [isReady, show, minDuration, mountedAt]);

  // 스크롤 잠금
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {/* 자간/스케일 살짝 조정하며 등장 */}
          <motion.div
            initial={{ letterSpacing: "0.35em", scale: 1.04 }}
            animate={{ letterSpacing: "0.02em", scale: 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <AnimatedTitle className="text-3xl md:text-5xl lg:text-6xl font-bold text-black text-center">
              {title}
            </AnimatedTitle>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
