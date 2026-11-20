// Questões originais da plataforma. Dificuldade editorial, sem calibração estatística.
// IDs são permanentes: acrescente novos itens sem renumerar questões existentes.
const Q_AUTORAIS=[
  {
    "id": "aut-001",
    "ano": 0,
    "num": 1,
    "materia": "Português",
    "topico": "Interpretação e inferência (informação explícita e implícita)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Fácil",
    "enun": "Leia o aviso elaborado para esta questão:\n“A biblioteca abrirá às 8h durante a semana de provas. Aos sábados, o atendimento continuará começando às 9h.”\nDe acordo com o aviso, durante a semana de provas,",
    "alts": [
      "a biblioteca abrirá às 9h em todos os dias.",
      "a biblioteca abrirá às 8h nos dias úteis.",
      "o atendimento aos sábados começará às 8h.",
      "o atendimento aos sábados será suspenso."
    ],
    "resposta": "B",
    "explicacao": "O aviso antecipa a abertura para 8h nos dias úteis e mantém o horário de sábado às 9h. Não há informação sobre suspensão do atendimento.",
    "pags": []
  },
  {
    "id": "aut-002",
    "ano": 0,
    "num": 2,
    "materia": "Português",
    "topico": "Interpretação e inferência (informação explícita e implícita)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Média",
    "enun": "Leia o texto elaborado para esta questão:\n“Na primeira semana, a horta da escola recebeu muitas visitas e pouca água. Na segunda, uma escala de cuidados foi colocada na parede. Um mês depois, as primeiras folhas foram colhidas.”\nA sequência dos acontecimentos permite inferir que",
    "alts": [
      "a organização dos cuidados contribuiu para o desenvolvimento da horta.",
      "a quantidade de visitantes era suficiente para manter a horta.",
      "a horta deixou de receber visitas quando passou a produzir.",
      "a escala de cuidados foi criada depois da primeira colheita."
    ],
    "resposta": "A",
    "explicacao": "A passagem do interesse inicial para uma rotina de cuidados antecede a colheita e sustenta essa inferência. As demais alternativas contradizem a ordem dos fatos ou acrescentam informações ausentes.",
    "pags": []
  },
  {
    "id": "aut-003",
    "ano": 0,
    "num": 3,
    "materia": "Português",
    "topico": "Interpretação e inferência (informação explícita e implícita)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Difícil",
    "enun": "Leia o relato elaborado para esta questão:\n“Quando o ônibus deixou de passar pela vila, disseram que a biblioteca itinerante havia acabado. Dois meses depois, os livros voltaram em bicicletas. A distância permanecia a mesma; o caminho até a leitura, não.”\nNo contexto, a última frase indica que",
    "alts": [
      "a retomada do acesso aos livros ocorreu por uma nova forma de distribuição.",
      "o trajeto físico até a vila passou a ser menor.",
      "as bicicletas passaram a transportar mais livros do que o ônibus.",
      "os moradores deixaram de precisar de livros impressos."
    ],
    "resposta": "A",
    "explicacao": "O texto contrapõe a distância física, que não mudou, à forma de acesso à leitura, restabelecida pelas bicicletas. Não informa redução de trajeto, quantidade de livros ou substituição da leitura impressa.",
    "pags": []
  },
  {
    "id": "aut-004",
    "ano": 0,
    "num": 4,
    "materia": "Português",
    "topico": "Propósito comunicativo, objetivo e tema do texto",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Fácil",
    "enun": "Leia a mensagem elaborada para esta questão:\n“Leve sua garrafa reutilizável. Reduzir o uso de copos descartáveis começa com uma escolha diária.”\nO principal objetivo da mensagem é",
    "alts": [
      "narrar a origem das garrafas reutilizáveis.",
      "divulgar o preço de uma garrafa.",
      "ensinar a fabricar copos descartáveis.",
      "incentivar uma atitude para diminuir resíduos."
    ],
    "resposta": "D",
    "explicacao": "O imperativo “Leve” e a referência a uma escolha diária procuram estimular uma mudança de comportamento: reduzir o uso de descartáveis.",
    "pags": []
  },
  {
    "id": "aut-005",
    "ano": 0,
    "num": 5,
    "materia": "Português",
    "topico": "Propósito comunicativo, objetivo e tema do texto",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Média",
    "enun": "Leia o texto elaborado para esta questão:\n“Desde segunda-feira, o laboratório de informática atende também no intervalo do almoço. Segundo a coordenação, a mudança amplia o acesso dos estudantes que trabalham à tarde.”\nA finalidade predominante desse texto é",
    "alts": [
      "defender a proibição do trabalho estudantil.",
      "orientar o conserto dos computadores do laboratório.",
      "informar uma alteração no atendimento e sua justificativa.",
      "convencer o leitor a comprar equipamentos."
    ],
    "resposta": "C",
    "explicacao": "O texto apresenta uma mudança de horário e atribui à coordenação sua justificativa. A informação, com referência temporal e fonte, predomina sobre qualquer tentativa de convencer.",
    "pags": []
  },
  {
    "id": "aut-006",
    "ano": 0,
    "num": 6,
    "materia": "Português",
    "topico": "Propósito comunicativo, objetivo e tema do texto",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Difícil",
    "enun": "Leia o texto elaborado para esta questão:\n“Instalar lixeiras é necessário, mas insuficiente. Sem coleta regular, o lixo apenas muda de lugar. Uma política de limpeza precisa combinar infraestrutura, manutenção e participação da comunidade.”\nAo empregar essa sequência de ideias, o autor pretende",
    "alts": [
      "afirmar que a instalação de lixeiras deve ser abandonada.",
      "comprovar que a comunidade deve substituir o serviço de coleta.",
      "relatar cronologicamente a instalação de lixeiras.",
      "defender uma ação integrada para enfrentar o problema do lixo."
    ],
    "resposta": "D",
    "explicacao": "O autor reconhece a utilidade das lixeiras, aponta seu limite e apresenta uma tese: integrar infraestrutura, manutenção e participação. Não propõe abandonar lixeiras nem transferir toda a coleta à comunidade.",
    "pags": []
  },
  {
    "id": "aut-007",
    "ano": 0,
    "num": 7,
    "materia": "Matemática",
    "topico": "Estatística e leitura de dados (média, moda, mediana, gráficos)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Fácil",
    "enun": "Em quatro dias, uma estudante resolveu 6, 8, 10 e 12 questões, respectivamente. A média diária de questões resolvidas nesse período foi",
    "alts": [
      "12.",
      "10.",
      "8.",
      "9."
    ],
    "resposta": "D",
    "explicacao": "A média aritmética é a soma dividida pelo número de dias: (6 + 8 + 10 + 12) ÷ 4 = 36 ÷ 4 = 9 questões.",
    "pags": []
  },
  {
    "id": "aut-008",
    "ano": 0,
    "num": 8,
    "materia": "Matemática",
    "topico": "Estatística e leitura de dados (média, moda, mediana, gráficos)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Média",
    "enun": "Os tempos, em minutos, de sete estudantes em uma atividade foram: 18, 12, 15, 12, 20, 14 e 16. A mediana e a moda desses tempos são, respectivamente,",
    "alts": [
      "15 e 14.",
      "14 e 12.",
      "15 e 12.",
      "16 e 12."
    ],
    "resposta": "C",
    "explicacao": "Em ordem crescente: 12, 12, 14, 15, 16, 18, 20. A mediana é o quarto valor, 15; a moda é 12, único valor que aparece duas vezes.",
    "pags": []
  },
  {
    "id": "aut-009",
    "ano": 0,
    "num": 9,
    "materia": "Matemática",
    "topico": "Estatística e leitura de dados (média, moda, mediana, gráficos)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Difícil",
    "enun": "Em uma atividade, 12 estudantes obtiveram média de 7 pontos e outros 8 obtiveram média de 9 pontos. Após a inclusão de mais um estudante, a média dos 21 participantes passou a ser 7,8 pontos. A pontuação desse último estudante foi",
    "alts": [
      "8,0.",
      "8,2.",
      "7,8.",
      "7,2."
    ],
    "resposta": "C",
    "explicacao": "Os dois grupos somavam 12 × 7 + 8 × 9 = 156 pontos. Com 21 participantes, o total passou a 21 × 7,8 = 163,8. O último estudante obteve 163,8 − 156 = 7,8 pontos. As médias dos grupos devem ser ponderadas por seus tamanhos.",
    "pags": []
  },
  {
    "id": "aut-010",
    "ano": 0,
    "num": 10,
    "materia": "Português",
    "topico": "Classes de palavras (que, advérbio, substantivo, adjetivo)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Fácil",
    "enun": "Na frase “Os estudantes chegaram cedo ao laboratório”, a palavra “cedo” é um",
    "alts": [
      "adjetivo que caracteriza os estudantes.",
      "pronome que retoma o laboratório.",
      "advérbio que indica circunstância de tempo.",
      "substantivo que nomeia um lugar."
    ],
    "resposta": "C",
    "explicacao": "“Cedo” modifica o verbo “chegaram”, indicando quando a ação ocorreu. Por isso, é advérbio de tempo.",
    "pags": []
  },
  {
    "id": "aut-011",
    "ano": 0,
    "num": 11,
    "materia": "Português",
    "topico": "Classes de palavras (que, advérbio, substantivo, adjetivo)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Média",
    "enun": "Compare as frases:\nI. O jovem apresentou o projeto.\nII. O pesquisador jovem apresentou o projeto.\nA palavra “jovem” funciona, respectivamente, como",
    "alts": [
      "substantivo e adjetivo.",
      "adjetivo e substantivo.",
      "substantivo e advérbio.",
      "advérbio e adjetivo."
    ],
    "resposta": "A",
    "explicacao": "Em I, “jovem”, acompanhado do artigo, nomeia a pessoa e é núcleo do sujeito: substantivo. Em II, caracteriza o substantivo “pesquisador”: adjetivo.",
    "pags": []
  },
  {
    "id": "aut-012",
    "ano": 0,
    "num": 12,
    "materia": "Português",
    "topico": "Classes de palavras (que, advérbio, substantivo, adjetivo)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Difícil",
    "enun": "Observe os períodos:\nI. Os estudantes disseram que o laboratório abriria.\nII. O laboratório que visitamos foi reformado.\nQuanto à palavra “que”, é correto afirmar que",
    "alts": [
      "em I, é conjunção integrante; em II, é pronome relativo.",
      "em ambos os períodos, ela retoma um substantivo anterior.",
      "em I, é pronome relativo; em II, é conjunção integrante.",
      "em ambos os períodos, ela indica uma consequência."
    ],
    "resposta": "A",
    "explicacao": "Em I, “que” introduz o conteúdo do que foi dito, sem retomar antecedente: conjunção integrante. Em II, retoma “laboratório” e equivale a “o qual”: pronome relativo, objeto direto de “visitamos”.",
    "pags": []
  },
  {
    "id": "aut-013",
    "ano": 0,
    "num": 13,
    "materia": "Português",
    "topico": "Pontuação (vírgula e aspas)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Fácil",
    "enun": "Em “Marina, confira o horário da prova”, a vírgula foi empregada para",
    "alts": [
      "isolar um vocativo.",
      "indicar uma citação direta.",
      "separar o sujeito de seu verbo.",
      "introduzir uma enumeração."
    ],
    "resposta": "A",
    "explicacao": "“Marina” nomeia a pessoa a quem se dirige a ordem e funciona como vocativo, que deve ser separado por vírgula. O sujeito de “confira” é o “você” subentendido.",
    "pags": []
  },
  {
    "id": "aut-014",
    "ano": 0,
    "num": 14,
    "materia": "Português",
    "topico": "Pontuação (vírgula e aspas)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Média",
    "enun": "Compare os enunciados:\nI. Os alunos que revisaram os cálculos corrigiram os erros.\nII. Os alunos, que revisaram os cálculos, corrigiram os erros.\nA diferença de pontuação faz com que",
    "alts": [
      "I delimite um grupo de alunos, enquanto II apresente a revisão como informação sobre todos os alunos referidos.",
      "II restrinja a correção a uma parte dos alunos.",
      "os dois enunciados indiquem obrigatoriamente que nenhum aluno errou.",
      "I afirme que todos os alunos revisaram os cálculos."
    ],
    "resposta": "A",
    "explicacao": "Sem vírgulas, a oração adjetiva é restritiva: seleciona os alunos que revisaram. Com vírgulas, é explicativa: acrescenta uma informação sobre o conjunto de alunos mencionado.",
    "pags": []
  },
  {
    "id": "aut-015",
    "ano": 0,
    "num": 15,
    "materia": "Português",
    "topico": "Pontuação (vírgula e aspas)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Difícil",
    "enun": "Leia a frase elaborada para esta questão:\n“Depois de adiar o trabalho três vezes, ele anunciou sua ‘pontualidade exemplar’.”\nAs aspas em “pontualidade exemplar” produzem, no contexto, um efeito de",
    "alts": [
      "citação de um conceito científico definido anteriormente.",
      "explicação, por detalharem a duração exata do trabalho.",
      "ironia, por contrastarem o elogio aparente com os adiamentos.",
      "neutralidade, por impedirem qualquer avaliação da conduta."
    ],
    "resposta": "C",
    "explicacao": "O comportamento relatado contradiz a expressão elogiosa. As aspas marcam um distanciamento irônico em relação à suposta pontualidade, sem oferecer definição técnica nem duração exata.",
    "pags": []
  },
  {
    "id": "aut-016",
    "ano": 0,
    "num": 16,
    "materia": "Matemática",
    "topico": "Porcentagem",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Fácil",
    "enun": "Uma mochila custa R$ 180,00 e está com desconto de 15% para pagamento à vista. O preço com desconto é",
    "alts": [
      "R$ 153,00.",
      "R$ 150,00.",
      "R$ 162,00.",
      "R$ 165,00."
    ],
    "resposta": "A",
    "explicacao": "O desconto é 0,15 × 180 = R$ 27,00. Assim, o preço final é 180 − 27 = R$ 153,00.",
    "pags": []
  },
  {
    "id": "aut-017",
    "ano": 0,
    "num": 17,
    "materia": "Matemática",
    "topico": "Porcentagem",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Média",
    "enun": "Um curso custava R$ 200,00. Após um aumento de 20%, foi anunciado um desconto de 10% sobre o novo preço. Em relação ao preço inicial, o valor final representa",
    "alts": [
      "aumento de 10%.",
      "redução de 8%.",
      "ausência de alteração.",
      "aumento de 8%."
    ],
    "resposta": "D",
    "explicacao": "Os fatores são sucessivos: 200 × 1,20 × 0,90 = R$ 216,00. O acréscimo de R$ 16,00 corresponde a 16 ÷ 200 = 8%. Não se subtraem diretamente as duas taxas.",
    "pags": []
  },
  {
    "id": "aut-018",
    "ano": 0,
    "num": 18,
    "materia": "Matemática",
    "topico": "Porcentagem",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Difícil",
    "enun": "Uma escola tinha 200 estudantes, dos quais 40% participavam de um projeto. Após a entrada de novos estudantes, todos participantes do projeto, a participação passou a corresponder a 50% do total. Quantos estudantes ingressaram?",
    "alts": [
      "25.",
      "50.",
      "40.",
      "20."
    ],
    "resposta": "C",
    "explicacao": "Inicialmente havia 80 participantes. Se x estudantes entram, (80 + x)/(200 + x) = 0,50. Logo, 80 + x = 100 + 0,5x; 0,5x = 20; x = 40. O total de estudantes também muda.",
    "pags": []
  },
  {
    "id": "aut-019",
    "ano": 0,
    "num": 19,
    "materia": "Matemática",
    "topico": "Múltiplos e divisores (MMC, MDC, divisibilidade, fatores primos)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Fácil",
    "enun": "Duas luzes piscam a cada 12 e 18 segundos. Se piscaram juntas agora, voltarão a piscar juntas pela primeira vez após",
    "alts": [
      "48 segundos.",
      "72 segundos.",
      "30 segundos.",
      "36 segundos."
    ],
    "resposta": "D",
    "explicacao": "A coincidência seguinte ocorre no MMC de 12 e 18: 12 = 2² × 3 e 18 = 2 × 3²; MMC = 2² × 3² = 36 segundos.",
    "pags": []
  },
  {
    "id": "aut-020",
    "ano": 0,
    "num": 20,
    "materia": "Matemática",
    "topico": "Múltiplos e divisores (MMC, MDC, divisibilidade, fatores primos)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Média",
    "enun": "Para uma oficina, há 84 lápis e 126 canetas. Deseja-se montar o maior número possível de kits idênticos, usando todos os materiais, sem sobras. Cada kit deve conter",
    "alts": [
      "2 lápis e 3 canetas.",
      "3 lápis e 2 canetas.",
      "6 lápis e 9 canetas.",
      "4 lápis e 6 canetas."
    ],
    "resposta": "A",
    "explicacao": "O maior número de kits é o MDC de 84 e 126, igual a 42. Em cada kit ficam 84 ÷ 42 = 2 lápis e 126 ÷ 42 = 3 canetas. Kits com 4 e 6 ou com 6 e 9 itens, respectivamente, usam menos kits.",
    "pags": []
  },
  {
    "id": "aut-021",
    "ano": 0,
    "num": 21,
    "materia": "Matemática",
    "topico": "Múltiplos e divisores (MMC, MDC, divisibilidade, fatores primos)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Difícil",
    "enun": "Três linhas de ônibus saem de um terminal a cada 15, 20 e 28 minutos. Às 6h, um ônibus de cada linha saiu simultaneamente. A próxima saída simultânea das três linhas ocorrerá às",
    "alts": [
      "14h20.",
      "13h.",
      "12h.",
      "10h40."
    ],
    "resposta": "B",
    "explicacao": "15 = 3 × 5, 20 = 2² × 5 e 28 = 2² × 7. O MMC é 2² × 3 × 5 × 7 = 420 minutos, ou 7 horas. Somando a 6h, a próxima saída conjunta ocorre às 13h.",
    "pags": []
  },
  {
    "id": "aut-022",
    "ano": 0,
    "num": 22,
    "materia": "Matemática",
    "topico": "Probabilidade",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Fácil",
    "enun": "Uma caixa contém 5 fichas verdes, 3 azuis e 2 amarelas, todas de mesmo tamanho e formato. Ao retirar uma ficha ao acaso, a probabilidade de ela ser azul é",
    "alts": [
      "7/10.",
      "3/7.",
      "1/3.",
      "3/10."
    ],
    "resposta": "D",
    "explicacao": "Há 10 fichas equiprováveis, das quais 3 são azuis. Portanto, a probabilidade é 3/10.",
    "pags": []
  },
  {
    "id": "aut-023",
    "ano": 0,
    "num": 23,
    "materia": "Matemática",
    "topico": "Probabilidade",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Média",
    "enun": "Uma caixa contém 4 fichas vermelhas e 3 brancas, todas de mesmo tamanho e formato. Duas fichas são retiradas ao acaso, uma após a outra, sem reposição. A probabilidade de ambas serem vermelhas é",
    "alts": [
      "16/49.",
      "4/7.",
      "1/7.",
      "2/7."
    ],
    "resposta": "D",
    "explicacao": "A primeira vermelha tem probabilidade 4/7. Sem reposição, restam 3 vermelhas entre 6 fichas: 3/6. O produto é (4/7) × (3/6) = 12/42 = 2/7.",
    "pags": []
  },
  {
    "id": "aut-024",
    "ano": 0,
    "num": 24,
    "materia": "Matemática",
    "topico": "Probabilidade",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Difícil",
    "enun": "Um comitê de dois representantes será formado por sorteio entre 4 estudantes do turno matutino e 3 do vespertino. Todas as duplas têm a mesma chance de ser escolhidas. A probabilidade de o comitê ter um representante de cada turno é",
    "alts": [
      "3/7.",
      "4/7.",
      "6/7.",
      "2/7."
    ],
    "resposta": "B",
    "explicacao": "Existem C(7,2) = 7 × 6 ÷ 2 = 21 duplas possíveis. As duplas com turnos diferentes são 4 × 3 = 12. Assim, P = 12/21 = 4/7. A ordem dos representantes não cria uma dupla nova.",
    "pags": []
  },
  {
    "id": "aut-025",
    "ano": 0,
    "num": 25,
    "materia": "Matemática",
    "topico": "Regra de três (direta e inversa)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Fácil",
    "enun": "Uma impressora produz 180 folhas em 6 minutos, mantendo velocidade constante. Para produzir 450 folhas, ela precisará de",
    "alts": [
      "15 minutos.",
      "20 minutos.",
      "18 minutos.",
      "12 minutos."
    ],
    "resposta": "A",
    "explicacao": "A taxa é 180 ÷ 6 = 30 folhas por minuto. Para 450 folhas, o tempo é 450 ÷ 30 = 15 minutos, em relação diretamente proporcional.",
    "pags": []
  },
  {
    "id": "aut-026",
    "ano": 0,
    "num": 26,
    "materia": "Matemática",
    "topico": "Regra de três (direta e inversa)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Média",
    "enun": "Seis trabalhadores, com a mesma produtividade, concluem um serviço em 10 dias. Mantidas as condições de trabalho, quinze trabalhadores concluirão o mesmo serviço em",
    "alts": [
      "5 dias.",
      "25 dias.",
      "4 dias.",
      "6 dias."
    ],
    "resposta": "C",
    "explicacao": "Para um serviço fixo, trabalhadores e dias são inversamente proporcionais. São necessários 6 × 10 = 60 trabalhadores-dia; com 15 trabalhadores, 60 ÷ 15 = 4 dias.",
    "pags": []
  },
  {
    "id": "aut-027",
    "ano": 0,
    "num": 27,
    "materia": "Matemática",
    "topico": "Regra de três (direta e inversa)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Difícil",
    "enun": "Quatro máquinas iguais, trabalhando 6 horas por dia durante 5 dias, produzem 2.400 peças. Mantida a produtividade, seis dessas máquinas, trabalhando 8 horas por dia durante 3 dias, produzirão",
    "alts": [
      "3.600 peças.",
      "2.880 peças.",
      "4.800 peças.",
      "2.160 peças."
    ],
    "resposta": "B",
    "explicacao": "A produção inicial usa 4 × 6 × 5 = 120 máquinas-hora, com 2.400 ÷ 120 = 20 peças por máquina-hora. A nova operação usa 6 × 8 × 3 = 144 máquinas-hora e produz 144 × 20 = 2.880 peças.",
    "pags": []
  },
  {
    "id": "aut-028",
    "ano": 0,
    "num": 28,
    "materia": "Português",
    "topico": "Conjunções e relações de sentido (conectivos)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Fácil",
    "enun": "Em “Choveu durante a manhã, mas a visita ao museu foi mantida”, o conectivo “mas” estabelece relação de",
    "alts": [
      "adição.",
      "oposição.",
      "conclusão.",
      "causa."
    ],
    "resposta": "B",
    "explicacao": "“Mas” é uma conjunção coordenativa adversativa: contrapõe a manutenção da visita à possível expectativa de cancelamento por causa da chuva.",
    "pags": []
  },
  {
    "id": "aut-029",
    "ano": 0,
    "num": 29,
    "materia": "Português",
    "topico": "Conjunções e relações de sentido (conectivos)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Média",
    "enun": "Em “Embora o laboratório fosse pequeno, os estudantes desenvolveram um projeto completo”, o trecho introduzido por “embora” expressa",
    "alts": [
      "uma condição indispensável à realização do projeto.",
      "a finalidade de desenvolver o projeto.",
      "a consequência direta da conclusão do projeto.",
      "uma concessão, por apresentar um obstáculo que não impediu o resultado."
    ],
    "resposta": "D",
    "explicacao": "“Embora” introduz concessão: o tamanho reduzido poderia dificultar o trabalho, mas não impediu a realização. Não equivale a “se” (condição) nem a “para que” (finalidade).",
    "pags": []
  },
  {
    "id": "aut-030",
    "ano": 0,
    "num": 30,
    "materia": "Português",
    "topico": "Conjunções e relações de sentido (conectivos)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Difícil",
    "enun": "Em “O consumo foi tão alto que o reservatório esvaziou antes do previsto”, a oração iniciada por “que” indica",
    "alts": [
      "a finalidade do aumento de consumo.",
      "uma comparação entre dois reservatórios.",
      "uma condição para a redução do consumo.",
      "a consequência da intensidade do consumo."
    ],
    "resposta": "D",
    "explicacao": "A estrutura correlativa “tão... que” relaciona intensidade e consequência. O esvaziamento antecipado resulta do consumo muito alto; o trecho não estabelece condição ou finalidade.",
    "pags": []
  },
  {
    "id": "aut-031",
    "ano": 0,
    "num": 31,
    "materia": "Português",
    "topico": "Leitura de imagem, gráfico, charge e infográfico",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Fácil",
    "enun": "Observe os dados do quadro de uma campanha escolar.\nQual turma arrecadou a maior quantidade de papel?",
    "alts": [
      "Turma A.",
      "Turma B.",
      "Turma C.",
      "Turma D."
    ],
    "resposta": "B",
    "explicacao": "A turma B arrecadou 42 kg, valor superior aos 28 kg da A, 35 kg da C e 25 kg da D. É necessário comparar os valores, e não a ordem das turmas no quadro.",
    "pags": [],
    "tabela": {
      "titulo": "Papel arrecadado por turma",
      "cabecalho": [
        "Turma",
        "Quantidade (kg)"
      ],
      "linhas": [
        [
          "A",
          28
        ],
        [
          "B",
          42
        ],
        [
          "C",
          35
        ],
        [
          "D",
          25
        ]
      ]
    }
  },
  {
    "id": "aut-032",
    "ano": 0,
    "num": 32,
    "materia": "Português",
    "topico": "Leitura de imagem, gráfico, charge e infográfico",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Média",
    "enun": "Um infográfico de uma campanha apresenta os dados abaixo. Abaixo dos números, lê-se: “Cada material no seu lugar: separar também é cuidar.”\nA relação entre os dados e a frase busca",
    "alts": [
      "afirmar que o vidro é o único material reciclável.",
      "informar a composição da coleta e incentivar a separação dos resíduos.",
      "apresentar o preço de venda de cada material.",
      "provar que todos os materiais têm a mesma participação."
    ],
    "resposta": "B",
    "explicacao": "Os percentuais informam quais materiais compõem a coleta, enquanto a frase transforma a informação em um incentivo à separação. Os dados não apresentam preços nem limitam a reciclagem a um material.",
    "pags": [],
    "tabela": {
      "titulo": "Composição dos 200 kg de recicláveis coletados",
      "cabecalho": [
        "Material",
        "Participação"
      ],
      "linhas": [
        [
          "Papel",
          "50%"
        ],
        [
          "Plástico",
          "30%"
        ],
        [
          "Metal",
          "15%"
        ],
        [
          "Vidro",
          "5%"
        ]
      ]
    }
  },
  {
    "id": "aut-033",
    "ano": 0,
    "num": 33,
    "materia": "Português",
    "topico": "Leitura de imagem, gráfico, charge e infográfico",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Difícil",
    "enun": "Uma publicação exibe os dados abaixo com o título “Participação dobrou!”. O gráfico de barras dessa publicação começa em 40%, fazendo a barra de 60% ter o dobro da altura da barra de 50%.\nA leitura crítica correta é que",
    "alts": [
      "a participação caiu 10 pontos percentuais.",
      "o aumento foi de 100 pontos percentuais, pois uma barra tem o dobro da altura.",
      "a participação realmente dobrou de um ano para outro.",
      "o recorte do eixo exagera a diferença: houve aumento de 10 pontos percentuais, equivalente a 20% sobre o valor inicial."
    ],
    "resposta": "D",
    "explicacao": "A participação passou de 50% para 60%: aumento de 10 pontos percentuais. Relativamente ao início, 10 ÷ 50 = 20%. Com eixo iniciado em 40%, as alturas aparentes são 10 e 20 unidades, mas isso não significa que a participação dobrou.",
    "pags": [],
    "tabela": {
      "titulo": "Participação de estudantes na feira de ciências",
      "cabecalho": [
        "Ano",
        "Participação"
      ],
      "linhas": [
        [
          "2025",
          "50%"
        ],
        [
          "2026",
          "60%"
        ]
      ]
    }
  },
  {
    "id": "aut-034",
    "ano": 0,
    "num": 34,
    "materia": "Português",
    "topico": "Gêneros textuais",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Fácil",
    "enun": "Leia o texto elaborado para esta questão:\n“OFICINA DE ROBÓTICA — Inscrições de 3 a 7 de março, na secretaria. Vagas destinadas aos estudantes do 9º ano. Atividades às quartas-feiras, às 14h.”\nPela organização e finalidade, o texto é um",
    "alts": [
      "artigo de opinião, pois defende uma tese.",
      "aviso, pois divulga informações práticas ao público interessado.",
      "conto, pois relata uma experiência de uma personagem.",
      "poema, pois organiza os fatos em versos."
    ],
    "resposta": "B",
    "explicacao": "O texto apresenta, de maneira objetiva, evento, prazo, público e horário: características de aviso. Não há enredo, argumentação de uma tese ou organização poética.",
    "pags": []
  },
  {
    "id": "aut-035",
    "ano": 0,
    "num": 35,
    "materia": "Português",
    "topico": "Gêneros textuais",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Média",
    "enun": "Leia o trecho elaborado para esta questão:\n“À coordenação escolar: solicitamos a instalação de um bicicletário coberto. Muitos estudantes usam bicicleta, mas não dispõem de local seguro para guardá-la. Assinam este pedido os estudantes abaixo relacionados.”\nA presença de solicitação coletiva e de assinaturas caracteriza o gênero",
    "alts": [
      "diário pessoal.",
      "verbete enciclopédico.",
      "abaixo-assinado.",
      "notícia."
    ],
    "resposta": "C",
    "explicacao": "O abaixo-assinado apresenta um pedido ou reivindicação a um destinatário e reúne adesões por assinaturas. O trecho explicita tanto a solicitação quanto seu caráter coletivo.",
    "pags": []
  },
  {
    "id": "aut-036",
    "ano": 0,
    "num": 36,
    "materia": "Português",
    "topico": "Gêneros textuais",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Difícil",
    "enun": "Leia o texto elaborado para esta questão:\n“Li a reportagem sobre o fechamento da praça e discordo da ausência de alternativas. O bairro precisa da obra, mas também de um espaço provisório de lazer. Espero que o jornal acompanhe essa discussão. — Uma leitora.”\nPor responder a uma publicação e expressar uma avaliação dirigida ao veículo, esse texto se aproxima de uma",
    "alts": [
      "reportagem, pois apresenta uma apuração com diversas fontes.",
      "propaganda, pois promove a venda de um serviço.",
      "ata, pois registra decisões de uma reunião.",
      "carta do leitor, pois comenta um conteúdo publicado e manifesta um posicionamento."
    ],
    "resposta": "D",
    "explicacao": "A autora se identifica como leitora, retoma uma reportagem e apresenta seu ponto de vista ao jornal. Esses traços caracterizam a carta do leitor; não há apuração de reportagem, deliberação em ata ou venda.",
    "pags": []
  },
  {
    "id": "aut-037",
    "ano": 0,
    "num": 37,
    "materia": "Matemática",
    "topico": "Juros simples",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Fácil",
    "enun": "Um capital de R$ 800,00 foi aplicado a juros simples de 2% ao mês durante 5 meses. O valor dos juros produzidos foi",
    "alts": [
      "R$ 100,00.",
      "R$ 880,00.",
      "R$ 80,00.",
      "R$ 40,00."
    ],
    "resposta": "C",
    "explicacao": "No regime simples, J = C × i × t. Assim, J = 800 × 0,02 × 5 = R$ 80,00. R$ 880,00 seria o montante, não os juros.",
    "pags": []
  },
  {
    "id": "aut-038",
    "ano": 0,
    "num": 38,
    "materia": "Matemática",
    "topico": "Juros simples",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Média",
    "enun": "Uma aplicação de R$ 1.500,00, a juros simples de 1,5% ao mês, atingiu montante de R$ 1.770,00. O prazo dessa aplicação foi de",
    "alts": [
      "10 meses.",
      "12 meses.",
      "18 meses.",
      "8 meses."
    ],
    "resposta": "B",
    "explicacao": "Os juros foram 1.770 − 1.500 = R$ 270,00. A cada mês, rendem 1.500 × 0,015 = R$ 22,50. Logo, t = 270 ÷ 22,50 = 12 meses.",
    "pags": []
  },
  {
    "id": "aut-039",
    "ano": 0,
    "num": 39,
    "materia": "Matemática",
    "topico": "Juros simples",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Difícil",
    "enun": "Um capital foi aplicado a juros simples de 18% ao ano durante 8 meses, resultando em montante de R$ 2.800,00. O capital aplicado foi",
    "alts": [
      "R$ 2.296,00.",
      "R$ 2.464,00.",
      "R$ 2.688,00.",
      "R$ 2.500,00."
    ],
    "resposta": "D",
    "explicacao": "É necessário igualar as unidades: 8 meses = 8/12 de ano. A taxa total é 0,18 × 8/12 = 0,12. Como M = C(1 + it), temos 2.800 = 1,12C e C = R$ 2.500,00. Juros simples não envolvem capitalização mensal.",
    "pags": []
  },
  {
    "id": "aut-040",
    "ano": 0,
    "num": 40,
    "materia": "Matemática",
    "topico": "Razões e proporções (razão, taxa, densidade, velocidade)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Fácil",
    "enun": "Em um mapa na escala 1:50.000, a distância entre duas escolas mede 3,6 cm. A distância real entre elas é",
    "alts": [
      "0,18 km.",
      "180 km.",
      "1,8 km.",
      "18 km."
    ],
    "resposta": "C",
    "explicacao": "A distância real é 3,6 × 50.000 = 180.000 cm. Como 100.000 cm = 1 km, a distância é 1,8 km.",
    "pags": []
  },
  {
    "id": "aut-041",
    "ano": 0,
    "num": 41,
    "materia": "Matemática",
    "topico": "Razões e proporções (razão, taxa, densidade, velocidade)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Média",
    "enun": "Para preparar uma bebida, mistura-se concentrado e água na razão de 2 para 5. Deseja-se preparar 2,1 litros dessa bebida, mantendo a mesma proporção. A quantidade de concentrado necessária é",
    "alts": [
      "420 mL.",
      "1.500 mL.",
      "600 mL.",
      "840 mL."
    ],
    "resposta": "C",
    "explicacao": "A mistura tem 2 + 5 = 7 partes. O concentrado representa 2/7 do total: (2/7) × 2.100 = 600 mL. A razão 2:5 não corresponde a 2/5 do volume final.",
    "pags": []
  },
  {
    "id": "aut-042",
    "ano": 0,
    "num": 42,
    "materia": "Matemática",
    "topico": "Razões e proporções (razão, taxa, densidade, velocidade)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Difícil",
    "enun": "Uma van percorre 60 km de ida a 40 km/h e retorna pelo mesmo trajeto a 60 km/h, sem paradas. A velocidade média em todo o percurso é",
    "alts": [
      "48 km/h.",
      "45 km/h.",
      "52 km/h.",
      "50 km/h."
    ],
    "resposta": "A",
    "explicacao": "Na ida, o tempo é 60 ÷ 40 = 1,5 h; na volta, 60 ÷ 60 = 1 h. A velocidade média é distância total ÷ tempo total = 120 ÷ 2,5 = 48 km/h. A média aritmética das velocidades não vale para tempos diferentes.",
    "pags": []
  },
  {
    "id": "aut-043",
    "ano": 0,
    "num": 43,
    "materia": "Matemática",
    "topico": "Teorema de Pitágoras",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Fácil",
    "enun": "Um terreno retangular mede 6 m de largura e 8 m de comprimento. A distância, em linha reta, entre dois vértices opostos é",
    "alts": [
      "12 m.",
      "10 m.",
      "7 m.",
      "14 m."
    ],
    "resposta": "B",
    "explicacao": "A diagonal é a hipotenusa de um triângulo retângulo: d² = 6² + 8² = 36 + 64 = 100; d = 10 m.",
    "pags": []
  },
  {
    "id": "aut-044",
    "ano": 0,
    "num": 44,
    "materia": "Matemática",
    "topico": "Teorema de Pitágoras",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Média",
    "enun": "Uma escada de 13 m está apoiada em uma parede vertical, com a base a 5 m da parede, em um piso horizontal. A altura alcançada pela extremidade superior da escada é",
    "alts": [
      "8 m.",
      "18 m.",
      "12 m.",
      "9 m."
    ],
    "resposta": "C",
    "explicacao": "A escada é a hipotenusa: 13² = 5² + h². Assim, h² = 169 − 25 = 144 e h = 12 m. É necessário subtrair o quadrado do cateto conhecido.",
    "pags": []
  },
  {
    "id": "aut-045",
    "ano": 0,
    "num": 45,
    "materia": "Matemática",
    "topico": "Teorema de Pitágoras",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Difícil",
    "enun": "Um terreno retangular tem perímetro de 46 m e diagonal de 17 m. A área desse terreno é",
    "alts": [
      "120 m².",
      "115 m².",
      "144 m².",
      "289 m²."
    ],
    "resposta": "A",
    "explicacao": "Se os lados são a e b, então a + b = 23 e a² + b² = 17² = 289. Usando (a + b)² = a² + 2ab + b²: 529 = 289 + 2ab; ab = 120 m². Os lados são 8 m e 15 m.",
    "pags": []
  },
  {
    "id": "aut-046",
    "ano": 0,
    "num": 46,
    "materia": "Português",
    "topico": "Coesão e coerência (referenciação e pronomes)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Fácil",
    "enun": "Leia o período:\n“A escola recebeu novos microscópios. Esses equipamentos serão usados nas aulas de Ciências.”\nA expressão “Esses equipamentos” retoma",
    "alts": [
      "a escola.",
      "os novos microscópios.",
      "os estudantes da escola.",
      "as aulas de Ciências."
    ],
    "resposta": "B",
    "explicacao": "O demonstrativo “Esses” e o nome genérico “equipamentos” retomam “novos microscópios”, mantendo o referente sem repetir a mesma expressão.",
    "pags": []
  },
  {
    "id": "aut-047",
    "ano": 0,
    "num": 47,
    "materia": "Português",
    "topico": "Coesão e coerência (referenciação e pronomes)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Média",
    "enun": "Leia o período:\n“A escola ampliou o horário da biblioteca e criou um clube de leitura. Essas medidas aumentaram a circulação de livros.”\nA expressão “Essas medidas” retoma",
    "alts": [
      "somente o horário anterior da biblioteca.",
      "a ampliação do horário e a criação do clube de leitura.",
      "somente a circulação de livros.",
      "apenas o clube de leitura."
    ],
    "resposta": "B",
    "explicacao": "“Essas medidas” resume duas ações mencionadas na frase anterior. É uma retomada que reúne a ampliação do horário e a criação do clube em uma mesma expressão.",
    "pags": []
  },
  {
    "id": "aut-048",
    "ano": 0,
    "num": 48,
    "materia": "Português",
    "topico": "Coesão e coerência (referenciação e pronomes)",
    "autoral": true,
    "origem": "Autoral",
    "dificuldade": "Difícil",
    "enun": "O período “Lucas avisou a Pedro que seu projeto fora selecionado” permite mais de uma leitura sobre a quem pertence o projeto. Qual reescrita elimina essa ambiguidade e informa que o projeto pertence a Pedro?",
    "alts": [
      "Lucas avisou a Pedro que o projeto de Pedro fora selecionado.",
      "Lucas avisou a Pedro que o seu próprio projeto fora selecionado.",
      "Lucas avisou a Pedro sobre a seleção de seu projeto.",
      "Lucas avisou ao colega que o projeto dele fora selecionado."
    ],
    "resposta": "A",
    "explicacao": "A expressão explícita “o projeto de Pedro” identifica sem dúvida o possuidor. Nas outras versões, “seu”, “seu próprio” ou “dele” ainda podem ser associados a Lucas ou a Pedro.",
    "pags": []
  }
];
