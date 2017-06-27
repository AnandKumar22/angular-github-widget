import {AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgGithubCardService} from '../service/ng-github-card.service';
import {GithubData} from '../data/interfaces';

@Component({
    selector: 'ng-github-card',
    template: `
        <div>
            <h1>Hello World. {{saying}}</h1>
        </div>`,
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
export class NgGithubCardComponent implements OnChanges, OnInit, AfterContentInit {

    @Input() githubUser: string;
    @Input() top1: string;
    @Input() top2: string;
    @Input() top3: string;

    private db: NgGithubCardService;

    private data: GithubData | null = null;

    constructor(service: NgGithubCardService) {
        this.db = service;
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('Changes');
        const githubUser = changes.githubUser.currentValue;
        const namedTops: string[] = [];
        [changes.top1.currentValue, changes.top2.currentValue, changes.top3.currentValue].forEach(t => {
            if (t) namedTops.push(t);
        });

        console.log(githubUser);
        console.log(namedTops);
        console.log('-------------------------------');
    }

    ngOnInit(): void {
        console.log('on init');
        console.log(this.githubUser);
        console.log([this.top1, this.top2, this.top3]);
        console.log('-------------------------------');
    }

    ngAfterContentInit(): void {
        console.log('After content init');
        console.log(this.githubUser);
        console.log([this.top1, this.top2, this.top3]);
        console.log('-------------------------------');
    }

}