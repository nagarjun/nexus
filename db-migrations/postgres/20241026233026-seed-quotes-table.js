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
    -- Get or create the author
    DO $$
    DECLARE
      author_id UUID;
      category_id UUID;
    BEGIN
      author_id := get_or_create_author('Robert Greene');
      category_id := get_or_create_category('Leadership');

      -- Insert the 48 Laws of Power
      INSERT INTO "quotes" (quote, "authorId", source)
      VALUES
        ('Law 1: Never outshine the master', author_id, 'The 48 Laws of Power'),
        ('Law 2: Never put too much trust in friends, learn how to use enemies', author_id, 'The 48 Laws of Power'),
        ('Law 3: Conceal your intentions', author_id, 'The 48 Laws of Power'),
        ('Law 4: Always say less than necessary', author_id, 'The 48 Laws of Power'),
        ('Law 5: So much depends on reputation - guard it with your life', author_id, 'The 48 Laws of Power'),
        ('Law 6: Court attention at all cost', author_id, 'The 48 Laws of Power'),
        ('Law 7: Get others to do the work for you, but always take the credit', author_id, 'The 48 Laws of Power'),
        ('Law 8: Make other people come to you - use bait if necessary', author_id, 'The 48 Laws of Power'),
        ('Law 9: Win through your actions, never through argument', author_id, 'The 48 Laws of Power'),
        ('Law 10: Infection: avoid the unhappy and unlucky', author_id, 'The 48 Laws of Power'),
        ('Law 11: Learn to keep people dependent on you', author_id, 'The 48 Laws of Power'),
        ('Law 12: Use selective honesty and generosity to disarm your victim', author_id, 'The 48 Laws of Power'),
        ('Law 13: When asking for help, appeal to people''s self-interest, never to their mercy or gratitude', author_id, 'The 48 Laws of Power'),
        ('Law 14: Pose as a friend, work as a spy', author_id, 'The 48 Laws of Power'),
        ('Law 15: Crush your enemies totally', author_id, 'The 48 Laws of Power'),
        ('Law 16: Use absence to increase respect and honor', author_id, 'The 48 Laws of Power'),
        ('Law 17: Keep others in suspended terror: cultivate an air of unpredictability', author_id, 'The 48 Laws of Power'),
        ('Law 18: Do not build fortresses to protect yourself - isolation is dangerous', author_id, 'The 48 Laws of Power'),
        ('Law 19: Know who you''re dealing with - do not offend the wrong person', author_id, 'The 48 Laws of Power'),
        ('Law 20: Do not commit to anyone', author_id, 'The 48 Laws of Power'),
        ('Law 21: Play a sucker to catch a sucker - seem dumber than your mark', author_id, 'The 48 Laws of Power'),
        ('Law 22: Use the surrender tactic: transform weakness into power', author_id, 'The 48 Laws of Power'),
        ('Law 23: Concentrate your forces', author_id, 'The 48 Laws of Power'),
        ('Law 24: Play the perfect courtier', author_id, 'The 48 Laws of Power'),
        ('Law 25: Re-create yourself', author_id, 'The 48 Laws of Power'),
        ('Law 26: Keep your hands clean', author_id, 'The 48 Laws of Power'),
        ('Law 27: Play on people''s need to believe to create a cultlike following', author_id, 'The 48 Laws of Power'),
        ('Law 28: Enter action with boldness', author_id, 'The 48 Laws of Power'),
        ('Law 29: Plan all the way to the end', author_id, 'The 48 Laws of Power'),
        ('Law 30: Make your accomplishments seem effortless', author_id, 'The 48 Laws of Power'),
        ('Law 31: Control the options: get others to play with the cards you deal', author_id, 'The 48 Laws of Power'),
        ('Law 32: Play to people''s fantasies', author_id, 'The 48 Laws of Power'),
        ('Law 33: Discover each man''s thumbscrew', author_id, 'The 48 Laws of Power'),
        ('Law 34: Be royal in your own fashion: act like a king to be treated like one', author_id, 'The 48 Laws of Power'),
        ('Law 35: Master the art of timing', author_id, 'The 48 Laws of Power'),
        ('Law 36: Disdain things you cannot have: ignoring them is the best revenge', author_id, 'The 48 Laws of Power'),
        ('Law 37: Create compelling spectacles', author_id, 'The 48 Laws of Power'),
        ('Law 38: Think as you like but behave like others', author_id, 'The 48 Laws of Power'),
        ('Law 39: Stir up waters to catch fish', author_id, 'The 48 Laws of Power'),
        ('Law 40: Despise the free lunch', author_id, 'The 48 Laws of Power'),
        ('Law 41: Avoid stepping into a great man''s shoes', author_id, 'The 48 Laws of Power'),
        ('Law 42: Strike the shepherd and the sheep will scatter', author_id, 'The 48 Laws of Power'),
        ('Law 43: Work on the hearts and minds of others', author_id, 'The 48 Laws of Power'),
        ('Law 44: Disarm and infuriate with the mirror effect', author_id, 'The 48 Laws of Power'),
        ('Law 45: Preach the need for change, but never reform too much at once', author_id, 'The 48 Laws of Power'),
        ('Law 46: Never appear too perfect', author_id, 'The 48 Laws of Power'),
        ('Law 47: Do not go past the mark you aimed for; in victory, learn when to stop', author_id, 'The 48 Laws of Power'),
        ('Law 48: Assume formlessness', author_id, 'The 48 Laws of Power');

      -- Add the Leadership category to all inserted quotes
      INSERT INTO "quotesCategoriesJunction" ("quoteId", "categoryId")
      SELECT id, category_id FROM "quotes" WHERE source = 'The 48 Laws of Power';
    END $$;
  `)
}

exports.down = function (db) {
  return db.runSql(`
    -- Remove the quotes and their category associations
    DELETE FROM "quotesCategoriesJunction"
    WHERE "quoteId" IN (SELECT id FROM "quotes" WHERE source = 'The 48 Laws of Power');

    DELETE FROM "quotes" WHERE source = 'The 48 Laws of Power';
    DELETE FROM "quoteAuthors" WHERE name = 'Robert Greene';
    DELETE FROM "quoteCategories" WHERE name = 'Leadership';
  `)
}

exports._meta = {
  version: 1,
}
