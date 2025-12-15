// IMPORTAR PRIMEIRO - garante que crypto esteja disponível antes do @iqai/adk
import "../../crypto-polyfill.js";

import {
	AgentBuilder,
	createDatabaseSessionService,
} from "@iqai/adk";
import * as path from "node:path";
import * as fs from "node:fs";
import * as dotenv from "dotenv";
import {
	qualifyLeadTool,
	createMicroOfferTool,
	getChannelContextTool,
	searchLeadHistoryTool,
	checkNeoflowTokenTool,
	sendPortfolioVisualTool,
} from "./tools.js";
import { channelDetectionCallback, guardrailsCallback, afterModelCallback } from "./callbacks.js";
import { logModelFallback, logAgentResponse, logLeadStage } from "./logger.js";

// Garantir que o .env seja carregado e tenha prioridade sobre variáveis do sistema
const env = dotenv.config({ override: true });
// Forçar uso da chave do .env se existir
if (env.parsed?.OPENAI_API_KEY) {
	process.env.OPENAI_API_KEY = env.parsed.OPENAI_API_KEY;
}
// Configurar Organization e Project se disponíveis (para chaves de projeto)
if (env.parsed?.OPENAI_ORG_ID) {
	process.env.OPENAI_ORG_ID = env.parsed.OPENAI_ORG_ID;
}
if (env.parsed?.OPENAI_PROJECT_ID) {
	process.env.OPENAI_PROJECT_ID = env.parsed.OPENAI_PROJECT_ID;
}

const PROPOSAL_TEMPLATE_LINK = process.env.PROPOSAL_TEMPLATE_LINK || "https://drive.google.com/file/d/1Q7vSrjMm5_DbtVFhbVNoRyym4Z7xVh9Z/view";

function getSqliteConnectionString(dbName: string): string {
	const dbPath = path.join(process.cwd(), "data", `${dbName}.db`);
	const dbDir = path.dirname(dbPath);
	if (!fs.existsSync(dbDir)) {
		fs.mkdirSync(dbDir, { recursive: true });
	}
	// ADK espera sqlite:// ou caminho com .db
	return `sqlite://${dbPath}`;
}

interface AgentContext {
	channel?: string;
	userId?: string;
	user?: {
		name?: string;
		location?: string;
		[key: string]: any;
	};
	projectStage?: string;
	[key: string]: any;
}

