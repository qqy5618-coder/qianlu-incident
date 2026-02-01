# 待上传证据文件备忘录

以下文件在网页中被引用，但尚未上传到 Supabase Storage。
上传后请同步修改 `js/evidence-files.js` 中对应条目：
  - `uploaded: false` 改为 `uploaded: true`
  - `storagePath` 填入实际上传后的英文文件名

---

## 超出大小限制（需压缩或拆分后上传）

| 文件 | 原因 | 建议 |
|------|------|------|
| 千寻与westage的共同担保房产证.pdf | 78MB，超出 Supabase 50MB 限制 | 用 PDF 工具拆分为多个 <50MB 的文件后分别上传 |

## 桌面上未找到的文件

| 文件 | 类型 | 建议 storagePath |
|------|------|------------------|
| 西畑诚亮签字《预り证》（保管证） | PDF | `nishihata_custody_receipt.pdf` |
| 湛江仲裁申请书 | PDF | `arbitration_application.pdf` |
| 执行通知 | PDF | `enforcement_notice.pdf` |
| 员昊限制消费令 | PDF | `consumption_restriction_order.pdf` |
| 员昊、邱千依护照出入境记录 | PDF | `passport_entry_exit_records.pdf` |
| 天眼查"查关系"截图 | 图片 | `tianyancha_relationship.png` |
| 20-2 吕替蔡支付律师费/出自仲裁书第19页最后一行.jpg | 图片 | `arbitration_p19_lawyer_fee.jpg` |

## 待补充中文翻译件

以下日语原版文件已上传，但中文翻译件尚未提供。
补充翻译件后上传到 Supabase，并在 `js/evidence-files.js` 对应条目的 `translations.cn` 中设置 `uploaded: true`。

| 日语原版 | 翻译件 storagePath | 状态 |
|----------|-------------------|------|
| 04 千路商事营业执照藤本 | `business_license_certified_cn.pdf` | 待翻译 |
| 10-1 法人指示书（业务指示书） | `corporate_seal_instruction_20191109_cn.pdf` | 待翻译 |
| 11 第一回临时股东大会 | `shareholders_meeting_20191202_cn.pdf` | 待翻译 |
| 千寻千路西田公司藤本（登记证明） | `qianxun_qianlu_nishida_registration_cn.pdf` | 待翻译 |
| 千寻玉出东（不动产登记） | `qianxun_tamade_east_cn.pdf` | 待翻译 |
| 千寻玉出中（不动产登记） | `qianxun_tamade_central_cn.pdf` | 待翻译 |
| 株主名簿-千路（股东名册） | `shareholder_register_cn.pdf` | 待翻译 |

**已有翻译件（无需操作）：**
- 08 绿牌许可证 → `green_license_translation.pdf` (已上传)
- 14 审计报告 → `audit_report_chinese.pdf` (已上传)
- 13 供应商通知书 → `supplier_notice_20191223.pdf` (已上传)

---

## 上传步骤

```bash
# 1. 设置环境变量
source .env
ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaHljY2pxbWxreXZidHdqeWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4Nzk2MDYsImV4cCI6MjA4NTQ1NTYwNn0.HvNOWvcYDQhaoa5uJacE-6ieXOZfcIRV85Vekoaufe8'

# 2. 上传单个文件（以 PDF 为例）
curl -X POST "https://pahyccjqmlkyvbtwjydg.supabase.co/storage/v1/object/media/英文文件名.pdf" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "apikey: $ANON_KEY" \
  -H "Content-Type: application/pdf" \
  -H "x-upsert: true" \
  --data-binary "@/本地文件路径.pdf"

# 3. 验证上传成功（应返回 200）
curl -s -o /dev/null -w "%{http_code}" \
  "https://pahyccjqmlkyvbtwjydg.supabase.co/storage/v1/object/public/media/英文文件名.pdf"
```

## MIME 类型参考

| 文件类型 | Content-Type |
|----------|--------------|
| PDF | `application/pdf` |
| JPG/JPEG | `image/jpeg` |
| PNG | `image/png` |
| MP4 | `video/mp4` |
| XLS | `application/vnd.ms-excel` |
