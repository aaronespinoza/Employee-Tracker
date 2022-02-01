DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  INDEX role_ind (role_id),
 FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
-- CREATE TABLE employee (
--   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   first_name VARCHAR(30),
--   last_name VARCHAR(30),
--   role_id INT,
--   manager_id INT,
--   FOREIGN KEY (role_id)
--   REFERENCES role(id)
--   ON DELETE SET NULL
--   FOREIGN KEY (manager_id)
--   REFERENCES employee(id)
--   ON DELETE SET NULL
-- );