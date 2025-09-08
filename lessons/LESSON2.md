## Lesson 2: Displaying Weather Forecast Data in the UI

In this lesson, you will use the generated Weather Forecast client to display weather data in your Next.js app's UI.

---

### Step 1: Clean Up `page.tsx`

Open `forecast/src/app/page.tsx` and replace its contents with the following minimal component:

```tsx
export default function Home() {
	return (
		<div></div>
	);
}
```

This ensures you start with a clean slate for your UI.

---

### Step 2: Fetch and Display Weather Data

Next, ask Copilot to update `page.tsx` to fetch weather forecast data from the GET endpoint using the generated Weather Forecast client.

Open Copilot chat and enter the following prompt:

> Can you please update `page.tsx` to fetch and display the weather forecast data using the GET endpoint from the generated Weather Forecast client?

Copilot will:
- Import the generated client in `page.tsx`.
- Fetch the weather data from the API.
- Render the weather forecast in the UI.

**Note: Expected Result**

Your `page.tsx` will now display the weather forecast data in the browser using the generated client.

---

**Tip:** If you get stuck, you can check out the `lesson2-start` branch for a clean slate, or `lesson2-end` for a completed solution.
