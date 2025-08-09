import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebase";

export const storageService = {
  // 이미지 업로드
  async uploadImage(file: File, folder: string = "blog"): Promise<string> {
    try {
      // 파일명 생성 (중복 방지)
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);

      // 파일 업로드
      const snapshot = await uploadBytes(storageRef, file);

      // 다운로드 URL 가져오기
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
      throw new Error("이미지 업로드에 실패했습니다.");
    }
  },

  // 이미지 삭제
  async deleteImage(imageUrl: string): Promise<void> {
    try {
      // URL에서 파일 경로 추출
      const url = new URL(imageUrl);
      const pathSegments = url.pathname.split("/");
      const folder = pathSegments[pathSegments.length - 2];
      const fileName = pathSegments[pathSegments.length - 1];

      const storageRef = ref(storage, `${folder}/${fileName}`);
      await deleteObject(storageRef);
    } catch (error) {
      console.error("이미지 삭제 오류:", error);
      throw new Error("이미지 삭제에 실패했습니다.");
    }
  },

  // 이미지 URL 유효성 검사
  isValidImageUrl(url: string): boolean {
    try {
      new URL(url);
      return url.includes("firebasestorage.googleapis.com");
    } catch {
      return false;
    }
  },
};
