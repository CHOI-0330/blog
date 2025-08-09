"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  live: string | null;
  category: string;
}

export default function ProjectsManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "admin") {
      router.push("/login");
      return;
    }

    // 실제로는 API에서 데이터를 가져와야 합니다
    const mockProjects: Project[] = [
      {
        id: 1,
        title: "Eコマースプラットフォーム",
        description:
          "React、Next.js、Node.jsを使用した完全なEコマースソリューション。",
        technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Stripe"],
        image: "/api/placeholder/400/300",
        github: "https://github.com/username/ecommerce",
        live: "https://ecommerce-demo.com",
        category: "Web Application",
      },
      {
        id: 2,
        title: "タスク管理アプリ",
        description: "リアルタイムでタスクを管理できるWebアプリケーション。",
        technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
        image: "/api/placeholder/400/300",
        github: "https://github.com/username/task-manager",
        live: "https://task-manager-demo.com",
        category: "Web Application",
      },
    ];

    setProjects(mockProjects);
    setLoading(false);
  }, [session, status, router]);

  const handleDelete = async (id: number) => {
    if (confirm("このプロジェクトを削除しますか？")) {
      // 실제로는 API 호출을 해야 합니다
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                ← 管理者パネルに戻る
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                プロジェクト管理
              </h1>
            </div>
            <Link
              href="/admin/projects/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              新しいプロジェクトを追加
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              プロジェクト一覧
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {projects.map((project) => (
              <div key={project.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {project.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {project.category}
                      </span>
                      <div className="flex space-x-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Link
                      href={`/admin/projects/edit/${project.id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      編集
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                    >
                      削除
                    </button>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        ライブ
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">プロジェクトがありません。</p>
              <Link
                href="/admin/projects/new"
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                最初のプロジェクトを追加
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
