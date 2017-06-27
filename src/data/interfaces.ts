export interface GithubProfile {
    name: string,
    avatarUrl: string,
    userUrl: string,
    bio?: string,
    location?: string
}

export interface Repository {
    name: string,
    stars: number,
    language: string,
    url: string
}

export interface GithubActivity {
    followers: number,
    following: number,
    publicRepos: number,
    lastActivityDay: number
}

export interface GithubData {
    profile: GithubProfile,
    repositories: Repository[],
    activity: GithubActivity
}