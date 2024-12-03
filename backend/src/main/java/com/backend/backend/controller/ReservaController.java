package com.backend.backend.controller;

import com.backend.backend.dto.ReservaDTO;
import com.backend.backend.dto.ReservaRequest;
import com.backend.backend.entity.Reserva;
import com.backend.backend.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    // Criar uma nova reserva
    @PostMapping("/reservar")
    public Reserva criarReserva(@RequestBody ReservaRequest reservaRequest) {
        return reservaService.criarReserva(
                reservaRequest.getLocalId(),
                reservaRequest.getStartDate(),
                reservaRequest.getEndDate(),
                reservaRequest.getStartTime(),
                reservaRequest.getEndTime(),
                reservaRequest.getPessoaId()
        );
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

}
