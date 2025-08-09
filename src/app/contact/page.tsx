"use client";

import Link from "next/link";
import { useState } from "react";
import { contactService } from "@/lib/firestore";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Firestore에 데이터 저장
      await contactService.submitContactForm(formData);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("폼 제출 오류:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                ポートフォリオブログ
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                ホーム
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">
                自己紹介
              </Link>
              <Link
                href="/projects"
                className="text-gray-700 hover:text-gray-900"
              >
                プロジェクト
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-gray-900">
                ブログ
              </Link>
              <Link href="/contact" className="text-blue-600 font-semibold">
                お問い合わせ
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              お問い合わせ
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              新しい機会やプロジェクトについてお話ししましょう
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                メッセージを送る
              </h2>

              {/* Submit Status Messages */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  メッセージが正常に送信されました！できるだけ早くご返信いたします。
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  メッセージの送信に失敗しました。もう一度お試しください。
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    お名前
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="山田太郎"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    件名
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="プロジェクトについて"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    メッセージ
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="メッセージを入力してください..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "送信中..." : "メッセージを送る"}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                連絡先情報
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl">📧</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      メール
                    </h3>
                    <p className="text-gray-600">choi.su000330@gmail.com</p>
                    <p className="text-gray-500 text-sm">
                      通常24時間以内に返信いたします
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xl">📱</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      電話
                    </h3>
                    <p className="text-gray-600">+82-10-1234-5678</p>
                    <p className="text-gray-500 text-sm">
                      平日 9:00-18:00 (KST)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-xl">📍</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      所在地
                    </h3>
                    <p className="text-gray-600">
                      ソウル特別市江南区
                      <br />
                      大韓民国
                    </p>
                    <p className="text-gray-500 text-sm">リモートワーク可能</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 text-xl">🌐</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      ソーシャルメディア
                    </h3>
                    <div className="space-y-2">
                      <a
                        href="https://github.com/username"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800"
                      >
                        GitHub
                      </a>
                      <a
                        href="https://linkedin.com/in/username"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="https://twitter.com/username"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800"
                      >
                        Twitter
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              よくある質問
            </h2>
            <p className="text-lg text-gray-600">よくいただく質問と回答</p>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                プロジェクトの依頼はどのような形式で受け付けていますか？
              </h3>
              <p className="text-gray-600">
                フリーランスとして、リモートワークでのプロジェクトを主に受け付けています。
                お気軽にメールでご相談ください。
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                技術的な相談にも対応していますか？
              </h3>
              <p className="text-gray-600">
                はい、技術的な相談やアドバイスも喜んでお受けします。特にReact、
                Next.js、Node.jsに関する相談を多く受けています。
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                料金体系について教えてください
              </h3>
              <p className="text-gray-600">
                プロジェクトの規模や内容によって料金は変動します。詳細については、
                お問い合わせいただいた際にご相談させていただきます。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
