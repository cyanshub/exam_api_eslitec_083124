# NodeJs Backend App for React TodoList Project
![導覽圖片](/introduce.png)

## 介紹
+ 此專案使用 NodeJS/Express 來新增一個 TODO 任務項目
+ 每個 TODO 任務項目包含

| Name          | Content   | Remarks        | Time         | Date     | Location    | Creator  | Completed  |
|---------------|-----------|----------------|--------------|----------|-------------|----------|------------|
| 待辦任務名稱   | 內容       | 備註           | 預計時間     | 日期      | 地點        | 創建者    | 是否完成   |



## TEST API routes

| 功能           | 方法  | 路徑                                                                                         |
|----------------|-------|---------------------------------------------------------------------------------------------|
| 取得任務 (Get)  | GET   | https://exam-nodejs-eslitec-083124.onrender.com/api/todos           |
| 新增任務 (Add)  | POST  | https://exam-nodejs-eslitec-083124.onrender.com/api/todos           |
| 編輯任務 (Edit) | PATCH | https://exam-nodejs-eslitec-083124.onrender.com/api/todos/:id       |
| 刪除任務 (Delete) | DELETE | https://exam-nodejs-eslitec-083124.onrender.com/api/todos/:id    |
| 更新完成任務  | PATCH | https://exam-nodejs-eslitec-083124.onrender.com/api/todos/:id/toggleTodoCompleted       |


## 使用 curl 指令工具快速測試後端 API
- 為了方便快速測試後端API, 可以打開 Git Bash 終端機, 輸入以下提供的 curl 指令


### GET api/todos 列出所有 TODO 任務
- 使用以下指令來取得所有 TODO 任務, 並使用 jq 來格式化輸出
```bash
curl --location 'https://exam-nodejs-eslitec-083124.onrender.com/api/todos' | jq
```


### POST api/todos 創建新的 TODO 任務
- 使用以下指令來創建一個新的 TODO 任務
```bash
curl --location 'https://exam-nodejs-eslitec-083124.onrender.com/api/todos' \
--header 'Content-Type: application/json' \
--data '{
"name": "Writing Project",
"content": "Writing Project for FullStack",
"remarks": "Think first",
"time": 4,
"date": "2024-8-31",
"location": "",
"creator": "Chin-yang, Huang"
}'
```


### PATCH api/todos/:id 更新指定的 TODO 任務內容
- 使用以下指令來更新指定 id 的 TODO 任務
- 可先用 GET API 確認並修正以下範例的 id (調整 id = 42 為新的 id)
```bash
curl --location --request PATCH 'https://exam-nodejs-eslitec-083124.onrender.com/api/todos/42' \
--header 'Content-Type: application/json' \
--data '{
"name": "Writing Project",
"content": "FullStack Project using NodeJS, python, and React",
"remarks": "Think first",
"time": 4,
"date": "2024-8-31",
"location": "At home",
"creator": "Chin-yang, Huang"
}'
```

### PATCH api/todos/:id/toggleTodoCompleted 切換指定的 TODO 任務內容的完成狀態
- 使用以下指令來切換指定 id 的 TODO 任務的完成狀態
- 可先用 GET API 確認並修正以下範例的 id (調整 id = 42 為新的 id)
```bash
curl --location --request PATCH 'https://exam-nodejs-eslitec-083124.onrender.com/api/todos/42/toggleTodoCompleted'
```

### DELETE api/todos/:id 刪除指定的 TODO 任務內容
- 使用以下指令來刪除指定 id 的 TODO 任務
- 可先用 GET API 確認並修正以下範例的 id (調整 id = 42 為新的 id)
```bash
curl --location --request DELETE 'https://exam-nodejs-eslitec-083124.onrender.com/api/todos/42'
```



