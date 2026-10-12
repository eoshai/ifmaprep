# 🎓 IFMA Prep (AprovaIFMA)

Banco de questões, simulados e plano de estudos para o processo seletivo do IFMA. Funciona direto no navegador, sem servidor e sem cadastro, e pode ser instalado no celular como app.

**Demo:** https://github.com/eoshai/ifmaprep

## Recursos

- 📚 Provas de 2020 a 2026, filtráveis por ano, matéria, assunto, dificuldade e status
- 🎯 Questões por assunto e por dificuldade, com gabarito e correção automática
- 📝 Simulados com cronômetro, em tempo configurável
- ⏱ Cronômetro de estudo (livre, regressivo e Pomodoro)
- 📊 Desempenho por assunto, relatório semanal e plano de estudos com contagem regressiva
- ⭐ Favoritas, "tive dificuldade", "chutei" e riscar alternativas
- 🎬 Cadastro de links de resoluções em vídeo (YouTube) e comentários por questão
- 🌗 Tema claro/escuro e modo foco
- 📱 Layout para celular, zoom nas páginas da prova e instalação como app (PWA), com uso offline
- 💾 Backup e restauração do progresso em arquivo

## Como usar

É um site estático. Basta abrir o `index.html`, mas para o modo app/offline use um servidor HTTP:

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
sw.js                   service worker (cache offline)
_headers                regras de cache (Cloudflare/Netlify)
```

Ao publicar uma nova versão, troque `ifma-v1` em `sw.js` (por `ifma-v2`, etc.) para os celulares baixarem a atualização.

## Seus dados

O progresso fica no `localStorage` do navegador, neste dispositivo e neste endereço. Nada é enviado a servidores. Use **Backup do progresso** na tela inicial antes de trocar de endereço ou limpar os dados do navegador.

## Aviso sobre as provas

As imagens das provas e os gabaritos pertencem ao IFMA e às respectivas bancas, e são reproduzidos aqui apenas para fins de estudo. Projeto independente, sem vínculo com o IFMA.

## Licença

O código é distribuído sob a licença [MIT](LICENSE). A licença não cobre o conteúdo das provas (pasta `img/`).