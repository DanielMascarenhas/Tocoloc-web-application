package com.backend.backend.service;

import com.backend.backend.entity.Local;
import com.backend.backend.entity.Reserva;
import com.backend.backend.repository.LocalRepository;
import com.backend.backend.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocalService {

    @Autowired
    private LocalRepository localRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    public List<Local> listarTodos() {
        return localRepository.findAll();
    }

    public Local salvarLocal(Local local) {
        return localRepository.save(local); // Salva o local no banco de dados
    }

    public void excluirLocal(Long localId) {
        Local local = localRepository.findById(localId)
                .orElseThrow(() -> new RuntimeException("Local não encontrado."));

        // Remover reservas associadas ao local
        List<Reserva> reservas = reservaRepository.findByLocal(local);
        for (Reserva reserva : reservas) {
            reservaRepository.delete(reserva);
        }

        // Excluir o local
        localRepository.delete(local);
    }

    public Local atualizarLocal(Long id, Local localAtualizado) {
        // Busca o local existente no banco de dados
        Local localExistente = localRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Local não encontrado."));

        // Atualiza os campos
        localExistente.setNome(localAtualizado.getNome());
        localExistente.setDescricao(localAtualizado.getDescricao());

        // Salva o local atualizado
        return localRepository.save(localExistente);
    }

}