## TEST API documentation
+ 詳細的 API 測試文件可以在以下網址查看：
[TEST API DOC](https://scarlet-page-533.notion.site/1130831-Exam-Todos-Web-APIs-580daf37aa224a19b2d67f373b814eda)

+ 您也可以使用 Postman 工具, 並參考 TEST API documentation 說明，測試本專案的 API 功能


## BONUS
+ 本專案使用 cronjob 每天統計任務的數量並生成報告
+ Report Example:
  + Date: 2024/09/04
  + Tasks: 10
  
+ 可指定在每天凌晨 0 點（UTC+8）, 將報告發送到電子郵件地址 `eslitec.test.app@gmail.com`。
+ 如有需要, 可參考 `.env.example` 文件, 修改任務執行時間, 以及收件人的 email 位置
  + GMAIL_TO = `接收信件的 email 信箱`
  + CRON_EXP = `"0 0 * * *"：每天凌晨 0 點（UTC+8）執行`
  + CRON_EXP = `"0-59/15 9 * * *"：每天早上 9 點（UTC+8）每隔 15 分鐘執行一次`



## 前端網站互動
您可以透過另外由 React 建立的網站來與本專案提供的 API 功能進行互動：
[REACT WEBSITE](https://cyanshub.github.io/exam_react_eslitec_083124/todos)



## 開始使用
+ 請在本機安裝 Node.js 與 npm 套件管理系統
+ 假設使用 Visual Studio Code, 建議先打開編譯器: Bash 指令 `code .`  在 `Terminal` 切換 node 版本
+ 本專案採用 Node.js v14.16.0 進行開發, 請確認版本的一致性: Bash 指令 `node -v, nvm install 14.16.0, nvm use 14.16.0`
+ 複製專案到本機: Bash 指令 `git clone https://github.com/cyanshub/exam_nodejs_eslitec_083124.git`
+ 進入專案資料夾: Bash 指令 `cd exam_nodejs_eslitec_083124`
+ 安裝套件: Bash 指令 `npm install`
+ 確認套件齊全(可參考下方開發工具)
+ 建立 .env 檔案並填入相關資料(可參考 `.env example` 文件): Bash 指令 `touch .env`
+ 設定 MySQL 資料庫: username、password、database 與專案 config/config.json 中的 development 相同
+ 可直接使用遠端資料庫, 或按照以下指令建立資料表; 遠端資料庫連線字串: `mysql://jgadep9sfn7v09ki:fjjqdqknpv3d9syw@qzkp8ry756433yd4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ud7dsi40j73js8nb`

+ 建立資料庫資料表: Bash 指令 `npx sequelize db:migrate`
+ 建立種子資料: Bash 指令 `npx sequelize db:seed:all`
+ 或調整 config/config.json 的 development 設定連接遠端 MySQL 資料庫:
  + username: `jgadep9sfn7v09ki`
  + password: `fjjqdqknpv3d9syw`
  + host: `qzkp8ry756433yd4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com`
  + port: `3306`
  + database: `ud7dsi40j73js8nb`
  + dialect: `mysql`



+ 啟動專案: Bash 指令 `npm run start`; 或使用 nodemon 進行開發, Bash 指令 `npm run dev`
+ 看到以下訊息，可至瀏覽器輸入下列網址開啟 `Todo-list application is listening on: http://localhost:3000`


## 開發工具
### 依賴項目 (Dependencies)
+ cors: 2.8.5
+ dotenv: 10.0.0
+ express: 4.17.1
+ express-handlebars: 5.3.3
+ method-override: 3.0.0
+ moment-timezone: 0.5.45
+ mysql2: 2.3.0
+ node-cron: 3.0.3
+ nodemailer: 6.9.14
+ sequelize: 6.6.5
+ sequelize-cli: 6.2.0

### 開發依賴項目 (Dev Dependencies)
+ eslint: 7.32.0
+ eslint-config-standard: 16.0.3
+ eslint-plugin-import: 2.23.4
+ eslint-plugin-node: 11.1.0
+ eslint-plugin-promise: 5.1.0
+ nodemon: 2.0.12


