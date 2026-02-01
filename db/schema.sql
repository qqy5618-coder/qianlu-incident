-- ============================================
-- 千路事件数据库表结构
-- ============================================

-- 1. 案件基本信息表
CREATE TABLE cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  case_number TEXT,
  case_type TEXT,
  status TEXT DEFAULT '进行中',
  summary TEXT,
  total_amount DECIMAL(15,2),
  currency TEXT DEFAULT 'CNY',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. 涉案人员表
CREATE TABLE parties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL, -- '嫌疑人' | '受害人' | '证人' | '律师'
  title TEXT, -- 职务
  company TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. 时间线事件表
CREATE TABLE timeline_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  event_date DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT, -- '资产转移' | '法律程序' | '公司变动' | '证据'
  importance TEXT DEFAULT 'normal', -- 'critical' | 'high' | 'normal'
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. 证据文件表
CREATE TABLE evidence (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_name TEXT,
  file_type TEXT, -- 'pdf' | 'image' | 'video' | 'document'
  storage_path TEXT, -- Supabase Storage 路径
  storage_url TEXT, -- 完整访问 URL
  description TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. 损失清单表
CREATE TABLE losses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  description TEXT,
  amount DECIMAL(15,2),
  currency TEXT DEFAULT 'CNY',
  evidence_refs TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 启用 Row Level Security (RLS)
-- ============================================
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE losses ENABLE ROW LEVEL SECURITY;

-- 允许公开读取（网站前端展示用）
CREATE POLICY "Allow public read" ON cases FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON parties FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON timeline_events FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON evidence FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON losses FOR SELECT USING (true);

-- 仅 service_role 可以写入（后台管理用）
CREATE POLICY "Allow service write" ON cases FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow service write" ON parties FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow service write" ON timeline_events FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow service write" ON evidence FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow service write" ON losses FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 插入初始案件数据
-- ============================================
INSERT INTO cases (title, case_number, case_type, status, summary, total_amount, currency)
VALUES (
  '千路商事株式会社恶意虚假诉讼案',
  '(2022)湛仲字第56号',
  '恶意虚假诉讼',
  '进行中',
  '千路商事株式会社法定代表人凃云峰伙同吕伟麟、蔡启涛等人，通过虚构债务纠纷、操纵仲裁程序，非法侵占公司资产并迫害举报人员昊、邱千依。',
  2138420,
  'CNY'
);
