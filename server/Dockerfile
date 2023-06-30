# Specify the base image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

# Copy and restore project files
COPY *.csproj .
RUN dotnet restore

# Copy the source code and build the project
COPY . .
RUN dotnet build -c Release --no-restore

# Publish the project
RUN dotnet publish -c Release --no-restore --output /app/out

# Create the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# Expose port 443 for HTTPS
EXPOSE 80

# Set the entry point
ENTRYPOINT ["dotnet", "ticket_server.dll"]