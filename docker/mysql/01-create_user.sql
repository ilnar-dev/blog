# Used in dev env only, ignore leak password for now
CREATE USER 'blog'@'%' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'blog';
CREATE DATABASE blog;
GRANT ALL PRIVILEGES ON blog.* TO 'blog'@'%';
GRANT SUPER ON *.* TO blog@'%';
FLUSH PRIVILEGES;