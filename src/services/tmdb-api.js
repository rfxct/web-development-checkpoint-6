export default async function tmdbApi(endpoint, search = {}) {
  const response = await fetch(`https://api.themoviedb.org/3/${endpoint.replace(/^\//, '')}?${new URLSearchParams({
    api_key: '7c572a9f5b3ba776080330d23bb76e1e',
    language: 'pt-BR',
    ...search
  })}`)

  return response.json()
} 