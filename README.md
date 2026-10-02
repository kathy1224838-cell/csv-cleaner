# CSV Cleaner

一个可交付给小客户的 CSV 清理工具：去除空行、清理首尾空格、删除重复行，并跳过列数不一致的坏行。

## 使用

```powershell
node csv-cleaner.js input.csv cleaned.csv
```

## 示例

```csv
name,email
 Alice , alice@example.com
Alice,alice@example.com
Bob,bob@example.com
```

运行后会保留一条 Alice 和一条 Bob。
