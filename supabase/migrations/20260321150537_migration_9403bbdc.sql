-- Core tracking tables for Yusra's Manager

-- Family members table (extends profiles)
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('parent', 'grandparent', 'aunt', 'uncle', 'other')),
  permissions TEXT NOT NULL CHECK (permissions IN ('full', 'view', 'emergency')),
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Baby profile (Yusra)
CREATE TABLE babies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  birth_weight NUMERIC,
  birth_length NUMERIC,
  birth_head_circumference NUMERIC,
  gender TEXT CHECK (gender IN ('female', 'male', 'other')),
  blood_type TEXT,
  photo_url TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feeding tracking
CREATE TABLE feedings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  baby_id UUID REFERENCES babies(id) ON DELETE CASCADE,
  feeding_type TEXT NOT NULL CHECK (feeding_type IN ('breast', 'bottle', 'solid')),
  side TEXT CHECK (side IN ('left', 'right', 'both')),
  duration_minutes INTEGER,
  amount_ml NUMERIC,
  food_description TEXT,
  notes TEXT,
  feeding_time TIMESTAMP WITH TIME ZONE NOT NULL,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sleep tracking
CREATE TABLE sleep_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  baby_id UUID REFERENCES babies(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  quality TEXT CHECK (quality IN ('excellent', 'good', 'fair', 'poor')),
  location TEXT,
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Diaper changes
CREATE TABLE diaper_changes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  baby_id UUID REFERENCES babies(id) ON DELETE CASCADE,
  change_type TEXT NOT NULL CHECK (change_type IN ('wet', 'dirty', 'both', 'dry')),
  has_rash BOOLEAN DEFAULT false,
  rash_severity TEXT CHECK (rash_severity IN ('none', 'mild', 'moderate', 'severe')),
  brand TEXT,
  notes TEXT,
  change_time TIMESTAMP WITH TIME ZONE NOT NULL,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Growth measurements
CREATE TABLE growth_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  baby_id UUID REFERENCES babies(id) ON DELETE CASCADE,
  measurement_date DATE NOT NULL,
  weight_kg NUMERIC,
  length_cm NUMERIC,
  head_circumference_cm NUMERIC,
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Health records
CREATE TABLE health_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  baby_id UUID REFERENCES babies(id) ON DELETE CASCADE,
  record_type TEXT NOT NULL CHECK (record_type IN ('symptom', 'medication', 'doctor_visit', 'temperature', 'other')),
  title TEXT NOT NULL,
  description TEXT,
  temperature_celsius NUMERIC,
  medication_name TEXT,
  dosage TEXT,
  doctor_name TEXT,
  hospital TEXT,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'emergency')),
  record_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EPI vaccinations (Bangladesh schedule)
CREATE TABLE vaccinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  baby_id UUID REFERENCES babies(id) ON DELETE CASCADE,
  vaccine_name TEXT NOT NULL,
  scheduled_date DATE,
  administered_date DATE,
  location TEXT,
  batch_number TEXT,
  notes TEXT,
  is_completed BOOLEAN DEFAULT false,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Milestones
CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  baby_id UUID REFERENCES babies(id) ON DELETE CASCADE,
  milestone_type TEXT NOT NULL CHECK (milestone_type IN ('physical', 'cognitive', 'social', 'language', 'custom')),
  title TEXT NOT NULL,
  description TEXT,
  expected_age_months INTEGER,
  achieved_date DATE,
  photo_url TEXT,
  video_url TEXT,
  is_achieved BOOLEAN DEFAULT false,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Memory vault
CREATE TABLE memories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  baby_id UUID REFERENCES babies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  memory_type TEXT CHECK (memory_type IN ('photo', 'video', 'note', 'milestone')),
  media_url TEXT,
  tags TEXT[],
  memory_date DATE NOT NULL,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat conversations with AI assistant
CREATE TABLE chat_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  baby_id UUID REFERENCES babies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  message TEXT NOT NULL,
  response TEXT,
  language TEXT CHECK (language IN ('en', 'bn')),
  is_emergency BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shopping lists
