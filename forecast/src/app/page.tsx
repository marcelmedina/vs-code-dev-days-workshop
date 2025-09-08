"use client";

import { useEffect, useState } from "react";
import { createApiClient } from "../api/apiClient";
import { FetchRequestAdapter } from "@microsoft/kiota-http-fetchlibrary";
import type { WeatherForecast } from "../api/models/index";
import type { RequestInformation } from "@microsoft/kiota-abstractions";

export default function Home() {
	const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const authProvider = {
					authenticateRequest: async (request: RequestInformation) => {
						// Set the Ocp-Apim-Subscription-Key header for authentication
						const apiKey = process.env.NEXT_PUBLIC_API_KEY;
						if (typeof apiKey === "string") {
							request.headers.set("Ocp-Apim-Subscription-Key", new Set([apiKey]));
						} else {
							console.error("NEXT_PUBLIC_API_KEY environment variable is not set.");
						}
						return Promise.resolve();
					}
				};

				const adapter = new FetchRequestAdapter(authProvider);
				const client = createApiClient(adapter);
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
