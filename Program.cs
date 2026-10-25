using System.Net.Http.Json;

var builder = WebApplication.CreateBuilder(args);

// Allow our application to make HTTP requests.
builder.Services.AddHttpClient();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Our first JSON endpoint.
app.MapGet("/api/hello", () => new
{
    message = "Hello from my first API!",
    project = "ISS Tracker"
});

// Our new ISS endpoint.
app.MapGet("/api/iss", async (HttpClient client) =>
{
    try
    {
        // Request ISS position data from the external API.
        var position = await client.GetFromJsonAsync<IssPosition>(
            "https://api.wheretheiss.at/v1/satellites/25544"
        );

        if (position is null)
        {
            return Results.Problem(
                "ISS position data is unavailable.",
                statusCode: 502
            );
        }

        // Return the position to our browser as JSON.
        return Results.Ok(position);
    }
    catch (HttpRequestException)
    {
        return Results.Problem(
            "Could not contact the ISS data provider.",
            statusCode: 502
        );
    }
    catch (TaskCanceledException)
    {
        return Results.Problem(
            "The ISS data request timed out.",
            statusCode: 504
        );
    }
});

app.Run();

// A C# type describing the ISS data we want to receive.
public record IssPosition(
    double Latitude,
    double Longitude,
    double Altitude,
    double Velocity,
    long Timestamp
);