import assert from "node:assert/strict";
import { test } from "node:test";
import { Script } from "node:vm";

const baseUrl = process.argv[2] || "http://localhost:4321";

async function read(path) {
	const response = await fetch(new URL(path, baseUrl));
	assert.equal(response.status, 200, `${path} should return HTTP 200`);
	return response.text();
}

for (const path of [
	"/ai-workflow/",
	"/ai-workflow/local/",
	"/ai-workflow/global/",
]) {
	test(`${path} serves the standalone page and its scripts`, async () => {
		const html = await read(path);
		assert.match(html, /<!doctype html>/i);
		assert.match(html, /<title>[^<]*工作流[^<]*<\/title>/);
		for (const [, src] of html.matchAll(/<script\s+src="([^"]+)"/g)) {
			const scriptUrl = new URL(src, new URL(path, baseUrl));
			new Script(await read(scriptUrl), { filename: scriptUrl.pathname });
		}
	});
}

test("workflow data scripts parse independently of page routing", async () => {
	for (const path of [
		"/ai-workflow/global/data.js",
		"/ai-workflow/local/customizations.js",
	]) {
		new Script(await read(path), { filename: path });
	}
});

test("desktop and mobile workflow navigation use a full page load", async () => {
	const html = await read("/");
	const links = html.match(/<a\b[^>]*href="\/ai-workflow\/local\/"[^>]*>/g);
	assert.equal(links?.length, 2, "desktop and mobile workflow links exist");
	for (const link of links) {
		assert.match(link, /\bdata-no-swup(?:[\s=>])/);
	}
});
