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
        "Reconstruí a plataforma do zero como versão 2.0 e virei a chave com a operação ainda rodando na versão antiga. O fetch no cliente virou Next.js Server Components com revalidação explícita no lugar de um cache SWR: as telas chegam prontas, o payload inicial de JavaScript caiu e uma classe inteira de bugs de dado desatualizado sumiu — o time de operações saiu de uma ferramenta que contornava para uma que usa de fato.",
        "Substituí planilhas de cálculo aduaneiro por um motor de impostos preciso ao centavo — CIF → II → IPI → PIS/COFINS → Siscomex → AFRMM → gross-up do ICMS, calculado em Decimal.js com ROUND_HALF_UP a cada etapa, como módulo puro sem nenhum acesso a banco. A estimativa anterior, por alíquota fixa de ICMS, errava milhares de reais por item da invoice: a diferença entre cotar uma importação no lucro ou no prejuízo.",
        "Automatizei o ciclo de vida do pedido — conciliação de pagamento, avanço no despacho, geração de documentos — como 18 funções duráveis no Inngest, serializadas uma-por-carga via concurrency key e tornadas idempotentes com UPDATEs guardados. Uma API do governo fora do ar ou uma queda no meio do processo não deixa mais o pedido travado em silêncio esperando alguém perceber, e uma carga nunca é processada duas vezes.",
        "Isolei quatro personas dentro de um mesmo produto — importador, parceiro de sourcing na China, despachante aduaneiro e equipe interna — sobre 55 tabelas, modelando multi-tenancy como route groups cujos layouts resolvem o controle de acesso antes de qualquer filho renderizar, apoiado num cookie de organização assinado com HMAC e comparado em tempo constante. O acesso é decidido antes da tela renderizar, não escondido na interface.",
        "Migrei todos os clientes e pedidos do sistema antigo sem downtime e sem perda de dados, como dois pipelines versionados de fases idempotentes com o mapa de id antigo→novo persistido em tabela própria — então uma queda retomava de onde parou em vez de recomeçar. O modelo de pedido legado, de 11 etapas, colapsou para 7 no caminho.",
        "Integrei Siscomex Portal Único (DUIMP, CATP, CADA, Carga), pagamentos Asaas em duas contas, assinatura eletrônica ZapSign e rastreamento ShipsGo — cada webhook de entrada verificando a própria assinatura e caindo numa fila de eventos persistida antes de qualquer regra de negócio rodar. Status que antes era conferido à mão em quatro sites passou a se atualizar sozinho em um lugar só.",
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
        "Sou dono do motor de camadas do mapa sobre o qual o produto inteiro é construído: 4,4 mil linhas de TypeScript sem framework, em que camadas são declaradas como dado — handlers de clique inclusive, como chaves tipadas em um registry — e uma factory resolve uma de cinco estratégias de renderização por trás de uma única interface. Adicionar uma estratégia é uma subclasse e um case, então os analistas passam a ter dados novos no mapa em horas, não em um ciclo de release.",
        "Mantive o mapa confiável sob filtragem rápida revalidando cada resposta contra os filtros atuais depois do await, não só abortando na mudança — uma requisição abortada ainda resolve — com a mesma guarda espelhada no caminho de erro, para que um 404 velho nunca apareça por cima de dado vivo. Geometria desatualizada exibida como atual é um bug que não levanta erro nenhum e engana silenciosamente quem está lendo o mapa.",
        "Construí o pipeline de GeoJSON em torno de falhas que não emitem erro: a Data layer do Google não dispara eventos em GeometryCollection, então cada uma é expandida em features autônomas carregando o id e as propriedades do pai. Sem isso, o clique para de funcionar em certos imóveis sem nada no console que explique o porquê.",
        "Isolei cinco regras de seleção de camadas que interagem entre si em uma função pura sobre um Set — única, especial, drill-down, exclusiva e padrão, em precedência fixa, incluindo o caso invertido em que desativar a camada-pai ativa as filhas — mantendo o comportamento testável em vez de espalhado pelos componentes.",
        "Mantive milhares de features interativas na main thread: congelando o GeoJSON antes de ele chegar ao estado reativo, para o framework nunca criar proxy profundo nele, limitando clusters ao viewport e re-renderizando só quando o mapa fica ocioso, e devolvendo controle ao navegador entre as etapas de desmonte ao trocar de modo de visualização.",
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
        "Sou dono do app React Native de ponta a ponta — 39 telas entregues via EAS a mais de 12.000 assinantes pagantes — junto com os módulos de backend por trás dele, integrando com um sistema de cobrança ao vivo que eu podia estender mas nunca pausar.",
        "Descobri que apenas 365 de 11.759 assinantes já haviam feito login — o clube cobrava de gente que nunca abriu aquilo que pagava. Substituí as contas pré-provisionadas em massa, que convertiam a 8%, por provisionamento just-in-time no primeiro acesso.",
        "Modelei a moeda de fidelidade como um ledger de lotes com ciclo de vida próprio — pendente, aprovado, reservado, debitado, expirado, anulado — de modo que expirar uma recompensa ou estornar uma cobrança afeta só o lote de origem, em vez de reconciliar um saldo mutável depois do fato; e empurrei o resgate duplicado para o schema como índice único parcial em (client_id, product_id) WHERE status = 'pending', transformando o toque duplo em violação de constraint em vez de uma corrida que a API precisa vencer em toda rota.",
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
        "Convergi cinco canais de pedido — loja online, QR na mesa, PDV manual, webhook de pagamento e WhatsApp — em um único caminho de criação, desenhando a fronteira da transação em torno do que precisa ser verdade junto e empurrando impressão, notificações e baixa de estoque não-bloqueante para depois do commit, em handlers isolados. Adicionar um canal não exige nova lógica de pedido, e uma impressão ou notificação que falha não consegue mais destruir um pedido que já existe.",
        "Tornei o controle de estoque uma decisão por canal, não uma regra só: canais de cliente decrementam dentro da transação com UPDATE … WHERE stockQuantity >= qty, um compare-and-swap que torna estoque negativo inalcançável sem lock, enquanto canais pós-pagamento limitam em vez de recusar — porque rejeitar um pagamento já capturado deixa o cliente cobrado e sem pedido.",
        "Escrevi o webhook de assinatura assumindo reentrega: efeito e marcador de idempotência commitados na mesma transação, eventos fora de ordem rejeitados por uma marca d'água dentro do WHERE em vez de timestamps confiáveis, e eventos permanentemente inválidos reconhecidos para o provedor parar de repetir o que nunca vai dar certo. A cobrança nunca duplica, nunca rebaixa um plano ativo por engano e nunca exige conciliação manual.",
        "Rastreei um furo no fechamento de caixa até uma causa raiz única — finalizar a mesa zera a foreign key que prende aquele pagamento ao tenant, então o fluxo normal de pagar-e-fechar era justamente o que quebrava — e remodelei o pagamento para ser criado dentro de um turno, em vez de associado a um por janela de tempo. Os caixas fecham corretamente desde então.",
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
