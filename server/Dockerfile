#FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
#WORKDIR /app
#EXPOSE 80

#ENV ASPNETCORE_URLS=http://+:80

#FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
#WORKDIR /src
#COPY ["ticket_server.csproj", "./"]
#RUN dotnet restore "ticket_server.csproj"
#COPY . .
#WORKDIR "/src/."
#RUN dotnet build "ticket_server.csproj" -c Release -o /app/build

#FROM build AS publish
#RUN dotnet publish "ticket_server.csproj" -c Release -o /app/publish /p:UseAppHost=false

#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "ticket_server.dll"]

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ticket_server.csproj .
RUN dotnet restore "ticket_server.csproj"

COPY ./Data/AppDB.db /publish/Data/AppDB.db

COPY . .

#ENV ASPNETCORE_URLS=http://+:5251

RUN dotnet publish "ticket_server.csproj" -c Release -o /publish

#COPY ./Data/AppDB.db /publish/Data/AppDB.db

FROM mcr.microsoft.com/dotnet/aspnet:7.0 as final
WORKDIR /app
COPY --from=build /publish .

EXPOSE 80

ENTRYPOINT ["dotnet", "ticket_server.dll"]
