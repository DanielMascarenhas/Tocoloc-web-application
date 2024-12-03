package com.backend.backend.controller;

import com.backend.backend.dto.ReservaDTO;
import com.backend.backend.dto.ReservaRequest;
import com.backend.backend.entity.Pessoa;
import com.backend.backend.entity.Reserva;
import com.backend.backend.repository.PessoaRepository;
import com.backend.backend.repository.ReservaRepository;
import com.backend.backend.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    // Criar uma nova reserva
    @PostMapping("/reservar")
    public ResponseEntity<Map<String, Object>> criarReserva(@RequestBody ReservaRequest reservaRequest) {
        try {
            // Chama o serviço para criar a reserva
            Reserva reserva = reservaService.criarReserva(
                    reservaRequest.getLocalId(),
                    reservaRequest.getStartDate(),
                    reservaRequest.getEndDate(),
                    reservaRequest.getStartTime(),
                    reservaRequest.getEndTime(),
                    reservaRequest.getPessoaId()
            );

            // Prepara a resposta de sucesso
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Reserva realizada com sucesso.");
            response.put("reservaId", reserva.getId()); // Retorna o ID da reserva criada, se necessário

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            // Prepara a resposta de erro
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", e.getMessage());

            return ResponseEntity.badRequest().body(errorResponse);
        }
    }


    // Listar reservas por pessoa (userId)
    @GetMapping
    public List<ReservaDTO> listarReservasPorPessoa(@RequestParam Long userId) {
        return reservaService.listarReservasPorPessoa(userId);
    }

    // Cancelar uma reserva
    @DeleteMapping("/{id}")
    public void cancelarReserva(@PathVariable Long id) {
        reservaService.cancelarReserva(id);
    }

    @GetMapping("/listar")
    public List<Map<String, Object>> listarReservas() {
        return reservaRepository.findAll().stream().map(reserva -> {
            Map<String, Object> reservaDto = new HashMap<>();
            reservaDto.put("id", reserva.getId());
            reservaDto.put("localNome", reserva.getLocal().getNome());
            reservaDto.put("dataInicio", reserva.getDataInicio());
            reservaDto.put("dataFim", reserva.getDataFim());
            reservaDto.put("pessoaNome", reserva.getPessoa().getNome()); // Adiciona o nome da pessoa
            return reservaDto;
        }).collect(Collectors.toList());
    }




}
