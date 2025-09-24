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
