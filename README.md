# 🎓 IFMA Prep (AprovaIFMA)

Banco de questões, simulados e plano de estudos para o processo seletivo do IFMA. Funciona direto no navegador com conta obrigatória e pode ser instalado no celular como app. A entrada com e-mail e senha sincroniza o progresso entre aparelhos.

**Demo:** https://github.com/eoshai/ifmaprep

## Recursos

- ▶ Estudar agora: sessão guiada de até 5 questões e 25 minutos, com prioridade para pendências do plano e assuntos com erros, pausa automática ao sair do app e resumo final. A sessão pode ser retomada neste aparelho.

- 📚 150 questões de Português e Matemática das provas de 2022 a 2026, filtráveis por ano, matéria, assunto, dificuldade e status. A prova de 2020 (40 questões, formato antigo) está no banco, mas fica oculta por padrão; um botão na tela inicial a mostra de volta (190 questões no total). Não há prova de 2021
- 🎯 Questões por assunto e por dificuldade, com gabarito e correção automática
- 📋 Simulados autorais: SimulAprova Inédito - SHAI (Feito com IA Plus), 30 questões e 3 horas sem pausa; modos impresso e digital, relatório por matéria/assunto e gabarito comentado após a entrega.
- ⏱ Cronômetro de estudo (livre, regressivo e Pomodoro)
- 🗓 Plano de estudos até a prova, com contagem regressiva, semanas de base, revisão e reta final (veja abaixo)
- 📓 Caderno de erros com revisão espaçada (1, 3, 7 e 15 dias) e botão "Revisar agora"
- 🔥 Dias seguidos, meta diária de questões e gráfico de desempenho
- 📌 Lista de assuntos a estudar, montada a partir das erradas, das difíceis e dos chutes
- 📊 Desempenho por assunto e relatório semanal
- 🔔 Lembrete diário de estudo, por notificação push (exige login) ou por evento de calendário (.ics)
- ☁ Login com email e senha e sincronização do progresso entre celular, PC e tablet
- ⭐ Favoritas, "tive dificuldade", "chutei" e riscar alternativas
- 🎬 Cadastro de links de resoluções em vídeo (YouTube) e comentários por questão
- 🌗 Tema claro/escuro e modo foco
- 📱 Layout para celular, zoom nas páginas da prova e instalação como app (PWA), com uso offline
- 💾 Backup e restauração do progresso em arquivo

## Plano até a prova

O plano tem 8 semanas, de 05/10 a 29/11/2026 (data da prova):

- **Semanas 1 a 5 (base):** um bloco de Português por semana e um bloco de Matemática. Os itens de Matemática das semanas 3, 4 e 5 são fixos (veja `MAT_PLANO` no `index.html`); a semana 4 é a semana de geometria. Um assunto ganha ✓ com 70% de acerto, com no mínimo 8 questões respondidas (ou todas, se o assunto tiver menos).
- **Semanas 6 e 7 (revisão):** sem assunto novo. O foco é refazer as erradas de geometria, além de 1 simulado de 30 questões por semana. Ângulos entram só como uma revisão leve, sem foco.
- **Semana 8 (reta final):** simulado completo, revisão só dos erros e descanso.

Todo dia, o plano sugere 10 questões (a meta diária é ajustável): 5 de Português no assunto da semana, 3 de Matemática e 2 de interpretação de texto. A meta de nota é de 27 a 30 acertos em 30.

O plano só usa assuntos que caíram de 2022 em diante. Assuntos que só apareceram em 2020 (ângulos, expressões algébricas, potências e radicais, funções da linguagem e variação linguística) somem junto com a prova de 2020.

Para reaproveitar o plano em outra prova ou data, ajuste as constantes `PROVA`, `PLANO_INI`, `META`, `META_DIA`, `PT_PLANO`, `MAT_PLANO` e `GEO_REV` no `index.html`.

## Como usar

É um site estático com entrada obrigatória. Para desenvolvimento local, use um servidor HTTP; a primeira autenticação exige conexão com a internet:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Hospedagem

Qualquer hospedagem estática serve. No GitHub Pages: **Settings → Pages → Deploy from a branch → `main` / `(root)`**. Também funciona em Cloudflare Pages e Netlify (o arquivo `_headers` já configura o cache).

