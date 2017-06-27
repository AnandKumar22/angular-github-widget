import {AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgGithubCardService} from '../service/ng-github-card.service';
import {GithubData} from '../data/interfaces';

@Component({
    selector: 'ng-github-card',
    template: `
        <div class="github-widget" *ngIf="githubData !== null">
            <div class="">
                <div class="gh-widget-container">
                    <div class="gh-widget-item gh-widget-photo">
                        <span class="">
                            <img src="{{githubData.profile.avatarUrl}}">
                        </span>
                    </div>
                    <div class="gh-widget-item gh-widget-personal-details">
                        <div class="full-name">{{githubData.profile.name}}</div>
                        <div *ngIf="githubData.profile.bio" class="bio">{{githubData.profile.bio}}</div>
                        <div *ngIf="githubData.profile.location" class="location">⚲ {{githubData.profile.location}}
                        </div>
                    </div>
                </div>
                <div class="gh-widget-container gh-widget-stats">
                    <div class="gh-widget-item">
                        <div class="count">{{githubData.activity.followers}}</div>
                        <div class="stat-name">Followers</div>
                    </div>
                    <div class="gh-widget-item">
                        <div class="count">{{githubData.activity.following}}</div>
                        <div class="stat-name">Following</div>
                    </div>
                    <div class="gh-widget-item">
                        <div class="count">{{githubData.activity.publicRepos}}</div>
                        <div class="stat-name">Repositories</div>
                    </div>
                </div>
                <hr class="gh-widget-hr">
                <div class="gh-widget-container">
                    <div class="gh-widget-item gh-widget-heading">Top repositories</div>
                </div>
                <div class="gh-widget-repositories">
                    <div *ngFor="let repo of githubData.repositories" class="gh-widget-container">
                        <div class="gh-widget-item names">
                            <div>
                                <a class="gh-widget-link" href="{{repo.url}}">
                                    {{repo.name}}
                                </a>
                            </div>
                        </div>
                        <div class="gh-widget-item language">
                            <div>{{repo.language}}</div>
                        </div>
                        <div class="gh-widget-item stars">
                            <div>★{{repo.stars}}</div>
                        </div>
                    </div>
                </div>
                <div class="gh-widget-container">
                    <div class="gh-widget-item gh-widget-follow">
                        <button class="">
                            <a class="gh-widget-link" target="new" href="{{githubData.profile.userUrl}}">Follow</a>
                        </button>
                    </div>
                    <div class="gh-widget-item gh-widget-active-time">
                        <span class="">
                            Last active: {{githubData.activity.lastActivityDay === 0 ? 'Today' :
                                '' + githubData.activity.lastActivityDay + ' days(s) ago'}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        @import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);

        .gh-widget-link, .gh-widget-link:hover {
            text-decoration: none;
        }

        .gh-widget-container {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
            color: #333;
            font-family: 'Noto Sans', sans-serif;
        }

        .gh-widget-personal-details .bio, .gh-widget-stats .count {
            color: #4078C0;
        }

        .github-widget {
            border: 1px solid #DDD;
            max-width: 350px;
        }

        .gh-widget-item {
            flex: 1;
            text-align: center;
            padding: 10px;
        }

        .gh-widget-repositories .language {
            text-align: left;
        }

        .gh-widget-repositories .language div, .gh-widget-repositories .stars div {
            padding: 5px 0;
        }

        .gh-widget-photo {
            flex: 2;
        }

        .gh-widget-photo img {
            border-radius: 100%;
            max-width: 90px;
        }

        .gh-widget-personal-details {
            flex: 6;
        }

        .gh-widget-personal-details .full-name {
            font-size: 1.5em;
            line-height: 1.5em;
        }

        .gh-widget-personal-details .location {
            font-size: .8em
        }

        .gh-widget-stats .count {
            font-size: 1.2em;
            font-weight: 700;
        }

        .gh-widget-repositories .names {
            flex: 2;
            text-align: left;
        }

        .gh-widget-repositories .names div {
            padding: 5px 0;
            text-overflow: ellipsis;
        }

        .gh-widget-follow {
            flex: 2;
        }

        .gh-widget-active-time {
            flex: 4;
            font-size: .8em;
        }

        .gh-widget-heading {
            font-weight: 400;
            color: #666;
        }

        .gh-widget-hr {
            border: 1px solid #DDD;
        }

        .gh-widget-link {
            color: #4078C0;
        }

        .gh-widget-follow button {
            width: 100%;
            height: 2em;
            border: none;
            background: #ddd;
        }
    `
    ]
})
export class NgGithubCardComponent implements OnChanges {

    @Input() githubUser: string;
    @Input() top1: string;
    @Input() top2: string;
    @Input() top3: string;

    private db: NgGithubCardService;

    private githubData: GithubData | null = null;

    /**
     * Simple initialization constructor.
     * @param service - The data service this component depends on.
     */
    constructor(service: NgGithubCardService) {
        this.db = service;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const githubUserChange = changes.githubUser;
        // if a value has been defined, get it or else resolve to null
        const githubUser: string | null = githubUserChange ? githubUserChange.currentValue : null;
        const namedTops: string[] = [];

        // collect any defined top object's current value into an array
        [changes.top1, changes.top2, changes.top3].forEach(t => {
            if (t) namedTops.push(t.currentValue);
        });

        if (githubUser != null) {
            this.db.getGithubData(githubUser, namedTops)
                .then((value: GithubData) => {
                    this.githubData = value;
                })
                .catch(reason => console.error(`Failed to get data for user ${githubUser}`));
        }
    }

}