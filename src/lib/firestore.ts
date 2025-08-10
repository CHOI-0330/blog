import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  tags: string[];
  readTime: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface SiteConfig {
  id?: string;
  siteTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  featuresTitle: string;
  featuresDescription: string;
  aboutCardTitle: string;
  aboutCardDescription: string;
  blogCardTitle: string;
  blogCardDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  footerDescription: string;
  techStack: string[];
  contactInfo: {
    email: string;
    github: string;
    linkedin: string;
  };
  updatedAt?: any;
}

export interface ContactForm {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: any;
  status?: "new" | "read" | "replied";
}

// 블로그 포스트 관련 함수들
export const blogService = {
  // 모든 블로그 포스트 가져오기
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const q = query(
        collection(db, "blogPosts"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BlogPost[];
    } catch (error) {
      console.error("블로그 포스트 가져오기 오류:", error);
      throw error;
    }
  },

  // 특정 블로그 포스트 가져오기
  async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const docRef = doc(db, "blogPosts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as BlogPost;
      } else {
        return null;
      }
    } catch (error) {
      console.error("블로그 포스트 가져오기 오류:", error);
      throw error;
    }
  },

  // 새 블로그 포스트 생성
  async createPost(
    postData: Omit<BlogPost, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, "blogPosts"), {
        ...postData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error("블로그 포스트 생성 오류:", error);
      throw error;
    }
  },

  // 블로그 포스트 수정
  async updatePost(id: string, postData: Partial<BlogPost>): Promise<void> {
    try {
      const docRef = doc(db, "blogPosts", id);
      await updateDoc(docRef, {
        ...postData,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("블로그 포스트 수정 오류:", error);
      throw error;
    }
  },

  // 블로그 포스트 삭제
  async deletePost(id: string): Promise<void> {
    try {
      const docRef = doc(db, "blogPosts", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("블로그 포스트 삭제 오류:", error);
      throw error;
    }
  },
};

// 프로젝트 관련 함수들

export const siteConfigService = {
  async getSiteConfig(): Promise<SiteConfig | null> {
    try {
      const docRef = doc(db, "site_config", "main");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        // 기본값과 병합하여 누락된 필드가 있으면 기본값으로 채움
        const defaultConfig = await this.getDefaultSiteConfig();
        const mergedConfig = {
          ...defaultConfig,
          ...data,
          techStack: data.techStack || defaultConfig.techStack,
          contactInfo: {
            ...defaultConfig.contactInfo,
            ...data.contactInfo,
          },
        };
        return { id: docSnap.id, ...mergedConfig } as SiteConfig;
      }
      return null;
    } catch (error) {
      console.error("사이트 설정 가져오기 오류:", error);
      return null;
    }
  },

  async updateSiteConfig(
    config: Omit<SiteConfig, "id" | "updatedAt">
  ): Promise<void> {
    try {
      const docRef = doc(db, "site_config", "main");
      await setDoc(docRef, {
        ...config,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("사이트 설정 업데이트 오류:", error);
      throw error;
    }
  },

  async getDefaultSiteConfig(): Promise<SiteConfig> {
    return {
      siteTitle: "ポートフォリオブログ",
      heroTitle: "就職活動のための\nポートフォリオブログ",
      heroSubtitle: "技術と経験を共有し、未来への一歩を踏み出しましょう",
      heroDescription: "技術と経験を共有し、未来への一歩を踏み出しましょう",
      featuresTitle: "私の強み",
      featuresDescription:
        "技術力と創造性を組み合わせたソリューションを提供します",
      aboutCardTitle: "自己紹介",
      aboutCardDescription:
        "私の経歴、スキル、そして目標について詳しく紹介します。",
      blogCardTitle: "ブログ",
      blogCardDescription:
        "技術的な学びや経験を共有するブログ記事を書いています。",
      ctaTitle: "一緒に働きませんか？",
      ctaDescription: "新しい機会やプロジェクトについてお話ししましょう",
      footerDescription: "就職活動のためのポートフォリオサイトです。",
      techStack: ["React / Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
      contactInfo: {
        email: "example@email.com",
        github: "github.com/username",
        linkedin: "linkedin.com/in/username",
      },
    };
  },
};

export const contactService = {
  async submitContactForm(
    form: Omit<ContactForm, "id" | "createdAt" | "status">
  ): Promise<void> {
    try {
      const docRef = doc(collection(db, "contact_forms"));
      await setDoc(docRef, {
        ...form,
        createdAt: serverTimestamp(),
        status: "new",
      });
    } catch (error) {
      console.error("연락처 폼 제출 오류:", error);
      throw error;
    }
  },

  async getAllContactForms(): Promise<ContactForm[]> {
    try {
      const q = query(
        collection(db, "contact_forms"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ContactForm[];
    } catch (error) {
      console.error("연락처 폼 조회 오류:", error);
      return [];
    }
  },

  async updateContactStatus(
    id: string,
    status: ContactForm["status"]
  ): Promise<void> {
    try {
      const docRef = doc(db, "contact_forms", id);
      await updateDoc(docRef, { status });
    } catch (error) {
      console.error("연락처 상태 업데이트 오류:", error);
      throw error;
    }
  },

  async deleteContactForm(id: string): Promise<void> {
    try {
      const docRef = doc(db, "contact_forms", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("연락처 폼 삭제 오류:", error);
      throw error;
    }
  },
};
