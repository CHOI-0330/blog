import SiteHeader from "@/components/SiteHeader";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black mb-6">自己紹介</h1>
            <p className="text-xl text-black/70 mb-8">
              フルスタック開発者として、技術と創造性を組み合わせたソリューションを提供しています
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Personal Info */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-6">
                私について
              </h2>
              <div className="space-y-4 text-black/70">
                <p>
                  私は情熱的なフルスタック開発者で、最新の技術トレンドに常に注目しながら、
                  ユーザー体験を重視したアプリケーションの開発に取り組んでいます。
                </p>
                <p>
                  大学でコンピュータサイエンスを専攻し、様々なプロジェクトを通じて
                  実践的なスキルを身につけてきました。
                </p>
                <p>
                  現在は、React、Next.js、TypeScriptなどのモダンな技術スタックを使用して、
                  スケーラブルで保守性の高いアプリケーションの開発に従事しています。
                </p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-6">
                技術スキル
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    フロントエンド
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "Next.js",
                      "TypeScript",
                      "Tailwind CSS",
                      "JavaScript",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    バックエンド
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Node.js",
                      "Express",
                      "PostgreSQL",
                      "MongoDB",
                      "GraphQL",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    その他
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Git", "Docker", "AWS", "CI/CD", "REST API"].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              経験と学歴
            </h2>
            <p className="text-lg text-black/70">
              これまでの経験と学歴について
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xl">🎓</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black">
                  コンピュータサイエンス学士
                </h3>
                <p className="text-black/70">○○大学</p>
                <p className="text-black/60 text-sm">2020 - 2024</p>
                <p className="text-black/70 mt-2">
                  ソフトウェアエンジニアリング、データ構造、アルゴリズム、データベースシステムなどを学びました。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xl">💼</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black">
                  フルスタック開発者
                </h3>
                <p className="text-black/70">○○株式会社</p>
                <p className="text-black/60 text-sm">2024 - 現在</p>
                <p className="text-black/70 mt-2">
                  React、Next.js、Node.jsを使用したWebアプリケーションの開発に従事。
                  ユーザー体験の向上とパフォーマンスの最適化に注力しています。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-xl">🚀</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black">
                  フリーランス開発者
                </h3>
                <p className="text-black/70">独立</p>
                <p className="text-black/60 text-sm">2023 - 現在</p>
                <p className="text-black/70 mt-2">
                  様々なクライアントのプロジェクトに携わり、多様な技術スタックと
                  ビジネス要件に対応したソリューションを提供しています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              興味・関心
            </h2>
            <p className="text-lg text-black/70">技術以外の興味や関心事</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">読書</h3>
              <p className="text-black/70">
                技術書から小説まで、幅広いジャンルの本を読むことが好きです。
                新しい知識を得ることと、物語に没頭することが楽しみです。
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">🎵</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">音楽</h3>
              <p className="text-black/70">
                様々なジャンルの音楽を聴くことが好きです。
                特に、クラシック音楽とジャズを好んでいます。
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">🏃</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">運動</h3>
              <p className="text-black/70">
                ランニングとジムでのトレーニングが趣味です。
                健康的な生活を送ることを心がけています。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
