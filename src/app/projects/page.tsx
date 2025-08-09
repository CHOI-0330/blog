import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Eコマースプラットフォーム",
    description:
      "React、Next.js、Node.jsを使用した完全なEコマースソリューション。ユーザー認証、商品管理、決済システムを統合。",
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Stripe"],
    image: "/api/placeholder/400/300",
    github: "https://github.com/username/ecommerce",
    live: "https://ecommerce-demo.com",
    category: "Web Application",
  },
  {
    id: 2,
    title: "タスク管理アプリ",
    description:
      "リアルタイムでタスクを管理できるWebアプリケーション。チーム協力機能とプロジェクト管理機能を備える。",
    technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    image: "/api/placeholder/400/300",
    github: "https://github.com/username/task-manager",
    live: "https://task-manager-demo.com",
    category: "Web Application",
  },
  {
    id: 3,
    title: "モバイルアプリ",
    description:
      "React Nativeを使用したクロスプラットフォームモバイルアプリ。ユーザー体験を重視したデザイン。",
    technologies: ["React Native", "TypeScript", "Redux", "Expo"],
    image: "/api/placeholder/400/300",
    github: "https://github.com/username/mobile-app",
    live: null,
    category: "Mobile Application",
  },
  {
    id: 4,
    title: "API サービス",
    description:
      "RESTful APIとGraphQLを提供するバックエンドサービス。マイクロサービスアーキテクチャを採用。",
    technologies: ["Node.js", "Express", "GraphQL", "MongoDB", "Docker"],
    image: "/api/placeholder/400/300",
    github: "https://github.com/username/api-service",
    live: "https://api-demo.com",
    category: "Backend Service",
  },
  {
    id: 5,
    title: "ポートフォリオサイト",
    description:
      "このポートフォリオサイト自体。Next.jsとTailwind CSSを使用したモダンなデザイン。",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/api/placeholder/400/300",
    github: "https://github.com/username/portfolio",
    live: "https://portfolio-demo.com",
    category: "Portfolio",
  },
  {
    id: 6,
    title: "データ可視化ダッシュボード",
    description:
      "リアルタイムデータを可視化するダッシュボード。チャートとグラフを使用したインタラクティブなUI。",
    technologies: ["React", "D3.js", "Node.js", "Socket.io"],
    image: "/api/placeholder/400/300",
    github: "https://github.com/username/dashboard",
    live: "https://dashboard-demo.com",
    category: "Data Visualization",
  },
];

export default function Projects() {
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
              <Link href="/projects" className="text-blue-600 font-semibold">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              プロジェクト
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              これまでに取り組んだプロジェクトと技術的な成果を紹介します
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-gray-400 text-4xl">📁</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      GitHub →
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        Live Demo →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Summary */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              技術スタック
            </h2>
            <p className="text-lg text-gray-600">
              プロジェクトで使用した主要な技術とツール
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-12 w-12 text-blue-600 mx-auto mb-4 text-4xl">
                🌐
              </div>
              <h3 className="text-lg font-semibold mb-2">フロントエンド</h3>
              <p className="text-gray-600">
                React, Next.js, TypeScript, Tailwind CSS
              </p>
            </div>

            <div className="text-center">
              <div className="h-12 w-12 text-green-600 mx-auto mb-4 text-4xl">
                ⚙️
              </div>
              <h3 className="text-lg font-semibold mb-2">バックエンド</h3>
              <p className="text-gray-600">
                Node.js, Express, PostgreSQL, MongoDB
              </p>
            </div>

            <div className="text-center">
              <div className="h-12 w-12 text-purple-600 mx-auto mb-4 text-4xl">
                📱
              </div>
              <h3 className="text-lg font-semibold mb-2">モバイル</h3>
              <p className="text-gray-600">React Native, Expo, TypeScript</p>
            </div>

            <div className="text-center">
              <div className="h-12 w-12 text-orange-600 mx-auto mb-4 text-4xl">
                🔧
              </div>
              <h3 className="text-lg font-semibold mb-2">その他</h3>
              <p className="text-gray-600">Git, Docker, AWS, CI/CD</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
