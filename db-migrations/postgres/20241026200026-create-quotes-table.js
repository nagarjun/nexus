/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict'

var dbm
var type
var seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
}

exports.up = function (db) {
  return db.runSql(`
    -- Create quoteAuthors table
    CREATE TABLE "quoteAuthors" (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) UNIQUE NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    -- Create quoteCategories table
    CREATE TABLE "quoteCategories" (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) UNIQUE NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    -- Create quotes table
    CREATE TABLE "quotes" (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      quote TEXT NOT NULL,
      "authorId" UUID REFERENCES "quoteAuthors"(id),
      source VARCHAR(255),
      url TEXT,
      "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    -- Create junction table for quotes and categories (many-to-many relationship)
    CREATE TABLE "quotesCategoriesJunction" (
      "quoteId" UUID REFERENCES "quotes"(id) ON DELETE CASCADE,
      "categoryId" UUID REFERENCES "quoteCategories"(id) ON DELETE CASCADE,
      PRIMARY KEY ("quoteId", "categoryId")
    );

    -- Create triggers for updating updatedAt
    CREATE TRIGGER update_quoteAuthors_updated_at
    BEFORE UPDATE ON "quoteAuthors"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

    CREATE TRIGGER update_quoteCategories_updated_at
    BEFORE UPDATE ON "quoteCategories"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

    CREATE TRIGGER update_quotes_updated_at
    BEFORE UPDATE ON "quotes"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

    -- Function to insert or get author id
    CREATE OR REPLACE FUNCTION get_or_create_author(author_name VARCHAR(255))
    RETURNS UUID AS $$
    DECLARE
      author_id UUID;
    BEGIN
      SELECT id INTO author_id FROM "quoteAuthors" WHERE name = author_name;
      IF author_id IS NULL THEN
        INSERT INTO "quoteAuthors" (name) VALUES (author_name) RETURNING id INTO author_id;
      END IF;
      RETURN author_id;
    END;
    $$ LANGUAGE plpgsql;

    -- Function to insert or get category id
    CREATE OR REPLACE FUNCTION get_or_create_category(category_name VARCHAR(255))
    RETURNS UUID AS $$
    DECLARE
      category_id UUID;
    BEGIN
      SELECT id INTO category_id FROM "quoteCategories" WHERE name = category_name;
      IF category_id IS NULL THEN
        INSERT INTO "quoteCategories" (name) VALUES (category_name) RETURNING id INTO category_id;
      END IF;
      RETURN category_id;
    END;
    $$ LANGUAGE plpgsql;
  `)
}

exports.down = function (db) {
  return db.runSql(`
    DROP FUNCTION IF EXISTS get_or_create_category(VARCHAR(255));
    DROP FUNCTION IF EXISTS get_or_create_author(VARCHAR(255));
    DROP TRIGGER IF EXISTS update_quotes_updated_at ON "quotes";
    DROP TRIGGER IF EXISTS update_quoteCategories_updated_at ON "quoteCategories";
    DROP TRIGGER IF EXISTS update_quoteAuthors_updated_at ON "quoteAuthors";
    DROP TABLE IF EXISTS "quotesCategoriesJunction";
    DROP TABLE IF EXISTS "quotes";
    DROP TABLE IF EXISTS "quoteCategories";
    DROP TABLE IF EXISTS "quoteAuthors";
  `)
}

exports._meta = {
  version: 1,
}
