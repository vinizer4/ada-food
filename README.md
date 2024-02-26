# AdaFood

O AdaFood é um aplicativo de delivery que permite aos usuários se cadastrarem e realizarem pedidos.

## Serviços

O projeto é dividido em vários microserviços, incluindo:

- **API Gateway**: Interface de comunicação entre o cliente e os serviços.
- **Auth Service**: Responsável pela criação e verificação de sessões.
- **Address Service**: Permite buscar e salvar endereços para usuários.
- **Register Service**: Serviço para criação de usuários no banco de dados.
- **Order Service**: Permite realizar pedidos e salvá-los em uma tabela específica.
- **Notification Service**: Responsável por enviar notificações via email (simulado, sem conexão SMTP real, mas integrado com RabbitMQ para mensageria).

## Iniciando o Projeto

Para iniciar o projeto, é necessário subir os containers utilizando Docker Compose, que estão localizados na pasta `docker`.

### Pré-Requisitos

- Docker e Docker Compose instalados.
- Node.js instalado para rodar os scripts `npm run dev`.

### Instruções

1. Acesse a pasta de cada serviço e execute o comando `npm run dev` para iniciar o serviço em modo de desenvolvimento.
2. Utilize os arquivos Docker Compose na pasta `docker` para subir as dependências necessárias (como bancos de dados e RabbitMQ).

## Portas dos Serviços

Os serviços estarão disponíveis nas seguintes portas:

- API Gateway: `http://localhost:3000`
- Auth Service: `http://localhost:3004`
- Order Service: `http://localhost:3003`
- Address Service: `http://localhost:3002`
- Register Service: `http://localhost:3001`

## Coleções do Postman

As coleções do Postman para testar os endpoints estão disponíveis na pasta `docs`.

## Autenticação

Para acessar os endpoints que não são relacionados à criação de usuário, é necessário primeiro fazer login no Auth Service através do endpoint:

http://localhost:3000/auth/loginwithemail?email=teste1@teste.com

O token gerado deve ser utilizado no header `Authorization` para acessar os demais endpoints.

Após o login, utilize o token recebido nas demais requisições, adicionando-o ao cabeçalho como `Bearer <token>`.

## Arquitetura e Princípios

O projeto foi desenvolvido seguindo os princípios da Arquitetura Limpa, SOLID e Ports and Adapters, o que permite uma customização dos adaptadores via variáveis de ambiente (`env`). Além disso, a arquitetura de microserviços permite a escalabilidade e a manutenção de cada serviço de forma independente.

## Agradecimentos

Agradecemos a Ada por nos proporcionar a oportunidade de desenvolver este projeto e aprimorar nossas habilidades em desenvolvimento de software.