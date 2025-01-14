import { keygen, newHttpClient, randomID } from "../test-utils.ts";

import { afterAll } from "https://deno.land/std@0.136.0/testing/bdd.ts";
import { LPopCommand } from "./lpop.ts";
import { assertEquals } from "https://deno.land/std@0.136.0/testing/asserts.ts";

import { LPushCommand } from "./lpush.ts";
const client = newHttpClient();

const { newKey, cleanup } = keygen();
afterAll(cleanup);

Deno.test("when list exists", async (t) => {
  await t.step("returns the first element", async () => {
    const key = newKey();
    const value = randomID();
    await new LPushCommand([key, value]).exec(client);
    const res = await new LPopCommand([key]).exec(client);
    assertEquals(res, value);
  });
});

Deno.test("when list does not exist", async (t) => {
  await t.step("returns null", async () => {
    const key = newKey();
    const res = await new LPopCommand([key]).exec(client);
    assertEquals(res, null);
  });
});
