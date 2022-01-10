import { Octokit } from "octokit";

const octokit = new Octokit();

export async function searchGists(query) {
  try{
    var data = await octokit.request(`GET /users/${query[0]}/gists`, {
      page: query[1]
    });
    return new Promise((resolve) =>
    resolve({ data: data })
  );
  }
  catch(error){
    throw error;
  }
}

export async function fetchForks(id = '') {
  try{
    var data = await octokit.request(`GET /gists/${id}/forks`)
    return new Promise((resolve) =>
      resolve({ data: data })
    );
  }
  catch(error){
    throw error;
  }
}

export async function fetchComments(id = '') {
  try{
    var data = await octokit.request(`GET /gists/${id}/comments`)
    return new Promise((resolve) =>
      resolve({ data: data })
    );
  }
  catch(error){
    throw error;
  }
}
