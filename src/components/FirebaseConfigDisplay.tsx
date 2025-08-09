"use client";

import { useEffect, useState } from "react";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export default function FirebaseConfigDisplay() {
  const [config, setConfig] = useState<FirebaseConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/firebase-config/public");

        if (response.ok) {
          const data = await response.json();
          setConfig(data);
          setError(null);
        } else {
          setError("설정을 불러올 수 없습니다.");
        }
      } catch (err) {
        setError("설정 로드 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  if (loading) {
    return (
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-blue-800">Firebase 설정을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-800">오류: {error}</p>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg">
        <p className="text-yellow-800">Firebase 설정이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-green-900 mb-3">
        현재 Firebase 설정
      </h3>
      <div className="space-y-2 text-sm text-green-800">
        <p>
          <strong>Project ID:</strong> {config.projectId}
        </p>
        <p>
          <strong>Auth Domain:</strong> {config.authDomain}
        </p>
        <p>
          <strong>Storage Bucket:</strong> {config.storageBucket}
        </p>
        <p>
          <strong>Analytics:</strong>{" "}
          {config.measurementId ? "활성화" : "비활성화"}
        </p>
        <p className="text-xs mt-3">
          이 설정은 Admin에서 관리되며 실시간으로 업데이트됩니다.
        </p>
      </div>
    </div>
  );
}
