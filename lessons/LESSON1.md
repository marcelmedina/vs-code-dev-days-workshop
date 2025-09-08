## Lesson 1: Generating a TypeScript API Client with Kiota and Copilot

In this lesson, you will learn how to use GitHub Copilot to automate the process of generating a TypeScript API client using [Kiota](https://github.com/microsoft/kiota) from an OpenAPI/Swagger definition. You will also update your project's dependencies to include the required Kiota packages.

### Prerequisites

- Ensure you have the `kiota` CLI installed on your machine (already available in this environment).
- Your workspace should contain the `weather-forecast-swagger.json` file at the root.
- Your Next.js project should be located in the `forecast/` folder.

---

### Step 1: Ask Copilot to Generate a Kiota TypeScript Client

Open the Copilot chat and enter the following prompt:

> Can you please generate a Kiota TypeScript client within `forecast/src/api` for `weather-forecast-swagger.json`?

Copilot will:
- Use the `kiota` CLI to generate a TypeScript client based on the OpenAPI definition.
- Place the generated client code inside the `forecast/src/api` directory.

**Note: Expected Result**

The following command will be executed by Copilot:

```sh
kiota generate -l typescript -d /workspaces/vs-code-dev-days-workshop/weather-forecast-swagger.json -o /workspaces/vs-code-dev-days-workshop/forecast/src/api
```

After running this command, you should see new TypeScript client files generated in `forecast/src/api`.

---

### Step 2: Update `package.json` with Kiota Dependencies


After the client is generated, ask Copilot to update your project's dependencies with a more explicit prompt:

> Can you please update the existing `package.json` in the `forecast` folder to include the latest recommended Kiota TypeScript dependency?

Copilot will:
- Add the necessary Kiota TypeScript packages to your `forecast/package.json` file.
- Ensure all dependencies are installed and up to date.

**Note: Expected Result**

Your `forecast/package.json` will be updated to include the following dependency:

```json
{
	// ...existing package.json fields...
	"dependencies": {
		// ...other dependencies...
		"@microsoft/kiota-bundle": "1.0.0-preview.96"
	}
}
```

---

### References

- [Kiota Documentation](https://learn.microsoft.com/en-us/openapi/kiota/)
- [Kiota TypeScript Quickstart](https://learn.microsoft.com/en-us/openapi/kiota/get-started/typescript)

**Tips:**

- If you get stuck on Step 1, you can check out the `lesson1-start` branch to continue from a working state.
- If you get stuck on Step 2, you can check out the `lesson1-end` branch to see the completed solution.
- If you encounter any issues, ask Copilot for troubleshooting help or clarification on any step.
