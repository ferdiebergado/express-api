CREATE TABLE IF NOT EXISTS `users`
(
  `id`            INT(11) NOT NULL auto_increment ,
  `email`         VARCHAR(255) NOT NULL ,
  `password`      VARCHAR(255) NOT NULL ,  
  `created_at`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`    DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`),
  UNIQUE `idx_email_unique` (`email`(255))
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;