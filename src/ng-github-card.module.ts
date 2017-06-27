import {NgModule} from '@angular/core';
import {NgGithubCardComponent} from './component/ng-github-card.component';
import {NgGithubCardService} from './service/ng-github-card.service'
import {CommonModule} from '@angular/common'

@NgModule({
    declarations: [
        NgGithubCardComponent
    ],
    providers: [
        NgGithubCardService
    ],
    imports: [
        CommonModule
    ],
    exports : [
        NgGithubCardComponent
    ]
})
export class NgGithubCardModule {

}