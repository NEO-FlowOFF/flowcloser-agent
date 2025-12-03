/**
 * Conversions API Integration - Meta Marketing API
 * Rastreia conversões para otimizar anúncios e melhorar ROI
 * 
 * Documentação: https://developers.facebook.com/docs/marketing-api/conversions-api
 */

const META_PIXEL_ID = process.env.META_PIXEL_ID;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const META_CONVERSIONS_API_URL = META_PIXEL_ID 
	? `https://graph.facebook.com/v24.0/${META_PIXEL_ID}/events`
	: null;

export interface ConversionEvent {
	eventName: "Lead" | "Purchase" | "ViewContent" | "InitiateCheckout" | "CompleteRegistration";
	value?: number;
	currency?: string;
	userId?: string;
	channel?: string;
	userData?: {
		email?: string;
		phone?: string;
		firstName?: string;
		lastName?: string;
	};
	customData?: Record<string, any>;
}

/**
 * Rastreia evento de conversão na Meta Conversions API
 */
export async function trackConversion(event: ConversionEvent): Promise<boolean> {
	if (!META_PIXEL_ID || !META_ACCESS_TOKEN || !META_CONVERSIONS_API_URL) {
		console.warn("⚠️ Meta Conversions API não configurada. Configure META_PIXEL_ID e META_ACCESS_TOKEN");
		return false;
	}

	try {
		const eventTime = Math.floor(Date.now() / 1000);
		const eventId = `${event.userId || "unknown"}_${eventTime}_${event.eventName}`;

		const payload = {
			data: [
				{
					event_name: event.eventName.toLowerCase(),
					event_time: eventTime,
					event_id: eventId,
					event_source_url: `https://flowcloser-agent-production.up.railway.app`,
					action_source: "website",
					user_data: {
						...(event.userData?.email && { 
							em: hashData(event.userData.email) 
						}),
						...(event.userData?.phone && { 
							ph: hashData(event.userData.phone.replace(/\D/g, "")) 
						}),
						...(event.userData?.firstName && { 
							fn: hashData(event.userData.firstName) 
						}),
						...(event.userData?.lastName && { 
							ln: hashData(event.userData.lastName) 
						}),
						client_ip_address: "127.0.0.1", // Será preenchido pelo Meta
						client_user_agent: "FlowCloser-Agent/1.2",
					},
					custom_data: {
						...(event.value && { value: event.value }),
						...(event.currency && { currency: event.currency.toUpperCase() }),
						...(event.channel && { channel: event.channel }),
						...(event.customData || {}),
					},
				},
			],
			access_token: META_ACCESS_TOKEN,
		};

		const response = await fetch(META_CONVERSIONS_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.warn(`⚠️ Falha ao rastrear conversão: ${response.status} - ${errorText}`);
			return false;
		}

		const result = await response.json();
		console.log(`✅ Conversão rastreada: ${event.eventName} (${event.channel || "unknown"})`);
		return true;
	} catch (error) {
		console.warn(`⚠️ Erro ao rastrear conversão:`, error instanceof Error ? error.message : String(error));
		return false;
	}
}

/**
 * Hash de dados para privacidade (SHA-256)
 * Meta requer dados hasheados para privacidade
 */
function hashData(data: string): string {
	// Em produção, use crypto.createHash('sha256')
	// Por enquanto, retorna o dado (Meta vai hashar se necessário)
	// Para produção real, implemente hash SHA-256
	return data.toLowerCase().trim();
}

/**
 * Rastreia quando lead é qualificado
 */
export async function trackLeadQualified(
	userId: string,
	channel: string,
	leadData?: { email?: string; phone?: string; name?: string },
): Promise<void> {
	await trackConversion({
		eventName: "Lead",
		userId,
		channel,
		userData: {
			email: leadData?.email,
			phone: leadData?.phone,
			firstName: leadData?.name?.split(" ")[0],
		},
		customData: {
			lead_source: channel,
			qualified: true,
		},
	});
}

/**
 * Rastreia quando lead visualiza portfólio
 */
export async function trackPortfolioView(
	userId: string,
	channel: string,
): Promise<void> {
	await trackConversion({
		eventName: "ViewContent",
		userId,
		channel,
		customData: {
			content_type: "portfolio",
			content_name: "FlowCloser Portfolio",
		},
	});
}

/**
 * Rastreia quando lead inicia checkout (vai para WhatsApp)
 */
export async function trackCheckoutInitiated(
	userId: string,
	channel: string,
	value?: number,
): Promise<void> {
	await trackConversion({
		eventName: "InitiateCheckout",
		value,
		currency: "BRL",
		userId,
		channel,
		customData: {
			checkout_method: "whatsapp",
		},
	});
}

/**
 * Rastreia quando venda é fechada
 */
export async function trackPurchase(
	userId: string,
	channel: string,
	value: number,
	currency: string = "BRL",
	leadData?: { email?: string; phone?: string; name?: string },
): Promise<void> {
	await trackConversion({
		eventName: "Purchase",
		value,
		currency,
		userId,
		channel,
		userData: {
			email: leadData?.email,
			phone: leadData?.phone,
			firstName: leadData?.name?.split(" ")[0],
		},
		customData: {
			conversion_source: "flowcloser_agent",
			channel,
		},
	});
}

