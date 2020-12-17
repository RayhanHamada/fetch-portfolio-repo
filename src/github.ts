import axios from 'axios';
import { GithubConfig, GithubRepository } from './types';

export async function fromGithub(
  config: GithubConfig
): Promise<GithubRepository[]> {
  const topic = config.markTopic ?? 'for-portfolio';

  if (config.debug) console.log(`topic: ${topic}`);

  const headers = {
    Accept: 'application/vnd.github.mercy-preview+json',
    Authorization: config.token ? `bearer ${config.token}` : null,
  };

  if (config.debug) {
    if (config.token) {
      console.log(`proceeding with token: ${config.token}.`);
    } else {
      console.log(`proceeding without token.`);
    }
  }

  const repos: GithubRepository[] = [];
  await axios
    .get<GithubRepository[]>(
      `https://api.github.com/users/${config.username}/repos`,
      {
        headers,
      }
    )
    .then(res => {
      repos.push(...res.data.filter(repo => repo.topics.includes(topic)));
    })
    .catch(err => {
      console.log(`failed to fetch repository`);
      if (config.debug) {
        console.log(`error when fetching repository !`);
        console.error(err);
      }
    });

  return repos;
}
