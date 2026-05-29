<div align="center">

# 🚀 IT Job Finder — Client

### Nền tảng tuyển dụng IT hiện đại, kết nối ứng viên và nhà tuyển dụng theo thời gian thực

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![SCSS](https://img.shields.io/badge/SCSS-31%25-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[📖 Xem Demo](#-demo) · [⚙️ Cài đặt](#-cài-đặt--chạy-local) · [🗂️ Kiến trúc](#%EF%B8%8F-kiến-trúc-hệ-thống) · [✨ Tính năng](#-tính-năng-chính)

</div>

---

## 📋 Mục lục

- [Giới thiệu dự án](#-giới-thiệu-dự-án)
- [Tính năng chính](#-tính-năng-chính)
- [Tech Stack](#-tech-stack)
- [Kiến trúc hệ thống](#%EF%B8%8F-kiến-trúc-hệ-thống)
- [Sơ đồ tư duy (Mind Map)](#-sơ-đồ-tư-duy-mind-map)
- [Sơ đồ luồng người dùng](#-sơ-đồ-luồng-người-dùng)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Cài đặt & Chạy Local](#-cài-đặt--chạy-local)
- [Biến môi trường](#-biến-môi-trường)
- [Quy trình phát triển (Git Workflow)](#-quy-trình-phát-triển-git-workflow)
- [Liên hệ](#-liên-hệ)

---

## 🎯 Giới thiệu dự án

**IT Job Finder** là một nền tảng tuyển dụng dành riêng cho lĩnh vực công nghệ thông tin, được xây dựng theo mô hình **Full-stack** với:

- **Client** (repo này): React 19 + Firebase + Socket.IO
- **Server**: Node.js / Express (REST API + WebSocket)

Dự án mô phỏng một sản phẩm thực tế với đầy đủ luồng: ứng viên tìm kiếm — nhà tuyển dụng đăng tin — chat trao đổi — dashboard thống kê. Mục tiêu là thể hiện khả năng xây dựng ứng dụng web hoàn chỉnh, có tính mở rộng và trải nghiệm người dùng tốt.

---

## ✨ Tính năng chính

### 👤 Ứng viên (Candidate)

| Tính năng                | Mô tả                                                             |
| ------------------------ | ----------------------------------------------------------------- |
| 🔍 **Tìm kiếm việc làm** | Lọc theo vị trí, kỹ năng, địa điểm, mức lương, hình thức làm việc |
| 📄 **Xem chi tiết job**  | Mô tả công việc với rich text (React Quill), thông tin công ty    |
| 📬 **Ứng tuyển**         | Gửi CV trực tiếp qua nền tảng                                     |
| 💬 **Chat realtime**     | Nhắn tin với nhà tuyển dụng qua Socket.IO                         |
| 🔔 **Thông báo**         | Nhận cập nhật trạng thái ứng tuyển theo thời gian thực            |

### 🏢 Nhà tuyển dụng (Employer)

| Tính năng                  | Mô tả                                                      |
| -------------------------- | ---------------------------------------------------------- |
| 📝 **Đăng tin tuyển dụng** | Tạo JD với rich text editor, gắn tag kỹ năng               |
| 👥 **Quản lý ứng viên**    | Xem danh sách, lọc, đổi trạng thái hồ sơ                   |
| 📊 **Dashboard thống kê**  | Biểu đồ lượt xem, lượt ứng tuyển theo thời gian (Recharts) |
| 💬 **Chat với ứng viên**   | Trao đổi trực tiếp qua hệ thống chat tích hợp              |

### 🔐 Xác thực & Bảo mật

| Tính năng               | Mô tả                                                     |
| ----------------------- | --------------------------------------------------------- |
| 🔑 **Email / Password** | Đăng ký & đăng nhập qua Firebase Authentication           |
| 📱 **OTP Verification** | Xác minh số điện thoại (react-otp-input)                  |
| 🔒 **Protected Routes** | Phân quyền route theo vai trò (ứng viên / nhà tuyển dụng) |

---

## 🛠️ Tech Stack

### Frontend

| Công nghệ                                                        | Version | Mục đích                  |
| ---------------------------------------------------------------- | ------- | ------------------------- |
| [React](https://reactjs.org/)                                    | 19.1.0  | UI Framework              |
| [React Router DOM](https://reactrouter.com/)                     | 6.x     | Client-side routing       |
| [Axios](https://axios-http.com/)                                 | 1.x     | HTTP client gọi API       |
| [Socket.IO Client](https://socket.io/)                           | 4.x     | Chat & thông báo realtime |
| [Firebase](https://firebase.google.com/)                         | 12.x    | Authentication            |
| [Framer Motion](https://www.framer.com/motion/)                  | 12.x    | Animation & transition    |
| [Recharts](https://recharts.org/)                                | 3.x     | Biểu đồ thống kê          |
| [React Quill New](https://github.com/VaguelySerious/react-quill) | 3.x     | Rich text editor          |
| [React Select](https://react-select.com/)                        | 5.x     | Dropdown nâng cao         |
| [React Icons](https://react-icons.github.io/)                    | 5.x     | Icon library              |
| [Sonner](https://sonner.emilkowal.ski/)                          | 2.x     | Toast notifications       |
| [date-fns](https://date-fns.org/)                                | 4.x     | Xử lý ngày tháng          |
| [clsx](https://github.com/lukeed/clsx)                           | 2.x     | Conditional className     |
| [SCSS](https://sass-lang.com/)                                   | —       | Styling (31% codebase)    |

### Dev Tools

| Công nghệ                                                                | Mục đích                              |
| ------------------------------------------------------------------------ | ------------------------------------- |
| [CRACO](https://craco.js.org/)                                           | Override CRA config (path alias)      |
| [ESLint + Prettier](https://eslint.org/)                                 | Code linting & formatting             |
| [Babel + Module Resolver](https://babeljs.io/)                           | Absolute imports (`@/components/...`) |
| [Source Map Explorer](https://www.npmjs.com/package/source-map-explorer) | Bundle size analysis                  |

### Backend (Repo riêng)

| Công nghệ               | Mục đích                     |
| ----------------------- | ---------------------------- |
| Node.js / Express       | REST API server              |
| Socket.IO Server        | WebSocket cho chat realtime  |
| Proxy: `localhost:5000` | Dev proxy qua `package.json` |

---

## 🗂️ Kiến trúc hệ thống

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React 19)                        │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Pages   │  │Components│  │  Hooks   │  │   Services   │  │
│  │ (Routes) │→ │   (UI)   │  │(Logic)   │  │  (API/WS)    │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘  │
│         │                                          │           │
│         ↓                                          ↓           │
│  ┌──────────────────────┐           ┌──────────────────────┐  │
│  │   React Router DOM   │           │    Axios HTTP Client  │  │
│  │   (Protected Routes) │           │    Socket.IO Client   │  │
│  └──────────────────────┘           └──────────────────────┘  │
└────────────────────────────┬────────────────────┬──────────────┘
                             │ REST API            │ WebSocket
                             ↓                    ↓
              ┌──────────────────────────────────────────┐
              │          SERVER (Node.js / Express)       │
              │                                          │
              │   Express Router → Controllers → Models  │
              │   Socket.IO Server (chat, notification)  │
              └──────────────────────────────────────────┘
                             │
              ┌──────────────┴───────────────┐
              │                              │
              ↓                              ↓
      ┌──────────────┐              ┌──────────────┐
      │   Database   │              │   Firebase   │
      │  (MongoDB)   │              │    (Auth)    │
      └──────────────┘              └──────────────┘
```

---

## 🧠 Sơ đồ tư duy (Mind Map)

```
IT Job Finder
│
├── 👤 Người dùng
│   ├── Ứng viên (Candidate)
│   │   ├── Tìm kiếm & lọc việc làm
│   │   ├── Xem chi tiết job
│   │   ├── Ứng tuyển
│   │   └── Chat với nhà tuyển dụng
│   │
│   └── Nhà tuyển dụng (Employer)
│       ├── Đăng tin tuyển dụng
│       ├── Quản lý hồ sơ ứng viên
│       ├── Dashboard thống kê
│       └── Chat với ứng viên
│
├── 🔐 Xác thực
│   ├── Firebase Authentication
│   │   ├── Đăng ký / Đăng nhập
│   │   └── OTP Verification
│   └── Protected Routes (phân quyền)
│
├── 💬 Realtime
│   ├── Socket.IO
│   │   ├── Chat trực tiếp
│   │   └── Thông báo realtime
│   └── Sonner Toast Notifications
│
├── 📊 Data & UI
│   ├── Recharts (biểu đồ thống kê)
│   ├── React Quill (rich text editor)
│   ├── React Select (dropdown lọc)
│   └── Framer Motion (animation)
│
├── 🏗️ Kiến trúc
│   ├── React 19 + React Router 6
│   ├── Axios (REST API)
│   ├── SCSS Modules (styling)
│   └── CRACO + Babel (path alias)
│
└── 🛠️ Dev Tools
    ├── ESLint + Prettier
    ├── Source Map Explorer
    └── Git Workflow (feature branches)
```

---

## 🔄 Sơ đồ luồng người dùng

### Luồng Ứng viên

```
[Truy cập trang chủ]
        │
        ├─── Chưa đăng nhập ──→ [Xem danh sách job] ──→ [Click "Ứng tuyển"]
        │                                                         │
        │                                               [Redirect đến Login]
        │                                                         │
        └─── Đã đăng nhập ──→ [Tìm kiếm / Lọc job]             │
                │                       │                        │
                │               [Xem chi tiết job]◄─────────────┘
                │                       │
                │               [Ứng tuyển / Chat]
                │                       │
                └──────────────→ [Nhận thông báo realtime]
```

### Luồng Nhà tuyển dụng

```
[Đăng nhập với vai trò Employer]
        │
        ↓
[Dashboard tổng quan]
        │
        ├── [Đăng tin tuyển dụng]
        │        │
        │        └── Nhập tiêu đề → Mô tả (rich text) → Kỹ năng → Publish
        │
        ├── [Quản lý ứng viên]
        │        │
        │        └── Xem hồ sơ → Duyệt / Từ chối → Chat
        │
        └── [Thống kê]
                 │
                 └── Biểu đồ lượt xem / ứng tuyển theo ngày/tuần/tháng
```

---

## 📁 Cấu trúc thư mục

```
it-job-finder-client/
│
├── public/                     # Static assets
│
├── src/
│   ├── assets/                 # Hình ảnh, icon tĩnh
│   │
│   ├── components/             # UI components tái sử dụng
│   │   ├── common/             # Button, Input, Modal, Toast...
│   │   ├── layout/             # Header, Footer, Sidebar
│   │   └── features/           # Components theo tính năng
│   │       ├── job/            # JobCard, JobFilter, JobDetail
│   │       ├── chat/           # ChatBox, MessageList, ChatInput
│   │       ├── auth/           # LoginForm, RegisterForm, OTPInput
│   │       └── dashboard/      # Charts, StatsCard
│   │
│   ├── pages/                  # Route-level components
│   │   ├── HomePage/
│   │   ├── JobDetailPage/
│   │   ├── SearchPage/
│   │   ├── ChatPage/
│   │   ├── employer/
│   │   │   ├── DashboardPage/
│   │   │   ├── PostJobPage/
│   │   │   └── ManageCandidatesPage/
│   │   └── auth/
│   │       ├── LoginPage/
│   │       └── RegisterPage/
│   │
│   ├── hooks/                  # Custom React Hooks
│   │   ├── useAuth.js          # Firebase auth state
│   │   ├── useSocket.js        # Socket.IO connection
│   │   ├── useJobFilter.js     # Bộ lọc tìm kiếm
│   │   └── useDebounce.js      # Debounce cho search input
│   │
│   ├── services/               # API calls & business logic
│   │   ├── api/
│   │   │   ├── jobService.js   # CRUD việc làm
│   │   │   ├── authService.js  # Đăng nhập / đăng ký
│   │   │   ├── chatService.js  # Lịch sử chat
│   │   │   └── userService.js  # Thông tin người dùng
│   │   └── socket/
│   │       └── socketClient.js # Khởi tạo Socket.IO connection
│   │
│   ├── context/                # React Context (global state)
│   │   ├── AuthContext.jsx     # Thông tin user đăng nhập
│   │   └── SocketContext.jsx   # Socket instance global
│   │
│   ├── routes/                 # Cấu hình routing
│   │   ├── AppRouter.jsx       # Router chính
│   │   └── ProtectedRoute.jsx  # HOC bảo vệ route
│   │
│   ├── styles/                 # SCSS global & variables
│   │   ├── _variables.scss     # Color, spacing, breakpoints
│   │   ├── _mixins.scss        # SCSS mixins
│   │   └── global.scss         # Reset & base styles
│   │
│   ├── utils/                  # Helper functions
│   │   ├── formatDate.js       # date-fns wrappers
│   │   ├── formatSalary.js     # Định dạng lương
│   │   └── validators.js       # Form validation
│   │
│   ├── constants/              # Hằng số toàn dự án
│   │   ├── jobCategories.js    # Danh mục ngành nghề IT
│   │   └── skillTags.js        # Danh sách kỹ năng
│   │
│   └── App.jsx                 # Root component
│
├── .eslintrc.json              # ESLint config
├── .prettierrc                 # Prettier config
├── babel.config.js             # Babel + path alias
├── craco.config.js             # CRA override config
├── jsconfig.json               # Path alias cho VSCode
└── package.json
```

> ⚠️ Cấu trúc trên là cấu trúc **đề xuất chuẩn hóa** dựa trên tech stack và tính năng của dự án. Cấu trúc thực tế trong code có thể khác nhau.

---

## ⚙️ Cài đặt & Chạy Local

### Yêu cầu hệ thống

| Công cụ | Phiên bản tối thiểu |
| ------- | ------------------- |
| Node.js | >= 18.x             |
| npm     | >= 9.x              |
| Git     | Bất kỳ              |

### Bước 1 — Clone repo

```bash
git clone https://github.com/gnudevx/it-job-finder-client.git
cd it-job-finder-client
```

### Bước 2 — Cài đặt dependencies

```bash
npm install
```

### Bước 3 — Cấu hình biến môi trường

```bash
cp .env.example .env
# Mở .env và điền các giá trị (xem phần bên dưới)
```

### Bước 4 — Chạy development server

```bash
npm start
# App chạy tại http://localhost:3000
# API proxy → http://localhost:5000 (backend cần chạy song song)
```

### Bước 5 — Build production

```bash
npm run build
# Output tại /build
```

### Các lệnh khác

```bash
npm test              # Chạy test
npm run format        # Format code với Prettier
npm run analyze       # Phân tích bundle size
```

---

## 🔐 Biến môi trường

Tạo file `.env` tại root với nội dung:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Backend API
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

> ⚠️ **Không commit file `.env` lên GitHub.** File `.gitignore` đã loại trừ nó.

---

## 🌿 Quy trình phát triển (Git Workflow)

Dự án theo quy trình **Feature Branch Workflow**:

```
main (production)
  └── develop (staging)
        ├── feature/job-search-filter
        ├── feature/realtime-chat
        ├── feature/employer-dashboard
        └── fix/auth-token-refresh
```

### Quy ước đặt tên branch

| Loại          | Pattern          | Ví dụ                   |
| ------------- | ---------------- | ----------------------- |
| Tính năng mới | `feature/<tên>`  | `feature/job-filter`    |
| Sửa bug       | `fix/<tên>`      | `fix/socket-disconnect` |
| Cải thiện     | `refactor/<tên>` | `refactor/auth-hook`    |
| Hotfix        | `hotfix/<tên>`   | `hotfix/login-crash`    |

### Quy ước commit message

Theo chuẩn [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: thêm tính năng lọc việc làm theo mức lương
fix: sửa lỗi socket disconnect khi reload trang
refactor: tách logic auth thành custom hook
style: format lại CSS cho JobCard component
docs: cập nhật README hướng dẫn cài đặt
```

### Quy trình tạo Pull Request

```
1. git checkout develop
2. git checkout -b feature/ten-tinh-nang
3. # ... code ...
4. git add . && git commit -m "feat: mô tả ngắn gọn"
5. git push origin feature/ten-tinh-nang
6. Tạo Pull Request → develop
7. Review → Merge
```

---

## 🔗 Liên kết liên quan

- 🖥️ **Backend Repo**: _(Thêm link repo backend tại đây)_
- 🌐 **Live Demo**: _(Thêm link deploy tại đây — Vercel / Netlify / Firebase Hosting)_
- 📐 **Figma Design**: _(Thêm link design tại đây nếu có)_

---

## 👨‍💻 Tác giả

**gnudevx**

[![GitHub](https://img.shields.io/badge/GitHub-gnudevx-181717?style=flat&logo=github)](https://github.com/gnudevx)

> Dự án được phát triển nhằm mục đích học tập và thể hiện năng lực kỹ thuật trong lĩnh vực phát triển web Full-stack với React ecosystem.

---

<div align="center">

**⭐ Nếu dự án này hữu ích, hãy để lại một Star để ủng hộ nhé!**

</div>
