# AI English Learning App

このプロジェクトは、Udemyの「AIを活用した英語学習アプリ開発」コースで学んだ内容を基に、AI技術を活用した英語学習アプリケーションです。音声認識、自然言語処理、音声合成などの最新のAI技術を組み合わせて、実践的な英会話学習体験を提供します。

## 🎯 学んだ内容

### AI技術の実装
- **OpenAI Whisper API**: 音声認識による英語の自動文字起こし
- **OpenAI GPT-4o-mini**: 自然な英会話パートナーとしてのAI対話
- **OpenAI TTS API**: AI応答の音声合成による発音学習支援
- **翻訳機能**: GPT-4o-miniを活用した日英・英日翻訳

### 技術スタック
- **バックエンド**: Laravel 11 (PHP 8.2+)
- **フロントエンド**: React 18 + Inertia.js
- **スタイリング**: Tailwind CSS + Flowbite
- **データベース**: MySQL
- **認証**: Laravel Breeze
- **ビルドツール**: Vite

### アーキテクチャ設計
- **MVC パターン**: Laravelの標準的なMVCアーキテクチャ
- **API サービス層**: OpenAI APIとの統合を管理する専用サービス
- **リアルタイム通信**: Inertia.jsによるSPA体験
- **ファイル管理**: 音声ファイルの効率的な保存と配信

## 🚀 セットアップ手順

### 1. 前提条件
- PHP 8.2以上
- Composer
- Node.js 18以上
- npm または yarn

### 2. プロジェクトのクローンとセットアップ
```bash
# リポジトリをクローン
git clone <repository-url>
cd ai-english-app

# PHP依存関係のインストール
composer install

# Node.js依存関係のインストール
npm install
```

### 3. 環境設定
```bash
# 環境設定ファイルのコピー
cp .env.example .env

# アプリケーションキーの生成
php artisan key:generate

# データベースファイルの作成
touch database/database.sqlite
```

### 4. OpenAI API設定
`.env`ファイルにOpenAI APIキーを設定：
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 5. データベースマイグレーション
```bash
# データベースマイグレーションの実行
php artisan migrate

# シーダーの実行（オプション）
php artisan db:seed
```

### 6. ストレージリンクの設定
```bash
# ストレージリンクの作成
php artisan storage:link
```

### 7. 開発サーバーの起動
```bash
# 開発環境の起動（Laravel + Vite + Queue + Logs）
composer run dev

# または個別に起動
php artisan serve
npm run dev
```

## 📱 使い方

### 1. ユーザー登録・ログイン
- アプリケーションにアクセス
- 新規ユーザー登録または既存アカウントでログイン

### 2. 英会話セッションの開始
- **新しい会話**: サイドメニューから「新しい会話」をクリック
- **過去の会話**: サイドメニューから既存の会話を選択

### 3. 音声での英会話
- **録音開始**: 右下のマイクボタンをクリック
- **英語で話す**: マイクに向かって英語で話しかける
- **録音停止**: 再度マイクボタンをクリック
- **AI応答**: 自動的に音声認識→AI応答→音声合成が実行される

### 4. テキストでの会話
- **テキスト入力**: チャットエリアでテキストメッセージを送信
- **AI応答**: GPT-4o-miniが自然な英語で応答

### 5. 翻訳機能
- **翻訳ボタン**: 各メッセージの「翻訳」ボタンをクリック
- **日英翻訳**: 日本語メッセージを英語に翻訳
- **英日翻訳**: 英語メッセージを日本語に翻訳

### 6. 学習記録の確認
- **トップ画面**: 学習進捗と統計情報を確認
- **会話履歴**: 過去の会話内容を振り返り

## 🔧 主要機能

### 音声認識 (Speech-to-Text)
- OpenAI Whisper APIを使用
- リアルタイム音声認識
- 英語音声の高精度文字起こし

### AI対話システム
- GPT-4o-miniによる自然な英会話
- コンテキストを理解した継続的な会話
- 学習者に適した難易度での応答

### 音声合成 (Text-to-Speech)
- OpenAI TTS APIによる高品質音声生成
- AI応答の自動音声再生
- 発音学習の支援

### 翻訳機能
- GPT-4o-miniを活用した高精度翻訳
- 日英・英日の双方向翻訳
- 自然な表現での翻訳

### 学習管理
- 会話履歴の保存
- 学習進捗の可視化
- 個人別学習データの管理

## 📁 プロジェクト構造

```
ai-english-app/
├── app/
│   ├── Http/
│   │   ├── Controllers/     # コントローラー
│   │   ├── Services/        # APIサービス
│   │   └── Requests/        # バリデーション
│   ├── Models/              # データモデル
│   └── Policies/            # 認可ポリシー
├── resources/
│   ├── js/
│   │   ├── Components/      # Reactコンポーネント
│   │   ├── Pages/          # ページコンポーネント
│   │   └── Layouts/        # レイアウト
│   └── css/                # スタイルシート
├── database/
│   ├── migrations/         # データベースマイグレーション
│   └── seeders/           # シーダー
└── storage/
    └── app/public/        # 音声ファイル保存
```

## 🛠️ 開発・デバッグ

### ログの確認
```bash
# リアルタイムログの表示
php artisan pail

# または
tail -f storage/logs/laravel.log
```

### キュー処理
```bash
# キューワーカーの起動
php artisan queue:work
```

### テスト実行
```bash
# Pestテストの実行
./vendor/bin/pest
```

## 🔒 セキュリティ考慮事項

- **API キー管理**: OpenAI APIキーは環境変数で管理
- **ファイルアップロード**: 音声ファイルのサイズ制限（25MB）
- **認証**: Laravel Breezeによる安全な認証システム
- **CSRF保護**: Laravelの標準CSRF保護機能

## 📊 パフォーマンス最適化

- **音声ファイル**: 効率的なファイル保存と配信
- **API呼び出し**: 適切なエラーハンドリングとタイムアウト設定
- **フロントエンド**: Reactの最適化されたレンダリング
- **データベース**: 適切なインデックスとクエリ最適化

## 🚨 トラブルシューティング

### よくある問題

1. **音声認識が動作しない**
   - OpenAI APIキーが正しく設定されているか確認
   - 音声ファイルのサイズが25MB以下か確認

2. **音声再生ができない**
   - ブラウザの音声再生許可設定を確認
   - ストレージリンクが正しく設定されているか確認

3. **翻訳機能が動作しない**
   - OpenAI APIの利用制限に達していないか確認
   - ネットワーク接続を確認

## 📚 学習成果

このコースを通じて以下のスキルを習得しました：

- **AI API統合**: OpenAIの各種APIの実装方法
- **リアルタイム音声処理**: Web Audio APIとMediaRecorderの活用
- **モダンWeb開発**: Laravel + React + Inertia.jsの組み合わせ
- **UX設計**: 直感的な音声インターフェースの設計
- **エラーハンドリング**: 堅牢なエラー処理とユーザーフィードバック