## Estrutura

```
index.html              layout e estilos da plataforma
app.js                  lógica principal, carregada após validar a sessão
auth.html               entrada, cadastro e recuperação de senha
auth-*.js / auth.css     sessão e interface da entrada
img/                    páginas das provas (WebP)
icons/                  ícones do app
manifest.webmanifest    configuração do PWA
sw.js                   service worker (cache offline e notificações push)
_headers                regras de cache (Cloudflare/Netlify)
```

Ao publicar uma nova versão, troque `ifma-v1` em `sw.js` (por `ifma-v2`, etc.) para os celulares baixarem a atualização.

## Seus dados

Por padrão, o progresso fica no `localStorage` do navegador, neste dispositivo e neste endereço. Use **Backup do progresso** na tela inicial antes de trocar de endereço ou limpar os dados do navegador.

Com sua conta, o progresso (respostas, favoritas, dificuldades, chutes, vídeos e comentários) também é enviado a um banco hospedado no [Supabase](https://supabase.com) para sincronizar seus aparelhos. Ao ativar o lembrete por notificação, ficam guardados no servidor o endereço de envio do navegador, o horário escolhido e o fuso horário. A plataforma exige uma sessão ativa; os dados pessoais sincronizados continuam protegidos pelas políticas RLS do Supabase.

## Usando seu próprio backend

O login, a sincronização e os lembretes usam um projeto Supabase configurado no `index.html` (constantes `URL_`, `KEY` e `VAPID`). Para publicar uma cópia com dados separados, crie seu projeto, substitua esses valores e crie as tabelas `progresso` (progresso de cada usuário) e `lembretes` (inscrições de notificação). Ative a segurança por linha (RLS) nas duas, para que cada pessoa acesse só os próprios dados. O envio das notificações push precisa de uma rotina no servidor, que não faz parte deste repositório.

## Aviso sobre as provas

As imagens das provas e os gabaritos pertencem ao IFMA e às respectivas bancas, e são reproduzidos aqui apenas para fins de estudo. Projeto independente, sem vínculo com o IFMA.

## Licença

O código é distribuído sob a licença [MIT](LICENSE). A licença não cobre o conteúdo das provas (pasta `img/`).

## SimulAprova Inédito

A seção **📋 Simulados** oferece orientações, escolha de formato e uma tentativa de 3 horas corridas. O prazo absoluto fica salvo em `ifma_simulados_v1` neste navegador; fechar, recarregar ou sair da tela não pausa o relógio. Durante a tentativa, a navegação interna permanece no simulado. Não troque de aparelho durante a prova. Saídas da tela são registradas; o site não impede consultas externas ou alterações no relógio/armazenamento do aparelho. Uma fiscalização inviolável exigiria infraestrutura adicional.

- **Impresso:** imprima `simulados/simulaprova-shai-v1/caderno-sem-gabarito.pdf` antes de iniciar. Contém somente as páginas 1 a 11: capa, questões e cartão. Após encerrar ou esgotar o prazo, transcreva o cartão físico, sem resolver novamente. O tempo de transcrição não faz parte do tempo para resolver a prova.
- **Digital:** exibe somente as 11 páginas permitidas, com a folha de respostas por último. Marcações A–D, em branco, chute, dificuldade e revisão são salvas imediatamente. Entrega antecipada exige as 30 questões marcadas (incluindo brancos explícitos); no fim do prazo, entrega automática, com omissões como erro.
- **Correção:** `correcao.json` só é solicitado pela interface após a entrega; contém as 30 respostas e comentários extraídos do PDF. Por ser um site estático, esse arquivo não tem controle de acesso contra inspeção técnica. Cada questão vale 1 ponto. Há relatório por matéria e sugestões por assunto; tentativas são preservadas separadamente do banco de provas anteriores. Resultados concluídos entram no backup/sincronização existente (`S.simResults`); a tentativa em curso é local.
- **Turma:** usa o campo JSON `stats.simulado` já suportado pela tabela de membros. Mostra modo e prazo até o término das 3 horas, com atualização enquanto a página está aberta. Requer login, participação em turma e conexão. Nenhuma migração de banco é necessária.
- **Offline:** o service worker v12 inclui os arquivos do simulado. Aguarde a instalação do cache online antes de depender do modo offline.

Verificação: `node tests/estudar-agora.cjs` e `node tests/simulados.cjs`.

## Novidades e avisos de publicação

A atualização de 03/11/2026 está no topo de **Novidades**. Ali também é possível ativar/desativar os avisos de novos simulados no aparelho.

Ao publicar um simulado, inclua uma entrada em `simulados/catalogo.json` com `id` único e estável, `titulo`, `publicadoEm` (AAAA-MM-DD), `questoes` e `minutos`, junto com a implementação e os arquivos da prova. Não troque o id para simples correções: cada id novo gera um anúncio para quem ainda não o viu. O catálogo é consultado sem cache HTTP e com prioridade à rede no service worker.

No acesso, retorno à aba, reconexão e atualização do service worker, o site detecta publicações ainda não anunciadas. Mostra um aviso por publicação neste navegador, sem login, e adia avisos durante uma tentativa. Se as notificações do navegador estiverem permitidas e o recurso não estiver desativado, também exibe uma notificação do sistema para novas publicações após o primeiro acesso. A permissão só é solicitada ao tocar em **Ativar avisos no celular**. No iPhone, pode ser necessário instalar e abrir pela Tela de Início.

O clique na notificação abre a seção Simulados. Estes avisos são verificados quando a pessoa acessa o site novamente; não são push enviados com o site fechado. O lembrete diário existente continua separado. Offline, um catálogo em cache pode ser usado; falhas de rede/JSON não marcam publicações como vistas. Limpar os dados do navegador reinicia os avisos.

## Revisão e atividade dos simulados

Resultados concluídos alimentam **Início → Assuntos a estudar → Revisão dos simulados**. São incluídos erros, brancos e marcações de chute, dificuldade ou revisão da tentativa mais recente de cada simulado. Os botões abrem a questão correspondente no relatório comentado. **Revisar erradas** também abre essa revisão quando há erros de simulado. Resultados anteriores são enriquecidos automaticamente a partir da correção, na próxima visita ao Início; se ela não estiver disponível offline, a revisão pode ser atualizada depois. O banco de provas anteriores mantém seus filtros e respostas próprios.

A turma recebe um resumo de atividade por dia, com a quantidade de simulados concluídos e de questões efetivamente respondidas (A–D). Conclusões com pelo menos uma resposta contam como dia estudado, para a sequência, e somam suas questões em Hoje/Últimos 7 dias. A data é a do término da prova (`stopped`, ou `end` para tentativas antigas), inclusive se a transcrição ou leitura da correção acontecer depois. Abrir o resultado novamente não soma atividade. A tentativa impressa só entra após confirmar a transcrição. O destaque **📋 Fez 1 simulado hoje** não publica o gabarito individual nem a nota.

As tentativas antigas já salvas também entram no cálculo. Os resultados continuam em `S.simResults`, no backup e na sincronização existente; o resumo de atividade usa o JSON `stats.simulados` da turma, sem migração de tabela. O service worker foi atualizado para v13.

## Atualização dos scripts e cache

O HTML usa URLs com versão para `simulados.js`, `simulados.css` e `simulados-avisos.js`, também presentes no pré-cache do service worker v14. Ao mudar esses arquivos, atualize o parâmetro `v` no HTML e em `SIM_ASSETS` do `sw.js`, além da versão do cache. Isso evita que um worker anterior combine o HTML novo com um script antigo. Scripts e estilos usam prioridade à rede, com fallback offline apenas para a mesma URL (incluindo versão). Nenhuma atualização de cache limpa respostas ou tentativas do localStorage.

## Ritmo, evolução e revisão dirigida

- **Tempo digital:** novas tentativas guardam o tempo acumulado por questão em foco. A primeira questão da página recebe o foco automaticamente; o botão “Trabalhar nesta questão” permite mudá-lo. Trocar de página ou marcar uma alternativa também muda o foco. Leituras de texto contam na questão em foco. Capa, cartão sem questão selecionada e períodos fora/fechado ficam no tempo restante não atribuído. Recarregar não atribui retroativamente o intervalo fechado a uma questão. O prazo absoluto da prova continua correndo.
- **Médias:** o relatório mostra tempo total dividido por 30 e, por matéria, o tempo em foco dividido pelo número de questões cronometradas, com esse número explícito (de 15). São estimativas de foco, não medição de leitura ocular. Tentativas antigas e provas impressas não recebem uma divisão inventada por matéria.
- **Evolução:** a lista de tentativas mostra nota e duração. A tabela compara total, Português, Matemática, duração e chutes da mesma prova; também mostra a diferença entre as últimas notas disponíveis e a melhor nota.
- **Revisão:** no Início, “Sua próxima revisão” destaca erros e outras pendências. É possível refazer só essas questões, consultar textos de apoio, conferir a resolução e marcar como revisada. A nota e as respostas da prova original são preservadas. No relatório, é possível reabrir uma revisão.
- **Persistência:** `S.simRevisions` guarda o estado da revisão por tentativa/questão, com merge pelo horário da última alteração. `S.simReviewEvents` preserva as atividades de revisão mesmo após reabrir uma questão. Ambos entram no backup e na sincronização existentes.
- **Turma:** o histórico reúne conclusões de simulados e atividades do banco/revisões agrupadas por dia, em ordem recente. Publica no máximo 30 registros por pessoa e exibe os 20 mais recentes da turma, sem respostas individuais ou notas de simulado. Rever a mesma questão mais de uma vez no dia não infla o contador. Requer conexão/login e sincronização dos participantes.

O módulo `simulados-progresso.js` é carregado antes do script principal. Todos os scripts do simulado usam `?v=20261104-3` e o service worker v15. Os novos testes são `tests/simulados-recursos.cjs` e `tests/simulados-recursos-browser.cjs` (Playwright/Chrome).

## Entrada obrigatória e confirmação de e-mail

- **Entrada dedicada:** `auth.html`, `auth.css` e `auth-page.js` oferecem login, cadastro com confirmação de senha, reenvio de confirmação e recuperação de senha. Não há opção de pular a conta. Senhas nunca são persistidas no navegador.
- **Inicialização:** `index.html` contém o layout e os estilos. `auth-gate.js` valida a sessão antes de carregar os módulos do simulado e `app.js` (o antigo script principal, extraído do HTML). Sem sessão válida, abre a entrada. Tokens são validados pelo endpoint `/auth/v1/user` e renovados quando necessário. A sessão expirada bloqueia o app; uma sessão previamente validada e ainda não expirada pode funcionar offline.
- **Domínio público:** `auth-config.js` define `https://aprovaifma.eoshai.workers.dev/` como retorno explícito dos novos e-mails de cadastro, reenvio e recuperação, inclusive quando o cadastro é feito localmente. O **Site URL** no Supabase deve continuar com esse endereço; caso use uma allowlist de redirecionamentos, mantenha essa URL exata permitida. Não se usa localhost como retorno de e-mail. Links antigos já enviados não mudam: solicite um novo na tela de entrada.
- **Callback:** o retorno na raiz é encaminhado para `auth.html`, que valida o token, limpa os parâmetros de autenticação do endereço e entra no app. Links de recuperação abrem o formulário de nova senha. Links expirados apresentam opção de solicitar outro. Os documentos usam `Referrer-Policy: no-referrer`.
- **Contas neste aparelho:** a primeira conta preserva o progresso local anterior. Ao trocar de usuário, o app guarda um snapshot da conta anterior e restaura o conjunto da próxima, sem misturar respostas e simulados na sincronização. `sb_sess` guarda a sessão; `ifma_data_owner` identifica a conta cujos dados estão ativos; `ifma_account_data_<uid>` guarda os snapshots locais. Logout não apaga o progresso.
- **Limites do site estático:** a sessão bloqueia a navegação da interface e o Supabase deve manter RLS para dados particulares. O HTML/JS e os arquivos estáticos da prova continuam sendo arquivos públicos na hospedagem; torná-los privados também exigiria autorização no Worker/servidor. Não inclua chaves de serviço no front-end: a chave de `auth-config.js` é a chave pública anon já usada pelo projeto.
- **Cache:** service worker v16, URLs `?v=20261104-4` e cache de navegação separado para `index.html` e `auth.html`.

Verificação de acesso, cadastro, callbacks, logout, renovação, isolamento entre contas e layout: `node tests/auth-browser.cjs` (Playwright/Chrome, com respostas de autenticação simuladas, sem criar contas nem enviar e-mails reais). Os testes anteriores usam uma sessão de teste pelo helper `tests/browser-fixture.cjs`; não há bypass de autenticação no produto.

## Orientação do celular

O manifesto usa `orientation: any`, permitindo acompanhar a rotação do aparelho tanto em pé quanto deitado, inclusive no app instalado. A rotação automática precisa estar liberada no dispositivo. O cache foi atualizado para v17 para distribuir o manifesto novo.

## Painel administrativo

**Administração** aparece no menu somente depois que o servidor confirma a permissão da conta. A versão inicial oferece lista de contas com nome do cadastro, e-mail, data de criação, confirmação e último login; busca por nome/e-mail; filtro de confirmação; paginação de 25; contadores de contas, confirmações e cadastros dos últimos 7 dias. Não inclui senhas, exclusão ou bloqueio de contas. Nomes ausentes de cadastros antigos são exibidos como “Nome não informado”.

### Ativação única no Supabase

1. No mesmo projeto usado por `auth-config.js`, abra **SQL Editor → New query**.
2. Execute o arquivo inteiro `supabase/admin_setup.sql` como administrador do projeto. Ele localiza a conta `gabriel.shai@icloud.com`, exige e-mail já confirmado e registra o UUID dessa conta. Se não encontrar a conta confirmada, a transação é cancelada. O arquivo pode ser executado novamente sem duplicar a permissão.
3. Publique os arquivos do site e entre com essa conta. O item **🛡️ Administração** aparecerá. O endereço `/#admin=1` também abre a página, mas a consulta continua exigindo autorização do servidor.

A ativação é necessária: somente publicar o front-end não cria as funções no banco. Não use uma chave `service_role` no site.

### Proteção e dados

- `ifma_admin_private.administrators` é uma tabela privada, com RLS e sem acesso de `anon`/`authenticated`. A permissão usa UUID, não o nome, o e-mail enviado pelo navegador ou metadados editáveis pelo usuário.
- As funções `public.ifma_is_admin()` e `public.ifma_admin_list_users(...)` têm `search_path` vazio e execução limitada a `authenticated`. A consulta de contas verifica novamente `auth.uid()` e a permissão antes de ler qualquer registro. Usuários comuns recebem erro de autorização mesmo que tentem chamar a função diretamente.
- São retornadas apenas contas com e-mail e não excluídas, com os campos necessários. O nome vem de `raw_user_meta_data.name`, com fallback para `full_name`. O último login representa uma autenticação, não atividade online em tempo real.
- A lista é buscada por POST, não fica no localStorage nem no cache offline e é removida da tela ao sair da página. Ao restaurar a página pelo histórico, o acesso é verificado novamente. Nenhuma tabela do banco de questões, progresso ou turma é alterada.
- Não existe interface pública para promover administradores. Novas concessões futuras devem ser feitas explicitamente no servidor pelo dono do projeto.

Arquivos: `admin.js`, `admin.css`, `supabase/admin_setup.sql`. O cache passou para v18; o loader e `app.js` usam `?v=20261107-1`.

### Testes do painel

- `node tests/admin-browser.cjs`: Playwright/Chrome com respostas de teste, cobrindo busca, paginação, filtro, mobile, usuário comum, backend ausente, restauração do histórico e escape de HTML.
- `npm install @electric-sql/pglite --prefix .test-runtime --ignore-scripts --no-audit --no-fund`, depois `node tests/admin-database.cjs`: executa o SQL num PostgreSQL local em memória e verifica a autorização, grants, tabela privada, filtros e dados mínimos. `.test-runtime/` é ignorada pelo Git. Não toca nas contas reais.

Referência de segurança das funções: https://supabase.com/docs/guides/database/functions
