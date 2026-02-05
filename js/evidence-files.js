// ============================================================
// Evidence File Registry - Single Source of Truth
// ============================================================
// To add a new file:
//   1. Upload to Supabase Storage "media" bucket
//   2. Add or update entry here, set uploaded: true
//   3. Verify storagePath matches the exact filename in Supabase
// ============================================================

// Party definitions for documents that use 甲乙丙丁 codes
const PARTY_GROUPS = {
  stock_transfer: {
    title: "《股份转让协议书》各方当事人",
    parties: [
      { code: "甲A", name: "涂云峰", role: "原股东" },
      { code: "甲B", name: "邱千依", role: "原股东" },
      { code: "乙A", name: "吕伟麟", role: "受让方" },
      { code: "乙B", name: "蔡启涛", role: "受让方" },
      { code: "丙A", name: "员昊", role: "受让方" },
      { code: "丙B", name: "孙万鹏", role: "受让方" },
      { code: "丁方", name: "千路商事株式会社", role: "目标公司" }
    ]
  },
  loan_2018: {
    title: "《2018年第一次借款协议》各方当事人",
    parties: [
      { code: "甲方", name: "罗建峰", role: "债权人/出借人" },
      { code: "乙方", name: "千路商事株式会社", role: "借款人" },
      { code: "丙A", name: "员昊", role: "股东/社长" },
      { code: "丙B", name: "孙万鹏", role: "股东" },
      { code: "丙C", name: "涂云峰", role: "代表取缔役" },
      { code: "丙D", name: "邱千依", role: "股东" },
      { code: "丙E", name: "吕伟麟", role: "最大股东41%" },
      { code: "丙F", name: "蔡启涛", role: "股东" }
    ]
  },
  loan_2019: {
    title: "《2019年第二次借款协议》各方当事人",
    parties: [
      { code: "甲方", name: "罗建峰", role: "债权人/出借人" },
      { code: "乙方", name: "千路商事株式会社", role: "借款人" },
      { code: "丙A", name: "员昊", role: "股东/社长" },
      { code: "丙B", name: "孙万鹏", role: "股东" },
      { code: "丙C", name: "涂云峰", role: "代表取缔役" },
      { code: "丙D", name: "邱千依", role: "股东" },
      { code: "丙E", name: "吕伟麟", role: "最大股东41%" },
      { code: "丙F", name: "蔡启涛", role: "股东" }
    ]
  }
};

