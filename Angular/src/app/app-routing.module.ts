import { LogRegPageComponent } from './pages/log-reg-page/log-reg-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { RankingComponent } from './pages/ranking/ranking.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'game-page', component: GamePageComponent },
  { path: 'review-page', component: ReviewPageComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'sign', component: LogRegPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
