# Gerenciador de Projetos

Aplicação web para cadastro e organização de projetos. Permite criar, editar, excluir e favoritar projetos, além de aplicar filtros, ordenação e busca.

## Tecnologias usadas

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) para gerenciamento de estado
- [Vue Router](https://router.vuejs.org/) para navegação
- [Tailwind CSS](https://tailwindcss.com/) para estilos
- [Tabler Icons](https://tabler.io/icons) para ícones

## Funcionalidades

- Criar e editar projetos com:
  - Nome do projeto
  - Nome do cliente
  - Datas de início e fim
  - Imagem de capa (opcional)
- Excluir projetos com modal de confirmação
- Marcar e filtrar apenas favoritos
- Ordenar por nome, data de início ou data de término
- Busca por nome do projeto (com histórico, sugestões e remoção de termos)
- Dados persistidos no `localStorage`

## Instalação e uso

### Instale as dependências

```bash
npm install
```

### Execute em ambiente de desenvolvimento

```bash
npm run dev
```

### Build para produção

```bash
npm run build
```

### Pré-visualizar o build

```bash
npm run preview
```

## Estrutura principal do projeto

```bash
src/
  assets/         # imagens e ícones
  components/     # componentes reutilizáveis (UI e formulários)
  stores/         # Pinia stores (projetos, busca, etc)
  types/          # tipagens TypeScript
  utils/          # funções utilitárias (datas, strings)
  views/          # páginas principais
  main.ts         # ponto de entrada
```

## Observações

- O sistema não possui backend: os dados ficam apenas no navegador via `localStorage`.
- A busca mantém um histórico local que sugere termos já pesquisados e permite remover itens individualmente.
- Para resetar os dados, limpe o armazenamento local do navegador.

