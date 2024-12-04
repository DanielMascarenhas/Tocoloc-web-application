DROP DATABASE reservas;

CREATE DATABASE reservas;

USE reservas;

CREATE TABLE local (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT
);

CREATE TABLE pessoa (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    admin BOOLEAN NOT NULL
);

CREATE TABLE reserva (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_pessoa BIGINT NOT NULL,
    id_local BIGINT NOT NULL,
    data_inicio DATETIME NOT NULL,
    data_fim DATETIME NOT NULL,
    CONSTRAINT fk_reserva_pessoa FOREIGN KEY (id_pessoa) REFERENCES pessoa(id),
    CONSTRAINT fk_reserva_local FOREIGN KEY (id_local) REFERENCES local(id)
);

INSERT INTO local (nome, descricao) VALUES
('Parque das Flores', 'Um parque arborizado com muitas flores e trilhas para caminhada.'),
('Praia do Sol', 'Uma praia tranquila com águas cristalinas e areia branca.'),
('Museu da História', 'Museu dedicado à história local, com exposições interativas.'),
('Cafeteria Central', 'Cafeteria aconchegante no centro da cidade, famosa pelo café artesanal.'),
('Estádio Municipal', 'Local para jogos e eventos esportivos, com capacidade para 20 mil pessoas.'),
('Shopping Estrela', 'Shopping moderno com lojas, restaurantes e um cinema.'),
('Teatro das Artes', 'Teatro que oferece peças, musicais e apresentações culturais.'),
('Biblioteca Pública', 'Espaço para leitura e estudo, com um vasto acervo de livros.'),
('Mirante da Serra', 'Ponto turístico com uma vista incrível das montanhas.'),
('Praça da Liberdade', 'Praça histórica com monumentos e áreas verdes.');

INSERT INTO pessoa (nome, email, senha, admin) VALUES
('Alice Silva', 'alice.silva@example.com', 'senha123', false),
('Bruno Oliveira', 'bruno.oliveira@example.com', 'senha456', true),
('Carla Mendes', 'carla.mendes@example.com', 'senha789', false),
('Diego Santos', 'diego.santos@example.com', 'minhaSenha', true),
('Evelyn Rocha', 'evelyn.rocha@example.com', 'segredo123', false);


