import { Component } from '@angular/core';
import { CepService } from '../cep.service';
import { Endereco } from '../endereco.interface';

@Component({
    selector: 'app-consulta-cep',
    templateUrl: './consulta-cep.component.html',
    styleUrls: ['./consulta-cep.component.scss']
})
export class ConsultaCepComponent {
    cep: string = '';
    endereco: Endereco | null = null;
    erro: string | null = null;

    constructor(private cepService: CepService) {}

    consultarCep() {
        this.erro = null;

        if (this.cep.length === 8) {
            this.cepService.buscarCep(this.cep).subscribe({
                next: (dados: Endereco) => {
                    this.endereco = dados;
                    this.cep = '';
                },
                error: () => {
                    this.erro = 'Erro ao consultar o CEP. Verifique o valor digitado e tente novamente.';
                    this.endereco = null;
                }
            });
        } else {
            this.erro = 'Por favor, insira um CEP válido com 8 dígitos.';
        }
    }
}
