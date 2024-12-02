package com.backend.backend.repository;

import com.backend.backend.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    // Verificar se há conflito de reserva pelo ID do local
    boolean existsByLocalIdAndDataHoraInicioLessThanEqualAndDataHoraFimGreaterThanEqual(
            Long localId, LocalDateTime endDateTime, LocalDateTime startDateTime
    );

    // Listar reservas por local
    List<Reserva> findByLocalId(Long localId);

    // Listar reservas por pessoa
    List<Reserva> findByPessoaId(Long pessoaId);
}
