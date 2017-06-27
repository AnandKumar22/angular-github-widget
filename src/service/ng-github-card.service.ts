import {Injectable} from '@angular/core';
import {GithubActivity, GithubData, GithubProfile, Repository} from '../data/interfaces';

/**
 * Service class to provide data for the component.
 */
@Injectable()
export class NgGithubCardService {

    private maxResultRepos = 3;

    /**
     * Queries, processes and organizes the data received from the github api if all queries came back positive.
     * @param githubUser - The user to query data for.
     * @param namedTops - A list of repositories to check for and return in the list if they exist in the user's
     * repositories.
     * @returns {Promise<GithubData>} Returns a formatted data object if all operations are a success.
     */
    public getGithubData(githubUser: string, namedTops: string[]): Promise<GithubData> {
        return new Promise((resolve, reject) => {
            Promise.all([this.queryUserData(githubUser), this.queryRepositories(githubUser)]).then(results => {
                const userQuery = results[0];
                const repoQuery = results[1];

                const profile = this.extractProfile(userQuery);
                const repositories = this.extractTopRepositories(namedTops, repoQuery);
                const activity = this.extractActivity(userQuery, repoQuery);
                const resultData: GithubData = {
                    profile,
                    repositories,
                    activity
                };
                resolve(resultData);
            }).catch(reason => {
                console.log('Came here!!');
                reject(reason);
            });
        });
    }

    /**
     * Queries the github api for user profile information.
     * @param githubUser - The user to query data for.
     * @returns {Promise<any>} - Returns the data received without any processing on it.
     */
    private queryUserData(githubUser: string): Promise<any> {
        return this.sendGitHubQuery(`https://api.github.com/users/${githubUser}`);
    }

    /**
     * @see {NgGithubCardService#queryUserData}
     */
    private queryRepositories(githubUser: string): Promise<any> {
        return this.sendGitHubQuery(`https://api.github.com/users/${githubUser}/repos?per_page=1000`);
    }

    /**
     * Method to send request to the given url.
     * @param url - The url to send a GET request to.
     * @returns {Promise<{}>} - Returns the response data parsed by JSON.
     */
    private sendGitHubQuery(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = function () {
                if (request.status === 200) {
                    const data = JSON.parse(request.responseText);
                    resolve(data);
                } else {
                    reject(request.statusText);
                }
            };
            request.send();
        });
    }

    /**
     * Creates a {GithubProfile} object from the github api query.
     * @param userQuery - The query data.
     * @returns {GithubProfile} - Returns the relevant data.
     */
    private extractProfile(userQuery: any): GithubProfile {
        const obj: GithubProfile = {
            name: userQuery.name,
            avatarUrl: userQuery.avatar_url,
            userUrl: userQuery.html_url
        };
        if (userQuery.bio) {
            obj.bio = userQuery.bio;
        }
        if (userQuery.location) {
            obj.location = userQuery.location;
        }
        return obj;
    }

    /**
     * @see {NgGithubCardService#extractProfile}
     */
    private extractActivity(userQuery: any, repoQuery: any[]): GithubActivity {
        const latest = this.lastPushDay(repoQuery);
        return {
            lastActivityDay: latest,
            following: userQuery.following,
            followers: userQuery.followers,
            publicRepos: userQuery.public_repos
        };
    }

    /**
     * @see {NgGithubCardService#extractProfile}
     */
    private extractTopRepositories(namedTops: string[], repoQuery: any[]): Repository[] {
        if (namedTops.length > this.maxResultRepos) {
            namedTops = namedTops.slice(0, this.maxResultRepos);
        }

        const foundNamed: Repository[] = this.findRepositoriesByName(namedTops, repoQuery);

        if (foundNamed.length < this.maxResultRepos) {
            const remain: number = this.maxResultRepos - foundNamed.length;
            const sortedRepos: any[] = this.sortRepoQuery(repoQuery);
            const rest: any[] = sortedRepos.slice(0, remain);
            rest.forEach(r => foundNamed.push(this.transmuteRepo(r)));
        }
        return foundNamed;
    }

    /**
     * Loops through the repository history to determine last activity.
     * @param repoQuery - The array of repository histories.
     * @returns {number} - The amount of days passed since last activity.
     */
    private lastPushDay(repoQuery: any[]): number {
        const now: any = new Date();
        let latestDate;
        let difference = Infinity;
        for (let i = 0; i < repoQuery.length; i++) {
            const pushedDate: any = new Date(repoQuery[i].pushed_at);
            if (now - pushedDate < difference) {
                latestDate = pushedDate;
                difference = now - pushedDate;
            }
        }
        return Math.floor((now - latestDate) / (1000 * 3600 * 24));
    }

    /**
     * Verifies if the given repositories are in the user's repository list. Any that are verified are used to create
     * a Repository object.
     * @param names - The names of the repositories to verify.
     * @param repoQuery - The list of repositories to check against.
     * @returns {[Repository...]} - Returns an array containing repository objects made from all the verified names.
     */
    private findRepositoriesByName(names: string[], repoQuery: any[]): Repository[] {
        const filtered = repoQuery.filter(repoObj => (names.find(n => n === repoObj.name) || null) !== null);
        return filtered.map(r => this.transmuteRepo(r));
    }

    /**
     * Given an repository api response object, returns a Repository object with only the relevant data.
     * @param singleRepoQuery - A response object.
     * @returns {{name: string, stars: number, language, url: string}} - Returns a formatted object.
     */
    private transmuteRepo(singleRepoQuery: any): Repository {
        return {
            name: singleRepoQuery.name,
            stars: singleRepoQuery.stargazers_count,
            language: singleRepoQuery.language,
            url: singleRepoQuery.html_url
        }
    }

    /**
     * Sorts the given repository list by startgazers_count.
     * @param repoQuery - The array to sort.
     * @returns {{}[]} - Returns the sorted array.
     */
    private sortRepoQuery(repoQuery: any[]): any[] {
        return repoQuery.sort((a, b) => {
            if (a.stargazers_count === b.stargazers_count) {
                return 0;
            } else if (a.stargazers_count > b.stargazers_count) {
                return -1;
            } else {
                return 1;
            }
        });
    }

}