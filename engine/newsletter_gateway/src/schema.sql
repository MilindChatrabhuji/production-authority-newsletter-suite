-- Cloudflare D1 Database Schema: Authority Newsletter & Sponsorship Gateway
-- Tables: subscribers, issues, sponsors, clicks, rate_cards

CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unconfirmed', 'churn_risk', 'unsubscribed')),
  source_referral TEXT DEFAULT 'direct',
  consecutive_unopened_issues INTEGER DEFAULT 0,
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_opened_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS issues (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  issue_number INTEGER UNIQUE NOT NULL,
  title TEXT NOT NULL,
  executive_summary TEXT,
  published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  sent_count INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS sponsors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sponsor_name TEXT NOT NULL,
  sponsor_slug TEXT UNIQUE NOT NULL,
  contact_email TEXT NOT NULL,
  placement_slot TEXT CHECK (placement_slot IN ('header_primary', 'mid_content_featured', 'footer_bullet', 'exclusive_takeover')),
  rate_tier TEXT DEFAULT 'starter',
  fee_usd REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clicks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sponsor_id INTEGER NOT NULL REFERENCES sponsors(id),
  issue_number INTEGER NOT NULL,
  token TEXT NOT NULL,
  destination_url TEXT NOT NULL,
  user_ip_hash TEXT,
  clicked_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rate_cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tier_name TEXT NOT NULL,
  price_issue_usd REAL NOT NULL,
  price_month_usd REAL NOT NULL,
  slots_available INTEGER DEFAULT 2,
  is_active INTEGER DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Rate Cards
INSERT OR IGNORE INTO rate_cards (tier_name, price_issue_usd, price_month_usd, slots_available) VALUES
('Starter Placement', 300.0, 1000.0, 2),
('Growth Partner', 250.0, 1000.0, 1),
('Network Exclusive', 750.0, 2500.0, 1);
