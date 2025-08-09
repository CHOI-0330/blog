import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
  updatedAt: Date;
  updatedBy: string;
}

const CONFIG_COLLECTION = "firebase_configs";
const ACTIVE_CONFIG_DOC = "active";

// Firebase 설정을 Firestore에 저장
export async function saveFirebaseConfig(
  config: Omit<FirebaseConfig, "updatedAt" | "updatedBy">,
  userId: string
) {
  try {
    const configWithMetadata: FirebaseConfig = {
      ...config,
      updatedAt: new Date(),
      updatedBy: userId,
    };

    // 활성 설정으로 저장
    await setDoc(
      doc(db, CONFIG_COLLECTION, ACTIVE_CONFIG_DOC),
      configWithMetadata
    );

    // 히스토리로도 저장 (날짜별)
    const historyDoc = `${ACTIVE_CONFIG_DOC}_${
      new Date().toISOString().split("T")[0]
    }`;
    await setDoc(doc(db, CONFIG_COLLECTION, historyDoc), configWithMetadata);

    return { success: true, config: configWithMetadata };
  } catch (error) {
    console.error("Firebase 설정 저장 실패:", error);
    throw new Error("설정 저장에 실패했습니다.");
  }
}

// 현재 활성 Firebase 설정 가져오기
export async function getActiveFirebaseConfig(): Promise<FirebaseConfig | null> {
  try {
    const docRef = doc(db, CONFIG_COLLECTION, ACTIVE_CONFIG_DOC);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        updatedAt: data.updatedAt.toDate(),
      } as FirebaseConfig;
    }

    return null;
  } catch (error) {
    console.error("Firebase 설정 조회 실패:", error);
    return null;
  }
}

// 설정 변경 히스토리 가져오기 (최근 10개)
export async function getFirebaseConfigHistory(): Promise<FirebaseConfig[]> {
  try {
    const q = query(
      collection(db, CONFIG_COLLECTION),
      orderBy("updatedAt", "desc"),
      limit(10)
    );

    const querySnapshot = await getDocs(q);
    const configs: FirebaseConfig[] = [];

    querySnapshot.forEach((doc) => {
      if (doc.id !== ACTIVE_CONFIG_DOC) {
        const data = doc.data();
        configs.push({
          ...data,
          updatedAt: data.updatedAt.toDate(),
        } as FirebaseConfig);
      }
    });

    return configs;
  } catch (error) {
    console.error("설정 히스토리 조회 실패:", error);
    return [];
  }
}

// 환경 변수에서 기본 설정 가져오기 (fallback용)
export function getDefaultFirebaseConfig(): FirebaseConfig {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
    updatedAt: new Date(),
    updatedBy: "system",
  };
}
