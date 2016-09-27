
drop database if exists administracion;

create database administracion;

use administracion;

create table administrador(
  name varchar(20),
  username varchar(20),
  pass varchar(15),
  primary key(username)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into administrador(name, username, pass) values
  ('Jeison','yeison94','12345');
