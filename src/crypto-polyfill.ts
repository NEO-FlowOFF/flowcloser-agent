/**
 * Polyfill para crypto - necessário para @iqai/adk no Railway
 * Deve ser importado ANTES de qualquer import do @iqai/adk
 */

import * as nodeCrypto from "node:crypto";

// Garantir que crypto esteja disponível globalmente de todas as formas possíveis
// Usar Object.defineProperty para garantir que não seja sobrescrito acidentalmente
if (typeof globalThis.crypto === "undefined") {
	Object.defineProperty(globalThis, "crypto", {
		value: nodeCrypto,
		writable: false,
		configurable: false,
	});
}

if (typeof (global as any).crypto === "undefined") {
	Object.defineProperty(global, "crypto", {
		value: nodeCrypto,
		writable: false,
		configurable: false,
	});
}

export {};

