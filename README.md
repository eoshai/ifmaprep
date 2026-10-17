# 🎓 IFMA Prep (AprovaIFMA)

Banco de questões, simulados e plano de estudos para o processo seletivo do IFMA. Funciona direto no navegador, sem cadastro obrigatório, e pode ser instalado no celular como app. Se quiser, dá para entrar com email e senha para sincronizar o progresso entre aparelhos.

**Demo:** https://github.com/eoshai/ifmaprep

## Recursos

- 📚 190 questões de Português e Matemática das provas de 2020 e de 2022 a 2026 (não há prova de 2021), filtráveis por ano, matéria, assunto, dificuldade e status
- 🎯 Questões por assunto e por dificuldade, com gabarito e correção automática
- 📝 Simulados com cronômetro, em tempo configurável
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
- **Semanas 6 e 7 (revisão):** sem assunto novo. O foco é refazer as erradas de geometria, além de 1 simulado de 30 questões por semana.
- **Semana 8 (reta final):** simulado completo, revisão só dos erros e descanso.

Todo dia, o plano sugere 10 questões (a meta diária é ajustável): 5 de Português no assunto da semana, 3 de Matemática e 2 de interpretação de texto. A meta de nota é de 27 a 30 acertos em 30.

Para reaproveitar o plano em outra prova ou data, ajuste as constantes `PROVA`, `PLANO_INI`, `META`, `META_DIA`, `PT_PLANO`, `MAT_PLANO` e `GEO_REV` no `index.html`.

## Como usar

É um site estático. Basta abrir o `index.html`, mas para o modo app/offline, o login e as notificações use um servidor HTTP:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Hospedagem

Qualquer hospedagem estática serve. No GitHub Pages: **Settings → Pages → Deploy from a branch → `main` / `(root)`**. Também funciona em Cloudflare Pages e Netlify (o arquivo `_headers` já configura o cache).

## Estrutura

```
index.html              app completo (HTML, CSS e JS)
img/                    páginas das provas (WebP)
icons/                  ícones do app
manifest.webmanifest    configuração do PWA
sw.js                   service worker (cache offline e notificações push)
_headers                regras de cache (Cloudflare/Netlify)
```

Ao publicar uma nova versão, troque `ifma-v1` em `sw.js` (por `ifma-v2`, etc.) para os celulares baixarem a atualização.

## Seus dados

Por padrão, o progresso fica no `localStorage` do navegador, neste dispositivo e neste endereço. Use **Backup do progresso** na tela inicial antes de trocar de endereço ou limpar os dados do navegador.

Se você entrar com uma conta (botão ☁ no menu), o progresso (respostas, favoritas, dificuldades, chutes, vídeos e comentários) também é enviado a um banco hospedado no [Supabase](https://supabase.com) para sincronizar seus aparelhos. Ao ativar o lembrete por notificação, ficam guardados no servidor o endereço de envio do navegador, o horário escolhido e o fuso horário. Quem não faz login não envia nada a servidores.

## Usando seu próprio backend

O login, a sincronização e os lembretes usam um projeto Supabase configurado no `index.html` (constantes `URL_`, `KEY` e `VAPID`). Para publicar uma cópia com dados separados, crie seu projeto, substitua esses valores e crie as tabelas `progresso` (progresso de cada usuário) e `lembretes` (inscrições de notificação). Ative a segurança por linha (RLS) nas duas, para que cada pessoa acesse só os próprios dados. O envio das notificações push precisa de uma rotina no servidor, que não faz parte deste repositório.

## Aviso sobre as provas

As imagens das provas e os gabaritos pertencem ao IFMA e às respectivas bancas, e são reproduzidos aqui apenas para fins de estudo. Projeto independente, sem vínculo com o IFMA.

## Licença

O código é distribuído sob a licença [MIT](LICENSE). A licença não cobre o conteúdo das provas (pasta `img/`).