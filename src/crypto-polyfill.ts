/**
 * Polyfill para crypto - necessário para @iqai/adk no Railway
 * Deve ser importado ANTES de qualquer import do @iqai/adk
 */

import * as nodeCrypto from "node:crypto";

// Garantir que crypto esteja disponível globalmente de todas as formas possíveis
if (typeof globalThis.crypto === "undefined") {
	(globalThis as any).crypto = nodeCrypto;
}

if (typeof (global as any).crypto === "undefined") {
	(global as any).crypto = nodeCrypto;
}

// Para compatibilidade com código que usa 'crypto' diretamente
if (typeof (globalThis as any).crypto === "undefined") {
	Object.defineProperty(globalThis, "crypto", {
		value: nodeCrypto,
		writable: false,
		configurable: false,
	});
}

// Também definir no escopo global
if (typeof (global as any).crypto === "undefined") {
	Object.defineProperty(global, "crypto", {
		value: nodeCrypto,
		writable: false,
		configurable: false,
	});
}

export {};

