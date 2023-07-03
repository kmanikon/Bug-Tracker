FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ticket_server.csproj .
RUN dotnet restore "ticket_server.csproj"

COPY ./Data/AppDB.db /publish/Data/AppDB.db

COPY . .

#ENV ASPNETCORE_URLS=http://+:80

RUN dotnet publish "ticket_server.csproj" -c Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:7.0 as final
WORKDIR /app
COPY --from=build /publish .

#EXPOSE 80

ENTRYPOINT ["dotnet", "ticket_server.dll"]
