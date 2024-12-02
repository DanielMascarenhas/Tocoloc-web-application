package com.backend.backend.repository;

import com.backend.backend.entity.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
    /**
     * Busca uma pessoa pelo email e senha.
     *
     * @param email Email da pessoa.
     * @param senha Senha da pessoa.
     * @return Pessoa correspondente ou null se não encontrada.
     */
    Pessoa findByEmailAndSenha(String email, String senha);
}

