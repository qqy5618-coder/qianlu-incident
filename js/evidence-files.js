// ============================================================
// Evidence File Registry - Single Source of Truth
// ============================================================
// To add a new file:
//   1. Upload to Supabase Storage "media" bucket
//   2. Add or update entry here, set uploaded: true
//   3. Verify storagePath matches the exact filename in Supabase
// ============================================================

const EVIDENCE_FILES = {

  // === 01: Stock Transfer Agreement ===
  "01股份转让协议书.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "stock_transfer_agreement.pdf",
    aliases: ["股份转让协议书", "01股份转让协议书"]
  },

  // === 02: Capital Contribution to Tu's Account ===
  "02由于公司当时没有账户 出资都转给了凃云峰账户.JPG": {
    uploaded: true, type: "image",
    storagePath: "capital_contribution_proof.jpg",
    aliases: ["02出资转入凃云峰个人账户", "02出资转入凃云峰账户"]
  },

  // === 04: Business License ===
  "04千路商事营业执照藤本.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "business_license_certified.pdf",
    aliases: ["营业执照藤本", "千路商事营业执照藤本"],
    translations: {
      ja: { storagePath: "business_license_certified.pdf", uploaded: true },
      cn: { storagePath: "business_license_certified_cn.pdf", uploaded: false }
    }
  },

  // === 05: First Loan Agreement ===
  "05-2018年第一次借款协议.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "loan_agreement_2018_first.pdf",
    aliases: ["2018年第一次借款协议", "第一次借款协议"]
  },

  // === 06: Second Loan Agreement ===
  "06-2019年第二次借款协议.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "loan_agreement_2019_second.pdf",
    aliases: ["2019年第二次借款协议", "第二次借款协议"]
  },

  // === 08: Green License ===
  "08-1绿牌许可证.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "green_license.pdf",
    aliases: ["绿牌许可证"],
    translations: {
      ja: { storagePath: "green_license.pdf", uploaded: true },
      cn: { storagePath: "green_license_translation.pdf", uploaded: true }
    }
  },
  "08-2绿牌许可证翻译件.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "green_license_translation.pdf",
    aliases: ["绿牌许可证翻译件"]
  },

  // === 09: Luo Jianfeng Japan Photos ===
  "09罗建峰在日本证明照片/": {
    uploaded: false, type: "folder",
    storagePath: "09罗建峰在日本证明照片/",
    aliases: ["罗建峰在日本证明照片"]
  },
  "09罗建峰在日本证明照片/吕伟麟和蔡启涛及凃云峰在千路公司门口合影，庆祝营运牌照取得.PNG": {
    uploaded: true, type: "image",
    storagePath: "photo_09_company_celebration.png"
  },
  "09罗建峰在日本证明照片/罗建峰与吕伟麟及凃云峰抵达日本后前往大阪城公园拍照留念.PNG": {
    uploaded: true, type: "image",
    storagePath: "photo_09_osaka_castle.png"
  },
  "09罗建峰在日本证明照片/罗建峰在日本时乘坐的车牌为和泉300あ680.PNG": {
    uploaded: true, type: "image",
    storagePath: "photo_09_car_plate.png"
  },

  // === 10: Asset Transfer Documents ===
  "10-1-2019年11月9日取走公章的法人指示书.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "corporate_seal_instruction_20191109.pdf",
    aliases: ["凃云峰签章《业务指示书》"],
    translations: {
      ja: { storagePath: "corporate_seal_instruction_20191109.pdf", uploaded: true },
      cn: { storagePath: "corporate_seal_instruction_20191109_cn.pdf", uploaded: false }
    }
  },
  "10-2名片.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "namecard_20191109.pdf",
    aliases: ["当日现场人名片"]
  },
  "10-2-2019年11月9日当日现场人名片.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "namecard_20191109.pdf",
    aliases: ["10-2-2019年11月9日当日拿走千路商事株式会社全部财务资料及资金的人名片"]
  },

  // === 11: Shareholder Meeting ===
  "11-2019年12月2日第一回临时股东大会.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "shareholders_meeting_20191202.pdf",
    aliases: ["2019年第一次临时股东大会"],
    translations: {
      ja: { storagePath: "shareholders_meeting_20191202.pdf", uploaded: true },
      cn: { storagePath: "shareholders_meeting_20191202_cn.pdf", uploaded: false }
    }
  },
  "千路商事株式会社2019年第一次临时股东大会决议案.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "shareholder_resolution_2019.pdf",
    aliases: ["股东大会决议案"]
  },

  // === 12: Luo's Lawyer Letter ===
  "12-罗建峰2019年12月3日律师函.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "lawyer_letter_luo_20191203.pdf",
    aliases: ["罗建峰2019年12月3日律师函", "12-罗建峰2019年12月3日律师函.JPG"]
  },

  // === 13: Supplier Notification ===
  "13-2019年12月23日发给各供应商的通知书.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "supplier_notice_20191223.pdf",
    aliases: ["2019年12月23日发给各供应商的通知书", "发给各供应商的通知书"],
    translations: {
      ja: { storagePath: "supplier_notice_japanese.pdf", uploaded: true },
      cn: { storagePath: "supplier_notice_20191223.pdf", uploaded: true }
    }
  },
  "お取り業者への通知書.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "supplier_notice_japanese.pdf"
  },
  "通知书.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "notice_chinese.pdf"
  },

  // === 14: Audit Report ===
  "14-1审计报告日文原版.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "audit_report_japanese.pdf",
    translations: {
      ja: { storagePath: "audit_report_japanese.pdf", uploaded: true },
      cn: { storagePath: "audit_report_chinese.pdf", uploaded: true }
    }
  },
  "14-2审计报告中文翻译.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "audit_report_chinese.pdf"
  },

  // === 15: Luo's Second Lawyer Letter ===
  "15-罗建峰2021年10月13日律师函.JPG": {
    uploaded: true, type: "image",
    storagePath: "lawyer_letter_luo_20211013.jpg",
    aliases: ["罗建峰2021年10月13日律师函"]
  },

  // === 16: Debt Transfer Agreement ===
  "16罗建峰与蔡启泳的债权转让协议.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "debt_transfer_agreement.pdf",
    aliases: ["债权转让协议"]
  },

  // === 17: Arbitration Award (split into 5 parts) ===
  "17湛江仲裁裁决书.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "arbitration_award_p1_6.pdf",
    aliases: ["湛江仲裁裁决书", "员昊邱千依孙万鹏裁决书"]
  },
  "17湛江仲裁裁决书_7-12.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "arbitration_award_p7_12.pdf"
  },
  "17湛江仲裁裁决书_13-18.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "arbitration_award_p13_18.pdf"
  },
  "17湛江仲裁裁决书_19-24.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "arbitration_award_p19_24.pdf"
  },
  "17湛江仲裁裁决书_25-32.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "arbitration_award_p25_32.pdf"
  },

  // === 18: Qianxun Company Materials ===
  "18千寻公司资料/": {
    uploaded: false, type: "folder",
    storagePath: "18千寻公司资料/",
    aliases: ["千寻公司资料", "千寻公司资料（含银行存折及注册备案资料）"]
  },
  "18千寻公司资料/18-1几人成立新公司证明存折-千寻公司入股.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "qianxun_bankbook.pdf",
    aliases: ["18-1几人成立新公司证明存折-千寻公司入股"]
  },

  // === 19: Lu Weilin Payment Evidence ===
  "19-1吕伟麟替罗建峰支付的第二次借款凭证出自仲裁申请书.jpg": {
    uploaded: true, type: "image",
    storagePath: "lu_payment_proof_1.jpg",
    aliases: ["吕伟麟代付凭证", "19-1吕伟麟替罗建峰支付借款凭证"]
  },
  "19-2吕伟麟替罗建峰支付的第二次借款凭证声明出自仲裁申请书.jpg": {
    uploaded: true, type: "image",
    storagePath: "lu_payment_proof_2.jpg"
  },

  // === 20: Court Documents ===
  "20-1包头中院无效案文书/": {
    uploaded: false, type: "folder",
    storagePath: "20-1包头中院无效案文书/"
  },
  "20-2包头中院吕替蔡支付律师费/出自仲裁书第19页最后一行.jpg": {
    uploaded: false, type: "image",
    storagePath: "20-2包头中院吕替蔡支付律师费/出自仲裁书第19页最后一行.jpg"
  },
  "20220729 被告证据目录（签字版）.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "defendant_evidence_list_20220729.pdf"
  },

  // === Financial Data ===
  "2019.04千路财务状况表": {
    uploaded: true, type: "other",
    storagePath: "financial_statement_201904.xls",
    aliases: ["2019.04千路财务状况表（内含两表）.xls"]
  },

  // === Lu Pays Cai Lawyer Fee ===
  "2023年3月11日仲裁决定书中吕伟麟替蔡启泳付律师费的证据.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "lawyer_fee_evidence_20230311.pdf"
  },

  // === Company Registration (Fujimoto) ===
  "千寻千路西田公司藤本.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "qianxun_qianlu_nishida_registration.pdf",
    aliases: ["千寻千路西田公司藤本 2.pdf"],
    translations: {
      ja: { storagePath: "qianxun_qianlu_nishida_registration.pdf", uploaded: true },
      cn: { storagePath: "qianxun_qianlu_nishida_registration_cn.pdf", uploaded: false }
    }
  },

  // === Qianxun Property Registrations ===
  "千寻玉出东.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "qianxun_tamade_east.pdf",
    translations: {
      ja: { storagePath: "qianxun_tamade_east.pdf", uploaded: true },
      cn: { storagePath: "qianxun_tamade_east_cn.pdf", uploaded: false }
    }
  },
  "千寻玉出中.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "qianxun_tamade_central.pdf",
    translations: {
      ja: { storagePath: "qianxun_tamade_central.pdf", uploaded: true },
      cn: { storagePath: "qianxun_tamade_central_cn.pdf", uploaded: false }
    }
  },
  "千寻与westage的共同担保房产证.pdf": {
    uploaded: false, type: "pdf",
    storagePath: "qianxun_westage_mortgage.pdf",
    aliases: ["共同担保目録(は)第7533号"]
  },

  // === Tu Yunfeng Asset Transfer Seal ===
  "凃云峰盖章讲千路商事株式会社的资金转移给西田诚良的盖章和手印证据.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "stamp_transfer_evidence.pdf"
  },

  // === Court Rulings ===
  "员昊撤销仲裁案件湛江中院裁定书.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "zhanjiang_court_ruling.pdf"
  },
  "湛江中院撤销仲裁代理词20230915终稿.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "arbitration_revocation_brief.pdf"
  },
  "邱千依-全国法院信息综合查询.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "qiu_court_records.pdf"
  },

  // === Other Evidence Files ===
  "株主名簿-千路.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "shareholder_register.pdf",
    translations: {
      ja: { storagePath: "shareholder_register.pdf", uploaded: true },
      cn: { storagePath: "shareholder_register_cn.pdf", uploaded: false }
    }
  },
  "被告证据1-6（合并页码版）.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "defendant_evidence_1_6.pdf"
  },

  // === Shorthand-only references (no numbered prefix) ===
  "西畑诚亮签字《预り证》（保管证）": {
    uploaded: false, type: "pdf",
    storagePath: "西畑诚亮签字预り証.pdf"
  },
  "员昊方现场录音": {
    uploaded: true, type: "video",
    storagePath: "VID_20191109_180841.mp4"
  },
  "罗建峰2021年10月13日律师函": {
    uploaded: true, type: "image",
    storagePath: "lawyer_letter_luo_20211013.jpg"
  },
  "湛江仲裁申请书": {
    uploaded: false, type: "pdf",
    storagePath: "湛江仲裁申请书.pdf"
  },
  "执行通知": {
    uploaded: false, type: "pdf",
    storagePath: "执行通知.pdf"
  },
  "员昊限制消费令": {
    uploaded: false, type: "pdf",
    storagePath: "员昊限制消费令.pdf"
  },
  "员昊、邱千依护照出入境记录": {
    uploaded: false, type: "pdf",
    storagePath: "员昊邱千依护照出入境记录.pdf",
    aliases: ["邱千依护照出入境记录"]
  },

  // === Tianyancha Screenshots ===
  "天眼查-蔡启涛与吕伟麟关系": {
    uploaded: true, type: "image",
    storagePath: "tianyancha_cai_qitao_lu_weilin.png",
    aliases: ["天眼查蔡启涛吕伟麟"]
  },
  "天眼查-蔡启泳与吕伟麟关系": {
    uploaded: true, type: "image",
    storagePath: "tianyancha_cai_qiyong_lu_weilin.png",
    aliases: ["天眼查蔡启泳吕伟麟"]
  },
  "天眼查-蔡启涛与蔡启泳关系": {
    uploaded: true, type: "image",
    storagePath: "tianyancha_cai_qitao_cai_qiyong.png",
    aliases: ["天眼查蔡启涛蔡启泳"]
  },
  "天眼查-凃云峰与罗建峰关系": {
    uploaded: true, type: "image",
    storagePath: "tianyancha_tu_yunfeng_luo_jianfeng.png",
    aliases: ["天眼查凃云峰罗建峰"]
  }
};

// Build reverse lookup index from aliases
const EVIDENCE_ALIAS_MAP = {};
for (const [key, info] of Object.entries(EVIDENCE_FILES)) {
  if (info.aliases) {
    for (const alias of info.aliases) {
      EVIDENCE_ALIAS_MAP[alias] = key;
    }
  }
}
