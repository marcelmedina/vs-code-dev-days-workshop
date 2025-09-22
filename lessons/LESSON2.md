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


Next, ask Copilot to update `page.tsx` to fetch weather forecast data from the GET endpoint using the generated Weather Forecast client, including authentication if required.

Open Copilot chat and enter the following prompt:

> Can you please update `page.tsx` to fetch and display the weather forecast data using the GET endpoint from the generated Api client, using the correct types, and passing an authentication provider to FetchRequestAdapter that sets the `Ocp-Apim-Subscription-Key` header using the `NEXT_PUBLIC_API_KEY` environment variable?

Copilot will:
- Import the generated client in `page.tsx`.
- Fetch the weather data from the API.
- Render the weather forecast in the UI.

**Note: Expected Result**

Copilot may struggle to find the correct Kiota implementation. In the end you should have something close to this:

```js
"use client";

import { useEffect, useState } from "react";
import { createWeatherForecastClient } from "../api/weatherForecastClient";
import { FetchRequestAdapter } from "@microsoft/kiota-http-fetchlibrary";
import { WeatherForecast } from "../api/models/index";
import { AuthenticationProvider, RequestInformation } from "@microsoft/kiota-abstractions";

class ApimAuthProvider implements AuthenticationProvider {
  private subscriptionKey: string;

  constructor(subscriptionKey: string) {
    this.subscriptionKey = subscriptionKey;
  }

  async authenticateRequest(
	  request: RequestInformation,
	  _additionalAuthenticationContext?: Record<string, unknown>
  ): Promise<void> {
	  request.headers.set("Ocp-Apim-Subscription-Key", new Set([this.subscriptionKey]));
  }
}

export default function Home() {
	const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const authProvider = new ApimAuthProvider(process.env.NEXT_PUBLIC_API_KEY || "");
				const adapter = new FetchRequestAdapter(authProvider);
				const client = createWeatherForecastClient(adapter);
				const data = await client.get();
				setForecasts(data ?? []);
			} catch (err) {
				setError("Failed to fetch weather data");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

		return (
			<main style={{ padding: 24 }}>
				<h1>Weather Forecast</h1>
				{loading ? (
					<p>Loading...</p>
				) : error ? (
					<p style={{ color: "red" }}>{error}</p>
				) : forecasts.length > 0 ? (
					<ul>
						{forecasts.map((item, idx) => (
							<li key={idx}>
								<strong>{item.date?.toString()}</strong>: {item.temperatureC}°C, {item.summary}
							</li>
						))}
					</ul>
				) : (
					<p>No forecast data available.</p>
				)}
			</main>
		);
}

```

---

### Step 3: Beautify the Weather Forecast UI

Now, enhance the UI by transforming the simple list into a styled table for better readability and presentation.

Open Copilot chat and enter the following prompt:

> Can you please update `page.tsx` to display the weather forecast data in a table with columns for Date, Temperature (°C), and Summary, and make it visually appealing?

Copilot will:
- Replace the list with a table layout.
- Add basic styling to improve the appearance of the table.

**Note: Expected Result**

Your `page.tsx` will now render the weather forecast in a clean, readable, and visually enhanced table format.

---

**Tips:**

- If you get stuck on Step 1, you can check out the `lesson2-start` branch to continue from a working state.
- If you get stuck on Step 2, you can check out the `lesson2-end` branch to see the completed solution.
- If you encounter any issues, ask Copilot for troubleshooting help or clarification on any step.
