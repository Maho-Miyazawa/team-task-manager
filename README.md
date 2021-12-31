# Team Task Manager :closed_book:

![ライセンスバッジ](https://img.shields.io/badge/license-MIT-green)

チームですっきり進捗管理（カンバン方式）ができるアプリ

  <br>

## デモ

<!-- ![デモ画面](./demo.gif) -->

<br>

## 環境

- Node: 14.18.1
- yarn: 1.22.17（npm: 8.1.0）
- psql (PostgreSQL): 13.3
- Git: 2.32.0
- Auth0 のアカウント必須

<br>

## 使い方

ローカル環境（開発環境）での使用方法

### 1. ターミナルを開き、任意の場所（ファイルを作成する場所）に移動

```bash
# PATHの部分には任意のバス（作成場所）を指定
cd PATH
```

<br>

### 2. GitHub 上から、team-task-manager リポジトリをクローン

```bash
# HTTPSの場合
git clone https://github.com/Maho-Miyazawa/team-task-manager.git

# SSH の場合
git clone git@github.com:Maho-Miyazawa/team-task-manager.git
```

<br>

### 3. クローンした team-task-manager プロジェクト内に移動

```bash
cd team-task-manager
```

<br>

### 4. 必要なパッケージをインストール

```bash
# yarnの場合
yarn install

# npmの場合
npm i
rm yarn.lock  # yarn.lockファイルは削除
```

<br>

### 5. PostgreSqL にデータベース（team_task_manager）を作成

```bash
# PostgreSQLに接続
psql

# team_task_managerデータベースを作成
create database team_task_manager;

# PostgreSQLとの接続を終了
\q
```

<br>

### 6. Auth0（認証機能）の設定

- [Auth0](https://auth0.com/jp)にログインし、新規アプリを作成
  - アプリ名（例: team-task-manager）を設定
  - Single Page Web Applications を選択
- team-task-manager アプリの setting > Application URIs の設定（下記を入力）
  - Allowed Callback URLs
    - http://localhost:3000/signup
  - Allowed Logout URLs
    - http://localhost:3000
  - Allowed Web Origins
    - http://localhost:3000/\*

<br>

### 7. env ファイルの設定

- ファイルの作成

```bash
# .envファイルの作成
touch .env
```

- 作成した.env ファイルに下記を記載

```bash
# USERの部分は自分のPCのユーザー名に変更
# パスワードを設定している場合は、PASSWORDの部分を変更（設定していない場合は、PASSWORDの文字を削除）
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/team_task_manager?schema=public"

# Auth0の設定
# Auth0のドメイン、Auth0のクライアントIDの部分は、自分のAuth0のデータに変更
REACT_APP_AUTH_DOMAIN="Auth0のドメイン"
REACT_APP_AUTH_CLIENT_ID="Auth0のクライアントID"
```

<br>

### 8. マイグレーションを実行（users, teams, tasks, progress, priorities の 5 つのテーブルを作成）

```bash
# yarnの場合
yarn migrate:dev

# npmの場合
npm run migrate:dev
```

<br>

### 9. seed を実行（上記で作成したテーブルにデータを挿入）

```bash
# yarnの場合
yarn seed

# npmの場合
npm run seed
```

<br>

### 10. ローカルサーバーを立ち上げる（ターミナルを 2 つ立ち上げ、下記の 2 つのコマンドをそれぞれ実行）

```bash
# yarnの場合
yarn dev      # serverを起動
yarn react    # Reactを起動

# npmの場合
npm run dev   # serverを起動
npm run react # Reactを起動
```

<br>

## デプロイ

- GitHub 上の自分のローカルリポジトリに、今回作成した team-task-manager リポジトリを追加
- Heroku を立ち上げ、GitHub と連携し、パイプラインを作成
- Resources の Add-ons に、Heroku Postgres を選択
- Setting の Config Vars に、環境変数の設定
  - `PGSSLMODE=no-verify`
  - `REACT_APP_AUTH_CLIENT_ID=Auth0のドメイン(envファイルの設定と同じ)`
  - `REACT_APP_AUTH_DOMAIN=Auth0のクライアントID(envファイルの設定と同じ)`
- Auth0 の Application URIs の設定
  - team-task-manager アプリの setting > Application URIs にカンマ区切りで下記を追加
  - Allowed Callback URLs
    - `デプロイ先のURL/signup`
  - Allowed Logout URLs
    - `デプロイ先のURL`
  - Allowed Web Origins
    - `デプロイ先の URL/*`
- Deploy から、Manual deploy の中の Deploy Branch ボタンをクリック
- デプロイ完了

<br>

## 使用した技術

- [React](https://ja.reactjs.org/) - ユーザインターフェース構築のための JavaScript ライブラリ
- [Node.js](https://nodejs.org/ja/) - Chrome の V8 JavaScript エンジン で動作する JavaScript 環境
- [Express](https://expressjs.com/ja/) - Node.js のための高速で、革新的な、最小限の Web フレームワーク
- [apollo-server-express](https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express) - The Apollo Server package for Express, the most popular Node.js web framework
- [GraphQL](https://graphql.org/) - A query language for your API
- [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
- [PostgreSQL](https://www.postgresql.org/) - The World's Most Advanced Open Source Relational Database
- [MUI](https://mui.com/) - The React UI library you always wanted
- [Auth0](https://auth0.com/jp) - 誰でも簡単に導入できる認証・認可プラットフォーム
- [Heroku](https://jp.heroku.com/) - アプリケーションの開発から実行、運用までのすべてをクラウドで完結できる PaaS（サービスとしてのプラットフォーム）

<br>

## 執筆者

- Maho Miyazawa

<br>

## ライセンス

- This project is licensed under the MIT License - see the LICENSE file for details
