import {Component} from '@angular/core';
import {NgGithubCardService} from '../service/ng-github-card.service';

@Component({
    selector: 'ng-github-card',
    template: `        
        <div>
            <h1>Hello World. {{saying}}</h1>
        </div>`
})
export class NgGithubCardComponent {

    saying: string;

    constructor(service: NgGithubCardService) {
        this.saying = "It over " + service.coolness() + "!!!!!";
    }
}