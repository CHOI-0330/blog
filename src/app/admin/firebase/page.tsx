"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

interface ConfigHistory {
  id: string;
  updatedAt: Date;
  updatedBy: string;
  config: FirebaseConfig;
}

export default function FirebaseConfigPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [config, setConfig] = useState<FirebaseConfig>({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );
  const [configHistory, setConfigHistory] = useState<ConfigHistory[]>([]);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || (session.user as any).role !== "admin") {
      router.push("/login");
      return;
    }

    // API에서 현재 설정 로드
    const loadConfig = async () => {
      try {
        const response = await fetch("/api/firebase-config");
        if (response.ok) {
          const currentConfig = await response.json();
          setConfig(currentConfig);
          setLastSaved(
            currentConfig.updatedAt ? new Date(currentConfig.updatedAt) : null
          );
        }
      } catch (error) {
        console.error("설정 로드 실패:", error);
        setMessage("설정을 불러오는데 실패했습니다.");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

    // 설정 히스토리 로드
    const loadHistory = async () => {
      try {
        const response = await fetch("/api/firebase-config?history=true");
        if (response.ok) {
          const history = await response.json();
          setConfigHistory(history);
        }
      } catch (error) {
        console.error("히스토리 로드 실패:", error);
      }
    };

    loadConfig();
    loadHistory();
  }, [session, status, router]);

  const handleInputChange = (field: keyof FirebaseConfig, value: string) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/firebase-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("✅ Firebase 설정이 성공적으로 Firestore에 저장되었습니다!");
        setMessageType("success");
        setLastSaved(new Date());

        // 히스토리 새로고침
        const historyResponse = await fetch(
          "/api/firebase-config?history=true"
        );
        if (historyResponse.ok) {
          const history = await historyResponse.json();
          setConfigHistory(history);
        }
      } else {
        const error = await response.json();
        setMessage(`❌ 설정 저장 실패: ${error.error}`);
        setMessageType("error");
      }

      // 5초 후 메시지 제거
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error("설정 저장 오류:", error);
      setMessage(
        "❌ 설정 저장 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요."
      );
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    try {
      setMessage("🔍 Firebase 연결을 테스트 중입니다...");
      setMessageType("info");

      // Firebase 앱 초기화 테스트
      const { initializeApp } = await import("firebase/app");
      const { getFirestore, collection, getDocs } = await import(
        "firebase/firestore"
      );

      // 임시 앱으로 연결 테스트
      const testApp = initializeApp(config, "test-app");
      const testDb = getFirestore(testApp);

      // 간단한 쿼리 테스트 (에러가 발생하지 않으면 연결 성공)
      await getDocs(collection(testDb, "_test"));

      setMessage("✅ Firebase 연결이 성공적으로 확인되었습니다!");
      setMessageType("success");
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error("Firebase 연결 테스트 실패:", error);
      setMessage(
        "❌ Firebase 연결 테스트에 실패했습니다. 설정을 확인해주세요."
      );
      setMessageType("error");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!session || (session.user as any).role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-500 hover:text-gray-700">
                ← 뒤로가기
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Firebase 설정</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{session.user.name}님</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Firebase 프로젝트 설정
            </h2>
            <p className="text-gray-600">
              Firebase 프로젝트의 설정 정보를 관리합니다. 저장 버튼을 누르면
              Firestore 데이터베이스에 저장됩니다.
            </p>
            {lastSaved && (
              <p className="text-sm text-blue-600 mt-2">
                📅 마지막 저장: {formatDate(lastSaved)}
              </p>
            )}
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                messageType === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : messageType === "error"
                  ? "bg-red-100 text-red-800 border border-red-200"
                  : "bg-blue-100 text-blue-800 border border-blue-200"
              }`}
            >
              {message}
            </div>
          )}

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="text"
                  value={config.apiKey}
                  onChange={(e) => handleInputChange("apiKey", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="AIzaSy..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auth Domain
                </label>
                <input
                  type="text"
                  value={config.authDomain}
                  onChange={(e) =>
                    handleInputChange("authDomain", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="project.firebaseapp.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project ID
                </label>
                <input
                  type="text"
                  value={config.projectId}
                  onChange={(e) =>
                    handleInputChange("projectId", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="project-id"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Storage Bucket
                </label>
                <input
                  type="text"
                  value={config.storageBucket}
                  onChange={(e) =>
                    handleInputChange("storageBucket", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="project.appspot.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Messaging Sender ID
                </label>
                <input
                  type="text"
                  value={config.messagingSenderId}
                  onChange={(e) =>
                    handleInputChange("messagingSenderId", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  App ID
                </label>
                <input
                  type="text"
                  value={config.appId}
                  onChange={(e) => handleInputChange("appId", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1:123456789:web:abc123"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Measurement ID (Analytics)
                </label>
                <input
                  type="text"
                  value={config.measurementId}
                  onChange={(e) =>
                    handleInputChange("measurementId", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Firestore에 저장 중...</span>
                  </>
                ) : (
                  <>
                    <span>💾</span>
                    <span>Firestore에 저장</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleTestConnection}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                🔍 연결 테스트
              </button>
            </div>
          </form>
        </div>

        {/* Configuration Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📋 설정 정보
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              • <strong>저장 버튼을 누르면</strong> 설정이 Firestore
              데이터베이스에 저장됩니다.
            </p>
            <p>• API Key와 App ID는 Firebase 콘솔에서 확인할 수 있습니다.</p>
            <p>
              • Auth Domain은 보통{" "}
              <code className="bg-blue-100 px-1 rounded">
                project-id.firebaseapp.com
              </code>{" "}
              형식입니다.
            </p>
            <p>
              • Storage Bucket은{" "}
              <code className="bg-blue-100 px-1 rounded">
                project-id.appspot.com
              </code>{" "}
              형식입니다.
            </p>
            <p>• Measurement ID는 Firebase Analytics를 사용할 때 필요합니다.</p>
          </div>
        </div>

        {/* 설정 히스토리 */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📚 설정 변경 히스토리
          </h3>
          {configHistory.length > 0 ? (
            <div className="space-y-3">
              {configHistory.map((history, index) => (
                <div
                  key={history.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      설정 #{configHistory.length - index}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(history.updatedAt)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    수정자: {history.updatedBy}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    <div>
                      <strong>Project ID:</strong> {history.config.projectId}
                    </div>
                    <div>
                      <strong>Auth Domain:</strong> {history.config.authDomain}
                    </div>
                    <div>
                      <strong>Storage:</strong> {history.config.storageBucket}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              <p>• 아직 설정 변경 히스토리가 없습니다.</p>
              <p>• 설정을 저장하면 자동으로 히스토리가 생성됩니다.</p>
              <p>• 모든 설정은 Firestore에 안전하게 보관됩니다.</p>
            </div>
          )}
        </div>

        {/* Firestore 저장 정보 */}
        <div className="mt-8 bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-3">
            🗄️ Firestore 저장 정보
          </h3>
          <div className="space-y-2 text-sm text-green-800">
            <p>
              • <strong>컬렉션:</strong>{" "}
              <code className="bg-green-100 px-1 rounded">
                firebase_configs
              </code>
            </p>
            <p>
              • <strong>활성 설정 문서:</strong>{" "}
              <code className="bg-green-100 px-1 rounded">active</code>
            </p>
            <p>
              • <strong>히스토리 문서:</strong>{" "}
              <code className="bg-green-100 px-1 rounded">
                active_YYYY-MM-DD
              </code>
            </p>
            <p>• 설정을 저장할 때마다 자동으로 히스토리가 생성됩니다.</p>
            <p>• 블로그에서 실시간으로 업데이트된 설정을 사용합니다.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
