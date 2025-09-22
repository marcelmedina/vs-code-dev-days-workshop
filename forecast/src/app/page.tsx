'use client';

import { FetchRequestAdapter } from '@microsoft/kiota-http-fetchlibrary';
import { type AuthenticationProvider, type RequestInformation } from '@microsoft/kiota-abstractions';
import { useEffect, useState } from 'react';
import { createWeatherForecastClient } from '../api/weatherForecastClient';
import type { WeatherForecast } from '../api/models';

class ApiKeyAuthenticationProvider implements AuthenticationProvider {
  constructor(private apiKey: string) {}

  async authenticateRequest(request: RequestInformation): Promise<void> {
    request.headers.add('Ocp-Apim-Subscription-Key', this.apiKey);
  }
}

export default function Home() {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeatherForecast() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';

        // Create authentication provider with API key
        const authProvider = new ApiKeyAuthenticationProvider(apiKey);

        // Create request adapter with the auth provider
        const requestAdapter = new FetchRequestAdapter(authProvider);

        // Create the client
        const client = createWeatherForecastClient(requestAdapter);

        // Fetch weather forecast data
        const data = await client.get();

        if (data) {
          setForecasts(data);
        }
      } catch (err) {
        console.error('Error fetching weather forecast:', err);
        setError('Failed to fetch weather forecast data');
      } finally {
        setLoading(false);
      }
    }

    fetchWeatherForecast();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weather Forecast</h1>

      {loading && <p>Loading weather data...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {forecasts.map((forecast, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <p className="font-semibold">
                {forecast.date ? new Date(forecast.date.toString()).toLocaleDateString() : 'N/A'}
              </p>
              <p className="text-xl">{forecast.temperatureC}°C / {forecast.temperatureF}°F</p>
              <p>{forecast.summary || 'No summary available'}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && forecasts.length === 0 && (
        <p>No weather forecast data available.</p>
      )}
    </div>
  );
}
