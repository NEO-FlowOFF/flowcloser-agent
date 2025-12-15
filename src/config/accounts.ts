export type MetaPlatform = "instagram" | "messenger" | "facebook";

export interface MetaAccountConfig {
	account_name: string;
	page_id: string;
	page_access_token: string;
	platform: MetaPlatform;
	active?: boolean;
}

let cachedAccounts: MetaAccountConfig[] | null = null;

function parseAccounts(): MetaAccountConfig[] {
	if (cachedAccounts) {
		return cachedAccounts;
	}

	const raw = process.env.INSTAGRAM_ACCOUNTS;
	if (!raw) {
		cachedAccounts = [];
		return cachedAccounts;
	}

	try {
		const parsed = JSON.parse(raw) as MetaAccountConfig[];
		// Normalizar plataformas e filtrar inativos
		cachedAccounts = (parsed || [])
			.map((account) => ({
				...account,
				platform: (account.platform || "instagram") as MetaPlatform,
				active: account.active ?? true,
			}))
			.filter((account) => account.active && !!account.page_access_token);
	} catch (error) {
		console.warn("⚠️ Falha ao ler INSTAGRAM_ACCOUNTS:", error);
		cachedAccounts = [];
	}

	return cachedAccounts;
}

export function getActiveAccounts(): MetaAccountConfig[] {
	return parseAccounts();
}

export function getAccountByPageId(pageId?: string | null): MetaAccountConfig | undefined {
	if (!pageId) return undefined;
	return parseAccounts().find((account) => account.page_id === String(pageId));
}

export function getDefaultAccount(platform: MetaPlatform = "instagram"): MetaAccountConfig | null {
	const fallbackToken = process.env.INSTAGRAM_ACCESS_TOKEN;
	const fallbackPageId = process.env.INSTAGRAM_PAGE_ID || "me";

	if (!fallbackToken) {
		return null;
	}

	return {
		account_name: "Default Instagram",
		page_id: fallbackPageId,
		page_access_token: fallbackToken,
		platform,
		active: true,
	};
}
