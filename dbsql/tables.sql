CREATE TABLE IF NOT EXISTS `sys_test_table` (
        id BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
        name VARCHAR(32) NOT NULL COMMENT '名称',
        PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8