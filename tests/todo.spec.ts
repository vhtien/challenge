import { test as base, expect } from "@playwright/test";
import { Todo } from "../doms/todo-page";

const test = base.extend<{
    todo: Todo,
}>({
    todo: async ({ page }, use) => {
        use(new Todo(page));
    },
});

test.describe("TODOs Test", () => {

    test.beforeEach(async({ page }) => {
        page.goto('/examples/react/dist/#/');
    });

    test("Can create multiple TODOs", async ({ todo }) => {
        for (const task of ["hello world", "新年快乐", "日本を再び偉大に"]) {
            await todo.create(task);
        }

        expect(await todo.total()).toBe(3);
        expect(await todo.totalActive()).toBe(3);
    });

    test("Cannot create TODOS with a single character", async ({ todo }) => {
        for (const task of ["x", "新", "日"]) {
            await todo.create(task);
        }

        expect(await todo.total()).toBe(0);
    });

    test("The minimum characters in task name should be 2", async ({ todo }) => {
        await todo.create("xe");
        expect(await todo.total()).toBe(1);
    });

    test("Can close all TODOs at once", async ({ todo }) => {
        for (const task of ["hello world", "新年快乐", "日本を再び偉大に"]) {
            await todo.create(task);
        }
        expect(await todo.totalActive()).toBe(3);

        await todo.toggleAll();
        expect(await todo.totalActive()).toBe(0);
    });

    test("Can close a single TODO", async ({ todo }) => {
        for (const task of ["hello world", "新年快乐", "日本を再び偉大に"]) {
            await todo.create(task);
        }
        expect(await todo.totalActive()).toBe(3);

        await todo.toggle("新年快乐");
        expect(await todo.totalActive()).toBe(2);
    });

    test("Can filter TODOs", async ({ todo }) => {
        for (const task of ["hello world", "新年快乐", "日本を再び偉大に"]) {
            await todo.create(task);
        }
        await todo.toggle("新年快乐", "hello world");

        await todo.filter("Active");
        expect(await todo.allTexts()).toEqual(["日本を再び偉大に"]);

        await todo.filter("Completed");
        expect(await todo.allTexts()).toEqual(["hello world", "新年快乐"]);

        await todo.filter("All");
        expect(await todo.allTexts()).toEqual(["hello world", "新年快乐", "日本を再び偉大に"]);
    });

    test("Can clear all completed TODOs", async ({ todo }) => {
        for (const task of ["hello world", "新年快乐", "日本を再び偉大に"]) {
            await todo.create(task);
        }
        await todo.toggle("新年快乐", "hello world");

        await todo.clearComplete();

        await todo.filter("Active");
        expect(await todo.allTexts()).toEqual(["日本を再び偉大に"]);

        await todo.filter("Completed");
        expect(await todo.allTexts()).toEqual([]);

        await todo.filter("All");
        expect(await todo.allTexts()).toEqual(["日本を再び偉大に"]);
    });


    test("Can undo a completed TODO", async ({ todo }) => {
        for (const task of ["hello world", "新年快乐", "日本を再び偉大に"]) {
            await todo.create(task);
        }
        expect(await todo.totalActive()).toBe(3);

        await todo.toggle("hello world");
        expect(await todo.totalActive()).toBe(2);

        await todo.toggle("hello world");
        expect(await todo.totalActive()).toBe(3);
    });

    test("Can undo all completed TODO", async ({ todo }) => {
        for (const task of ["hello world", "新年快乐", "日本を再び偉大に"]) {
            await todo.create(task);
        }
        await todo.toggle("新年快乐", "hello world");
        expect(await todo.totalActive()).toBe(1);

        await todo.filter("Completed");
        expect(await todo.allTexts()).toEqual(["hello world", "新年快乐"]);

        await todo.toggleAll();
        expect(await todo.totalActive()).toBe(3);
    });
});
