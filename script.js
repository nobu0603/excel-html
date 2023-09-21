const XLSX = require("xlsx");
const fs = require("fs");

// Excelファイルを読み込む
const workbook = XLSX.readFile("Excelファイルのパス.xlsx");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// 出力ディレクトリを作成（存在しない場合）
if (!fs.existsSync("output")) {
  fs.mkdirSync("output");
}

// 既に処理したIDを保持するセット
const processedIds = new Set();

for (let row = 2; sheet[`A${row}`]; row++) {
  const id = sheet[`A${row}`].v;

  if (processedIds.has(id)) continue; // 既に処理したIDはスキップ

  processedIds.add(id);

  let htmlTemplate = `
        <p>HTML要素はここに記載する。各シートの値は以下のように取り出す。条件分岐は三項演算子で。</p>
        <h3 class="c-title">${sheet[`E${row}`]?.v || ""}</h3>
    `;

  // 出力ディレクトリが存在しなければ作成
  const outputPath = `output/${id}`;
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  // ファイルを指定されたディレクトリ構造に従って保存
  fs.writeFileSync(`${outputPath}/index.html`, htmlTemplate, "utf8");
}

console.log("HTMLファイルの生成が完了しました。");