const EVIDENCE_FILES = {

  // === 01: Stock Transfer Agreement ===
  "01股份转让协议书.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "stock_transfer_agreement.pdf",
    aliases: ["股份转让协议书", "01股份转让协议书"],
    quickPreview: {
      storagePath: "preview_stock_transfer_article4.png",
      uploaded: true,
      caption: "\u7b2c\u56db\u6761\uff1a\u4e59\u65b9\u627f\u8bfa\u5b89\u6392\u53cb\u597d\u7b2c\u4e09\u65b9\u63d0\u4f9b<strong>5000\u4e07\u65e5\u5e01\u501f\u6b3e</strong>\u4e88\u76ee\u6807\u516c\u53f8\u8fd0\u8425",
      partyGroup: "stock_transfer"
    }
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
      cn: { storagePath: "business_license_certified_cn.pdf", uploaded: true }
    },
    quickPreview: {
      storagePath: "preview_business_license_rep.jpg",
      uploaded: true,
      caption: "\u51c3\u4e91\u5cf0\u4e3a<strong>\u4ee3\u8868\u53d6\u7f14\u5f79</strong>\uff08\u6cd5\u5b9a\u4ee3\u8868\u4eba\uff09\uff0c\u800c\u975e\u4ef2\u88c1\u4e66\u4e2d\u7684\u201c\u8463\u4e8b\u201d"
    }
  },

  // === 05: First Loan Agreement ===
  "05-2018年第一次借款协议.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "loan_agreement_2018_first.pdf",
    aliases: ["2018年第一次借款协议", "第一次借款协议"],
    quickPreview: {
      storagePath: "preview_loan1_article2_1.png",
      uploaded: true,
      caption: "\u7b2c\u4e8c\u6761\u7b2c1\u9879\uff1a\u4e19\u65b9\u9700\u6309\u5404\u81ea\u7684<strong>\u80a1\u6743\u6bd4\u4f8b\u7b79\u96c6800\u4e07\u65e5\u5143</strong>\u4e88\u4e59\u65b9",
      partyGroup: "loan_2018"
    }
  },

  // === 06: Second Loan Agreement ===
  "06-2019年第二次借款协议.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "loan_agreement_2019_second.pdf",
    aliases: ["2019年第二次借款协议", "第二次借款协议"],
    quickPreview: {
      storagePath: "preview_loan2_recital2.jpg",
      uploaded: true,
      caption: "\u9274\u4e8e2\uff1a2000\u4e07\u65e5\u5143\u501f\u6b3e\u5df2<strong>\u5168\u90e8\u7528\u4e8e\u516c\u53f8\u8fd0\u8425\u7ba1\u7406\u6295\u5165</strong>\uff0c\u73b0\u7ecf\u8425\u72b6\u51b5\u597d\u8f6c",
      partyGroup: "loan_2019"
    }
  },

  // === 08: Green License ===
  "08-1绿牌许可证.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "green_license.pdf",
    aliases: ["绿牌许可证"],
    translations: {
      ja: { storagePath: "green_license.pdf", uploaded: true },
      cn: { storagePath: "green_license_translation.pdf", uploaded: true }
    },
    quickPreview: {
      storagePath: "preview_green_license_date.jpg",
      uploaded: true,
      caption: "\u8bb8\u53ef\u6587\u53f7\u8fd1\u8fd0\u81ea\u4e8c\u7b2c644\u53f7\uff0c<strong>\u8bb8\u53ef\u65e5\u671f2018\u5e7411\u67086\u65e5</strong>\uff08\u62a5\u544a\u4e49\u52a1\u6761\u4ef6\u5df2\u6d88\u706d\uff09"
    }
  },
  "08-2绿牌许可证翻译件.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "green_license_translation.pdf",
    aliases: ["绿牌许可证翻译件"]
  },

  // === 09: Luo Jianfeng Japan Photos (2018年11月) ===
  "09罗建峰在日本证明照片/2018年11月16日.PNG": {
    uploaded: true, type: "image",
    storagePath: "luo_japan_date_20181116.png",
    aliases: ["罗建峰在日本证明照片"]
  },
  "09罗建峰在日本证明照片/凃云峰在千路公司委托的财务日本公司门口合影.PNG": {
    uploaded: true, type: "image",
    storagePath: "luo_japan_tu_accounting_firm.png"
  },
  "09罗建峰在日本证明照片/吕伟麟和蔡启涛及凃云峰在千路公司门口合影，庆祝营运牌照取得.PNG": {
    uploaded: true, type: "image",
    storagePath: "luo_japan_green_license_celebration.png"
  },
  "09罗建峰在日本证明照片/罗建峰与吕伟麟及凃云峰抵达日本后前往大阪城公园拍照留念.PNG": {
    uploaded: true, type: "image",
    storagePath: "luo_japan_osaka_castle.png"
  },
  "09罗建峰在日本证明照片/罗建峰与吕伟麟及蔡启涛及员昊在日本神户球场合影.PNG": {
    uploaded: true, type: "image",
    storagePath: "luo_japan_kobe_stadium.png"
  },
  "09罗建峰在日本证明照片/罗建峰与吕伟麟及蔡启涛合影.PNG": {
    uploaded: true, type: "image",
    storagePath: "luo_japan_group_photo.png"
  },
  "09罗建峰在日本证明照片/罗建峰在日本时乘坐的车牌为和泉300あ680.PNG": {
    uploaded: true, type: "image",
    storagePath: "luo_japan_taxi_plate.png"
  },

  // === 10: Asset Transfer Documents ===
  "10-1-2019年11月9日取走公章的法人指示书.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "corporate_seal_instruction_20191109.pdf",
    aliases: ["凃云峰签章《业务指示书》"],
    translations: {
      ja: { storagePath: "corporate_seal_instruction_20191109.pdf", uploaded: true },
      cn: { storagePath: "corporate_seal_instruction_cn_p3_6.pdf", uploaded: true }
    },
    quickPreview: {
      storagePath: "preview_corporate_seal_instruction.png",
      uploaded: true,
      caption: "\u51c3\u4e91\u5cf0\u4ee5\u4ee3\u8868\u53d6\u7f14\u5f79\u8eab\u4efd\u7b7e\u7f72\uff1a\u5c06\u5168\u90e8<strong>\u5370\u7ae0\u3001\u5b58\u6298\u3001\u73b0\u91d1\u5361\u3001\u73b0\u91d1\u91d1\u5e93</strong>\u79fb\u4ea4\u7ed9\u897f\u7551\u8bda\u4eae"
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
    },
    quickPreview: {
      storagePath: "preview_shareholders_meeting.png",
      uploaded: true,
      caption: "\u7b2c\u4e00\u56de<strong>\u4e34\u65f6\u80a1\u4e1c\u5927\u4f1a</strong>\uff1a\u51c3\u4e91\u5cf0\u3001\u5415\u4f1f\u9e9f\u3001\u8521\u542f\u6d9b\u53c2\u52a0\uff0c\u5458\u6627\u5230\u573a\u4f46\u88ab\u6392\u65a5"
    }
  },
  "千路商事株式会社2019年第一次临时股东大会决议案.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "shareholder_resolution_2019.pdf",
    aliases: ["股东大会决议案"]
  },
  "千路商事株式会社2019年度第一回臨時株主総会議事録.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "shareholders_meeting_1st_minutes.pdf",
    aliases: ["第一回临时股东大会议事录"]
  },

  // === 11.5: Second Shareholder Meeting (2019年12月12日) ===
  "2019年第二回臨時株主総会招集のご通知.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "shareholders_meeting_2nd_notice.pdf",
    aliases: ["第二回临时股东大会召集通知", "2019年12月12日第二次股东会"]
  },

  // === 12: Luo's Lawyer Letter ===
  "12-罗建峰2019年12月3日律师函.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "lawyer_letter_luo_20191203.pdf",
    aliases: ["罗建峰2019年12月3日律师函", "12-罗建峰2019年12月3日律师函.JPG"],
    quickPreview: {
      storagePath: "preview_lawyer_letter_2019.png",
      uploaded: true,
      caption: "\u8d22\u52a1\u6587\u4ef6\u88ab\u8f6c\u79fb\u4ec524\u5929\u540e\uff0c\u7f57\u5efa\u5cf0\u53d1\u51fa<strong>\u5f8b\u5e08\u51fd</strong>\u8981\u6c42\u63d0\u4f9b\u94f6\u884c\u6d41\u6c34"
    }
  },

  // === 13: Supplier Notification ===
  "13-2019年12月23日发给各供应商的通知书.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "supplier_notice_20191223.pdf",
    aliases: ["2019年12月23日发给各供应商的通知书", "发给各供应商的通知书"],
    translations: {
      ja: { storagePath: "supplier_notice_japanese.pdf", uploaded: true },
      cn: { storagePath: "supplier_notice_20191223.pdf", uploaded: true }
    },
    quickPreview: {
      storagePath: "preview_supplier_notice_signature.jpg",
      uploaded: true,
      caption: "\u5415\u4f1f\u9e9f\u3001\u8521\u542f\u6d9b\u4ee5<strong>\u4e1a\u52a1\u6267\u884c\u8d23\u4efb\u4eba</strong>\u8eab\u4efd\u7f72\u540d\uff0c\u7981\u6b62\u5411\u5458\u6627\u63d0\u4f9b\u4efb\u4f55\u4fe1\u606f"
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
    },
    quickPreview: {
      storagePath: "preview_audit_report_header.jpg",
      uploaded: true,
      caption: "\u51fa\u5177\u4eba\uff1a<strong>\u516c\u8ba4\u4f1a\u8ba1\u58eb\u957f\u5c9b\u5e7f\u660e</strong>\uff08\u4e0e11\u67089\u65e5\u8f6c\u79fb\u5f53\u5929\u5728\u573a\u4e3a\u540c\u4e00\u4eba\uff09"
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
    aliases: ["债权转让协议"],
    quickPreview: {
      storagePath: "preview_debt_transfer_20pct.jpg",
      uploaded: true,
      caption: "\u8f6c\u8ba9\u5bf9\u4ef7\uff1a\u5b9e\u73b0\u503a\u6743\u540e\u652f\u4ed8\u5b9e\u9645\u53d6\u5f97\u91d1\u989d\u7684<strong>20%</strong>\uff0c\u8521\u542f\u6cf3\u96f6\u9884\u4ed8\u6210\u672c"
    }
  },

  // === 17: Arbitration Award (split into 5 parts) ===
  "17湛江仲裁裁决书.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "arbitration_award_p1_6.pdf",
    aliases: ["湛江仲裁裁决书", "员昊邱千依孙万鹏裁决书"],
    quickPreview: {
      storagePath: "preview_arb_p2_director.jpg",
      uploaded: true,
      caption: "第2页：凃云峰被列为<strong>\"董事\"</strong>而非法定代表人（代表取缔役），与营业执照不符"
    }
  },
  "17湛江仲裁裁决书_7-12.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "arbitration_award_p7_12.pdf",
    quickPreview: {
      storagePath: "preview_arb_p8_abandon_tu.jpg",
      uploaded: true,
      caption: "第7页：<strong>\"放弃向股东涂云峰主张权利\"</strong>——给法定代表人免责，只追诉受害者"
    }
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
  "18-1几人成立千寻合同会社证明存折-千寻公司入股.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "qianxun_bank_book_establishment.pdf",
    aliases: ["千寻公司资料", "千寻公司资料（含银行存折及注册备案资料）", "18-1几人成立新公司证明存折-千寻公司入股"]
  },
  "千寻合同会社出资人信息.JPG": {
    uploaded: true, type: "image",
    storagePath: "qianxun_shareholder_info.jpg",
    aliases: ["千寻合同会社出资人信息"]
  },

  // === 19: Lu Weilin Payment Evidence (两张凭证) ===
  "19-1吕伟麟替罗建峰支付的第二次借款凭证出自仲裁申请书.jpg": {
    uploaded: true, type: "image",
    storagePath: "lu_payment_bank_transfer.jpg",
    aliases: ["吕伟麟代付凭证", "19-1吕伟麟替罗建峰支付借款凭证", "吕伟麟汇款1000万日币银行流水单"]
  },
  "19-2吕伟麟替罗建峰支付的第二次借款凭证声明出自仲裁申请书.jpg": {
    uploaded: true, type: "image",
    storagePath: "lu_payment_declaration.jpg",
    aliases: ["吕伟麟代付声明书", "19-2吕伟麟代付声明"]
  },
  "19-2吕伟麟替罗建峰支付的第二次借款1000万日币的声明书出自仲裁申请书.jpg": {
    uploaded: true, type: "image",
    storagePath: "lu_payment_1000man_declaration.jpg",
    aliases: ["吕伟麟1000万声明书"]
  },

  // === 19.5: Dec 14 Voice Recording ===
  "2019年12月14日蔡启涛，吕伟麟代替罗建峰和凃云峰来和員昊邱千依孙万鹏谈判.m4a": {
    uploaded: true, type: "audio",
    storagePath: "voice_recording_20191214.m4a",
    aliases: ["2019年12月14日谈话语音录音", "12月14日买断谈判录音", "2019年12月14日蔡启涛吕伟麟代替罗建峰凃云峰谈判录音"],
    caption: "2019\u5e7412\u670814\u65e5\u8c08\u8bdd\u5f55\u97f3 \u2014 \u8521\u542f\u6d9b\u3001\u5415\u4f1f\u9e9f<strong>\u4ee3\u66ff\u7f57\u5efa\u5cf0\u548c\u51c3\u4e91\u5cf0</strong>\u5411\u5458\u6627\u3001\u90b1\u5343\u4f9d\u3001\u5b59\u4e07\u9e4f\u63d0\u51fa326\u4e07\u5143\u4e70\u65ad\u6761\u4ef6"
  },

  // === 20: Court Documents ===
  "20-1包头中院无效案文书/": {
    uploaded: true, type: "folder",
    storagePath: "baotou_court_1541.jpg",
    aliases: ["包头中院无效案文书"]
  },
  "20-2包头中院吕替蔡支付律师费/出自仲裁书第19页最后一行.jpg": {
    uploaded: true, type: "image",
    storagePath: "preview_arbitration_p19_fee.jpg",
    aliases: ["仲裁书第19页吕替蔡支付律师费"]
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

  // === Company Registration (Fujimoto) - 3家公司分拆版 ===
  "千寻千路西田公司藤本.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "qianxun_qianlu_nishida_registration.pdf",
    aliases: ["千寻千路西田公司藤本 2.pdf"],
    translations: {
      ja: { storagePath: "qianxun_qianlu_nishida_registration.pdf", uploaded: true },
      cn: { storagePath: "qianxun_registration_cn.pdf", uploaded: true }
    },
    quickPreview: {
      storagePath: "preview_qianxun_registration.jpg",
      uploaded: true,
      caption: "\u5343\u5bfb\u516c\u53f8\u767b\u8bb0\uff1a\u51c3\u4e91\u5cf035%\u4e3a<strong>\u4ee3\u8868\u793e\u5458</strong>\uff0c\u4e0e\u5343\u8def\u540c\u5730\u5740\u8fd0\u8425"
    }
  },
  "千路株式会社司藤本.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "qianlu_registration_split.pdf",
    aliases: ["千路商事株式会社藤本"]
  },
  "千寻合同会社藤本.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "qianxun_registration_split.pdf",
    aliases: ["千寻合同会社藤本单独"]
  },
  "西田诚亮公司藤本.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "nishida_company_registration_split.pdf",
    aliases: ["西田诚亮公司藤本"]
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
    uploaded: true, type: "pdf",
    storagePath: "qianxun_westage_mortgage_cn_p1-4.pdf",
    aliases: ["共同担保目録(は)第7533号", "千寻与westage共同担保"],
    translations: {
      ja: { storagePath: "qianxun_westage_mortgage_cn_p1-4.pdf", uploaded: true },
      cn: { storagePath: "qianxun_westage_mortgage_cn_p1-4.pdf", uploaded: true }
    }
  },

  // === Tu Yunfeng Asset Transfer Seal ===
  "凃云峰盖章讲千路商事株式会社的资金转移给西田诚良的盖章和手印证据.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "stamp_transfer_evidence.pdf"
  },

  // === Court Rulings ===
  "员昊撤销仲裁案件湛江中院裁定书.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "zhanjiang_court_ruling.pdf",
    quickPreview: {
      storagePath: "preview_court_ruling_p4.jpg",
      uploaded: true,
      caption: "\u7b2c4\u9875\uff1a<strong>\u8521\u542f\u6cf3\u4e3b\u52a8\u63d0\u4ea4\u5ba1\u8ba1\u62a5\u544a</strong>\uff0c\u8bc1\u660e\u88ab\u7533\u8bf7\u4eba\u62e5\u6709\u5b8c\u6574\u8d22\u52a1\u6570\u636e"
    }
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
      cn: { storagePath: "shareholder_register_cn.pdf", uploaded: true }
    }
  },
  "被告证据1-6（合并页码版）.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "defendant_evidence_1_6.pdf"
  },

  // === Shorthand-only references (no numbered prefix) ===
  "西畑诚亮签字《预り证》（保管证）": {
    uploaded: true, type: "pdf",
    storagePath: "business_instruction_custody_receipt.pdf",
    aliases: ["西畑诚亮预り証", "保管证原件"]
  },
  "罗建峰2021年10月13日律师函": {
    uploaded: true, type: "image",
    storagePath: "lawyer_letter_luo_20211013.jpg"
  },
  "湛江仲裁申请书": {
    uploaded: false, type: "pdf",
    storagePath: "arbitration_application.pdf"
  },
  "执行通知": {
    uploaded: true, type: "pdf",
    storagePath: "qiu_court_records.pdf",
    aliases: ["执行通知书"]
  },
  "员昊限制消费令": {
    uploaded: true, type: "pdf",
    storagePath: "qiu_court_records.pdf"
  },
  "邱千依限制消费令": {
    uploaded: true, type: "pdf",
    storagePath: "qiu_court_records.pdf"
  },

  // === Passport / Entry-Exit Records ===
  "员昊、邱千依护照出入境记录": {
    uploaded: true, type: "image",
    storagePath: "passport_yuanhao_1.jpg",
    aliases: ["邱千依护照出入境记录", "员昊护照出入境记录", "护照出入境记录"]
  },
  "护照出入境记录-员昊1": {
    uploaded: true, type: "image",
    storagePath: "passport_yuanhao_1.jpg"
  },
  "护照出入境记录-员昊2": {
    uploaded: true, type: "image",
    storagePath: "passport_yuanhao_2.jpg"
  },
  "护照出入境记录-邱千依1": {
    uploaded: true, type: "image",
    storagePath: "passport_qiuqianyi_1.jpg"
  },
  "护照出入境记录-邱千依2": {
    uploaded: true, type: "image",
    storagePath: "passport_qiuqianyi_2.jpg"
  },

  // === 2019.11.9 Scene Photos (additional) ===
  "2019年11月9日当天照片3": {
    uploaded: true, type: "image",
    storagePath: "scene_photo_20191109_3.png"
  },
  "2019年11月9日当天照片4": {
    uploaded: true, type: "image",
    storagePath: "scene_photo_20191109_4.png"
  },
  "2019年11月9日当天照片5": {
    uploaded: true, type: "image",
    storagePath: "scene_photo_20191109_5.png"
  },

  // === Handwriting Analysis Report ===
  "笔迹咨询鉴定": {
    uploaded: true, type: "pdf",
    storagePath: "handwriting_analysis_report.pdf",
    aliases: ["笔迹鉴定书", "笔迹咨询鉴定书"]
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
  },

  // === 关联企业调查 - 爱企查商业关系图 ===
  "爱企查-吕伟麟商业关系图": {
    uploaded: true, type: "image",
    storagePath: "aiqicha_lu_weilin_network.png",
    aliases: ["吕伟麟商业关系图"]
  },
  "爱企查-吕伟麟详细关系图": {
    uploaded: true, type: "image",
    storagePath: "aiqicha_lu_weilin_detailed.png"
  },
  "爱企查-蔡启泳商业关系图": {
    uploaded: true, type: "image",
    storagePath: "aiqicha_cai_qiyong_network.png",
    aliases: ["蔡启泳商业关系图"]
  },
  "爱企查-蔡启涛商业关系图": {
    uploaded: true, type: "image",
    storagePath: "aiqicha_cai_qitao_network.png",
    aliases: ["蔡启涛商业关系图"]
  },
  "爱企查-孔宇商业关系图": {
    uploaded: true, type: "image",
    storagePath: "aiqicha_kong_yu_network.png",
    aliases: ["孔宇商业关系图"]
  },
  "爱企查-邓桂燕吴铭刚吕伟麟三角关系": {
    uploaded: true, type: "image",
    storagePath: "aiqicha_deng_guiyan_triangle.png",
    aliases: ["邓桂燕三角关系图", "佛山拓派电子科技关系图"]
  },
  "爱企查-迅得物业管理全景关系图": {
    uploaded: true, type: "image",
    storagePath: "aiqicha_xunde_property_full.jpg",
    aliases: ["迅得物业关系图"]
  },

  // === 关联企业调查 - 爱企查董监高报告 ===
  "爱企查报告-邓桂燕": {
    uploaded: true, type: "pdf",
    storagePath: "aiqicha_report_deng_guiyan.pdf",
    aliases: ["邓桂燕董监高报告"]
  },
  "爱企查报告-吕伟麟": {
    uploaded: true, type: "pdf",
    storagePath: "aiqicha_report_lu_weilin.pdf",
    aliases: ["吕伟麟董监高报告"]
  },
  "爱企查报告-蔡启涛": {
    uploaded: true, type: "pdf",
    storagePath: "aiqicha_report_cai_qitao.pdf",
    aliases: ["蔡启涛董监高报告"]
  },
  "爱企查报告-蔡启泳": {
    uploaded: true, type: "pdf",
    storagePath: "aiqicha_report_cai_qiyong.pdf",
    aliases: ["蔡启泳董监高报告"]
  },
  "爱企查报告-孔宇": {
    uploaded: true, type: "pdf",
    storagePath: "aiqicha_report_kong_yu.pdf",
    aliases: ["孔宇董监高报告"]
  },
  "爱企查报告-罗建峰": {
    uploaded: true, type: "pdf",
    storagePath: "aiqicha_report_luo_jianfeng.pdf",
    aliases: ["罗建峰董监高报告"]
  },

  // === 邓桂燕相关微信聊天记录 & 财务报表 ===
  "蔡启涛微信-发送千路财务报表": {
    uploaded: true, type: "image",
    storagePath: "deng_guiyan_chat_6853.png",
    aliases: ["蔡启涛发送千路财务报表截图"]
  },
  "蔡启涛微信-讨论邓桂燕入群1": {
    uploaded: true, type: "image",
    storagePath: "deng_guiyan_chat_6850.png",
    aliases: ["蔡启涛确认邓桂燕是会计截图"]
  },
  "蔡启涛微信-确认邓桂燕是会计": {
    uploaded: true, type: "image",
    storagePath: "deng_guiyan_chat_6851.png",
    aliases: ["蔡启涛确认邓桂燕负责记账"]
  },
  "蔡启涛微信-同意邓桂燕参与": {
    uploaded: true, type: "image",
    storagePath: "deng_guiyan_chat_6852.png",
    aliases: ["蔡启涛同意阿燕参与"]
  },
  "蔡启涛微信-语音消息记录": {
    uploaded: true, type: "image",
    storagePath: "deng_guiyan_chat_6849.png"
  },
  "蔡启涛微信-讨论邓桂燕入群2": {
    uploaded: true, type: "image",
    storagePath: "deng_guiyan_chat_6854.png"
  },
  "蔡启涛微信-邓桂燕角色说明": {
    uploaded: true, type: "image",
    storagePath: "deng_guiyan_chat_6855.png"
  },
  "蔡启涛微信-确认拉阿燕入群": {
    uploaded: true, type: "image",
    storagePath: "deng_guiyan_chat_6856.png",
    aliases: ["拉邓桂燕入群聊天记录"]
  },
  "2018年12月千路报表": {
    uploaded: true, type: "spreadsheet",
    storagePath: "qianlu_financial_report_201812.xlsx",
    aliases: ["千路2018年12月财务报表"]
  },
  "2019年04月千路报表": {
    uploaded: true, type: "spreadsheet",
    storagePath: "qianlu_financial_report_201904.xlsx",
    aliases: ["千路2019年4月财务报表"]
  },

  // === 财务群聊天记录 - 罗建峰直接参与证据 ===
  // --- 群成员列表 & 入群记录 ---
  "千路报帐对账重要群-成员列表": {
    uploaded: true, type: "image",
    storagePath: "wechat_group_10_members.png",
    aliases: ["10人财务群成员列表", "千路报帐对账群成员"]
  },
  "蔡启涛邀请罗建峰进入财务群": {
    uploaded: true, type: "image",
    storagePath: "wechat_cai_invites_luo.png",
    aliases: ["罗建峰入群记录", "蔡启涛拉罗建峰入群"]
  },
  "千路绿牌公司工作群-成员列表": {
    uploaded: true, type: "image",
    storagePath: "wechat_group_11_members.png",
    aliases: ["11人工作群成员列表", "千路工作群成员"]
  },
  "罗建峰被邀请进入工作群": {
    uploaded: true, type: "image",
    storagePath: "wechat_luo_invited_11group.png",
    aliases: ["罗建峰进入11人工作群"]
  },
  // --- 罗建峰亲自发言 ---
  "罗建峰群内发言记录汇总": {
    uploaded: true, type: "image",
    storagePath: "wechat_luo_messages_search.png",
    aliases: ["罗建峰微信发言搜索"]
  },
  "罗建峰问费用计提": {
    uploaded: true, type: "image",
    storagePath: "wechat_luo_asks_accrual.png",
    aliases: ["罗建峰审核财务截图"]
  },
  "罗建峰确认收到七月业绩": {
    uploaded: true, type: "image",
    storagePath: "wechat_luo_july_revenue_ack.png",
    aliases: ["罗建峰说收到七月业绩增长"]
  },
  "罗建峰谈规模化布局": {
    uploaded: true, type: "image",
    storagePath: "wechat_luo_scale_strategy.png",
    aliases: ["罗建峰讨论公司战略"]
  },
  // --- 群内财务报表分发记录 ---
  "财务群抄送给我及罗先生": {
    uploaded: true, type: "image",
    storagePath: "wechat_cc_luo_financial.png",
    aliases: ["抄送罗先生财务审批"]
  },
  "财务群发送日本报表及会议文件": {
    uploaded: true, type: "image",
    storagePath: "wechat_financial_pdfs_cc_luo.png",
    aliases: ["群内发送财务PDF"]
  },
  "财务群发送5份银行流水Excel": {
    uploaded: true, type: "image",
    storagePath: "wechat_5_financial_excels.png",
    aliases: ["群内5份银行流水"]
  },
  "5月资金日报表连续发送": {
    uploaded: true, type: "image",
    storagePath: "wechat_may_daily_reports.png",
    aliases: ["5月日报表截图"]
  },
  "10月资金不足报告@蔡启涛": {
    uploaded: true, type: "image",
    storagePath: "wechat_oct_fund_shortage.png",
    aliases: ["10月千路资金不足截图"]
  },
  "11月收入报表仍在发送": {
    uploaded: true, type: "image",
    storagePath: "wechat_nov_revenue_reports.png",
    aliases: ["11月7日收入报表截图"]
  },
  // --- 其他关联证据 ---
  "公司支付宝号为蔡启涛": {
    uploaded: true, type: "image",
    storagePath: "wechat_company_alipay_cai.png",
    aliases: ["千路公司支付宝蔡启涛"]
  },
  "罗总欢乐游专属旅行群": {
    uploaded: true, type: "image",
    storagePath: "wechat_luo_japan_trip_group.png",
    aliases: ["罗建峰7月日本旅行群"]
  },
  "罗建峰微信个人信息页": {
    uploaded: true, type: "image",
    storagePath: "wechat_luo_profile.png",
    aliases: ["罗建峰微信ID"]
  },
  "百度罗建峰资料": {
    uploaded: true, type: "image",
    storagePath: "baidu_luo_jianfeng_cpa.png",
    aliases: ["罗建峰百度百科", "罗建峰中国注册会计师", "罗建峰联塑集团执行董事"]
  },
  "邓桂燕自称千路大陆财务燕": {
    uploaded: true, type: "image",
    storagePath: "wechat_deng_self_id_finance.png",
    aliases: ["邓桂燕自我介绍千路财务"]
  },

  // ============================================================
  // === 微信群聊天记录证据 — 三个群 ===
  // ============================================================

  // === 千路报帐队长【重要群】 (8 files) ===
  "报帐队长群-IMG_6922": {
    uploaded: true, type: "image",
    storagePath: "wechat_captain_6922.png",
    aliases: ["报帐队长群截图6922"]
  },
  "报帐队长群-IMG_6923": {
    uploaded: true, type: "image",
    storagePath: "wechat_captain_6923.png",
    aliases: ["报帐队长群截图6923"]
  },
  "报帐队长群-IMG_6925": {
    uploaded: true, type: "image",
    storagePath: "wechat_captain_6925.png",
    aliases: ["报帐队长群截图6925"]
  },
  "报帐队长群-IMG_6926": {
    uploaded: true, type: "image",
    storagePath: "wechat_captain_6926.png",
    aliases: ["报帐队长群截图6926"]
  },
  "报帐队长群-IMG_6927": {
    uploaded: true, type: "image",
    storagePath: "wechat_captain_6927.png",
    aliases: ["报帐队长群截图6927"]
  },
  "报帐队长群-IMG_6928": {
    uploaded: true, type: "image",
    storagePath: "wechat_captain_6928.png",
    aliases: ["报帐队长群截图6928"]
  },
  "报帐队长群-IMG_6929": {
    uploaded: true, type: "image",
    storagePath: "wechat_captain_6929.png",
    aliases: ["报帐队长群截图6929"]
  },
  "报帐队长群-群名截图": {
    uploaded: true, type: "image",
    storagePath: "wechat_captain_hash_0a45e4.jpg",
    aliases: ["报帐队长群群名"]
  },

  // === 日本大阪千路绿牌公司工作群 - 聊天截图 (45 files) ===
  "工作群-IMG_6937": { uploaded: true, type: "image", storagePath: "wechat_work_6937.png" },
  "工作群-IMG_6944": { uploaded: true, type: "image", storagePath: "wechat_work_6944.png" },
  "工作群-IMG_6945": { uploaded: true, type: "image", storagePath: "wechat_work_6945.png" },
  "工作群-IMG_6947": { uploaded: true, type: "image", storagePath: "wechat_work_6947.png" },
  "工作群-IMG_6948": { uploaded: true, type: "image", storagePath: "wechat_work_6948.png" },
  "工作群-IMG_6949": { uploaded: true, type: "image", storagePath: "wechat_work_6949.png" },
  "工作群-IMG_6953": { uploaded: true, type: "image", storagePath: "wechat_work_6953.png" },
  "工作群-IMG_6954": { uploaded: true, type: "image", storagePath: "wechat_work_6954.png" },
  "工作群-IMG_6955": { uploaded: true, type: "image", storagePath: "wechat_work_6955.png" },
  "工作群-IMG_6958": { uploaded: true, type: "image", storagePath: "wechat_work_6958.png" },
  "工作群-IMG_6959": { uploaded: true, type: "image", storagePath: "wechat_work_6959.png" },
  "工作群-IMG_6961": { uploaded: true, type: "image", storagePath: "wechat_work_6961.png" },
  "工作群-IMG_6962": { uploaded: true, type: "image", storagePath: "wechat_work_6962.png" },
  "工作群-IMG_6963": { uploaded: true, type: "image", storagePath: "wechat_work_6963.png" },
  "工作群-IMG_6964": { uploaded: true, type: "image", storagePath: "wechat_work_6964.png" },
  "工作群-IMG_6965": { uploaded: true, type: "image", storagePath: "wechat_work_6965.png" },
  "工作群-IMG_6966": { uploaded: true, type: "image", storagePath: "wechat_work_6966.png" },
  "工作群-IMG_6967": { uploaded: true, type: "image", storagePath: "wechat_work_6967.png" },
  "工作群-IMG_6969": { uploaded: true, type: "image", storagePath: "wechat_work_6969.png" },
  "工作群-IMG_6971": { uploaded: true, type: "image", storagePath: "wechat_work_6971.png" },
  "工作群-IMG_6973": { uploaded: true, type: "image", storagePath: "wechat_work_6973.png" },
  "工作群-IMG_6975": { uploaded: true, type: "image", storagePath: "wechat_work_6975.png" },
  "工作群-IMG_6976": { uploaded: true, type: "image", storagePath: "wechat_work_6976.png" },
  "工作群-IMG_6978": { uploaded: true, type: "image", storagePath: "wechat_work_6978.png" },
  "工作群-IMG_6980": { uploaded: true, type: "image", storagePath: "wechat_work_6980.png" },
  "工作群-IMG_6981": { uploaded: true, type: "image", storagePath: "wechat_work_6981.png" },
  "工作群-IMG_6982": { uploaded: true, type: "image", storagePath: "wechat_work_6982.png" },
  "工作群-IMG_6983": { uploaded: true, type: "image", storagePath: "wechat_work_6983.png" },
  "工作群-IMG_1537": { uploaded: true, type: "image", storagePath: "wechat_work_1537.png" },
  "工作群-IMG_1538": { uploaded: true, type: "image", storagePath: "wechat_work_1538.png" },
  "工作群-hash-01a52c": { uploaded: true, type: "image", storagePath: "wechat_work_hash_01a52c.jpg" },
  "工作群-hash-05e216": { uploaded: true, type: "image", storagePath: "wechat_work_hash_05e216.jpg" },
  "工作群-hash-0e6c32": { uploaded: true, type: "image", storagePath: "wechat_work_hash_0e6c32.jpg" },
  "工作群-hash-1103e6": { uploaded: true, type: "image", storagePath: "wechat_work_hash_1103e6.jpg" },
  "工作群-hash-547c95": { uploaded: true, type: "image", storagePath: "wechat_work_hash_547c95.jpg" },
  "工作群-hash-7b338a": { uploaded: true, type: "image", storagePath: "wechat_work_hash_7b338a.jpg" },
  "工作群-hash-8009c7": { uploaded: true, type: "image", storagePath: "wechat_work_hash_8009c7.png" },
  "工作群-hash-81e1f2": { uploaded: true, type: "image", storagePath: "wechat_work_hash_81e1f2.jpg" },
  "工作群-hash-84da29": { uploaded: true, type: "image", storagePath: "wechat_work_hash_84da29.jpg" },
  "工作群-hash-8e12bb": { uploaded: true, type: "image", storagePath: "wechat_work_hash_8e12bb.png" },
  "工作群-hash-92e052": { uploaded: true, type: "image", storagePath: "wechat_work_hash_92e052.jpg" },
  "工作群-hash-945019": { uploaded: true, type: "image", storagePath: "wechat_work_hash_945019.jpg" },
  "工作群-hash-9d354e": { uploaded: true, type: "image", storagePath: "wechat_work_hash_9d354e.jpg" },
  "工作群-hash-9fb353": { uploaded: true, type: "image", storagePath: "wechat_work_hash_9fb353.png" },
  "工作群-hash-b4596c": { uploaded: true, type: "image", storagePath: "wechat_work_hash_b4596c.jpg" },

  // === 绿牌公司工作群 - Excel 月度财务报表 (15 files) ===
  "2019.05千路财务状况表（内含两表）.xls": {
    uploaded: true, type: "spreadsheet",
    storagePath: "financial_status_201905.xls",
    aliases: ["2019年5月千路财务状况表"]
  },
  "2019.06千路财务状况表（内含两表）.xls": {
    uploaded: true, type: "spreadsheet",
    storagePath: "financial_status_201906.xls",
    aliases: ["2019年6月千路财务状况表"]
  },
  "2019.07千路财务状况表（内含两表）.xls": {
    uploaded: true, type: "spreadsheet",
    storagePath: "financial_status_201907.xls",
    aliases: ["2019年7月千路财务状况表"]
  },
  "2019.08千路损益表.xls": {
    uploaded: true, type: "spreadsheet",
    storagePath: "profit_loss_201908.xls",
    aliases: ["2019年8月千路损益表"]
  },
  "2019.08千路资产负债明细表.xls": {
    uploaded: true, type: "spreadsheet",
    storagePath: "balance_sheet_201908.xls",
    aliases: ["2019年8月千路资产负债表"]
  },
  "2019.09千路损益表.xls": {
    uploaded: true, type: "spreadsheet",
    storagePath: "profit_loss_201909.xls",
    aliases: ["2019年9月千路损益表"]
  },
  "2019年05月千路报表.xlsx": {
    uploaded: true, type: "spreadsheet",
    storagePath: "monthly_report_201905.xlsx",
    aliases: ["千路2019年5月月度报表"]
  },
  "2019年06月千路报表.xlsx": {
    uploaded: true, type: "spreadsheet",
    storagePath: "monthly_report_201906.xlsx",
    aliases: ["千路2019年6月月度报表"]
  },
  "2019年07月千路报表.xlsx": {
    uploaded: true, type: "spreadsheet",
    storagePath: "monthly_report_201907.xlsx",
    aliases: ["千路2019年7月月度报表"]
  },
  "2019年08月千路报表.xlsx": {
    uploaded: true, type: "spreadsheet",
    storagePath: "monthly_report_201908.xlsx",
    aliases: ["千路2019年8月月度报表"]
  },
  "2019年09月千路报表.xlsx": {
    uploaded: true, type: "spreadsheet",
    storagePath: "monthly_report_201909.xlsx",
    aliases: ["千路2019年9月月度报表"]
  },
  "8月应收款情况表 9.20.xlsx": {
    uploaded: true, type: "spreadsheet",
    storagePath: "receivables_201908.xlsx",
    aliases: ["2019年8月应收款情况表"]
  },
  "琴终表7月订单（未收款）.xlsx": {
    uploaded: true, type: "spreadsheet",
    storagePath: "unpaid_orders_201907.xlsx",
    aliases: ["2019年7月未收款订单"]
  },
  "（改）损益汇总.xlsx": {
    uploaded: true, type: "spreadsheet",
    storagePath: "profit_loss_summary_2019.xlsx",
    aliases: ["损益汇总表", "2019年1-9月损益汇总", "千路损益汇总表"]
  },

  // === 千路股东群 - 聊天截图 (13 files) ===
  "股东群-IMG_6903": { uploaded: true, type: "image", storagePath: "wechat_shareholder_6903.png" },
  "股东群-IMG_6906": { uploaded: true, type: "image", storagePath: "wechat_shareholder_6906.png" },
  "股东群-IMG_6907": { uploaded: true, type: "image", storagePath: "wechat_shareholder_6907.png" },
  "股东群-IMG_6908": { uploaded: true, type: "image", storagePath: "wechat_shareholder_6908.png" },
  "股东群-IMG_6909": { uploaded: true, type: "image", storagePath: "wechat_shareholder_6909.png" },
  "股东群-IMG_6910": { uploaded: true, type: "image", storagePath: "wechat_shareholder_6910.png" },
  "股东群-IMG_6916": { uploaded: true, type: "image", storagePath: "wechat_shareholder_6916.png" },
  "股东群-IMG_6917": { uploaded: true, type: "image", storagePath: "wechat_shareholder_6917.png" },
  "股东群-IMG_6918": { uploaded: true, type: "image", storagePath: "wechat_shareholder_6918.png" },
  "股东群-IMG_6919": { uploaded: true, type: "image", storagePath: "wechat_shareholder_6919.png" },
  "股东群-IMG_6921": { uploaded: true, type: "image", storagePath: "wechat_shareholder_6921.png" },
  "股东群-hash-8160d8": { uploaded: true, type: "image", storagePath: "wechat_shareholder_hash_8160d8.jpg" },
  "股东群-hash-fa479e": { uploaded: true, type: "image", storagePath: "wechat_shareholder_hash_fa479e.jpg" },

  // === 股东群 - 新增 PDF 文档 (5 files) ===
  "千路公司汇报资料.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "company_briefing_20191123.pdf",
    aliases: ["千路公司汇报资料", "2019年11月23日汇报资料"]
  },
  "千路公司危机解决方案.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "crisis_solution_20191204.pdf",
    aliases: ["千路公司危机解决方案", "2019年12月4日危机解决方案"]
  },
  "员昊追款通知.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "payment_demand_yuanhao_20191209.pdf",
    aliases: ["员昊追款通知", "2019年12月9日追款通知"]
  },
  "股东会汇报资料20191127.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "shareholder_report_51pages_20191127.pdf",
    aliases: ["股东会汇报资料", "51页股东会汇报资料", "2019年11月27日股东会汇报资料", "股东会汇报资料51页"]
  },
  "業務指示書と預かり証.pdf": {
    uploaded: true, type: "pdf",
    storagePath: "business_instruction_custody_receipt.pdf",
    aliases: ["业务指示书与保管证", "業務指示書と預かり証", "业务指示书原件"]
  },

  // === 股东群 - docx ===
  "关于千路商事株式会社召开股东会的通知(草案)2019-11-25.docx": {
    uploaded: true, type: "other",
    storagePath: "shareholder_meeting_notice_draft_20191125.docx",
    aliases: ["股东会通知草案", "2019年11月25日股东会通知草案", "关于千路商事召开股东会的通知草案"]
  },

  // ============================================================
  // === 2019年11月14日 私设审判环境证据 ===
  // ============================================================
  "2019年11月14日員昊与凃云峰微信记录": {
    uploaded: true, type: "image",
    storagePath: "wechat_yuanhao_tu_20191114.png",
    aliases: ["员昊与凃云峰11月14日微信记录", "11月14日私设审判微信证据-凃云峰"]
  },
  "2019年11月14日員昊与吕伟麟微信记录": {
    uploaded: true, type: "image",
    storagePath: "wechat_yuanhao_lu_20191114.png",
    aliases: ["员昊与吕伟麟11月14日微信记录", "11月14日私设审判微信证据-吕伟麟"]
  },

  // ============================================================
  // === 致歉信 & 律师函 ===
  // ============================================================
  "致歉信20191212": {
    uploaded: true, type: "pdf",
    storagePath: "apology_letter_20191212.pdf",
    aliases: ["致歉信", "2019年12月12日致歉信", "致歉信20191213", "员昊等三人致歉信"]
  },
  "2019年12月10日員昊等三人律师函日语版": {
    uploaded: true, type: "image",
    storagePath: "lawyer_letter_yuanhao_20191210_jp.jpg",
    aliases: ["员昊等三人律师函", "12月10日律师函", "员昊律师函日语版"]
  },

  // === 刑事控告证据说明（简易版）===
  "刑事控告证据说明简易版": {
    uploaded: true, type: "html",
    storagePath: "criminal_complaint_simplified.html",
    aliases: ["刑事控告证据说明（简易版）", "简易版证据说明", "刑事控告简易版"]
  },

  // === 民事检察监督申请书（检察院版）===
  "民事检察监督申请书": {
    uploaded: true, type: "html",
    storagePath: "procuratorate_supervision_application.html",
    aliases: ["检察院版", "民事诉讼监督申请书", "检察监督申请书"]
  },

  // === 刑事控告状（公安版）===
  "刑事控告状": {
    uploaded: true, type: "html",
    storagePath: "criminal_complaint_police.html",
    aliases: ["公安版", "刑事控告状公安版", "经侦控告状"]
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
