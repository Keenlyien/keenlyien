// Vercel Serverless Function
// Runs server-side only — the GITHUB_TOKEN never reaches the browser.
// Local:  requires `vercel dev` (not `npm run dev`) to execute this route.
// Prod:   Vercel deploys this automatically because it lives in /api.

const GITHUB_USERNAME = 'Keenlyien';

export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: 'GITHUB_TOKEN is not set. Add it to your .env.local (for local dev) and to your Vercel project environment variables (for production).',
    });
  }

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              id
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: `GitHub API error: ${text}` });
    }

    const json = await response.json();

    if (json.errors) {
      return res.status(500).json({ error: json.errors });
    }

    const pinned = json.data?.user?.pinnedItems?.nodes || [];

    // Shaped to match the field names Projects.jsx already expects
    // from the old REST API response, so ProjectCard needs no changes.
    const repos = pinned.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.url,
      stargazers_count: repo.stargazerCount,
      forks_count: repo.forkCount,
      language: repo.primaryLanguage ? repo.primaryLanguage.name : null,
    }));

    // Cache at Vercel's edge for 1 hour; serve stale while revalidating
    // so pinned-repo changes show up without hammering the GitHub API.
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

    return res.status(200).json(repos);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch pinned repos.' });
  }
}
