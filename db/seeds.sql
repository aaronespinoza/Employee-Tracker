INSERT INTO department (name)
VALUES("Curator"),
      ("Legal"),
      ("Public Relations"),
      ("Talent");

INSERT INTO role (title, salary)
VALUES("Art Dealer", 96000),
      ("Lawyer", 120000),
      ("Executive", 150000),
      ("Writer", 80000);

INSERT INTO employee (first_name, last_name)
VALUES("Charlotte","York"),
      ("Miranda","Hobbes"),
      ("Samantha","Jones"),
      ("Carrie","Bradshaw");

UPDATE employee SET manager_id = 3
WHERE id = 1 or id = 2 or id = 4;