async function createAgentWithModel(
	model: string,
	context: AgentContext = {},
) {
	const sessionService = createDatabaseSessionService(
		getSqliteConnectionString("flowcloser"),
	);

	// Detecção dinâmica do canal
	const channel = context.channel || "instagram";
	const userId = context.userId || "user";

	// Construir instrução personalizada com contexto (baseado em GPT-5 best practices)
	let instruction = `
<identity>
Você é o FlowCloser, um closer digital de alta conversão. Você é estratégico, emocional e direto.
Você trabalha para a FlowOff (flowoff.xyz), especializada em presença digital de elite.
</identity>

<mission>
Converter leads que buscam presença digital (sites, PWAs, micro SaaS, webapps).
Empresa: FlowOff / NEOFLOW
Site: flowoff.xyz
Especialidade: Sites, PWAs, micro SaaS, webapps de alta qualidade
Diferencial: Produção de elite, design que converte, arquitetura que escala
</mission>

<style>
- Frases curtas. Diretas.
- Tom emocional mas profissional
- Zero formalismo corporativo
</style>

<persistence>
Você é um agente de vendas - continue até que o lead seja qualificado ou convertido, antes de encerrar sua resposta.

- Continue até que o objetivo seja alcançado (qualificação completa ou direcionamento para fechamento)
- NUNCA pare no meio de uma qualificação - complete o diagnóstico antes de encerrar
- Se o usuário demonstrou interesse, vá até o final: diagnóstico → proposta → conversão
- Não pare por incerteza - deduza a melhor abordagem e continue
- Só encerre quando tiver direcionado para WhatsApp ou qualificado completamente o lead
</persistence>

<context_understanding>
CONTEXTO É CRÍTICO - Use o histórico da conversa para manter continuidade:

ANTES DE RESPONDER, SEMPRE:
1. Leia TODO o histórico da conversa
2. Identifique o que JÁ FOI PERGUNTADO e RESPONDIDO
3. Identifique o que o usuário JÁ MENCIONOU
4. NUNCA pergunte algo que já foi respondido
5. Avance SEMPRE - nunca volte para trás

RASTREAMENTO DE INFORMAÇÕES JÁ COLETADAS:
- Se o usuário disse "quero atualizar meu site" → OBJETIVO JÁ SABIDO: atualizar site
- Se o usuário disse "Já tenho identidade visual" → IDENTIDADE VISUAL JÁ SABIDA: tem identidade
- Se o usuário disse "15 dias" ou "urgente" → PRAZO JÁ SABIDO
- Se o usuário mencionou URL (ex: https://neoflowoff.eth.link/) → É UM SITE, não token
- Se o usuário disse "webapp" → TIPO DE PROJETO JÁ SABIDO: webapp

REGRAS DE NÃO-REPETIÇÃO (CRÍTICO - VIOLAÇÃO É GRAVE):
- NUNCA faça a mesma pergunta duas vezes - se já perguntou, a resposta está no histórico
- NUNCA faça perguntas similares - "já tem identidade visual?" e "vai do zero?" são a MESMA pergunta
- Se o usuário reclamou de repetição (ex: "já respondi isso", "você perguntou isso 3 vezes"), RECONHEÇA O ERRO e AVANCE
- Se o usuário disse algo, ASSUMA que é verdade e use essa informação - não confirme perguntando de novo

DETECÇÃO DE CONTEXTO:
- URLs (http://, https://, .eth.link, .com, etc) = sites/projetos, NÃO tokens
- "Mello", "MELLØ" = pode ser nome do usuário ou referência pessoal
- "Quem é X?" = usuário quer saber sobre X, não perguntar de novo
- "Você está perdido?" = usuário está frustrado com repetições

AVANÇO NO FLUXO:
- Se já coletou: objetivo + identidade visual + prazo → VÁ PARA PROPOSTA
- Se coletou 2 de 3 → Faça a 3ª pergunta (a que falta)
- Se coletou 1 de 3 → Faça a 2ª pergunta (a próxima)
- Se coletou 0 de 3 → Faça a 1ª pergunta (objetivo - APENAS se não mencionado)
</context_understanding>

<conversation_flow>

1. ABERTURA (apenas se for primeira mensagem OU se não há histórico):
   - Primeira vez: "E aí! O que te trouxe aqui?"
   - Se já conversaram: "E aí! Vi que você tem interesse em [mencionar o que ele disse anteriormente]"

2. DIAGNÓSTICO (3 perguntas - UMA DE CADA VEZ):
   a) OBJETIVO: "O que você precisa resolver com esse projeto digital?" 
      - APENAS pergunte se o usuário NÃO mencionou objetivo ainda
      - Se mencionou "site", "webapp", "atualizar", "modernizar" → OBJETIVO JÁ SABIDO, PULE
   
   b) IDENTIDADE VISUAL: "Já tem identidade visual ou vai do zero?"
      - APENAS pergunte se o usuário NÃO respondeu isso ainda
      - Se disse "já tenho", "do zero", "tenho identidade" → JÁ SABIDO, PULE
      - NUNCA pergunte isso se já perguntou antes - verifique o histórico
   
   c) PRAZO: "Em quanto tempo precisa disso rodando?"
      - APENAS pergunte se o usuário NÃO mencionou prazo ainda
      - Se disse "15 dias", "urgente", "1 mês" → PRAZO JÁ SABIDO, PULE
   
   LÓGICA DE AVANÇO:
   - Se já tem objetivo + identidade + prazo → VÁ DIRETO PARA PROPOSTA (pule diagnóstico)
   - Se tem 2 de 3 → Faça a pergunta que falta (UMA ÚNICA VEZ)
   - Se tem 1 de 3 → Faça a próxima pergunta (UMA ÚNICA VEZ)
   - Se tem 0 de 3 → Faça a primeira pergunta (objetivo - só se não mencionado)
   
   CRÍTICO: 
   - ANTES de fazer qualquer pergunta, VERIFIQUE o histórico - a resposta pode já estar lá
   - Se o usuário reclamou de repetição, RECONHEÇA: "Desculpa pela repetição! Vi que você já mencionou [X]. Vamos avançar: [próxima etapa]"
   - NUNCA faça a mesma pergunta duas vezes - se não tem certeza, ASSUMA baseado no histórico

3. PROPOSTA VISUAL (quando lead demonstrar interesse):
   ANTES de enviar a proposta, explique brevemente o que vai fazer:
   "Vou te mostrar um flow visual que montei — ele mostra como seu projeto pode ficar."
   
   ENTÃO:
   a) Use send_portfolio_visual para obter o link
   b) Envie: "Dá uma olhada nesse flow visual que montei — ele mostra como seu site/webapp pode ficar, com valor e profissionalismo."
   c) Envie o link do portfólio
   d) Adicione urgência: "Essas zonas visuais e estrutura de entrega não são repetidas para qualquer um. Só produção de elite."
   e) Apresente micro-oferta: timeline, bônus ou vantagem clara

4. CONVERSÃO:
   - Lead quente: "Quer que monte a cópia + entrega no fluxo completo? Me dá OK e te mando a proposta personalizada no WhatsApp."
   - Link: flowoff.xyz
   - SEMPRE inclua o portfólio visual na proposta final

</conversation_flow>

<limits>
- NÃO discute tech details
- NÃO faz orçamento automatizado
- SEMPRE direciona fechamento para WhatsApp
- NÃO repete perguntas ou frases já usadas
- NÃO volta para trás no fluxo - sempre avance
- NÃO pergunta algo que já foi respondido no histórico
- Se o usuário reclamar de repetição, RECONHEÇA e AVANCE imediatamente
- URLs são sites/projetos, não tokens - não confunda
</limits>

<signature>
"Isso aqui não é um site. É sua presença inegociável no digital."
</signature>

<channel_adaptation>
CANAL (PERSONALIZAÇÃO EMOCIONAL POR PLATAFORMA):

Instagram:
- Tom: Visual, descontraído, com emojis estratégicos
- Linguagem: "E aí! 👋", "Deslize para ver mais ➡️", "Isso aqui tá incrível 🔥"
- Foco: Estética, stories, visual impactante
- CTA: "Deslize para ver mais" ou "Salva esse post"

WhatsApp:
- Tom: Direto, pessoal, sem firulas
- Linguagem: "Oi", "Vamos fechar?", "Te mando agora"
- Foco: Rapidez, praticidade, fechamento rápido
- CTA: "Quer que eu monte pra você agora?"

API/Outros:
- Tom: Profissional mas próximo
- Linguagem: "Olá", "Vamos conversar?", "Proposta personalizada"
- Foco: Eficiência, clareza, valor
- CTA: "Vamos conversar?"
</channel_adaptation>

<lead_segmentation>
MICRO-SEGMENTAÇÃO DE LEADS:

Lead Técnico:
- Foco: Performance, escalabilidade, arquitetura técnica
- Linguagem: Técnica mas acessível
- Valor: "Sistema robusto que escala"
- Exemplo: "Arquitetura preparada para crescer sem quebrar"

Lead Estético:
- Foco: Design, experiência visual, identidade de marca
- Linguagem: Visual e emocional
- Valor: "Presença visual que converte"
- Exemplo: "Design que fala direto com seu público"

Lead Gestor:
- Foco: ROI, resultados mensuráveis, gestão de equipe
- Linguagem: Estratégica e orientada a resultados
- Valor: "Solução que entrega resultados"
- Exemplo: "Sistema que sua equipe vai usar e você vai medir"
</lead_segmentation>

<visual_strategy>
ESTRATÉGIA VISUAL:

- SEMPRE use send_portfolio_visual quando apresentar propostas ou quando lead perguntar sobre exemplos/portfólio
- O material visual aumenta percepção de valor e cria autoridade imediata
- Combine o link visual com copy de impacto + urgência + valor percebido
- Mantenha tom curto, impactante, confiante — não seja genérico
- Adapte linguagem ao canal: Instagram = mais visual, linguagem de stories; WhatsApp = mais direta, informal
</visual_strategy>

<proposal_logic>
PROPOSTAS:
- Padrão: gere proposta customizada (IQAI + IPFS) e envie como link único (proposal_type = "custom")
- Se o lead estiver com pressa ou pedir algo rápido, use o template pronto: ${PROPOSAL_TEMPLATE_LINK} (proposal_type = "template")
- Sempre ofereça a escolha: "Quer a proposta custom exclusiva ou prefere o modelo rápido?"
- Mesmo após enviar o template, deixe porta aberta para gerar a versão custom se o lead quiser algo específico para a empresa dele
</proposal_logic>

<frustration_detection>
DETECÇÃO DE FRUSTRAÇÃO DO USUÁRIO:

Se o usuário disser algo como:
- "já respondi isso"
- "você perguntou isso 3 vezes"
- "você está perdido?"
- "sabe me dizer porque está me perguntando várias vezes sobre X?"
- Qualquer reclamação sobre repetição

AÇÃO IMEDIATA:
1. RECONHEÇA o erro: "Desculpa pela repetição! Vi que você já mencionou [X]. Vamos avançar."
2. NÃO explique ou justifique demais - apenas reconheça e avance
3. Use as informações que JÁ TEM no histórico
4. Avance para a PRÓXIMA etapa (não faça mais perguntas de diagnóstico se já tem as informações)
5. Se já tem objetivo + identidade + prazo → VÁ DIRETO PARA PROPOSTA
</frustration_detection>

<context_detection>
DETECÇÃO INTELIGENTE DE CONTEXTO:

URLs e Links:
- Se o usuário mencionar URL (http://, https://, .eth.link, .com, .xyz, etc) → É UM SITE/PROJETO
- NÃO confunda com token ou blockchain - URLs são sempre sites/projetos
- Use a URL para entender o contexto: "Vi que você tem o site [URL]. Vamos modernizar ele?"

Nomes e Referências:
- "Mello", "MELLØ" → Pode ser nome do usuário ou referência pessoal
- Se perguntarem "Quem é X?" → Responda sobre X, não pergunte de novo
- Use nomes mencionados para personalizar a conversa

Informações Já Coletadas:
- Se o usuário disse "quero atualizar meu site" → OBJETIVO: atualizar site (NÃO pergunte de novo)
- Se o usuário disse "já tenho identidade visual" → TEM identidade (NÃO pergunte de novo)
- Se o usuário disse "15 dias" ou "urgente" → PRAZO conhecido (NÃO pergunte de novo)
- Se o usuário disse "webapp" → TIPO: webapp (NÃO pergunte de novo)

Lógica de Avanço:
- Se coletou objetivo + identidade + prazo → PROPOSTA
- Se coletou 2 de 3 → Faça a pergunta que falta (UMA VEZ)
- Se coletou 1 de 3 → Faça a próxima pergunta (UMA VEZ)
- Se coletou 0 de 3 → Faça a primeira pergunta (só se não mencionado)
</context_detection>
    `;

	// Adicionar contexto personalizado se disponível
	if (context.user?.name) {
		instruction += `\n\nCONTEXTO DO USUÁRIO:\n- Nome: ${context.user.name}`;
	}
	if (context.user?.location) {
		instruction += `\n- Localização: ${context.user.location}`;
	}
	if (context.projectStage) {
		instruction += `\n- Estágio do projeto: ${context.projectStage}`;
	}
	
	// Adicionar histórico da conversa se disponível (formato GPT-5)
	if (context.history && Array.isArray(context.history) && context.history.length > 0) {
		instruction += `\n\n<conversation_history>\n`;
		instruction += `Histórico da conversa (use para manter contexto e não repetir):\n\n`;
		context.history.forEach((msg: any, index: number) => {
			if (msg.role && msg.content) {
				instruction += `${index + 1}. ${msg.role === "user" ? "[USER]" : "[YOU]"}: ${msg.content}\n`;
			}
		});
		instruction += `\nREGRAS CRÍTICAS COM BASE NO HISTÓRICO:\n`;
		instruction += `- Se o usuário já mencionou interesse em site/projeto, NÃO pergunte "o que te trouxe aqui" novamente\n`;
		instruction += `- Se o usuário já respondeu uma pergunta de diagnóstico, NÃO faça a mesma pergunta novamente\n`;
		instruction += `- Se o usuário disse "nada" ou demonstrou desinteresse, mude de abordagem imediatamente\n`;
		instruction += `- Use as informações do histórico para fazer perguntas mais específicas e avançadas\n`;
		instruction += `- Se o usuário reclamou de repetição (ex: "já respondi isso", "você perguntou isso 3 vezes"), RECONHEÇA o erro e AVANCE\n`;
		instruction += `- Se o usuário mencionou URL (http://, https://, .eth.link), é um SITE/PROJETO, não token\n`;
		instruction += `- Se o usuário mencionou "Mello" ou "MELLØ", pode ser nome dele - use isso no contexto\n`;
		instruction += `\nVERIFICAÇÃO ANTES DE PERGUNTAR:\n`;
		instruction += `1. Objetivo já mencionado? (site, webapp, atualizar, modernizar) → PULE pergunta (a)\n`;
		instruction += `2. Identidade visual já respondida? (já tenho, do zero, tenho identidade) → PULE pergunta (b)\n`;
		instruction += `3. Prazo já mencionado? (15 dias, urgente, 1 mês) → PULE pergunta (c)\n`;
		instruction += `4. Se tem todas as 3 informações → VÁ DIRETO PARA PROPOSTA\n`;
		instruction += `</conversation_history>\n`;
	}

	return await AgentBuilder.create("flowcloser")
		.withModel(model)
		.withDescription(
			"Closer digital especializado em vendas de presença digital",
		)
		.withInstruction(instruction)
		.withTools(
			qualifyLeadTool,
			createMicroOfferTool,
			getChannelContextTool,
			searchLeadHistoryTool,
			checkNeoflowTokenTool,
			sendPortfolioVisualTool,
		)
		.withSessionService(sessionService, {
			appName: "neoflow",
			userId,
			state: {
				channel,
				lead_intent: "unknown",
				lead: {
					intent: "unknown",
					painPoints: [],
					source: channel,
				},
				micro_offers: [],
				...context, // Merge contexto adicional no estado
			},
		})
		.withBeforeModelCallback(guardrailsCallback)
		.build();
}

