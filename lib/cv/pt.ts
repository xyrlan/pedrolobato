import type { CV } from "./types";

export const pt: CV = {
  name: "Pedro Lobato",
  title: "Engenheiro de Software · Full Stack",
  location: "Brasília, DF · Remoto",
  pdf: "/cv/pedro-lobato-cv-pt.pdf",
  links: [
    { name: "xyrlancoding@gmail.com", url: "mailto:xyrlancoding@gmail.com" },
    { name: "linkedin.com/in/pedro-lobato", url: "https://linkedin.com/in/pedro-lobato" },
    { name: "github.com/xyrlan", url: "https://github.com/xyrlan" },
  ],
  skills: [
    { label: "Linguagens", items: "TypeScript, Python, C# (.NET), SQL" },
    {
      label: "Frameworks",
      items: "Next.js, React, Vue, Nuxt, NestJS, Node.js, .NET, Tailwind CSS, Motion, GSAP",
    },
    {
      label: "Dados",
      items: "PostgreSQL, Drizzle ORM, Prisma, MongoDB, Redis, Supabase",
    },
    {
      label: "Plataforma",
      items: "Vercel, Cloudflare, Railway, Inngest, Bun, Sentry, Git",
    },
    { label: "IA", items: "Vercel AI SDK, Anthropic Claude, tool calling, RAG" },
    { label: "Idiomas", items: "Inglês (fluente), Português (nativo)" },
  ],
  experience: [
    {
      role: "Engenheiro de Software Principal",
      company: "Soul Global",
      link: "https://soulglobal.com.br",
      mode: "Remoto",
      period: "05/2024 - Atual",
      summary:
        "SaaS de importação e logística que automatiza desembaraço aduaneiro, formação de preço com custo posto e rastreamento de carga.",
      bullets: [
        "Reconstruí a plataforma do zero como versão 2.0 e coloquei no ar com a operação rodando na versão antiga: as telas agora chegam prontas do servidor em vez de carregar os dados no navegador, deixaram de mostrar informação desatualizada depois de uma ação, e o time de operações saiu de uma ferramenta que contornava para uma que usa de fato.",
        "Substituí planilhas de cálculo aduaneiro por um motor de impostos que calcula a cadeia completa — II, IPI, PIS/COFINS, Siscomex, AFRMM e o gross-up do ICMS — até o centavo. A estimativa anterior, por alíquota fixa, errava milhares de reais por item da invoice: a diferença entre cotar uma importação no lucro ou no prejuízo.",
        "Automatizei o ciclo de vida do pedido — conciliação de pagamento, avanço no despacho, geração de documentos — como processos em segundo plano que se repetem sozinhos e retomam de onde pararam. Uma API do governo fora do ar ou uma queda no meio do processo não deixa mais o pedido travado em silêncio esperando alguém perceber; também garante que uma carga nunca seja processada duas vezes.",
        "Separei quatro tipos de usuário dentro de um mesmo produto — importador, parceiro de sourcing na China, despachante aduaneiro e equipe interna — de forma que cada um só alcança os próprios dados, com o acesso decidido antes da tela renderizar, não escondido na interface.",
        "Migrei todos os clientes e pedidos do sistema antigo para o novo modelo de dados sem downtime e sem perda, simplificando o fluxo de pedido de 11 para 7 etapas no caminho. A migração podia parar e continuar em qualquer ponto, então uma falha custava minutos em vez de recomeçar do zero.",
        "Conectei a plataforma aos sistemas de que o importador depende — portal aduaneiro federal (Siscomex), pagamentos, assinatura eletrônica e rastreamento internacional de carga — de modo que status que antes era conferido à mão em quatro sites diferentes passou a se atualizar sozinho em um lugar só.",
      ],
    },
    {
      role: "Engenheiro Front-End · PJ",
      company: "Moovus — TerraLogs",
      mode: "Remoto",
      period: "09/2025 - Atual",
      summary:
        "Central de Inteligência, plataforma de inteligência geoespacial sobre imóveis rurais e processos minerários, construída em um time de produto de dois engenheiros. Só front-end — e é onde a arquitetura vive.",
      bullets: [
        "Sou dono do motor de mapas sobre o qual o produto inteiro é construído — 4,4 mil linhas de TypeScript em que uma nova camada do mapa é adicionada descrevendo-a, não escrevendo código de renderização. Os analistas passam a ter dados novos no mapa em horas, não em um ciclo de release.",
        "Mantive o mapa confiável sob filtragem rápida: resultados que chegam depois de o usuário já ter mudado os filtros são descartados em vez de desenhados, então o que está na tela sempre corresponde ao que foi pedido — uma classe de bug que não mostra erro nenhum e engana silenciosamente quem está lendo o mapa.",
        "Corrigi cliques que paravam de funcionar em certos imóveis sem aviso: o Google Maps não emite evento para um tipo de geometria, então o pipeline passou a separá-las em áreas selecionáveis individualmente, mantendo todo imóvel do mapa inspecionável.",
        "Transformei cinco regras de seleção de camadas que interagem entre si — incluindo o caso invertido em que desligar uma camada-pai liga as filhas — em uma decisão única, previsível e testável, em vez de comportamento espalhado pela interface.",
        "Mantive milhares de imóveis fluidos e clicáveis no navegador: renderizando só o que está em tela, redesenhando só quando o mapa para de se mexer, e mantendo a interface responsiva enquanto camadas pesadas carregam ou são desmontadas.",
      ],
    },
    {
      role: "Engenheiro de Software · PJ",
      company: "Corações Preciosos — Clubinho",
      mode: "Remoto",
      period: "02/2026 - Atual",
      summary:
        "Clube de assinatura de livros infantis com mais de 12.000 assinantes ativos. Sou dono do produto voltado ao assinante e da plataforma de retenção por trás dele; o motor de cobrança e logística foi construído por outros engenheiros do time.",
      bullets: [
        "Sou dono do aplicativo do assinante de ponta a ponta — 39 telas, entregues a mais de 12.000 assinantes pagantes — e também do backend por trás dele, construído em cima de um sistema de cobrança que processava cobranças reais o tempo todo e nunca pôde ser pausado.",
        "Descobri que apenas 365 de 11.759 assinantes já haviam feito login — o clube cobrava de gente que nunca abriu aquilo que pagava. Refiz o onboarding para que a conta seja criada no momento em que o assinante chega pela primeira vez, em vez de criada em massa antes e esperando um login que nunca vinha.",
        "Construí o programa de fidelidade que transforma a assinatura em motivo para voltar: pontos que entram, expiram e podem ser estornados individualmente, de modo que um pedido reembolsado ou uma recompensa vencida se corrige sozinho, sem operador recalculando saldo — e o assinante não consegue resgatar a mesma recompensa duas vezes tocando duas vezes.",
      ],
    },
    {
      role: "Engenheiro de Software · Fundador",
      company: "Meunu",
      link: "https://meunu.com.br",
      mode: "Remoto",
      period: "08/2023 - Atual",
      summary:
        "SaaS multi-tenant para restaurantes, construído e operado sozinho: mais de 360 lojas cadastradas, mais de 2.500 pedidos e mais de 1.000 clientes atendidos.",
      bullets: [
        "Dei a cada restaurante cinco formas de receber pedido — loja online, QR code na mesa, PDV no balcão, link de pagamento e WhatsApp — todas caindo na mesma fila da cozinha. Adicionar um canal não exige nova lógica de pedido, e uma falha ao imprimir a comanda ou enviar uma notificação não consegue mais perder um pedido que o cliente já fez.",
        "Tornei a venda a mais impossível onde importa e inofensiva onde não importa: um item que acaba durante o checkout para de ser vendido na hora, mas um pedido já pago é sempre aceito — recusá-lo deixaria o cliente cobrado e sem pedido.",
        "Fiz a cobrança da assinatura se autocorrigir: uma confirmação de pagamento que chega duas vezes, atrasada ou fora de ordem nunca cobra a loja em dobro, nunca rebaixa um plano ativo por engano e nunca exige conciliação manual — o faturamento roda sem eu estar olhando.",
        "Investiguei fechamentos de caixa que não batiam com as vendas do dia: fechar a mesa desvinculava o pagamento do turno, então a forma mais comum de pagar era justamente a que quebrava. Reescrevi como o pagamento se prende ao turno, e os caixas fecham corretamente desde então.",
      ],
    },
    {
      role: "Desenvolvedor Full Stack · UI/UX",
      company: "Atuação Independente",
      mode: "Remoto",
      period: "03/2022 - Atual",
      summary:
        "Trabalho direto com clientes — sites institucionais, landing pages e interfaces de produto.",
      bullets: [
        "Construí sites de clientes em Next.js e TypeScript com interação animada, tratando animação como forma de conduzir a atenção pela página, não como enfeite, para aumentar engajamento e tempo de permanência.",
        "Levei o Pesqueiro110 a mais de 1.500 visitas diárias com SEO baseado em segmentação geográfica e relevância de conteúdo, sem tráfego pago — crescimento orgânico que continuou funcionando depois do fim do contrato.",
        "Integrei blogs com CMS (Sanity) para que os clientes publicassem sem depender de um desenvolvedor, que foi o que manteve os sites bem ranqueados ao longo do tempo.",
        "Traduzi objetivos de negócio em interface conversando direto com clientes de vários setores, incluindo o StopByCafe (cafeteria no centro de Nova York) e o OABparaTodos (landing page de campanha para a OAB-DF).",
      ],
    },
  ],
  projects: [
    {
      name: "Clearframe",
      what:
        "Utilitário para Windows que restaura janelas de aplicativos que se escondem na inicialização. Licença atrelada à impressão digital do hardware e assinada com ECDSA, com período de tolerância no Stripe para que uma renovação falha nunca bloqueie um usuário pagante no meio da sessão.",
    },
    {
      name: "BingX Robot",
      what:
        "Robô de trading autônomo que separa o motor de risco do motor de execução, de forma que decisões de carteira tomadas por IA nunca conseguem furar os limites de posição.",
    },
  ],
  education: [
    {
      course: "Engenharia de Software",
      school: "Descomplica Faculdade",
      place: "Brasília, DF",
      period: "02/2023 - 06/2028",
    },
    {
      course: "Proficiência em Inglês",
      school: "Cultura Inglesa",
      place: "Brasília, DF",
      period: "06/2011 - 06/2017",
      note: "Uma das maiores escolas de inglês do Brasil",
    },
  ],
  ui: {
    metaTitle: "Pedro Lobato — Currículo",
    metaDescription:
      "Currículo de Pedro Lobato, engenheiro de software atuando com logística de importação, automação de processos e interfaces de produto.",
    downloadPdf: "Baixar PDF",
    backToWork: "← Voltar aos projetos",
    skills: "Competências",
    experience: "Experiência",
    projects: "Projetos pessoais selecionados",
    education: "Formação",
    otherLocale: "View in English",
    otherLocaleHref: "/cv",
  },
};
