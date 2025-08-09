import Link from "next/link";

export default function About() {
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
              <Link href="/about" className="text-blue-600 font-semibold">
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
              <Link
                href="/contact"
                className="text-gray-700 hover:text-gray-900"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">自己紹介</h1>
            <p className="text-xl text-gray-600 mb-8">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                私について
              </h2>
              <div className="space-y-4 text-gray-600">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                技術スキル
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
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
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              経験と学歴
            </h2>
            <p className="text-lg text-gray-600">
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
                <h3 className="text-xl font-semibold text-gray-900">
                  コンピュータサイエンス学士
                </h3>
                <p className="text-gray-600">○○大学</p>
                <p className="text-gray-500 text-sm">2020 - 2024</p>
                <p className="text-gray-600 mt-2">
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
                <h3 className="text-xl font-semibold text-gray-900">
                  フルスタック開発者
                </h3>
                <p className="text-gray-600">○○株式会社</p>
                <p className="text-gray-500 text-sm">2024 - 現在</p>
                <p className="text-gray-600 mt-2">
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
                <h3 className="text-xl font-semibold text-gray-900">
                  フリーランス開発者
                </h3>
                <p className="text-gray-600">独立</p>
                <p className="text-gray-500 text-sm">2023 - 現在</p>
                <p className="text-gray-600 mt-2">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              興味・関心
            </h2>
            <p className="text-lg text-gray-600">技術以外の興味や関心事</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">読書</h3>
              <p className="text-gray-600">
                技術書から小説まで、幅広いジャンルの本を読むことが好きです。
                新しい知識を得ることと、物語に没頭することが楽しみです。
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">🎵</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">音楽</h3>
              <p className="text-gray-600">
                様々なジャンルの音楽を聴くことが好きです。
                特に、クラシック音楽とジャズを好んでいます。
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">🏃</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">運動</h3>
              <p className="text-gray-600">
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
