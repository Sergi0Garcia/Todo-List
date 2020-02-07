# Todo-List

MySQL DB configuration

```
CREATE TABLE todo_list (
    task_id INT AUTO_INCREMENT,
    task VARCHAR(20),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    PRIMARY KEY(task_id),
    FOREIGN KEY(user_id) REFERENCES user_list(user_id) ON DELETE CASCADE
);

CREATE TABLE user_list (
    user_id INT AUTO_INCREMENT,
    name VARCHAR(20),
    email VARCHAR(20),
    password VARCHAR(20),
    PRIMARY KEY(user_id)
);
```
