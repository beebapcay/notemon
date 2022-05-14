insert into ROLE(ID, NAME, USR_LOG_I, USR_LOG_U)
values ('d46082e1-3cb9-410a-86f2-45437ad75c9b', 'USER', 'Phat Duong', 'Phat Duong'),
       ('4cb1be1f-81f2-4afa-9db5-d9b93b6c396d', 'ANONYMOUS', 'Phat Duong', 'Phat Duong'),
       ('94fad41f-f298-4fcd-b0e4-e6c8001585a4', 'ADMIN', 'Phat Duong', 'Phat Duong');

insert into PERMISSION(ID, CODE, DESCRIPTION, USR_LOG_I, USR_LOG_U)
values ('69c81d37-9041-4c10-ae66-84ddbbce2b1e', 'VIEWER', 'You only can view the document', 'Phat Duong', 'Phat Duong'),
       ('0d63900e-7897-45ad-be77-eb0710ee5fb3', 'COMMENTER', 'You can comment the document', 'Phat Duong',
        'Phat Duong'),
       ('f8f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8', 'EDITOR', 'You can edit the document', 'Phat Duong', 'Phat Duong');

insert into USER(ID, NAME, EMAIL, PASSWORD, ROLE_ID, USR_LOG_I, USR_LOG_U)
values ('7924d3a3-15de-4cd1-922a-9f7f802cb425', 'Phat Duong', 'beebapcay@gmail.com',
        '$2a$10$aS7qA0M6yZ8xTYMZD1cTM.S404slZO6BshIb8p872Rt6DX9d2aNyi', '94fad41f-f298-4fcd-b0e4-e6c8001585a4',
        'Phat Duong', 'Phat Duong');


