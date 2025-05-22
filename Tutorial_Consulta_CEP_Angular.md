
# Tutorial: Aplicação Angular para Consulta de CEP

Este tutorial ensina a criar uma aplicação Angular para consulta de CEP usando a API pública ViaCEP. A aplicação inclui um formulário para entrada de CEP, consulta à API e exibição dos dados de endereço retornados.

---

## Pré-requisitos
Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) e o [Angular CLI](https://angular.io/cli) instalados.

---

## Passo 1: Criar o Projeto Angular

1. No terminal, execute o comando abaixo para criar um novo projeto Angular chamado `consulta-cep`:

    ```bash
    ng new consulta-cep
    ```

2. Escolha as opções conforme solicitado (habilitar roteamento e escolha de estilo).

3. Após a criação, entre no diretório do projeto:

    ```bash
    cd consulta-cep
    ```

---

## Passo 2: Configuração do HttpClientModule

Para fazer chamadas HTTP, precisamos importar o `HttpClientModule`.

1. Abra `src/app/app.module.ts` e adicione o seguinte código:

    ```typescript
    import { HttpClientModule } from '@angular/common/http';
    ```

2. No array `imports`, adicione `HttpClientModule` para habilitar o uso de HTTP em toda a aplicação:

    ```typescript
    imports: [
        BrowserModule,
        HttpClientModule
    ]
    ```

---

## Passo 3: Criar o Serviço de Consulta de CEP

1. No terminal, crie o serviço de consulta de CEP com o seguinte comando:

    ```bash
    ng generate service cep
    ```

2. Abra o arquivo `src/app/cep.service.ts` e adicione o código:

    ```typescript
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';
    import { Endereco } from './endereco.interface';

    @Injectable({
        providedIn: 'root'
    })
    export class CepService {
        private apiUrl = 'https://viacep.com.br/ws';

        constructor(private http: HttpClient) {}

        buscarCep(cep: string): Observable<Endereco> {
            const url = `${this.apiUrl}/${cep}/json/`;
            return this.http.get<Endereco>(url);
        }
    }
    ```

**Explicação do Código:**

- `HttpClient` permite que o Angular faça chamadas HTTP.
- `apiUrl` define a URL base da API.
- `buscarCep` é um método que faz uma requisição GET para buscar o CEP na API.

---

## Passo 4: Criar a Interface Endereco

Para organizar os dados retornados pela API, vamos definir uma interface `Endereco`.

1. Crie o arquivo `src/app/endereco.interface.ts` e adicione o código:

    ```typescript
    export interface Endereco {
        cep: string;
        logradouro: string;
        complemento: string;
        bairro: string;
        localidade: string;
        uf: string;
        ibge: string;
        gia: string;
        ddd: string;
        siafi: string;
    }
    ```

**Explicação:**

A interface define todos os campos de dados retornados pela API, facilitando o uso dos dados no projeto.

---

## Passo 5: Criar o Componente de Consulta de CEP

1. No terminal, crie o componente de consulta de CEP:

    ```bash
    ng generate component consulta-cep
    ```

2. No arquivo `src/app/consulta-cep/consulta-cep.component.ts`, adicione o seguinte código:

    ```typescript
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
    ```

**Explicação do Código:**

- `consultarCep` consulta o CEP e armazena o resultado em `endereco`.
- `erro` é usada para exibir uma mensagem em caso de erro.

---

## Passo 6: Criar o Formulário e a Exibição dos Dados

1. No arquivo `src/app/consulta-cep/consulta-cep.component.html`, adicione o seguinte código:

    ```html
    <div class="consulta-cep-form container mt-5">
      <h2 class="text-center mb-4">Consulta de CEP</h2>

      <div *ngIf="erro" class="alert alert-danger" role="alert">
        {{ erro }}
      </div>

      <form (ngSubmit)="consultarCep()" class="row g-3">
        <div class="col-md-8 offset-md-2">
          <label for="cep" class="form-label">Digite o CEP:</label>
          <input type="text" id="cep" [(ngModel)]="cep" name="cep" required maxlength="8" pattern="[0-9]{8}" class="form-control" placeholder="Ex: 01001000" />
        </div>
        <div class="col-md-8 offset-md-2 d-grid">
          <button type="submit" class="btn btn-primary">Consultar</button>
        </div>
      </form>

      <div *ngIf="endereco" class="mt-4">
        <h3>Endereço</h3>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">CEP</th>
              <th scope="col">Logradouro</th>
              <th scope="col">Complemento</th>
              <th scope="col">Bairro</th>
              <th scope="col">Cidade</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ endereco.cep }}</td>
              <td>{{ endereco.logradouro }}</td>
              <td>{{ endereco.complemento || 'Não disponível' }}</td>
              <td>{{ endereco.bairro }}</td>
              <td>{{ endereco.localidade }}</td>
              <td>{{ endereco.uf }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    ```

**Explicação do Código:**

- Formulário permite ao usuário inserir um CEP.
- Tabela exibe os dados retornados da API de forma organizada.

---

## Passo 7: Testar a Aplicação

1. Execute o projeto com o comando:

    ```bash
    ng serve
    ```

2. Abra `http://localhost:4200` no navegador.

3. Digite um CEP e veja os dados retornados da API sendo exibidos na tabela.

---

## Conclusão

Parabéns! Agora você tem uma aplicação Angular funcional que consulta o CEP e exibe os dados retornados da API ViaCEP.
