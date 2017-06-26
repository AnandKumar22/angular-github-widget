import {NgModule} from '@angular/core';
import {NgGithubCardComponent} from './component/ng-github-card.component';
import {NgGithubCardService} from './service/ng-github-card.service'

@NgModule({
    declarations: [
        NgGithubCardComponent
    ],
    providers: [
        NgGithubCardService
    ],
    exports : [
        NgGithubCardComponent
    ]
})
export class NgGithubCardModule {

}