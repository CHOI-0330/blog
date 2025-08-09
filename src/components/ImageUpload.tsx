"use client";

import { useState, useRef } from "react";
import { storageService } from "@/lib/storage";

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  currentImage?: string;
}

export default function ImageUpload({
  onImageUpload,
  currentImage,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;

    // 파일 타입 검증
    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 파일 크기 검증 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      // Firebase Storage에 직접 업로드
      const downloadURL = await storageService.uploadImage(file);
      onImageUpload(downloadURL);
      setError("");
    } catch (error) {
      console.error("업로드 오류:", error);
      setError("업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        サムネイル画像
      </label>

      {/* 현재 이미지 표시 */}
      {currentImage && (
        <div className="relative">
          <img
            src={currentImage}
            alt="현재 이미지"
            className="w-full h-48 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={() => onImageUpload("")}
            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
          >
            ✕
          </button>
        </div>
      )}

      {/* 업로드 영역 */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="space-y-2">
          <div className="text-4xl text-gray-400">📷</div>
          <div className="text-sm text-gray-600">
            {uploading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>업로드 중...</span>
              </div>
            ) : (
              <>
                <p>클릭하거나 이미지를 여기에 드래그하세요</p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF (최대 5MB)
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