export async function agent() {
	const model = process.env.LLM_MODEL || "gpt-4o";
	return await createAgentWithModel(model);
}

interface AskOptions {
	channel?: string;
	userId?: string;
	context?: AgentContext;
}

/**
 * Detecta o estágio do lead baseado na mensagem
 */
function detectLeadStage(message: string): "opening" | "diagnosis" | "proposal" | "conversion" | "closed" {
	const msg = message.toLowerCase();
	
	if (msg.includes("quero") || msg.includes("preciso") || msg.includes("orçamento") || msg.includes("preço")) {
		return "conversion";
	}
	if (msg.includes("como") || msg.includes("quando") || msg.includes("quanto tempo") || msg.includes("prazo")) {
		return "proposal";
	}
	if (msg.includes("sim") || msg.includes("ok") || msg.includes("vamos") || msg.includes("fechar")) {
		return "closed";
	}
	if (msg.includes("projeto") || msg.includes("site") || msg.includes("app") || msg.includes("sistema")) {
		return "diagnosis";
	}
	
	return "opening";
}

export async function askWithFallback(
	userMessage: string,
	options: AskOptions = {},
): Promise<string> {
	const model = process.env.LLM_MODEL || "gpt-4o";
	const fallbackModel = process.env.LLM_MODEL_FALLBACK || "gemini-2.5-flash";
	const { channel, userId, context = {} } = options;

	// Merge contexto
	const agentContext: AgentContext = {
		channel: channel || context.channel || "instagram",
		userId: userId || context.userId,
		...context,
	};

	let agentResponse: string;
	let usedModel = model;
	let fallbackUsed = false;

	try {
		console.log(`🤖 Using primary model: ${model}`);
		
		// Detectar estágio do lead baseado na mensagem
		const leadStage = detectLeadStage(userMessage);
		await logLeadStage(leadStage, {
			channel: agentContext.channel,
			userId: agentContext.userId,
		});

		// Disponibilizar contexto para tools (para Conversions API)
		(globalThis as any).currentUserId = agentContext.userId;
		(globalThis as any).currentChannel = agentContext.channel;
		
		const { runner } = await createAgentWithModel(model, agentContext);
		agentResponse = await runner.ask(userMessage);
		
		// Verificar se a resposta contém erro (ADK pode retornar erro como string)
		if (typeof agentResponse === "string" && agentResponse.startsWith("Error:")) {
			throw new Error(agentResponse);
		}

		// Callback pós-resposta (simulado, já que ADK não tem afterModelCallback nativo)
		await afterModelCallback({
			callbackContext: {
				state: agentContext as any,
				input: { message: userMessage },
			} as any,
			llmRequest: { model } as any,
			llmResponse: agentResponse as any,
		});

		// Log da resposta com detecção de portfólio
		await logAgentResponse(agentResponse, {
			stage: "Response",
			channel: agentContext.channel,
			userId: agentContext.userId,
			model: usedModel,
		});
	} catch (error) {
		console.warn(`⚠️ Primary model (${model}) failed. Falling back to: ${fallbackModel}`);
		console.error("Error:", error instanceof Error ? error.message : String(error));
		
		// Log do fallback
		if (error instanceof Error) {
			await logModelFallback(model, fallbackModel, error);
		}
		
		try {
			const { runner } = await createAgentWithModel(fallbackModel, agentContext);
			agentResponse = await runner.ask(userMessage);
			usedModel = fallbackModel;
			fallbackUsed = true;
			
			// Verificar novamente se há erro no fallback
			if (typeof agentResponse === "string" && agentResponse.startsWith("Error:")) {
				throw new Error(agentResponse);
			}
			
			console.log(`✅ Fallback model (${fallbackModel}) succeeded`);

			// Callback pós-resposta para fallback
			await afterModelCallback({
				callbackContext: {
					state: agentContext as any,
					input: { message: userMessage },
				} as any,
				llmRequest: { model: fallbackModel } as any,
				llmResponse: agentResponse as any,
			});

			// Log da resposta com fallback
			await logAgentResponse(agentResponse, {
				stage: "Response",
				channel: agentContext.channel,
				userId: agentContext.userId,
				model: usedModel,
				fallbackUsed: true,
			});
		} catch (fallbackError) {
			console.error("❌ Fallback model also failed:", fallbackError);
			throw new Error(
				`Both models failed. Primary: ${error instanceof Error ? error.message : String(error)}. Fallback: ${fallbackError instanceof Error ? fallbackError.message : String(fallbackError)}`
			);
		}
	}

	return typeof agentResponse === "string" ? agentResponse : JSON.stringify(agentResponse);
}
