// 证据文件 Supabase URL 映射表
// 所有证据文件都存储在 Supabase Storage，使用英文文件名

const SUPABASE_STORAGE_BASE = 'https://pahyccjqmlkyvbtwjydg.supabase.co/storage/v1/object/public/media';

const EVIDENCE_MAP = {
  // ===== 合同协议类 =====
  '股份转让协议': `${SUPABASE_STORAGE_BASE}/01-share-transfer-agreement.pdf`,
  '2018年借款协议': `${SUPABASE_STORAGE_BASE}/05-loan-agreement-2018.pdf`,
  '2019年借款协议': `${SUPABASE_STORAGE_BASE}/06-loan-agreement-2019.pdf`,
  '债权转让协议': `${SUPABASE_STORAGE_BASE}/16-debt-transfer-luo-cai.pdf`,

  // ===== 审计报告 =====
  '审计报告日文版': `${SUPABASE_STORAGE_BASE}/14-1-audit-report-japanese.pdf`,
  '审计报告中文版': `${SUPABASE_STORAGE_BASE}/14-2-audit-report-chinese.pdf`,

  // ===== 仲裁裁决书 =====
  '湛江仲裁裁决书': `${SUPABASE_STORAGE_BASE}/17-zhanjiang-arbitration-decision.pdf`,
  '撤销仲裁裁定书': `${SUPABASE_STORAGE_BASE}/revoke-arbitration-court-decision.pdf`,

  // ===== 业务指示书（11月9日资产转移） =====
  '业务指示书': `${SUPABASE_STORAGE_BASE}/10-1-business-directive-20191109.pdf`,

  // ===== 微信聊天记录（罗建峰参与证据） =====
  '微信截图6998': `${SUPABASE_STORAGE_BASE}/wechat-luo-6998.png`,
  '微信截图6999': `${SUPABASE_STORAGE_BASE}/wechat-luo-6999.png`,
  '微信截图7001': `${SUPABASE_STORAGE_BASE}/wechat-luo-7001.png`,
  '微信截图7002': `${SUPABASE_STORAGE_BASE}/wechat-luo-7002.png`,
  '微信截图7003': `${SUPABASE_STORAGE_BASE}/wechat-luo-7003.png`,
  '微信截图7004': `${SUPABASE_STORAGE_BASE}/wechat-luo-7004.png`,
  '微信截图7005': `${SUPABASE_STORAGE_BASE}/wechat-luo-7005.png`,

  // ===== 股东会证据 =====
  '第一次股东会': `${SUPABASE_STORAGE_BASE}/11-shareholder-meeting-20191202.pdf`,
  '第二次股东会录音': `${SUPABASE_STORAGE_BASE}/12-shareholder-meeting-20191212.m4a`,

  // ===== 律师函 =====
  '罗建峰律师函2019': `${SUPABASE_STORAGE_BASE}/12-luo-lawyer-letter-20191203.pdf`,
  '罗建峰律师函2021': `${SUPABASE_STORAGE_BASE}/15-luo-lawyer-letter-20211013.jpg`,

  // ===== 爱企查报告 =====
  '爱企查罗建峰': `${SUPABASE_STORAGE_BASE}/aiqicha-luo-jianfeng.pdf`,
  '爱企查蔡启涛': `${SUPABASE_STORAGE_BASE}/aiqicha-cai-qitao.pdf`,
  '爱企查蔡启泳': `${SUPABASE_STORAGE_BASE}/aiqicha-cai-qiyong.pdf`,
  '爱企查吕伟麟': `${SUPABASE_STORAGE_BASE}/aiqicha-lv-weilin.pdf`,

  // ===== 笔迹鉴定 =====
  '笔迹鉴定报告': `${SUPABASE_STORAGE_BASE}/handwriting-analysis.pdf`,

  // ===== 11月14日私设审判 =====
  '员昊凃云峰微信1114': `${SUPABASE_STORAGE_BASE}/wechat-yuanhao-tuyunfeng-20191114.png`,
  '员昊吕伟麟微信1114': `${SUPABASE_STORAGE_BASE}/wechat-yuanhao-lvweilin-20191114.png`,

  // ===== 公司证照 =====
  '千路营业执照': `${SUPABASE_STORAGE_BASE}/04-qianlu-business-license.pdf`,
  '绿牌许可证': `${SUPABASE_STORAGE_BASE}/08-1-green-license.pdf`,
  '股东名簿': `${SUPABASE_STORAGE_BASE}/shareholder-register.pdf`,
  '千寻出资人信息': `${SUPABASE_STORAGE_BASE}/qianxun-investor-info.jpg`,

  // ===== 罗建峰在日本照片 =====
  '罗建峰日本照片1': `${SUPABASE_STORAGE_BASE}/luo-in-japan-1.png`,
  '罗建峰日本照片2': `${SUPABASE_STORAGE_BASE}/luo-in-japan-2.png`,
  '罗建峰日本照片3': `${SUPABASE_STORAGE_BASE}/luo-in-japan-3.png`,
  '罗建峰日本照片4': `${SUPABASE_STORAGE_BASE}/luo-in-japan-4.png`,
  '罗建峰日本照片5': `${SUPABASE_STORAGE_BASE}/luo-in-japan-5.png`,
  '罗建峰日本照片6': `${SUPABASE_STORAGE_BASE}/luo-in-japan-6.png`,
  '罗建峰日本照片7': `${SUPABASE_STORAGE_BASE}/luo-in-japan-7.png`,

  // ===== 百度资料 =====
  '百度罗建峰': `${SUPABASE_STORAGE_BASE}/baidu-luo-jianfeng.png`,

  // ===== 吕伟麟代付证据 =====
  '吕伟麟代付凭证': `${SUPABASE_STORAGE_BASE}/19-1-lv-payment-proof.jpg`,
  '吕伟麟代付声明': `${SUPABASE_STORAGE_BASE}/19-2-lv-statement.jpg`,

  // ===== 护照出入境记录 =====
  '护照记录1': `${SUPABASE_STORAGE_BASE}/passport-record-1.jpg`,
  '护照记录2': `${SUPABASE_STORAGE_BASE}/passport-record-2.jpg`,
  '护照记录3': `${SUPABASE_STORAGE_BASE}/passport-record-3.jpg`,
  '护照记录4': `${SUPABASE_STORAGE_BASE}/passport-record-4.jpg`,

  // ===== 12月14日录音（已上传） =====
  '12月14日录音完整版': `${SUPABASE_STORAGE_BASE}/20191214-recording-full.m4a`,
  '12月14日谈判录音': `${SUPABASE_STORAGE_BASE}/20191214-recording-negotiation.m4a`,

  // ===== 11月9日现场证据（已上传） =====
  '11月9日照片1': `${SUPABASE_STORAGE_BASE}/photo_20191109_1.png`,
  '11月9日照片2': `${SUPABASE_STORAGE_BASE}/photo_20191109_2.png`,
  '11月9日现金照片1': `${SUPABASE_STORAGE_BASE}/IMG_20191109_184950.jpg`,
  '11月9日现金照片2': `${SUPABASE_STORAGE_BASE}/IMG_20191109_185028.jpg`,
  '11月9日照片3': `${SUPABASE_STORAGE_BASE}/scene_photo_20191109_3.png`,
  '11月9日照片4': `${SUPABASE_STORAGE_BASE}/scene_photo_20191109_4.png`,
  '11月9日照片5': `${SUPABASE_STORAGE_BASE}/scene_photo_20191109_5.png`,
  '11月9日视频1': `${SUPABASE_STORAGE_BASE}/VID_20191109_180841.mp4`,
  '11月9日视频2': `${SUPABASE_STORAGE_BASE}/VID_20191109_190317.mp4`,
};

// 获取证据URL的便捷函数
function getEvidenceUrl(name) {
  return EVIDENCE_MAP[name] || null;
}

// 打开证据文件
function openEvidence(name) {
  const url = getEvidenceUrl(name);
  if (url) {
    window.open(url, '_blank');
  } else {
    alert('证据文件未找到: ' + name);
  }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EVIDENCE_MAP, getEvidenceUrl, openEvidence };
}
