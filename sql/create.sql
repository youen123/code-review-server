create database code_review default character set utf8;

create table User(
  id int auto_increment,
  name varchar(255),
  password varchar(255),
  PRIMARY KEY (id)
);

insert into User (name, password) values ('admin', 'admin');
insert into User (name, password) values ('ylj', 'ylj');

create table Task(
  id int auto_increment,
  title varchar(255),
  description Text(255),
  repo varchar(255),
  sourceBranch varchar(255),
  destBranch varchar(255),
  type int,
  createTime timestamp,
  status int default 0,
  PRIMARY KEY (id)
);

create table Task_User(
  task_id int,
  creator_id int,
  reviewer_id int
)

insert into Task (title, description, repo, sourceBranch, destBranch, type, createtime) values ('fix bug1', '来一段描述', 'repo', 'master', 'branch', 1, '2018-6-12 12:12:12');

create table Repo(
  repo varchar(255),
  local varchar(255),
  PRIMARY KEY (repo)
);

create Table Issue(
  title varchar(255),
  detail varchar(255),
  creator varchar(255),
  solver varchar(255),
  status int default 0
);

create Table Log(
  operator varchar(255),
  operation varchar(255),
  operation_time timestamp
);

insert into Repo (repo, local) values ('git@github.com:youen123/vue-tool.git', 'vue-tool');
insert into Log (operator, operation, operation_time) values ('admin', '创建', '2018-6-6 12:12:12');

create Table Comment(
  creator varchar(255),
  create_time timestamp,
  task_id int,
  content varchar(255),
  type int default 0
)