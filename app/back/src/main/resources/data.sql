insert into ROLE(ID, NAME, USR_LOG_I, USR_LOG_U)
values ('d46082e1-3cb9-410a-86f2-45437ad75c9b', 'USER', '7924d3a3-15de-4cd1-922a-9f7f802cb425',
        '7924d3a3-15de-4cd1-922a-9f7f802cb425'),
       ('4cb1be1f-81f2-4afa-9db5-d9b93b6c396d', 'ANONYMOUS', '7924d3a3-15de-4cd1-922a-9f7f802cb425',
        '7924d3a3-15de-4cd1-922a-9f7f802cb425'),
       ('94fad41f-f298-4fcd-b0e4-e6c8001585a4', 'ADMIN', '7924d3a3-15de-4cd1-922a-9f7f802cb425',
        '7924d3a3-15de-4cd1-922a-9f7f802cb425');

insert into USER(ID, NAME, EMAIL, PASSWORD, ROLE_ID, USR_LOG_I, USR_LOG_U)
values ('7924d3a3-15de-4cd1-922a-9f7f802cb425', 'Phat Duong', 'beebapcay@gmail.com',
        '$2a$12$uatwy4.ZGwpFQxP.WuueaO4D1IjFrtiR1V175NdMjYCuCqN.CXFua', '94fad41f-f298-4fcd-b0e4-e6c8001585a4',
        '7924d3a3-15de-4cd1-922a-9f7f802cb425', '7924d3a3-15de-4cd1-922a-9f7f802cb425');


