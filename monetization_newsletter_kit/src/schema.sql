-- Cloudflare D1 SQL Schema: Newsletter Retainers, Invoices, and Sponsorship Contracts
-- Tables: newsletter_clients, retainer_contracts, invoices, sponsorship_bookings

CREATE TABLE IF NOT EXISTS newsletter_clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_name TEXT NOT NULL,
  client_email TEXT UNIQUE NOT NULL,
  company_domain TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS retainer_contracts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER REFERENCES newsletter_clients(id),
  retainer_tier TEXT NOT NULL CHECK (retainer_tier IN ('starter', 'growth', 'enterprise_network')),
  monthly_rate_usd REAL NOT NULL,
  start_date DATE NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_number TEXT UNIQUE NOT NULL,
  client_id INTEGER REFERENCES newsletter_clients(id),
  amount_usd REAL NOT NULL,
  amount_inr REAL NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  payment_method TEXT,
  issued_at DATE NOT NULL,
  due_at DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS sponsorship_bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER REFERENCES newsletter_clients(id),
  issue_number INTEGER NOT NULL,
  placement_slot TEXT NOT NULL,
  price_usd REAL NOT NULL,
  status TEXT DEFAULT 'confirmed',
  booked_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
