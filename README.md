# 포트폴리오 블로그

Next.js와 Firebase를 사용한 포트폴리오 블로그입니다.

## 기능

- 블로그 포스트 관리
- 프로젝트 포트폴리오
- 연락처 폼 (Firestore + 이메일 전송)
- 관리자 대시보드
- 반응형 디자인

## 설치 및 실행

```bash
npm install
npm run dev
```

## 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

### Gmail 이메일 전송 설정

```bash
GMAIL_USER=choi.su000330@gmail.com
GMAIL_APP_PASSWORD=your_app_password_here
```

**Gmail 앱 비밀번호 생성 방법:**

1. Google 계정 설정 → 보안
2. 2단계 인증 활성화
3. 앱 비밀번호 생성
4. 생성된 16자리 비밀번호를 `GMAIL_APP_PASSWORD`에 설정

### Firebase 설정

```bash
=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

## 연락처 폼 기능

연락처 폼은 다음 두 가지 방식으로 작동합니다:

1. **Firestore 데이터베이스 저장**: 모든 문의사항이 Firebase Firestore에 저장됩니다.
2. **이메일 전송**:
   - `choi.su000330@gmail.com`으로 문의사항 전송
   - 발신자에게 자동 확인 이메일 전송

## 기술 스택

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Email**: Nodemailer (Gmail SMTP)
- **Deployment**: Vercel (권장)

## 라이센스

MIT
