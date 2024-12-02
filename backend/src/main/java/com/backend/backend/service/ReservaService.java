package com.backend.backend.service;

import com.backend.backend.dto.*;
import com.backend.backend.entity.Local;
import com.backend.backend.entity.Pessoa;
import com.backend.backend.entity.Reserva;
import com.backend.backend.repository.LocalRepository;
import com.backend.backend.repository.PessoaRepository;
import com.backend.backend.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private LocalRepository localRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    public Reserva criarReserva(Long localId, String startDate, String endDate, String startTime, String endTime, Long pessoaId) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime startDateTime = LocalDateTime.parse(startDate + " " + startTime, formatter);
        LocalDateTime endDateTime = LocalDateTime.parse(endDate + " " + endTime, formatter);

        if (endDateTime.isBefore(startDateTime)) {
            throw new RuntimeException("A data/hora de término deve ser posterior à data/hora de início.");
        }

        Local local = localRepository.findById(localId)
                .orElseThrow(() -> new RuntimeException("Local não encontrado."));

        Pessoa pessoa = pessoaRepository.findById(pessoaId)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada."));

        boolean conflito = reservaRepository.existsByLocalAndDataInicioLessThanEqualAndDataFimGreaterThanEqual(
                local, endDateTime, startDateTime
        );

        if (conflito) {
            throw new RuntimeException("Conflito de reserva: já existe uma reserva para este local neste intervalo de tempo.");
        }

        Reserva reserva = new Reserva();
        reserva.setLocal(local);
        reserva.setPessoa(pessoa);
        reserva.setDataInicio(startDateTime);
        reserva.setDataFim(endDateTime);

        return reservaRepository.save(reserva);
    }



    public List<Reserva> listarReservasPorLocal(Long localId) {
        Local local = localRepository.findById(localId)
                .orElseThrow(() -> new RuntimeException("Local não encontrado."));
        return reservaRepository.findByLocal(local);
    }



    public List<ReservaDTO> listarReservasPorPessoa(Long pessoaId) {
        Pessoa pessoa = this.pessoaRepository.findById(pessoaId)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada."));

        // Mapeando Reservas para DTO com Collectors.toList()
        return this.reservaRepository.findByPessoa(pessoa).stream()
                .map(reserva -> new ReservaDTO(
                        reserva.getId(),
                        reserva.getLocal().getId(),
                        reserva.getLocal().getNome(), // Supondo que Local tenha um campo "nome"
                        reserva.getDataInicio().toString(),
                        reserva.getDataFim().toString()
                ))
                .collect(Collectors.toList()); // Usando Collectors.toList()
    }

}
