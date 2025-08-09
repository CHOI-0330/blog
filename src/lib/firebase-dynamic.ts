import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAnalytics, Analytics } from "firebase/analytics";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;
let analytics: Analytics | null = null;

// 동적으로 Firebase 설정을 가져와서 앱 초기화
export async function initializeFirebaseDynamic(): Promise<{
  app: FirebaseApp;
  db: Firestore;
  auth: Auth;
  storage: FirebaseStorage;
  analytics: Analytics | null;
}> {
  try {
    // API에서 설정 가져오기
    const response = await fetch("/api/firebase-config/public");
    if (!response.ok) {
      throw new Error("Failed to fetch Firebase config");
    }

    const config: FirebaseConfig = await response.json();

    // 필수 설정 확인
    if (!config.apiKey || !config.authDomain || !config.projectId) {
      throw new Error("Invalid Firebase configuration");
    }

    // 앱이 이미 초기화되어 있다면 제거
    if (app) {
      // Firebase 앱을 완전히 제거하는 것은 복잡하므로
      // 새로운 앱으로 교체
      app = null;
      db = null;
      auth = null;
      storage = null;
      analytics = null;
    }

    // 새 앱 초기화
    app = initializeApp(config, "dynamic-app");
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);

    // Analytics는 클라이언트 사이드에서만 초기화
    if (typeof window !== "undefined") {
      try {
        analytics = getAnalytics(app);
      } catch (analyticsError) {
        console.warn("Analytics 초기화 실패:", analyticsError);
        analytics = null;
      }
    }

    return { app, db, auth, storage, analytics };
  } catch (error) {
    console.error("동적 Firebase 초기화 실패:", error);

    // 에러 발생 시 기본 설정으로 fallback
    const fallbackConfig: FirebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
      messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
    };

    if (!fallbackConfig.apiKey) {
      throw new Error("Firebase configuration not available");
    }

    app = initializeApp(fallbackConfig, "fallback-app");
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);

    if (typeof window !== "undefined") {
      try {
        analytics = getAnalytics(app);
      } catch (analyticsError) {
        analytics = null;
      }
    }

    return { app, db, auth, storage, analytics };
  }
}

// 현재 초기화된 Firebase 인스턴스들 반환
export function getFirebaseInstances() {
  if (!app || !db || !auth || !storage) {
    throw new Error(
      "Firebase not initialized. Call initializeFirebaseDynamic() first."
    );
  }

  return {
    app,
    db,
    auth,
    storage,
    analytics,
  };
}

// Firebase 앱 재초기화 (설정 변경 후 사용)
export async function reinitializeFirebase(): Promise<void> {
  await initializeFirebaseDynamic();
}

// 기본 export
export default {
  initializeFirebaseDynamic,
  getFirebaseInstances,
  reinitializeFirebase,
};
