BEGIN;

TRUNCATE TABLE "list", "card", "tag", "card_has_tag";

INSERT INTO "list"
  ("id", "title", "position")
VALUES
  (1, 'TODO', 1),
  (2, 'DOING', 2),
  (3, 'DONE', 3)
;

INSERT INTO "card" 
  ("id", "title", "position", "list_id")
VALUES
  (1, 'user stories', 1, 3),  
  (2, 'wireframe', 1, 2),
  (3, 'maquette', 2, 2),
  (4, 'MCD', 1, 1),
  (5, 'MLD', 2, 1),
  (6, 'MPD', 3, 1)
;

INSERT INTO "tag" 
  ("id", "name", "color")
VALUES 
  (1, 'a valider', '#ba4c0e'),
  (2, 'en validation', '#006dc8'),
  (3, 'validé', '#006600')
;

INSERT INTO "card_has_tag" 
  (card_id, tag_id) 
VALUES 
  (1, 3), 
  (2, 2), 
  (3, 1), 
  (4, 1),
  (5, 1),
  (6, 1)  
;

SELECT setval('list_id_seq', (SELECT MAX(id) from "list")); 
SELECT setval('card_id_seq', (SELECT MAX(id) from "card"));
SELECT setval('tag_id_seq', (SELECT MAX(id) from "tag"));

COMMIT;