CREATE TABLE shopping_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  baby_id UUID REFERENCES babies(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  category TEXT CHECK (category IN ('diapers', 'formula', 'food', 'clothing', 'medical', 'toys', 'other')),
  quantity INTEGER,
  is_purchased BOOLEAN DEFAULT false,
  estimated_cost NUMERIC,
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Family messages/notes
CREATE TABLE family_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  baby_id UUID REFERENCES babies(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id),
  message_type TEXT CHECK (message_type IN ('text', 'voice', 'video')),
  content TEXT,
  media_url TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE babies ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sleep_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE diaper_changes ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE vaccinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for family_members
CREATE POLICY "Users can view family members" ON family_members FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Users can insert family members" ON family_members FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Users can update family members" ON family_members FOR UPDATE USING (auth.uid() = profile_id);

-- RLS Policies for babies
CREATE POLICY "Users can view babies they have access to" ON babies FOR SELECT USING (
  auth.uid() IN (SELECT profile_id FROM family_members WHERE EXISTS (SELECT 1 FROM babies b WHERE b.id = babies.id))
);
CREATE POLICY "Users can insert babies" ON babies FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update babies" ON babies FOR UPDATE USING (auth.uid() = created_by);

-- RLS Policies for tracking tables (feedings, sleep, diaper, growth, health)
CREATE POLICY "Users can view feedings" ON feedings FOR SELECT USING (
  baby_id IN (SELECT id FROM babies WHERE created_by = auth.uid())
);
CREATE POLICY "Users can insert feedings" ON feedings FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view sleep sessions" ON sleep_sessions FOR SELECT USING (
  baby_id IN (SELECT id FROM babies WHERE created_by = auth.uid())
);
CREATE POLICY "Users can insert sleep sessions" ON sleep_sessions FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update sleep sessions" ON sleep_sessions FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can view diaper changes" ON diaper_changes FOR SELECT USING (
  baby_id IN (SELECT id FROM babies WHERE created_by = auth.uid())
);
CREATE POLICY "Users can insert diaper changes" ON diaper_changes FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view growth records" ON growth_records FOR SELECT USING (
  baby_id IN (SELECT id FROM babies WHERE created_by = auth.uid())
);
CREATE POLICY "Users can insert growth records" ON growth_records FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view health records" ON health_records FOR SELECT USING (
  baby_id IN (SELECT id FROM babies WHERE created_by = auth.uid())
);
CREATE POLICY "Users can insert health records" ON health_records FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view vaccinations" ON vaccinations FOR SELECT USING (
  baby_id IN (SELECT id FROM babies WHERE created_by = auth.uid())
);
CREATE POLICY "Users can insert vaccinations" ON vaccinations FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update vaccinations" ON vaccinations FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can view milestones" ON milestones FOR SELECT USING (
  baby_id IN (SELECT id FROM babies WHERE created_by = auth.uid())
);
CREATE POLICY "Users can insert milestones" ON milestones FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update milestones" ON milestones FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can view memories" ON memories FOR SELECT USING (
  baby_id IN (SELECT id FROM babies WHERE created_by = auth.uid())
);
CREATE POLICY "Users can insert memories" ON memories FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view chat conversations" ON chat_conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert chat conversations" ON chat_conversations FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view shopping items" ON shopping_items FOR SELECT USING (
  baby_id IN (SELECT id FROM babies WHERE created_by = auth.uid())
);
CREATE POLICY "Users can insert shopping items" ON shopping_items FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update shopping items" ON shopping_items FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Users can delete shopping items" ON shopping_items FOR DELETE USING (auth.uid() = created_by);

CREATE POLICY "Users can view family messages" ON family_messages FOR SELECT USING (
  baby_id IN (SELECT id FROM babies WHERE created_by = auth.uid())
);
CREATE POLICY "Users can insert family messages" ON family_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Create indexes for performance
CREATE INDEX idx_feedings_baby_time ON feedings(baby_id, feeding_time DESC);
CREATE INDEX idx_sleep_baby_time ON sleep_sessions(baby_id, start_time DESC);
CREATE INDEX idx_diaper_baby_time ON diaper_changes(baby_id, change_time DESC);
CREATE INDEX idx_growth_baby_date ON growth_records(baby_id, measurement_date DESC);
CREATE INDEX idx_health_baby_date ON health_records(baby_id, record_date DESC);
CREATE INDEX idx_vaccinations_baby_date ON vaccinations(baby_id, scheduled_date);
CREATE INDEX idx_milestones_baby ON milestones(baby_id, achieved_date DESC);
CREATE INDEX idx_memories_baby_date ON memories(baby_id, memory_date DESC);