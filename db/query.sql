SELECT *
FROM role
JOIN department ON department.id = role.department_id;

SELECT *
FROM employee
JOIN role ON role.id = employee.role_id;