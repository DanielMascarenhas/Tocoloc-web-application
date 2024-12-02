package com.backend.backend.repository;

import com.backend.backend.entity.Local;
import com.backend.backend.entity.Pessoa;
import com.backend.backend.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    // Verificar se há conflito de reserva pelo local e intervalo de tempo
    boolean existsByLocalAndDataInicioLessThanEqualAndDataFimGreaterThanEqual(
            Local local, LocalDateTime endDateTime, LocalDateTime startDateTime
    );

    // Listar reservas por local
    List<Reserva> findByLocal(Local local);

    // Listar reservas por pessoa
    List<Reserva> findByPessoa(Pessoa pessoa);
}
