import { Locator, Page } from "@playwright/test";

export class Todo {
    private readonly input: Locator;
    private readonly toggleAllEle: Locator;

    constructor(private readonly page: Page) {
        this.input = page.locator("#todo-input");
        this.toggleAllEle = page.locator("#toggle-all");
    }

    async create(todo: string) {
        await this.input.fill(todo);
        // await this.input.press("Enter");
        await this.page.keyboard.press("Enter");
    }

    async total() {
        return (await this.allTexts()).length;
    }

    async allTexts() {
        return await this.page.getByTestId("todo-item").allTextContents();
    }

    async totalActive() {
        return parseInt(
            (await this.page.locator(".todo-count").textContent())?.split(" ")[0] ?? "0"
        );
    }

    async clearComplete() {
        await this.page.locator(".clear-completed").click();
    }

    async filter(status: "Active" | "Completed" | "All") {
        await this.page.getByRole("link", { name: status }).click();
    }

    async toggleAll() {
        await this.toggleAllEle.click();
    }

    async toggle(...todos: string[]) {
        for (const todo of todos) {
            await this.page.locator(
                `//*[@data-testid='todo-item-toggle' and ./following-sibling::*[.='${todo}']]`
            ).click();
        }
    }
}
