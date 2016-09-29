
drop database if exists administracion;

create database administracion;

use administracion;

create table administrador(
  name varchar(20) NOT NULL,
  username varchar(20) NOT NULL,
  pass varchar(15) NOT NULL,
  primary key(username)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table profesores(
  name varchar(20) NOT NULL,
  curso varchar(20) NOT NULL,
  pass varchar(15) NOT NULL,
  primary key(curso)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into administrador(name, username, pass) values
  ('Jeison','yeison94','12345');
