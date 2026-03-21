-- Migration 001: Pupil identity and progress tracking
-- Run this in the Supabase SQL editor before deploying the tracking features.

-- Pupils table — one row per device UUID, name set by pupil on first visit
CREATE TABLE IF NOT EXISTS pupils (
  id          UUID        PRIMARY KEY,
  name        TEXT        NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Add tracking columns to existing ma_scores table
ALTER TABLE ma_scores
  ADD COLUMN IF NOT EXISTS pupil_uuid      UUID REFERENCES pupils(id),
  ADD COLUMN IF NOT EXISTS topic_breakdown JSONB;

CREATE INDEX IF NOT EXISTS ma_scores_pupil_uuid_idx ON ma_scores(pupil_uuid);

-- RLS: public can read/write their own scores (existing behaviour unchanged).
-- Service role (used by Edge Functions) bypasses RLS entirely.
